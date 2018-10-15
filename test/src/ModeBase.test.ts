import * as assert from "assert";
import ModeBase from "../../src/lib/ModeBase";
import { CommandLike, CommandGetter } from "../../src/lib/CMDGetter";

describe("ModeBase: ", function () {

    class Test extends ModeBase {
        constructor(commands: CommandLike[]) {
            super(commands);
        }

        public testArr: string[] = [];

        a() {
            this.testArr.push("a");
        }

        a_a() {
            this.testArr.push("a_a");
        }

        a_a_a() {
            this.testArr.push("a_a_a");
        }

        b() {
            this.testArr.push("b");
        }

        b_b() {
            this.testArr.push("b_b");
        }
    }

    let testCommand0 = ["test", "-a", "--a", "---a", "-b", "--b"];
    let trueAnswer0 = ["a_a_a", "a_a", "a", "b_b", "b"];

    it(trueAnswer0.toString(), async function () {
        let test = new Test(new CommandGetter(testCommand0).getSub());
        await test.run();
        assert.deepEqual(test.testArr, trueAnswer0);
    })
})