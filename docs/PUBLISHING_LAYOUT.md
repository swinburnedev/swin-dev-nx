# Publishing @swinburne-dev/layout to Private NPM Feed

This guide covers how to publish the layout component to a private npm registry.

## 📢 Recommended: GitHub Packages

For this repository, we **recommend using GitHub Packages**. It's:

- ✅ Integrated with GitHub
- ✅ No additional setup needed
- ✅ Free with GitHub Pro or personal access token
- ✅ Built-in access control
- ✅ Automatic CI/CD with GitHub Actions

**Quick Start:** See [docs/GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md)

---

## Overview

The layout component has been extracted into a standalone, publishable npm package located at `libs/layout/`. It's configured to be published to a private npm registry under the `@swinburne-dev` scope.

## Prerequisites

- An account/access to your chosen private npm registry
- Authentication token/credentials for the registry
- `npm` CLI configured with access to the registry

## Step 1: Choose Your Private Registry

Select one of the common options below:

### Option A: GitHub Packages (Recommended for GitHub-hosted projects)

- **URL**: `https://npm.pkg.github.com`
- **Access**: Via GitHub personal access token
- **Docs**: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

### Option B: Azure Artifacts

- **URL**: `https://pkgs.dev.azure.com/<org>/_packaging/<feed>/npm/registry/`
- **Access**: Via Azure DevOps PAT token
- **Docs**: https://docs.microsoft.com/en-us/azure/devops/artifacts/get-started-npm

### Option C: Verdaccio (Self-hosted)

- **URL**: `http://localhost:4873` or your Verdaccio server
- **Docs**: https://verdaccio.org/

### Option D: JFrog Artifactory

- **URL**: `https://<instance>.artifactory.<region>.dev/artifactory/api/npm/npm/`
- **Docs**: https://jfrog.com/help/display/JFROG/Npm+Registry

## Step 2: Configure .npmrc

Update `.npmrc` in the workspace root with your registry credentials:

```properties
registry=https://registry.npmjs.org

# For GitHub Packages
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}

# OR for Azure Artifacts
# @swinburne-dev:registry=https://pkgs.dev.azure.com/yourorg/_packaging/yourfeed/npm/registry/
# //pkgs.dev.azure.com/yourorg/_packaging/yourfeed/npm/registry/:_authToken=${AZURE_ARTIFACTS_TOKEN}
```

**Environment Variables:**
Set your authentication token as an environment variable:

```bash
export NPM_TOKEN=your_github_token_here
# or
export AZURE_ARTIFACTS_TOKEN=your_azure_token_here
```

## Step 3: Build the Package

```bash
nx build layout
```

This creates the distribution files in `dist/libs/layout/`:

- `index.js` - CommonJS build
- `index.esm.js` - ES modules build
- `index.d.ts` - TypeScript type definitions

## Step 4: Update Version

Before publishing, update the version in `libs/layout/package.json`:

```json
{
  "name": "@swinburne-dev/layout",
  "version": "1.0.1"
}
```

## Step 5: Publish to Registry

Navigate to the dist folder and publish:

```bash
cd dist/libs/layout
npm publish
```

Or from the workspace root:

```bash
cd dist/libs/layout && npm publish && cd ../../..
```

**Output on success:**

```
npm notice
npm notice 📦 @swinburne-dev/layout@1.0.1
npm notice === Tarball Contents ===
npm notice 12B   package.json
npm notice 2.1kB index.js
npm notice 2.5kB index.esm.js
npm notice 3.2kB index.d.ts
```

## Step 6: Update Main App

Once published to your private registry, the main app will automatically pull the published version from npm when:

1. Dependencies are installed (`npm install` or `npm ci`)
2. The `@swinburne-dev/layout` dependency is in `package.json` (already added)

No code changes needed—the imports already use `import { Layout } from '@swinburne-dev/layout'`.

## Local Development Without Publishing

To test the package locally **before publishing**, you can:

### Option A: Use npm link

```bash
# In libs/layout after building
cd dist/libs/layout
npm link

# In the main app
npm link @swinburne-dev/layout
```

### Option B: Use Local File Path (Temporary)

Edit `package.json` in the workspace root:

```json
{
  "dependencies": {
    "@swinburne-dev/layout": "file:./dist/libs/layout"
  }
}
```

Then install:

```bash
npm install
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Build Layout Package
  run: nx build layout

- name: Publish to GitHub Packages
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    cd dist/libs/layout
    npm publish
```

### Azure Pipelines Example

```yaml
- script: nx build layout
  displayName: 'Build Layout Package'

- script: |
    cd dist/libs/layout
    npm publish
  displayName: 'Publish to Azure Artifacts'
  env:
    AZURE_ARTIFACTS_TOKEN: $(System.AccessToken)
```

## Versioning Strategy

Follow semantic versioning (SemVer):

- **MAJOR.MINOR.PATCH** (e.g., `1.0.0`)
  - `MAJOR`: Breaking changes
  - `MINOR`: Backward-compatible new features
  - `PATCH`: Bug fixes

Update version in `libs/layout/package.json` before each publish.

## Troubleshooting

### "401 Unauthorized" Error

- Verify authentication token is set correctly
- Check that `.npmrc` is configured for your registry
- Ensure token has `write` permissions

### "403 Forbidden" Error

- Token may lack publish permissions
- Check package scope is correctly configured in `.npmrc`

### "404 Not Found" (Registry not found)

- Verify registry URL is correct
- Check network connectivity to registry
- Ensure scope matches registry configuration

### Package Already Exists

- Increment the version number in `libs/layout/package.json`
- Rebuild and republish

## Using the Published Package

In any project, install the package:

```bash
npm install @swinburne-dev/layout
```

Then use it:

```tsx
import { Layout, type IProps } from '@swinburne-dev/layout';

export function MyPage() {
  return (
    <Layout title="My Page">
      <div>Content here</div>
    </Layout>
  );
}
```

## Testing Package Installation

To verify the package installs correctly in isolation:

```bash
mkdir test-layout
cd test-layout
npm init -y
npm install @swinburne-dev/layout
```

Then test imports in a simple script to confirm it works.
