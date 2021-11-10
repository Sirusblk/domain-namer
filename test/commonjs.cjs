const assert = require("chai").assert;
const describe = require("mocha").describe;
const it = require("mocha").it;
const DomainPatterns = require("../dist/index").DomainPatterns;

describe("CommonJS Module compatability", () => {
  it("should be able to use require", () => {
    assert.isTrue(DomainPatterns.topLevelDomain.test("com"));
  });
});
