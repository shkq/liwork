"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const fsFunc = require("./lib/node/fsFunc");
const print = require("./lib/js/print");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBRTVCLDRDQUEyQztBQUMzQyx3Q0FBdUM7QUFFdkMsc0RBQXNEO0FBRXRELGtEQUFrRDtBQUNsRCxjQUFjO0FBQ2Qsa0NBQWtDO0FBQ2xDLE1BQU07QUFFTiw2RUFBNkU7QUFDN0UsMkJBQTJCO0FBQzNCLE1BQU07QUFFTiw4RUFBOEU7QUFDOUUsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDN0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyJ9