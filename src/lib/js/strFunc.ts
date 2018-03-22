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

// 是否是一个独立的单词
export function isOnlyWord(str: string, start: number, longth: number) {
    if (start > 0 && str[start - 1] !== ' ') return false;
    else if (str[start + longth] !== ' ') return false;
    return true;
}

// 移除单行注释
export function removeAnnotation(str: string) {
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

// 两边及移除多余空格或退格(只保留1个空格)
export function removeBlank(str: string) { 
    str.trim();
    while(true) {
        let posi = str.search(/\s\s/);
        if (posi === -1) break;
        else {
            str = str.replace(/\s\s/," ");;
        }
        posi = str.search(/\t/);
        if (posi === -1) break;
        else {
            str = str.replace(/\t/," ");
        }
    }
    return str;
}

// 如果字符串已$开头,则返回后面的子串,否则返回false
export function isVariable(str: string) {
    if (str[0] === '$') {
        return str.slice(1);
    }
    else {
        return false;
    }
}