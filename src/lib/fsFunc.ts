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
export function delFile(path: string, extra: string[] = []) {
  return new Promise((res, rej) => {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
      if (err) {
        elu.err(err);
        res();
        return;
      }
      if (file.length === 0) {
        res();
        return;
      }
      let finishCount = 0;
      let fileCount = file.length;
      const finshThenCheck= function() {
        finishCount++;
        if (finishCount === fileCount) {
          res();
          return;
        }
      }
      file.forEach((element, index) => {
        // elu.log(`deal ${element}`)
        let isExtra = false;
        extra.forEach(extraEle => {
          if (element === extraEle) {
            isExtra = true;
          }
        });
        if (isExtra) {
          elu.log(`${element} is in extra , back`);
          finshThenCheck();
          return;
        }
        else {
          let childPath = Path.join(path, element);
          fs.stat(childPath, (err, stat) => {
            if (err) {
              elu.err(err);
              finshThenCheck();
              return;
            }
            if (stat.isDirectory()) {
              delFile(childPath, extra).then(()=>{
                finshThenCheck();
              });
            }
            else {
              fs.unlink(childPath, err => {
                if (err) {
                  elu.err(err);
                  finshThenCheck();
                  return;
                }
                elu.log(`delete ${childPath}`);
                finshThenCheck();
              });
            }
          });
        }
      });
    });
  });
}

// 删除路径下所有的空文件夹,如果本身为空,那会连自己都删除
export function delEmptyDirectory(path: string) {
  return new Promise<boolean>((res, rej) => {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
      if (err) {
        elu.err(err);
        res(false);
        return;
      }
      if (file.length === 0) {
        fs.rmdir(path, err => {
          if (err) {
            elu.err(err);
            res(false);
            return;
          }
          elu.log(`remove empty dir ${path}`);
          res(true);
        });
      }
      else {
        let fileCount = file.length;
        let finishCount = 0;
        const finishThenCheck = function(isDeleted: boolean) {
          if (isDeleted) {
            fileCount--;
          }
          else {
            finishCount++;
          }
          if (fileCount === 0) {
            fs.rmdir(path, err => {
              if (err) {
                elu.err(err);
                res(false);
                return;
              }
              elu.log(`remove empty dir ${path}`);
              res(true);
            });
          }
          else if (finishCount === fileCount) {
            res(false);
          }
        }
        file.forEach((element, index) => {
          let childPath = Path.join(path, element);
          fs.stat(childPath, (err, stat) => {
            if (err) {
              elu.err(err);
              finishThenCheck(false);
              return;
            }
            if (stat.isDirectory()) {
              delEmptyDirectory(childPath).then(isDeleted => {
                finishThenCheck(isDeleted);
              });
            }
            else {
              finishThenCheck(false);
            }
          });
        });
      }
    });
  });
}

// 删除路径下所有除额外列表内的文件,并删除所有空文件夹
export async function deletePath(path: string, extra: string[] = []) {
  await delFile(path,extra);
  await delEmptyDirectory(path);
}