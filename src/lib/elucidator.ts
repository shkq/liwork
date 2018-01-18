export default class elucidator {
  constructor(mdname: string) {
    this.mdname = mdname;
  }
  private mdname: string = ''

  showlog = true
  log(any) {
    if (!this.showlog) return;
    console.log(`${this.mdname}: ${any}`);
  }

  showerr = true
  err(err) {
    if (!this.showerr) return;
    console.error('**********ERROR**********');
    console.error('');
    console.error(`${this.mdname}: ${err}`);
    console.error('');
    console.error('*************************');
  }
}