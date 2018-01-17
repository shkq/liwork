export default class elucidator {
  constructor(mdname: string) {
    this.mdname = mdname;
  }
  private mdname: string = ''

  log(any) {
    console.log(`${this.mdname}: ${any}`);
  }

  err(err) {
    console.error('**********ERROR**********');
    console.error(`${this.mdname}: ${err}`);
    console.error('*************************');
  }
}