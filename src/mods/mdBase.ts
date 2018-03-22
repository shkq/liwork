import { CommandLike } from "../lib/node/commandGetter";

export {
  MdBase
}

abstract class MdBase {
  constructor(

  ) {

  }

  abstract run(command: CommandLike)
}