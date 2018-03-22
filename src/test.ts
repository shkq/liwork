import * as Path from 'path'

import * as fsFunc from './lib/node/fsFunc'
import * as print from './lib/js/print'

// fsFunc.delDir(Path.join('./','test'),['a.js','C']);

// fsFunc.delPath(Path.join('./','test'),['c.js'])
// .then(()=>{
//   print.log('delDir workdown');
// });

// fsFunc.copyDirPath(Path.join('./','from'),Path.join('./','to')).then(()=>{
//   print.log("workdown");
// });

// fsFunc.copyFilePath(Path.join('./','from'),Path.join('./','to')).then(()=>{
//   print.log("workdown");
// });

fsFunc.delThenCopyPath(Path.join('../', 'build'), Path.join('../', 'test', 'build')).then(() => {
  print.log("workdown");
});