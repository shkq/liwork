"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const processCenter_1 = require("./processCenter");
const processInteraction_1 = require("./processInteraction");
// mods
const mdSynchronous_1 = require("./mods/syn/mdSynchronous");
// 初始化日志文件夹
const dataPath = Path.join('./', 'data');
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}
// 初始化处理核心
const center = new processCenter_1.default();
// 注册处理模块
const syn = new mdSynchronous_1.default(center);
// 初始化交互器
const interaction = new processInteraction_1.default(center).load();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBd0I7QUFDeEIsNkJBQTRCO0FBRTVCLG1EQUEyQztBQUMzQyw2REFBcUQ7QUFDckQsT0FBTztBQUNQLDREQUE0QztBQUM1QyxXQUFXO0FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFDRCxVQUFVO0FBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBYSxFQUFFLENBQUM7QUFDbkMsU0FBUztBQUNULE1BQU0sR0FBRyxHQUFHLElBQUksdUJBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixTQUFTO0FBQ1QsTUFBTSxXQUFXLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyJ9