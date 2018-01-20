"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const mdBase_1 = require("../mdBase");
const elucidator_1 = require("../../lib/js/elucidator");
const fsFunc = require("../../lib/node/fsFunc");
const elu = new elucidator_1.default("mdSynchronous");
class mdSynchronous extends mdBase_1.default {
    constructor(center) {
        super(center, 'syn', Path.join('./', 'data', 'syndata.data'));
        this.data = null;
        this.originalPath = '';
        this.targetPath = '';
        this.extra = [];
        this.refrushTime = 1000 * 60 * 15;
        this.workList = [];
    }
    init() {
        super.init();
        this.center.on(this.getSfEvents('start'), (args) => {
            this.startWork();
        });
        this.center.on(this.getSfEvents('close'), (args) => {
            this.closeWork(args[0]);
        });
        this.center.on(this.getSfEvents('save'), (args) => {
            this.setSavePath(args[0]);
        });
        this.center.on(this.getSfEvents('work'), (args) => {
            this.setWorkPath(args[0]);
        });
        this.center.on(this.getSfEvents('extra'), (args) => {
            this.setExtra(args[0]);
        });
        this.center.on(this.getSfEvents('list'), (args) => {
            this.showList();
        });
        this.center.on(this.getSfEvents('json'), (args) => {
            this.loadIni(args[0]);
        });
    }
    destroy() {
        super.destroy();
        this.closeAll();
    }
    onFocus() {
        super.onFocus();
    }
    onUnFocus() {
        super.onUnFocus();
    }
    setSavePath(path) {
        this.originalPath = Path.normalize(this.getVariable(path));
    }
    setWorkPath(path) {
        this.targetPath = Path.normalize(this.getVariable(path));
    }
    setExtra(extra) {
        this.extra.push(this.getVariable(extra));
    }
    startWork() {
        if (this.originalPath === '') {
            elu.wri("未设置保存路径");
            return;
        }
        if (this.targetPath === '') {
            elu.wri("未设置工作路径");
            return;
        }
        if (this.checkWorkRepeat()) {
            elu.wri(`已有进行中的工作 从 \`${this.originalPath}\` 同步至 \`${this.targetPath}\``);
            return;
        }
        let originalPath = this.originalPath;
        let targetPath = this.targetPath;
        let extra = this.extra;
        fsFunc.delThenCopyPath(targetPath, originalPath, extra).then(() => {
            elu.wri(`已将 \`${targetPath}\` 同步至 \`${originalPath}\``);
            let timerIdentifier = setInterval(() => {
                fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
                    elu.wri(`已将 \`${originalPath}\` 同步至 \`${targetPath}\``);
                });
            }, this.refrushTime);
            elu.wri(`开启服务从 \`${originalPath}\` 同步至 \`${targetPath}\``);
            elu.wri(`额外列表: \`${extra}\``);
            elu.wri(`刷新时间: \`${this.refrushTime}\``);
            this.workList.push({
                originalPath: originalPath,
                targetPath: targetPath,
                extra: extra,
                timerIdentifier: timerIdentifier
            });
            this.originalPath = '';
            this.targetPath = '';
            this.extra = [];
        });
    }
    showList() {
        this.workList.forEach((ele, index) => {
            elu.wri(`服务 \`${index}\` 从 \`${ele.originalPath}\` 同步至 \`${ele.targetPath}\``);
        });
    }
    closeWork(identifier) {
        let identifierNum = parseInt(identifier);
        if (typeof this.workList[identifierNum] === "undefined") {
            elu.wri("无效的列表标示");
            return;
        }
        clearInterval(this.workList[identifierNum].timerIdentifier);
        fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath, this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
        this.workList.splice(identifierNum, 1);
        elu.wri(`已关闭服务 \`${identifier}\``);
    }
    closeAll() {
        this.workList.forEach((ele, ind) => {
            let identifierNum = ind;
            clearInterval(this.workList[identifierNum].timerIdentifier);
            fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath, this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
            elu.wri(`已关闭服务 \`${identifierNum}\``);
        });
        this.workList = [];
    }
    loadIni(path) {
        try {
            path = Path.normalize(this.getVariable(path));
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    elu.err(err);
                    return;
                }
                let ini = JSON.parse(data);
                for (let i = 0; i < ini.list.length; i++) {
                    let ele = ini.list[i];
                    this.originalPath = ele.originalPath;
                    this.targetPath = ele.targetPath;
                    this.extra = ele.extra;
                    this.startWork();
                }
            });
        }
        catch (err) {
            elu.err(err);
            elu.err("读取配置出错,请检查配置文件格式是否正确");
        }
    }
    checkWorkRepeat() {
        this.workList.forEach(ele => {
            if (ele.targetPath === this.targetPath && ele.originalPath === this.originalPath) {
                return true;
            }
        });
        return false;
    }
}
exports.default = mdSynchronous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRTeW5jaHJvbm91cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RzL3N5bi9tZFN5bmNocm9ub3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXdCO0FBQ3hCLDZCQUE0QjtBQUU1QixzQ0FBOEI7QUFHOUIsd0RBQWdEO0FBQ2hELGdEQUErQztBQWEvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLG9CQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFNUMsbUJBQW1DLFNBQVEsZ0JBQU07SUFDL0MsWUFBWSxNQUFxQjtRQUMvQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUd0RCxTQUFJLEdBQVMsSUFBSSxDQUFBO1FBQ25CLGlCQUFZLEdBQVcsRUFBRSxDQUFBO1FBQ3pCLGVBQVUsR0FBVyxFQUFFLENBQUE7UUFDdkIsVUFBSyxHQUFhLEVBQUUsQ0FBQTtRQUNYLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDckMsYUFBUSxHQUFtQixFQUFFLENBQUE7SUFQckMsQ0FBQztJQVNTLElBQUk7UUFDWixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBYyxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQWMsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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