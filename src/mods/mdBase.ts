import { CommandLike } from "../lib/node/commandGetter";

export {
  MdBase
}

abstract class MdBase {
  constructor(
    command: CommandLike
  ) {
    this.command = command;
  }

  protected command: CommandLike = null

  public abstract async run()
}