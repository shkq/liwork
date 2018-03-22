import { CommandLike } from "../lib/node/commandGetter";

export {
  MdBase
}

abstract class MdBase {
  constructor() {

  }

  readonly mainName: string = null

  abstract run(command: CommandLike)
}