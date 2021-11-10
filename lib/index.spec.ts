import { assert } from "chai";
import { describe, it } from "mocha";
import RandExp from "randexp";

import {
  actualTopLevelDomains,
  fqdn,
  generateFqdn,
  generateHostname,
  generateTopLevelDomain,
  hostname,
  isActualTld,
  topLevelDomain,
} from "./index";

describe("Hostname RegEx", () => {
  it("should accept 1 character", () => {
    const goodHostname = new RandExp(/[a-zA-Z\d]{1}/).gen();
    assert.isTrue(hostname.test(goodHostname), goodHostname);
  });
  it("should accept 63 characters", () => {
    const goodHostname = new RandExp(
      /[a-zA-Z\d][a-zA-Z\d-]{61}[a-zA-Z\d]/
    ).gen();
    assert.isTrue(hostname.test(goodHostname), goodHostname);
  });
  it("should not accept 64 characters or more", () => {
    const badHostname = new RandExp(
      /[a-zA-Z\d][a-zA-Z\d-]{62}[a-zA-Z\d]/
    ).gen();
    assert.isNotTrue(hostname.test(badHostname), badHostname);
  });
});

describe("Top Level Domain RegEx", () => {
  it("should accept 2 alphabetic characters", () => {
    const tld = new RandExp(/[a-zA-Z]{2}/).gen();
    assert.isTrue(topLevelDomain.test(tld), tld);
  });
  it("should accept 63 alphabetic characters", () => {
    const tld = new RandExp(/[a-zA-Z]{63}/).gen();
    assert.isTrue(topLevelDomain.test(tld), tld);
  });
  it("should accept dashes", () => {
    const tld = new RandExp(/[a-zA-Z][-]{1,61}[a-zA-Z]/).gen();
    assert.isTrue(topLevelDomain.test(tld), tld);
  });
  it("should accept all known IANNA TLDs", () => {
    actualTopLevelDomains.forEach((tld) => {
      assert.isTrue(topLevelDomain.test(tld), tld);
    });
  });
  it("should accept numbers", () => {
    const badTld = new RandExp(/[a-zA-Z][\d]{1,61}[a-z\d]/).gen();
    assert.isTrue(topLevelDomain.test(badTld), badTld);
  });
  it("should not accept 1 alphabetic character", () => {
    const badTld = new RandExp(/[a-zA-Z]{1}/).gen();
    assert.isNotTrue(topLevelDomain.test(badTld), badTld);
  });
  it("should not accept 64 characters or more", () => {
    const badTld = new RandExp(/[a-zA-Z]{64}}/).gen();
    assert.isNotTrue(topLevelDomain.test(badTld), badTld);
  });
  it("should not accept periods", () => {
    const badTld = new RandExp(/[a-zA-Z][.][a-z]/).gen();
    assert.isNotTrue(topLevelDomain.test(badTld), badTld);
  });
});

describe("FQDN RegEx", () => {
  it("should accept 255 characters", () => {
    const goodFqdn = new RandExp(/([a-zA-Z\d]{63}[.]){3}[a-zA-Z]{63}/).gen();
    assert.isTrue(fqdn.test(goodFqdn), goodFqdn);
  });
  it("should accept the smallest domain possible (1 char hostname and 2 char TLD)", () => {
    const goodFqdn = new RandExp(/[a-zA-Z\d]{1}[.][a-zA-Z]{2}/).gen();
    assert.isTrue(fqdn.test(goodFqdn), goodFqdn);
  });
  it("should accept 126 single char segments plus a two char tld", () => {
    const goodFqdn: string = new RandExp(
      /([a-zA-Z\d]{1}[.]){126}[a-zA-Z\d]{3}/
    ).gen();
    assert.equal(goodFqdn.length, 255);
    assert.isTrue(fqdn.test(goodFqdn), goodFqdn);
  });
  it("should accept just a generated TLD x8", () => {
    for (let i = 0; i < 8; i++) {
      const tld = generateTopLevelDomain();
      assert.isTrue(fqdn.test(tld), tld);
    }
  });
  it("should accept a generated hostname and TLD combo x8", () => {
    for (let i = 0; i < 8; i++) {
      const goodFqdn: string = `${generateHostname()}.${generateTopLevelDomain()}`;
      assert.isTrue(fqdn.test(goodFqdn), goodFqdn);
    }
  });
  it("should not accept anything 256 characters or longer", () => {
    const badFqdn = new RandExp(
      /([a-z\d][.]){1}([a-zA-Z\d]{63}[.]){3}[a-zA-Z]{63}/
    ).gen();
    assert.isNotTrue(fqdn.test(badFqdn), badFqdn);
  });
  it("should not accept anything with a segment longer than 63 characters", () => {
    const badFqdn = new RandExp(/[a-zA-Z\d]{64}/).gen();
    assert.isNotTrue(fqdn.test(badFqdn), badFqdn);
  });
});

describe("generateHostname()", () => {
  it("is accepted by Hostname RegEx", () => {
    const testHostname = generateHostname();
    assert.isTrue(hostname.test(testHostname), testHostname);
  });
});

describe("generateTopLevelDomain()", () => {
  it("is accepted by Top Level Domain RegEx", () => {
    const testTopLevelDomain = generateTopLevelDomain();
    assert.isTrue(topLevelDomain.test(testTopLevelDomain), testTopLevelDomain);
  });
});

describe("generateFqdn()", () => {
  it("is accepted by FQDN RegEx", () => {
    const testFqdn = generateFqdn();
    assert.isTrue(fqdn.test(testFqdn), testFqdn);
  });
});

describe("isActualTld()", () => {
  it("should accept: COM", () => {
    assert.isTrue(isActualTld("COM"), "COM");
  });
  it("should not accept: FOOS", () => {
    assert.isNotTrue(isActualTld("FOOS"), "FOOS");
  });
});
