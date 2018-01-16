"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const fsFunc = require("./lib/fsFunc");
fsFunc.delDir(Path.join('./', 'test'), ['a.js', 'C']);
//# sourceMappingURL=test.js.map