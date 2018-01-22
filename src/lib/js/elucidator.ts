export default class elucidator {
  static showlog = true;
  static showerr = true;
  static showwri = true;

  constructor(mdname: string) {
    this.mdname = mdname;
  }
  mdname: string = ''

  showlog = true
  log(any) {
    if (!this.showlog) return;
    if (!elucidator.showlog) return;
    console.log(`${this.mdname}: ${any}`);
  }

  showerr = true
  err(err) {
    if (!this.showerr) return;
    if (!elucidator.showerr) return;
    console.error('**********ERROR**********');
    console.error('');
    console.error(`${this.mdname}: ${err}`);
    console.error('');
    console.error('*************************');
  }

  showwri = true
  wri(any) {
    if (!this.showwri) return;
    if (!elucidator.showwri) return;
    console.log(`${this.mdname}: ${any}`);
  }
}