# Domain-Namer
Generate and validate fully qualified domain names and more!

## Installation
```sh
npm install domain-namer --save
yarn add domain-namer
bower install domain-namer --save
```

## Usage

### Javascript
```javascript
const DomainPatterns = require("domain-namer").DomainPatterns;
console.log(DomainPatterns.fqdn.test("google.com"));
// Should print out 'true'
```

### Typescript
```typescript
import { DomainPatterns } from "domain-namer";
console.log(DomainPatterns.topLevelDomain.test("com"));
// Should print out 'true'
```

## Test
```sh
npm run test
```

**Note**: You will need to run `npm run build` to run the CommonJS and ECMAScript import tests.
