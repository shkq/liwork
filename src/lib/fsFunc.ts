import * as fs from 'fs'
import * as Path from 'path'
export function mkdir(dirpath: string) {
    let dirname = Path.dirname(dirpath)
    if (fs.existsSync(dirname)) {
        return;
    }
    else {
        
    }
}