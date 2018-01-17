import * as Path from 'path'

import * as fsFunc from './lib/fsFunc'
import * as print from './lib/print'
// fsFunc.delDir(Path.join('./','test'),['a.js','C']);
fsFunc.delEmptyDirectory(Path.join('./','test'))
.then(()=>{
  print.log('delDir workdown');
});

// function prio() {
//   return new Promise((res,rej)=>{
//     setTimeout(res,1);
//   })
// }

// function prio2() {
//   return new Promise((res,rej)=>{
//     prio().then(res);
//   })
// }

// prio().then(()=>{
//   print.log('workdown');
// });

