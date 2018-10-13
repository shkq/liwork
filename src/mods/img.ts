/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows

 * UseTo: 
 * Author: lijj
 * Remark: 
 *  
 */

import * as fs from "fs"
import * as Path from "path"
import * as imagemin from "imagemin"
import * as imageminJpegtran from "imagemin-jpegtran"
import * as imageminPngquant from "imagemin-pngquant"
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');

import MdBase from "../lib/mdBase"
import { CommandLike } from "../lib/commandGetter"
import elucidator from "../lib/elucidator"

const logger = new elucidator("mdImagemin");
const mainName = "-img"
const subCCC = "--ccc"

export default class extends MdBase {

    static mainName = mainName

    constructor(command: CommandLike) {
        super(command);
    }

    public async run() {
        if (this.command.getSub(subCCC)) {
            await this.cccImageMain();
        }
        else {
            logger.wri("不支持的辅助命令");
        }
    }

    private async cccImageMain() {
        const workingPath = process.cwd();
        let togglePath = "";
        // 先看cocos主目录下
        togglePath = Path.join(workingPath, "build");
        if (!fs.existsSync(togglePath)) {
            togglePath = workingPath;
        }
        // 再看是否是在build目录下
        togglePath = Path.join(togglePath, "web-mobile");
        if (!fs.existsSync(togglePath)) {
            togglePath = workingPath;
        }
        // 再看是否是在包的文件夹内
        togglePath = Path.join(togglePath, "res", "raw-assets");
        if (!fs.existsSync(togglePath)) {
            console.log("不在Cocos工作目录下");
            return;
        }

        let paths = await this.searchFolder(togglePath);
        for (let i = 0; i < paths.length; ++i) {
            this.compress([Path.join(paths[i], "*.{jpg,png}")], paths[i]);
        }

        // await imagemin([Path.join(togglePath, "**", "*.{jpg,png}")], Path.join(togglePath, "build"), {
        //     plugins: [
        //         imageminJpegtran(),
        //         imageminPngquant({ quality: '65-80' })
        //     ]
        // });
        // imagemin(['images/*.{jpg,png}'], 'build/images', {
        // 	plugins: [
        // 		imageminJpegtran(),
        // 		imageminPngquant({quality: '65-80'})
        // 	]
        // }).then(files => {
        // 	console.log(files);
        // 	//=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
        // });
    }

    private async searchFolder(togglePath: string): Promise<string[]> {
        let paths: string[] = [];
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(togglePath, (err, file) => {
                if (err) {
                    reject(err);
                }
                if (file.length === 0) {
                    resolve(paths);
                }
                let searchs: Promise<string[]>[] = [];
                for (let i = 0; i < file.length; ++i) {
                    let path = Path.join(togglePath, file[i]);
                    if (fs.statSync(path).isDirectory()) {
                        paths.push(path);
                        searchs.push(this.searchFolder(path));
                    }
                }
                Promise.all(searchs)
                    .then((backPaths) => {
                        for (let i = 0; i < backPaths.length; ++i) {
                            paths = paths.concat(backPaths[i]);
                        }
                        resolve(paths);
                    });
            });
        });
    }

    private async compress(from: string[], to: string) {
        await imagemin(from, to, {
            plugins: [
                imageminJpegtran(),
                imageminPngquant({ quality: '65-80' })
            ]
        });
        logger.wri(`${to}  目录压缩结束`);
    }
}