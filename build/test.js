"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const fsFunc = require("./lib/fsFunc");
const print = require("./lib/print");
// fsFunc.delDir(Path.join('./','test'),['a.js','C']);
fsFunc.deletePath(Path.join('./', 'test'))
    .then(() => {
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
//# sourceMappingURL=test.js.map