import * as fs from 'fs'
import * as Path from 'path'
import * as print from './print'

// 同步查看路径是否正确,如果有路径不存在则创建
export function mkdir(dirpath: string) {
    let dirname = Path.dirname(dirpath)
    if (fs.existsSync(dirname)) {
        return;
    }
    else {

    }
}

// 删除整个文件夹
export function delDir(path: string, extra: string[] = []) {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
        if (err) {
            print.err(err);
            return;
        }
        file.forEach((element, index) => {
            let indexpath = Path.join(path, element);
            fs.stat(indexpath, (err, stat) => {
                if (err) {
                    print.err(err);
                    return;
                }
                if (stat.isDirectory()) {
                    delDir(indexpath);
                }
                else {
                    let isExtra = false;
                    extra.forEach(extraEle => {
                        if (extraEle === element) {
                            isExtra = true;
                        }
                    });
                    if (isExtra) {
                        return;
                    }
                    else {
                        fs.unlink(indexpath, err => {
                            if (err) {
                                print.err(err);
                                return;
                            }
                        });
                    }
                }
            });
        });
    })
}