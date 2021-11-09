import fs from "fs";
import RandExp from "randexp";

export const hostname: RegExp =
  /^(?=.{1,63}$)[a-zA-Z\d]([a-zA-Z\d-]{0,61}[a-zA-Z\d])?$/;
export const topLevelDomain: RegExp =
  /^(?=.{2,63}$)[a-zA-Z]([a-zA-Z\d-]){0,61}[a-zA-Z\d]$/;
export const fqdn: RegExp =
  /^(?=.{2,255}$)([a-zA-Z\d]([a-zA-Z\d-]{0,61}[a-zA-Z\d])?[.]){0,26}[a-zA-Z]([a-zA-Z-]){0,61}[a-zA-Z]$/;

/**
 * Generates a valid hostname with the following requirements:
 *
 * - Between 1 and 63 characters
 * - Contains alpha-numeric characters
 * - Can contain dashes as long as it doesn't start or end with one
 *
 * @returns A valid hostname
 */
export function generateHostname(): string {
  return new RandExp(hostname).gen();
}

/**
 * Generates a valid top level domain with the following requirements:
 *
 * - Between 2 and 63 characters
 * - Contains alphabetic characters (no numbers)
 * - Can contain dashes
 * - Cannot contain numbers
 *
 * @returns A valid top level domain
 */
export function generateTopLevelDomain(): string {
  return new RandExp(topLevelDomain).gen();
}

/**
 * Generates a valid fully qualified domain name (FQDN) with the following requirements:
 *
 * - Between 2 and 255 characters
 * - Contains alpha-numeric characters in each hostname section
 * - Can contain dashes except on boundaries
 * - Must end with a valid top level domain
 * - Hostname sections are optional and must be seperated by a period (.)
 * - Hostname sections must be between 1 and 63 characters
 * - Top level domain section is between 2 and 63 characters
 * - Top level domain can contain dahses
 * - Top level domain cannot contain numbers
 *
 * @returns A valid fully qualifed domain name (FQDN)
 */
export function generateFqdn(): string {
  // RandExp doesn't support look aheads enforcing length.
  // Have to trim manually preserving top level domain
  const result: string = new RandExp(fqdn).gen();
  return result.substr(result.length - 255).replace(/^[-.]/, "");
}

// Actual Top Level Domains: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
export let actualTopLevelDomains: string[] = [];
fs.readFile(
  "./tlds-alpha-by-domain.txt",
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      actualTopLevelDomains = data
        .split("\n")
        .slice(1)
        .filter((tld: string) => tld !== "");
    }
  }
);

/**
 * Checks if provided candidate is a proper Top Level Domain. Checks against
 * list of IANNA Top Level Domains. String casing does not matter.
 *
 * @param candidate The top level domain candidate to check.
 * @returns True if a recognized Top Level Domain.
 */
export function isActualTld(candidate: string): boolean {
  for (const tld of actualTopLevelDomains) {
    if (tld.toLowerCase() === candidate.toLowerCase()) {
      return true;
    }
  }
  return false;
}
