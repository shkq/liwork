declare module liwork {
  interface dataBase {
    vars: dataBaseVars
  }
  interface dataBaseVars {
    [arg:string]: string
  }
}
export default liwork;