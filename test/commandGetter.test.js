let assert = require("assert");
let commandGetter = require("../build/lib/node/commandGetter").CommandGetter;

describe("test commandGetter", function () {
  let returner = commandGetter.get([null, null, "-init", "--dev", "-g"]);
  it("should return right main", function () {
    assert.equal(returner.main, "-init", "main wrong");
  })
  it("should return right subsidiary length", function () {
    assert.equal(returner.subsidiary.length, 1, `subsidiary length should be 1 , but be ${returner.subsidiary.length}`);
  })
  it("should return right subsidiary", function () {
    assert.equal(returner.subsidiary[0], "--dev", `subsidiary length should be --dev , but be ${returner.subsidiary[0]}`);
  })
  it("should return right global length", function () {
    assert.equal(returner.global.length, 1, `global length should be 1 , but be ${returner.global.length}`);
  })
  it("should return right global", function () {
    assert.equal(returner.global[0], "-g", `global length should be --dev , but be ${returner.global[0]}`);
  })
})

describe("test commandLike", function () {
  let returner = commandGetter.get([null, null, "-init", "--dev=abc", "-g=efg"]);
  it("should return subsidiary argv", function () {
    assert.equal(returner.getSub("--dev").argv, "abc", `should be abc but be ${returner.getSub().argv}`);
  })
  it("should return global argv", function () {
    assert.equal(returner.getGlo("-g").argv, "efg", `should be efg but be ${returner.getGlo().argv}`);
  })
})