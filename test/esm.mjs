import { assert } from "chai";
import { describe, it } from "mocha";
import { DomainPatterns } from "../dist/index.js";

describe("ESM Module compatability", () => {
  it("should be able to use imports", () => {
    assert.isTrue(DomainPatterns.fqdn.test("google.com"));
  });
});
