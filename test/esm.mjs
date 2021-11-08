import { assert } from "chai";
import { describe, it } from "mocha";
import { fqdn } from "../dist/index.js";

describe("ESM Module compatability", () => {
  it("should be able to use imports", () => {
    assert.isTrue(fqdn.test("google.com"));
  });
});
