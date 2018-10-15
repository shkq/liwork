import * as assert from "assert";
import { CommandGetter } from "../../src/lib/CMDGetter";
import { json } from "../../node_modules/@types/express";

describe("CMDGetter: ", function () {
    let argv0 = ["img", "-ccc", "--dev"];
    let commandGetter0 = new CommandGetter(argv0);
    describe(argv0.toString(), function () {
        it("img", function () {
            let main = commandGetter0.getMain();
            assert.equal(main, "img", main);
        });
        it("ccc", function () {
            let cmd = commandGetter0.getSub();
            assert.equal(cmd[0].name, "ccc", cmd[0].name);
        })
        it("dev", function () {
            let cmd = commandGetter0.getSub();
            assert.equal(cmd[0].child[0].name, "dev", cmd[0].child[0].name);
        })
    })

    let argv1 = ["test", "-a", "--a", "---a", "-b", "--b"];
    let commandGetter1 = new CommandGetter(argv1);
    let rightAnswer1 = [{
        name: "a",
        level: 1,
        argv: [],
        child: [{
            name: "a",
            level: 2,
            argv: [],
            child: [{
                name: "a",
                level: 3,
                argv: [],
                child: []
            }]
        }]
    }, {
        name: "b",
        level: 1,
        argv: [],
        child: [{
            name: "b",
            level: 2,
            argv: [],
            child: []
        }]
    }];
    it(JSON.stringify(rightAnswer1), function () {
        assert.deepStrictEqual(commandGetter1.getSub(), rightAnswer1, JSON.stringify(commandGetter1.getSub()));
    })
})