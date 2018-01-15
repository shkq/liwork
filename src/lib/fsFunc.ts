import * as fs from 'fs'
import * as Path from 'path'

// 同步查看路径是否正确,如果有路径不存在则创建
export function mkdir(dirpath: string) {
    let dirname = Path.dirname(dirpath)
    if (fs.existsSync(dirname)) {
        return;
    }
    else {

    }
}