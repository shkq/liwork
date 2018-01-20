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
fsFunc.delThenCopyPath(Path.join('./', 'from'), Path.join('./', 'to')).then(() => {
    print.log("workdown");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBRTVCLDRDQUEyQztBQUMzQyx3Q0FBdUM7QUFFdkMsc0RBQXNEO0FBRXRELGtEQUFrRDtBQUNsRCxjQUFjO0FBQ2Qsa0NBQWtDO0FBQ2xDLE1BQU07QUFFTiw2RUFBNkU7QUFDN0UsMkJBQTJCO0FBQzNCLE1BQU07QUFFTiw4RUFBOEU7QUFDOUUsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUMvRSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDIn0=