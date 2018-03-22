export {
  getArrCopy
}

function getArrCopy<T>(prototype: T[]) {
  let copy:T[] = [];
  for (let i = 0; i < prototype.length; i++) {
    copy.push(prototype[i]);
  }
  return copy;
}