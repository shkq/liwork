import * as fs from 'fs'
import * as Path from 'path'
import elucidator from './elucidator'
import { exec } from 'child_process'
import { isRegExp } from './strFunc';

const elu = new elucidator('fsFunc');
elu.showlog = false;

/** 复制路径结构 */
export function copyDirPath(originalPath: string, targetPath: string) {
  return new Promise((res, rej) => {
    originalPath = Path.normalize(originalPath);
    targetPath = Path.normalize(targetPath);
    fs.readdir(originalPath, (err, file) => {
      if (err) {
        elu.err(err);
        res();
        return;
      }
      const next = function () {
        if (file.length === 0) {
          res();
          return;
        }
        let finishCount = 0;
        let fileCount = file.length;
        const finishThenCheck = function () {
          finishCount++;
          if (finishCount === fileCount) {
            res();
            return;
          }
        }
        file.forEach(element => {
          let childPath = Path.join(originalPath, element);
          fs.stat(childPath, (err, stat) => {
            if (err) {
              elu.err(err);
              finishThenCheck();
              return;
            }
            if (stat.isDirectory()) {
              let toChildPath = Path.join(targetPath, element);
              copyDirPath(childPath, toChildPath).then(() => {
                finishThenCheck();
              });
            }
            else {
              finishThenCheck();
            }
          });
        });
      }
      fs.access(targetPath, err => {
        if (err) {
          fs.mkdir(targetPath, err => {
            if (err) {
              res();
              return;
            }
            elu.log(`create dir ${targetPath}`);
            next();
          });
        }
        next();
      });
    });
  });
}

// 复制文件
// 需要保证复制路径下目录结构相同,如果不能确定,先使用`copyDirPath`
export function copyFilePath(originalPath: string, targetPath: string, extra: string[] = []) {
  return new Promise((res, rej) => {
    originalPath = Path.normalize(originalPath);
    targetPath = Path.normalize(targetPath);
    fs.readdir(originalPath, (err, file) => {
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
      const finishThenCheck = function () {
        finishCount++;
        if (finishCount === fileCount) {
          res();
          return;
        }
      }
      file.forEach(element => {
        if (checkInextra(element, extra)) {
          elu.log(`${element} is in extra , back`);
          finishThenCheck();
          return;
        }
        let childPath = Path.join(originalPath, element);
        let toChildPath = Path.join(targetPath, element);
        fs.stat(childPath, (err, stat) => {
          if (err) {
            elu.err(err);
            finishThenCheck();
            return;
          }
          if (stat.isDirectory()) {
            copyFilePath(childPath, toChildPath, extra).then(() => {
              finishThenCheck();
            });
          }
          else {
            fs.copyFile(childPath, toChildPath, err => {
              if (err) {
                elu.log(err);
              }
              else {
                elu.log(`copy file ${toChildPath}`);
              }
              finishThenCheck();
            });
          }
        });
      });
    });
  });
}

// 删除文件夹文件,可以设置额外列表
export function delFilePath(path: string, extra: string[] = []) {
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
      const finishThenCheck = function () {
        finishCount++;
        if (finishCount === fileCount) {
          res();
          return;
        }
      }
      file.forEach(element => {
        // elu.log(`deal ${element}`)
        if (checkInextra(element, extra)) {
          elu.log(`${element} is in extra , back`);
          finishThenCheck();
          return;
        }
        else {
          let childPath = Path.join(path, element);
          fs.stat(childPath, (err, stat) => {
            if (err) {
              elu.err(err);
              finishThenCheck();
              return;
            }
            if (stat.isDirectory()) {
              delFilePath(childPath, extra).then(() => {
                finishThenCheck();
              });
            }
            else {
              fs.unlink(childPath, err => {
                if (err) {
                  elu.err(err);
                  finishThenCheck();
                  return;
                }
                elu.log(`delete ${childPath}`);
                finishThenCheck();
              });
            }
          });
        }
      });
    });
  });
}

// 删除路径下所有的空文件夹,如果本身为空,那会连自己都删除
export function delEmptyDirPath(path: string) {
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
        const finishThenCheck = function (isDeleted: boolean) {
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
        file.forEach(element => {
          let childPath = Path.join(path, element);
          fs.stat(childPath, (err, stat) => {
            if (err) {
              elu.err(err);
              finishThenCheck(false);
              return;
            }
            if (stat.isDirectory()) {
              delEmptyDirPath(childPath).then(isDeleted => {
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

// 支持正则表达式
export function checkInextra(filename: string, extra: string[]) {
  let isExtra = false;
  extra.forEach(extraEle => {
    // if (filename === extraEle) {
    //   isExtra = true;
    // }
    // else {
    //   if (isRegExp(extraEle) && new RegExp(extraEle).test(filename)) {
    //     isExtra = true;
    //   }
    // }
    if (new RegExp(extraEle).test(filename)) {
      isExtra = true;
    }
  });
  return isExtra;
}

// 删除路径下所有除额外列表内的文件,并删除所有空文件夹
export async function delPath(path: string, extra: string[] = []) {
  try {
    await delFilePath(path, extra);
    await delEmptyDirPath(path);
  }
  catch (err) {
    elu.err(err);
  }
}

// 复制路径下所有除额外列表内的文件至目标文件夹
export async function copyPath(originalPath: string, targetPath: string, extra: string[] = []) {
  try {
    await copyDirPath(originalPath, targetPath);
    await copyFilePath(originalPath, targetPath, extra);
  }
  catch (err) {
    elu.err(err);
  }
}

// 删除旧文件,并复制新文件到文件夹
export async function delThenCopyPath(originalPath: string, targetPath: string, extra: string[] = []) {
  try {
    await delPath(targetPath, extra);
    await copyPath(originalPath, targetPath, extra);
  }
  catch (err) {
    elu.err(err);
  }
}