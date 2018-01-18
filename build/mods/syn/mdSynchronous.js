"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const mdBase_1 = require("../mdBase");
const strFunc = require("../../lib/js/strFunc");
const elucidator_1 = require("../../lib/js/elucidator");
const elu = new elucidator_1.default("mdSynchronous");
class mdSynchronous extends mdBase_1.default {
    constructor(center) {
        super(center, 'syn', Path.join('./', 'data', 'syndata.data'));
        this.data = {
            path: {}
        };
        this.savePath = '';
        this.workPath = '';
        this.extra = [];
        this.refrushTime = 1000 * 60 * 15;
        this.workIndex = null;
        this.center.on(this.getSfEvents('start'), (args) => {
            this.startWork();
        });
        this.center.on(this.getSfEvents('end'), (args) => {
            this.endWork();
        });
        this.center.on(this.getSfEvents('save'), (args) => {
            this.setSavePath(args[0]);
        });
        this.center.on(this.getSfEvents('work'), (args) => {
            this.setWorkPath(args[0]);
        });
        this.center.on(this.getSfEvents('set'), (args) => {
            this.setConstPath(args[0], args[1]);
        });
    }
    init() {
        super.init();
    }
    destroy() {
        super.destroy();
        if (this.working) {
            this.endWork();
        }
    }
    onFocus() {
        super.onFocus();
    }
    onUnFocus() {
        super.onUnFocus();
    }
    setSavePath(path) {
        if (this.working) {
            elu.wri("正在工作中,切换路径请先关闭服务");
            return;
        }
        let variable = strFunc.isVariable(path);
        if (variable && typeof this.data[variable] !== 'undefined') {
            this.savePath = this.data[variable];
        }
        else {
            this.savePath = Path.normalize(path);
        }
    }
    setWorkPath(path) {
        if (this.working) {
            elu.wri("正在工作中,切换路径请先关闭服务");
            return;
        }
        let variable = strFunc.isVariable(path);
        if (variable && typeof this.data[variable] !== 'undefined') {
            this.workPath = this.data[variable];
        }
        else {
            this.workPath = Path.normalize(path);
        }
    }
    setExtra(extra) {
        if (this.working) {
            elu.wri("正在工作中,添加额外路径请先关闭服务");
            return;
        }
        this.extra.push(extra);
    }
    setConstPath(pathName, path) {
        this.data.path[pathName] = Path.posix.normalize(path);
    }
    startWork() {
        if (this.working) {
            elu.wri("已经正在工作了");
            return;
        }
        if (this.savePath === '') {
            elu.wri("未设置保存路径");
            return;
        }
        if (this.workPath === '') {
            elu.wri("未设置工作路径");
            return;
        }
        this.workIndex = setInterval(() => {
            this.work();
        }, this.refrushTime);
    }
    endWork() {
        if (!this.working) {
            elu.wri("并没有在工作中");
            return;
        }
        clearInterval(this.workIndex);
        this.workIndex = null;
        this.work();
    }
    loadIni(path) {
        try {
            if (this.working) {
                elu.wri("正在工作中,读取配置请先关闭服务");
                return;
            }
            path = Path.normalize(path);
            fs.readFile(this.dataPath, 'utf8', (err, data) => {
                if (err) {
                    elu.err(err);
                    return;
                }
                let ini = JSON.parse(data);
                this.savePath = ini.savePath;
                this.workPath = ini.savePath;
                this.extra = ini.savePath;
            });
        }
        catch (err) {
            elu.err(err);
            elu.err("读取配置出错,请检查配置文件格式是否正确");
        }
    }
    work() {
    }
}
exports.default = mdSynchronous;
//# sourceMappingURL=mdSynchronous.js.map