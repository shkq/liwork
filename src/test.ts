import * as Path from 'path'

import * as fsFunc from './lib/node/fsFunc'
import * as print from './lib/js/print'
// fsFunc.delDir(Path.join('./','test'),['a.js','C']);

fsFunc.delPath(Path.join('./','test'),['c.js'])
.then(()=>{
  print.log('delDir workdown');
});

// function prio() {
//   return new Promise((res,rej)=>{
//     setTimeout(()=>{
//       res(1);
//     },1);
//   })
// }

// function prio2() {
//   return new Promise((res,rej)=>{
//     prio().then(val=>{
//       res(val);
//     });
//   })
// }

// prio().then(val=>{
//   print.log(val);
// });

