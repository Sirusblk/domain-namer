import RandExp from "randexp";
import { actualTopLevelDomains } from "./tlds";

export const DomainPatterns: Record<string, RegExp> = {
  hostname: /^(?=.{1,63}$)[a-zA-Z\d]([a-zA-Z\d-]{0,61}[a-zA-Z\d])?$/,
  topLevelDomain: /^(?=.{2,63}$)[a-zA-Z]([a-zA-Z\d-]){0,61}[a-zA-Z\d]$/,
  // (255 - 2 char TLD - 1 period) / 2 (1 char segment + 1 period) = 125.5
  fqdn: /^(?=.{2,255}$)([a-zA-Z\d]([a-zA-Z\d-]{0,61}[a-zA-Z\d])?\.){0,126}[a-zA-Z\d]([a-zA-Z\d-]){0,61}[a-zA-Z\d]$/,
};

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
  return new RandExp(DomainPatterns.hostname).gen();
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
  return new RandExp(DomainPatterns.topLevelDomain).gen();
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
  const result: string = new RandExp(DomainPatterns.fqdn).gen();
  return result.substr(result.length - 255).replace(/^[-.]/, "");
}

/**
 * Checks if provided candidate is a recognized Top Level Domain. Checks against
 * list of IANNA Top Level Domains. String casing does not matter.
 *
 * @param candidate The top level domain candidate to check.
 * @returns True if a recognized Top Level Domain.
 */
export function isKnownTld(candidate: string): boolean {
  for (const tld of actualTopLevelDomains) {
    if (tld.toLowerCase() === candidate.toLowerCase()) {
      return true;
    }
  }
  return false;
}

export { actualTopLevelDomains } from "./tlds";
