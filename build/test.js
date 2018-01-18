"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const fsFunc = require("./lib/node/fsFunc");
const print = require("./lib/js/print");
// fsFunc.delDir(Path.join('./','test'),['a.js','C']);
fsFunc.delPath(Path.join('./', 'test'), ['c.js'])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBRTVCLDRDQUEyQztBQUMzQyx3Q0FBdUM7QUFDdkMsc0RBQXNEO0FBRXRELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5QyxJQUFJLENBQUMsR0FBRSxFQUFFO0lBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsb0JBQW9CO0FBQ3BCLG9DQUFvQztBQUNwQyx1QkFBdUI7QUFDdkIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixPQUFPO0FBQ1AsSUFBSTtBQUVKLHFCQUFxQjtBQUNyQixvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLGtCQUFrQjtBQUNsQixVQUFVO0FBQ1YsT0FBTztBQUNQLElBQUk7QUFFSixxQkFBcUI7QUFDckIsb0JBQW9CO0FBQ3BCLE1BQU0ifQ==