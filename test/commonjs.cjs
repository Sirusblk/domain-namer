const assert = require("chai").assert;
const describe = require("mocha").describe;
const it = require("mocha").it;
const topLevelDomain = require("../dist/index").topLevelDomain;

describe("CommonJS Module compatability", () => {
  it("should be able to use require", () => {
    assert.isTrue(topLevelDomain.test("com"));
  });
});
