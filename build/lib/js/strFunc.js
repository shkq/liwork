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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyRnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvanMvc3RyRnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFFSCxhQUFhO0FBQ2Isb0JBQTJCLEdBQVcsRUFBRSxLQUFhLEVBQUUsTUFBYztJQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN0RCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUpELGdDQUlDO0FBRUQsU0FBUztBQUNULDBCQUFpQyxHQUFXO0lBQ3hDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNWLENBQUM7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQWhCRCw0Q0FnQkM7QUFFRCx3QkFBd0I7QUFDeEIscUJBQTRCLEdBQVc7SUFDbkMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1gsT0FBTSxJQUFJLEVBQUUsQ0FBQztRQUNULElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDO1lBQ0YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUEsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDO1lBQ0YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFmRCxrQ0FlQztBQUVELCtCQUErQjtBQUMvQixvQkFBMkIsR0FBVztJQUNsQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7QUFDTCxDQUFDO0FBUEQsZ0NBT0MifQ==