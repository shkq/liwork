import * as fs from 'fs'
import * as Path from 'path'
import * as print from './print'
import elucidator from './elucidator'

const elu = new elucidator('fsFunc');

// 同步查看路径是否正确,如果有路径不存在则创建
export function mkdir(dirpath: string) {
    let dirname = Path.dirname(dirpath)
    if (fs.existsSync(dirname)) {
        return;
    }
    else {

    }
}

// 删除文件夹文件,可以设置额外列表
export function delDir(path: string, extra: string[] = []) {
    return new Promise((res, rej) => {
        path = Path.normalize(path);
        fs.readdir(path, (err, file) => {
            if (err) {
                elu.err(err);
                return;
            }
            file.forEach((element, index) => {
                elu.log(`deal ${element}`)
                let isExtra = false;
                extra.forEach(extraEle => {
                    if (element === extraEle) {
                        isExtra = true;
                    }
                });
                if (isExtra) {
                    elu.log(`${element} is in extra , back`);
                    return;
                }
                else {
                    let indexpath = Path.join(path, element);
                    fs.stat(indexpath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            return;
                        }
                        if (stat.isDirectory()) {
                            delDir(indexpath, extra);
                        }
                        else {
                            fs.unlink(indexpath, err => {
                                if (err) {
                                    elu.err(err);
                                    return;
                                }
                                elu.log(`delete ${indexpath}`);
                            });
                        }
                    });
                }
            });
        });
    });
}

// 清除所有空文件夹
export function delEmptyDirectory(path: string, fatherPath: string[] = []) {
    return new Promise((res, rej) => {
        path = Path.normalize(path);
        fs.readdir(path, (err, file) => {
            if (err) {
                elu.err(err);
                return;
            }
            if (file.length === 0) {
                fs.rmdir(path, err => {
                    if (err) {
                        elu.err(err);
                        return;
                    }
                    elu.log(`remove empty dir ${path}`);
                    if (fatherPath.length) {
                        delEmptyDirectory(fatherPath.pop(), fatherPath).then(res);
                    }
                    else {
                        res();
                        return;
                    }
                });
            }
            else {
                file.forEach((element, index) => {
                    let indexpath = Path.join(path, element);
                    let finishCount = 0;
                    fs.stat(indexpath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            return;
                        }
                        if (stat.isDirectory()) {
                            fatherPath.push(path);
                            delEmptyDirectory(indexpath, fatherPath).then(()=>{
                                finishCount++;
                            });
                        }
                        else {
                            finishCount++;
                        }
                        if (finishCount === file.length - 1) {
                            res();
                        }
                    });
                });
            }
        });
    });
}