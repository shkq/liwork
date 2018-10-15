import * as assert from "assert";
import { CommandGetter } from "../../src/lib/CMDGetter";

describe("CMDGetter: ", function () {
    let argv = ["img", "-ccc", "--dev"];
    let commandGetter = new CommandGetter(argv);
    describe(argv.toString(), function () {
        it("img", function () {
            let main = commandGetter.getMain();
            assert.equal(main, "img", main);
        });
        it("ccc", function () {
            let cmd = commandGetter.getSub();
            assert.equal(cmd[0].name, "ccc", cmd[0].name);
        })
        it("dev", function () {
            let cmd = commandGetter.getSub();
            assert.equal(cmd[0].child[0].name, "dev", cmd[0].child[0].name);
        })
    })
})