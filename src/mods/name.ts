import * as fs from "fs";
import * as path from "path";

import ModeBase from "../lib/ModeBase";
import logger from "../lib/Elucidator";
import { readFileMd5 } from "../lib/Md5";

export default class extends ModeBase {

    protected helpinfo =
        `-path: [指定的路径]?
指定需要批量重命名文件的文件夹路径,默认为当前文件夹
-name: [指定的文件名]?
命名为指定的文件名加序号
    --folder
    名字为文件夹名加序号
    --time
    名字为时间戳加序号
    --md5(未完成，不可使用)
    名字为文件的md5值
-ccc
ccc 项目内文件的重命名(会同时重命名对应的 .meta 文件)`;

    private targetFolder: string = ""
    private nameString: string = ""

    protected async onLoad() {
        this.targetFolder = process.cwd();
        this.nameString = "autoRename";
    }

    protected async path(argv: string[]) {
        if (argv[0]) {
            this.targetFolder = path.normalize(argv[0]);
        }
    }

    protected async name_time(argv: string[]) {
        let date = new Date();
        this.nameString = date.getTime().toString();
    }

    protected async name_md5(argv: string[]) {
        this.getNewPath = (arg: {
            old: string,
            index: number,
            max: number
        }) => {
            let stat = fs.statSync(arg.old);
            console.log(stat.birthtime);
            return arg.index.toString();
        }
    }

    protected async name_folder(argv: string[]) {
        this.nameString = path.basename(this.targetFolder);
    }

    protected async name(argv: string[]) {
        if (argv[0]) {
            this.nameString = argv[0];
        }
    }

    protected async ccc() {
        this.onMain = async () => {
            fs.readdir(this.targetFolder, (err, file) => {
                if (err) {
                    logger.err(err);
                    return;
                }
                file = this.sortFile(file);
                let index = 0;
                for (let i = 0; i < file.length; ++i) {
                    if (path.extname(file[i]) === ".meta") {
                        continue;
                    }
                    if (fs.statSync(file[i]).isDirectory()) {
                        continue;
                    }
                    let newname = this.getNewPath({ old: file[i], index: index, max: Math.ceil(file.length / 2) });
                    let oldMeta = file[i] + ".meta";
                    let newnameMeta = newname + ".meta";
                    index++;
                    fs.rename(file[i], newname, (err) => {
                        if (err) {
                            logger.err(err);
                        }
                        else {
                            logger.wri(`将 ${path.basename(file[i])} 重命名为 ${path.basename(newname)}`);
                        }
                    });
                    if (!fs.existsSync(oldMeta)) return;
                    fs.rename(oldMeta, newnameMeta, (err) => {
                        if (err) {
                            logger.err(err);
                        }
                    });
                }
            });
        };
    }


    protected async onMain() {
        fs.readdir(this.targetFolder, (err, file) => {
            if (err) {
                logger.err(err);
                return;
            }
            file = this.sortFile(file);
            let index = 0;
            for (let i = 0; i < file.length; ++i) {
                if (fs.statSync(file[i]).isDirectory()) {
                    continue;
                }
                let newname = this.getNewPath({ old: file[i], index: index, max: file.length });
                index++;
                fs.rename(file[i], newname, (err) => {
                    if (err) {
                        logger.err(err);
                    }
                    else {
                        logger.wri(`将 ${path.basename(file[i])} 重命名为 ${path.basename(newname)}`);
                    }
                })
            }
        });
    }

    protected getIndex(index: number, max: number) {
        let returner = index.toString();
        while (returner.length < max.toString().length) {
            returner = '0' + returner;
        }
        return returner;
    }

    protected sortFile(file: string[]) {
        return file.sort((a, b) => {
            return fs.statSync(a).size - fs.statSync(b).size;
        });
    }

    protected getNewPath(arg: {
        old: string,
        index: number,
        max: number
    }) {
        return arg.old.replace(/\/?[^\/]+\/?$/, `${this.nameString}_${this.getIndex(arg.index, arg.max)}${path.extname(arg.old)}`);
    }

}