import { CommandLike } from "./commandGetter";

export default abstract class {
  constructor(
    command: CommandLike
  ) {
    this.command = command;
  }

  protected command: CommandLike = null

  public abstract async run()
}