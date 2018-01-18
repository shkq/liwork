"use strict";
/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 *
 * UseTo:
 * Author: lijj
 * Participants:
 * CreateTime: 171211
 * LastAlter: 171211
 * Remark:
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 是否是一个独立的单词
function isOnlyWord(str, start, longth) {
    if (start > 0 && str[start - 1] !== ' ')
        return false;
    else if (str[start + longth] !== ' ')
        return false;
    return true;
}
exports.isOnlyWord = isOnlyWord;
// 移除单行注释
function removeAnnotation(str) {
    let annotation = '';
    let answer = str;
    let posi = str.search(/\/\//);
    if (posi !== -1) {
        let endPosi = posi;
        while (endPosi < str.length) {
            if (str.charAt(endPosi) === '\n') {
                break;
            }
            endPosi++;
        }
        answer = str.substring(0, posi);
        annotation = str.substring(posi, endPosi);
    }
    return [answer, annotation];
}
exports.removeAnnotation = removeAnnotation;
// 两边及移除多余空格或退格(只保留1个空格)
function removeBlank(str) {
    str.trim();
    while (true) {
        let posi = str.search(/\s\s/);
        if (posi === -1)
            break;
        else {
            str = str.replace(/\s\s/, " ");
            ;
        }
        posi = str.search(/\t/);
        if (posi === -1)
            break;
        else {
            str = str.replace(/\t/, " ");
        }
    }
    return str;
}
exports.removeBlank = removeBlank;
// 如果字符串已$开头,则返回后面的子串,否则返回false
function isVariable(str) {
    if (str[0] === '$') {
        return str.slice(1);
    }
    else {
        return false;
    }
}
exports.isVariable = isVariable;
//# sourceMappingURL=strFunc.js.map