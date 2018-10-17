import * as fs from "fs";
import * as crypto from "crypto";

export function readFileMd5(url) {
    return new Promise((reslove) => {
        let md5sum = crypto.createHash('md5');
        let stream = fs.createReadStream(url);
        stream.on('data', function (chunk) {
            md5sum.update(chunk);
        });
        stream.on('end', function () {
            let fileMd5 = md5sum.digest('hex');
            reslove(fileMd5);
        })
    })
}