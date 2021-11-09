# Domain-Namer
Generate and validate fully qualifed domain names and more!

## Installation
```sh
npm install domain-namer --save
yarn add domain-namer
bower install domain-namer --save
```

## Usage

### Javascript
```javascript
const fqdn = require("domain-namer").fqdn;
console.log(fqdn.test("google.com"));
// Should print out 'true'
```

### Typescript
```typescript
import { topLevelDomain } from "domain-namer";
console.log(topLevelDomain.test("com"));
// Should print out 'true'
```

## Test
```sh
npm run test
```

**Note**: You will need to run `npm run build` to run the CommonJS and ECMAScript import tests.
