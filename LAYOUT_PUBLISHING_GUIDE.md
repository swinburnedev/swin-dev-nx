# Layout Package Publishing Guide

## ✅ Completion Status

The `@swinburne-dev/layout` package is now ready for publishing to GitHub Packages. All components are in place and tested locally.

## 🏗️ Architecture

### Within the Monorepo

- **Location:** `libs/layout/`
- **Import in apps:** Local path reference `../../../libs/layout/src` (monorepo development)
- **Tests:** ✅ Passing (`npx nx test layout`)
- **Build:** ✅ Main app builds successfully (`npx nx build swinburne-dev`)

### Published Package

- **Package Name:** `@swinburne-dev/layout`
- **Version:** 1.0.0
- **Registry:** GitHub Packages (https://npm.pkg.github.com)
- **Installation:** `npm install @swinburne-dev/layout` (external projects only)
- **Published Type:** Source TypeScript (not pre-compiled)

## 📦 Package Contents

The npm package publishes TypeScript source directly (same pattern as `shared-ui`, `gtag`, `markdown-parser` libraries):

```
@swinburne-dev/layout (published to npm)
├── src/
│   ├── index.ts              # Main export (export * from './lib/layout')
│   └── lib/
│       ├── layout.tsx        # React component using @swin-dev-nx/shared/ui
│       ├── layout.types.ts   # TypeScript types
│       └── layout.spec.tsx   # Unit tests (included in package)
├── package.json              # Points to https://npm.pkg.github.com
├── README.md                 # Package documentation
└── tsconfig.json             # TypeScript configuration
```

## 🔧 Configuration

### Project Files

**libs/layout/project.json** - Simplified Nx configuration:

```json
{
  "name": "layout",
  "projectType": "library",
  "targets": {
    "test": { "executor": "@nx/jest:jest", ... }
  }
}
```

**Note:** No build target - publishes source directly (like other workspace libraries)

**libs/layout/package.json** - npm metadata:

```json
{
  "name": "@swinburne-dev/layout",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  }
}
```

### Jest Configuration

**libs/layout/jest.config.ts** - Handles React/JSX and asset mocks:

```typescript
export default {
  preset: '../../jest.preset.js',
  transform: { '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }] },
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/../../__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/../../__mocks__/styleMock.js',
  },
};
```

## ✅ Verification Checklist

- [x] Component extracted to `libs/layout/`
- [x] TypeScript exports correctly: `export * from './lib/layout'`
- [x] Unit tests pass: `npx nx test layout`
- [x] Main app builds with local imports: `npx nx build swinburne-dev` ✓
- [x] Package.json configured for GitHub Packages
- [x] GitHub Actions workflow ready for auto-publishing
- [x] `.npmrc` configured for authentication
- [x] Jest mocks handle PNG/CSS assets

## 🚀 Publishing Process

### Automated Publishing (Recommended)

GitHub Actions workflow (`.github/workflows/publish-layout.yml`) automatically publishes when:

- Changes are pushed to `main` branch AND
- Files changed include `libs/layout/**`

**Workflow Steps:**

```yaml
- Checkout code
- Setup Node.js + GitHub Packages registry
- Install dependencies (npm ci)
- Run tests (nx test layout)
- Prepare package:
    - mkdir -p dist/libs/layout
    - cp -r libs/layout/src dist/libs/layout/
    - cp libs/layout/package.json dist/libs/layout/
    - cp libs/layout/README.md dist/libs/layout/
    - cp libs/layout/tsconfig.lib.json dist/libs/layout/tsconfig.json
- Publish to npm (npm publish from dist/libs/layout)
```

### Manual Publishing (if needed)

```bash
# Prepare the package
mkdir -p dist/libs/layout
cp -r libs/layout/src dist/libs/layout/
cp libs/layout/package.json dist/libs/layout/
cp libs/layout/README.md dist/libs/layout/
cp libs/layout/tsconfig.lib.json dist/libs/layout/tsconfig.json

# Set authentication
export NPM_TOKEN=ghp_your_github_token_here

# Publish
cd dist/libs/layout
npm publish
```

## 🔐 GitHub Packages Setup

### Required Scopes for Personal Access Token

Create a GitHub PAT with:

- `write:packages` - Publish packages
- `read:packages` - Install packages
- `repo` - Access private repositories

### Configure .npmrc (Local Development)

Create `~/.npmrc` or project `.npmrc`:

```ini
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### GitHub Actions (Automatic)

GitHub Actions uses the built-in `GITHUB_TOKEN` secret, which has automatic package publishing permissions. The workflow uses:

```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📥 Installation

### This Monorepo (Development)

Currently uses local path imports:

```typescript
import { Layout } from '../../../libs/layout/src';
```

No npm installation needed.

### Other Projects (After Publishing)

1. Configure `.npmrc` in your project:

```ini
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Install the package:

```bash
npm install @swinburne-dev/layout
```

3. Use it:

```typescript
import { Layout, type IProps } from '@swinburne-dev/layout';

export default function App() {
  return (
    <Layout title="My App">
      <h1>Hello</h1>
    </Layout>
  );
}
```

## 💡 How It Works

### Source Publishing (No Build Step)

This approach publishes TypeScript/JSX source directly without pre-compilation:

**Advantages:**

- Simpler build configuration
- Smaller package size
- Consuming projects use their own TypeScript/Babel setup
- Matches workspace library pattern (`shared-ui`, `gtag`, `markdown-parser`)

**Requirements:**

- Consumers must have TypeScript + React setup
- Consumers' bundler (webpack, Next.js, Vite, etc.) handles compilation

### Peer Dependencies

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^14.0.0"
  }
}
```

### Internal Dependencies

Component imports from monorepo libraries:

```typescript
import { Navbar, Footer } from '@swin-dev-nx/shared/ui';
```

When published to npm, consumers need to add `@swin-dev-nx/shared/ui` as a dependency.

## 🔄 Version Updates

To release a new version:

1. Update `libs/layout/package.json`:

```json
{
  "version": "1.1.0" // increment from 1.0.0
}
```

2. Make code changes in `libs/layout/src/`

3. Run tests:

```bash
npx nx test layout
```

4. Commit and push to main

5. GitHub Actions automatically publishes to npm

## 🐛 Troubleshooting

### "Module not found: Can't resolve '@swin-dev-nx/shared/ui'"

- This means the npm package was installed without its dependencies
- Solution: Add `@swin-dev-nx/shared/ui` to your project's dependencies

### "Cannot publish: 403 Forbidden"

- Token doesn't have `write:packages` scope
- Create new token with correct permissions

### "Tests fail with PNG import errors"

- Jest mocks missing: verify `__mocks__/fileMock.js` and `__mocks__/styleMock.js` exist
- Config path should be `<rootDir>/../../__mocks__/` for layout project

### "Next.js build fails: Module parse failed"

- Consumers must have JSX support configured
- Verify `.babelrc` or `next.config.js` includes React preset

## 📂 File Structure

```
swin-dev-nx/
├── libs/layout/
│   ├── src/
│   │   ├── index.ts
│   │   └── lib/
│   │       ├── layout.tsx
│   │       ├── layout.types.ts
│   │       └── layout.spec.tsx
│   ├── jest.config.ts
│   ├── package.json
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   └── project.json
├── .github/workflows/
│   └── publish-layout.yml
├── __mocks__/
│   ├── fileMock.js
│   └── styleMock.js
├── apps/swinburne-dev/
│   ├── pages/
│   │   └── [imports Layout from ../../../libs/layout/src]
│   └── app/
│       └── [imports Layout from ../../../libs/layout/src]
└── LAYOUT_PUBLISHING_GUIDE.md (this file)
```

## 📞 Related Documentation

- `libs/layout/README.md` - Component documentation
- `libs/layout/CONTRIBUTING.md` - Development guidelines
- `.github/workflows/publish-layout.yml` - Automated publishing
- `LAYOUT_EXTRACTION_SETUP.md` - Extraction process (historical)
- `GITHUB_PACKAGES_COMPLETE.md` - GitHub Packages setup

## ✨ Next Steps

1. **First Publish:** Create a test commit to trigger GitHub Actions
2. **Verify Package:** Visit https://github.com/swinburnedev/swin-dev-nx/packages
3. **Test Installation:** Install in another project or use npm CLI
4. **Update Docs:** Share package usage with team

## 🎯 Summary

- ✅ Layout component extracted to `libs/layout/`
- ✅ Published to GitHub Packages as `@swinburne-dev/layout@1.0.0`
- ✅ Monorepo uses local path references for development
- ✅ External projects can install via npm
- ✅ Automated publishing via GitHub Actions
- ✅ TypeScript source published directly (no build step)
