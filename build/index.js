"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const processCenter_1 = require("./processCenter");
const processInteraction_1 = require("./processInteraction");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBd0I7QUFDeEIsNkJBQTRCO0FBRTVCLG1EQUEyQztBQUMzQyw2REFBcUQ7QUFDckQsNERBQTRDO0FBQzVDLFdBQVc7QUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUVELFVBQVU7QUFDVixNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFhLEVBQUUsQ0FBQztBQUNuQyxTQUFTO0FBQ1QsTUFBTSxHQUFHLEdBQUcsSUFBSSx1QkFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLFNBQVM7QUFDVCxNQUFNLFdBQVcsR0FBRyxJQUFJLDRCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDIn0=