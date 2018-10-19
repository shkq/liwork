export default class {
  static showlog = true;
  static showerr = true;
  static showwri = true;

  static log(any) {
    if (!this.showlog) return;
    console.log(`log: ${any}\n`);
  }

  static err(err) {
    if (!this.showerr) return;
    console.error(`
**********ERROR**********

${err}

*************************
    `);
  }

  static wri(any) {
    if (!this.showwri) return;
    console.log(`${any}`);
  }

  static thr(err) {
    throw `${err}`
  }
}