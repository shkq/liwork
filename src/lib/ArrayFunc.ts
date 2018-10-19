export {
  getArrCopy,
  checkArr
}

function getArrCopy<T>(prototype: T[]) {
  let copy: T[] = [];
  for (let i = 0; i < prototype.length; i++) {
    copy.push(prototype[i]);
  }
  return copy;
}

function checkArr<T>(arr: Array<T>) {
  if (typeof arr === "undefined" ||
    !(arr instanceof Array)) {
    return [];
  }
  else {
    return arr;
  }
}