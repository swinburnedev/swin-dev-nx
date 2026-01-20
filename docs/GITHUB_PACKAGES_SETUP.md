# GitHub Packages Setup Guide

Complete step-by-step guide to publish `@swinburne-dev/layout` to GitHub Packages (private npm registry).

## What is GitHub Packages?

GitHub Packages is a package hosting service that allows you to publish and install npm packages directly from GitHub repositories. It's free for public packages and included with GitHub Pro for private packages.

**Advantages:**

- ✅ Integrated with your GitHub repository
- ✅ No additional services needed
- ✅ Built-in access control with GitHub permissions
- ✅ Automatic deletion of old package versions
- ✅ Free with GitHub Pro (or use with personal access token)

**Registry URL:** `https://npm.pkg.github.com`

---

## Step 1: Create a GitHub Personal Access Token (PAT)

### 1.1 Generate Token

1. Go to GitHub Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** (classic)
3. Name it: `NPM_PUBLISH_TOKEN`
4. Select these scopes:

   - ✅ `write:packages` - Publish packages
   - ✅ `read:packages` - Install packages
   - ✅ `repo` - Access to private repositories (optional, but recommended)

5. Click **"Generate token"**
6. **Copy and save the token immediately** - You won't see it again!

### 1.2 Example Token

```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **IMPORTANT:** Treat this token like a password. Never commit it to git!

---

## Step 2: Configure .npmrc Locally

Choose ONE of these options based on your use case:

### Option A: Local Development (Recommended for Testing)

Create or update `~/.npmrc` in your home directory:

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
```

Replace `YOUR_GITHUB_PAT_HERE` with your actual token from Step 1.

### Option B: Project-Level .npmrc (Alternative)

Update `.npmrc` in the repository root (already exists):

```properties
registry=https://registry.npmjs.org

# GitHub Packages
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

This uses an environment variable (`${NPM_TOKEN}`) which is more secure.

### Option C: Using .npmrc.local (Not Committed)

Create `.npmrc.local` in project root (add to `.gitignore`):

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
```

Then add to `.npmrc`:

```properties
; Include local config with credentials
include=.npmrc.local
```

---

## Step 3: Set Environment Variable for Publishing

For CI/CD or command-line publishing, set the token as an environment variable:

### Option A: Temporary (Current Session Only)

```bash
export NPM_TOKEN=your_github_pat_here
npm publish
```

### Option B: Permanent (Zsh - macOS)

Add to `~/.zshrc`:

```bash
export NPM_TOKEN=your_github_pat_here
```

Then reload:

```bash
source ~/.zshrc
```

### Option C: Using direnv (Recommended for Projects)

Install direnv: https://direnv.net/

Create `.envrc` in project root:

```bash
export NPM_TOKEN=your_github_pat_here
```

Then enable:

```bash
direnv allow
```

Add `.envrc` to `.gitignore` to prevent committing tokens.

---

## Step 4: Update Repository Package.json

Ensure `libs/layout/package.json` is configured for GitHub Packages:

```json
{
  "name": "@swinburne-dev/layout",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  }
}
```

✅ Already configured! No changes needed.

---

## Step 5: Build and Publish Manually

### 5.1 Build the Package

```bash
nx build layout --configuration=production
```

Output: `dist/libs/layout/`

### 5.2 Publish to GitHub Packages

```bash
cd dist/libs/layout
npm publish
```

### Expected Output

```
npm notice
npm notice 📦 @swinburne-dev/layout@1.0.0
npm notice === Tarball Contents ===
npm notice 12B   package.json
npm notice 2.1kB index.js
npm notice 2.5kB index.esm.js
npm notice 3.2kB index.d.ts
npm notice === Tarball Details ===
npm notice name:          @swinburne-dev/layout
npm notice version:       1.0.0
npm notice package size:  2.1 kB
npm notice unpacked size: 8.0 kB
npm notice shasum:        abc123def456...
npm notice integrity:     sha512-abc123...
npm notice total files:   4
npm notice
npm notice Publishing to https://npm.pkg.github.com/
npm notice
```

### Check Published Package

Visit: `https://github.com/swinburnedev/swin-dev-nx/packages`

You should see `@swinburne-dev/layout` listed!

---

## Step 6: Verify Installation (Optional)

Test that the package can be installed:

### 6.1 Create Test Directory

```bash
mkdir test-layout
cd test-layout
npm init -y
```

### 6.2 Configure npm for GitHub Packages

```bash
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN
```

Or create `.npmrc` in test directory:

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

### 6.3 Install Package

```bash
npm install @swinburne-dev/layout
```

### 6.4 Verify Import

Create `test.js`:

```javascript
const { Layout } = require('@swinburne-dev/layout');
console.log('Layout imported successfully!');
```

Run:

```bash
node test.js
```

---

## Step 7: Automate Publishing with GitHub Actions (Optional)

Create `.github/workflows/publish-layout.yml`:

```yaml
name: Publish Layout Package

on:
  push:
    paths:
      - 'libs/layout/**'
      - '.github/workflows/publish-layout.yml'
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@swinburne-dev'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: nx test layout

      - name: Build package
        run: nx build layout --configuration=production

      - name: Publish to GitHub Packages
        run: cd dist/libs/layout && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**How it works:**

- Automatically publishes when `libs/layout/**` files change
- Uses `GITHUB_TOKEN` (built-in, no PAT needed)
- Runs tests before publishing
- Prevents publishing if tests fail

---

## Step 8: Update Version and Publish New Releases

Each time you want to publish a new version:

### 8.1 Update Version

Edit `libs/layout/package.json`:

```json
{
  "version": "1.0.1"
}
```

Follow semantic versioning:

- `1.0.0` → `1.0.1` (patch/bug fix)
- `1.0.0` → `1.1.0` (minor/new feature)
- `1.0.0` → `2.0.0` (major/breaking change)

### 8.2 Commit Changes

```bash
git add libs/layout/package.json
git commit -m "chore: bump layout version to 1.0.1"
git push origin main
```

### 8.3 Publish

```bash
nx build layout --configuration=production
cd dist/libs/layout
npm publish
```

Or if using GitHub Actions workflow, it publishes automatically on push!

---

## Quick Reference

### One-Time Setup

```bash
# 1. Create GitHub PAT at https://github.com/settings/tokens
# 2. Set environment variable
export NPM_TOKEN=your_github_pat_here

# 3. Configure npm
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN
```

### Publishing

```bash
# Build
nx build layout --configuration=production

# Publish
cd dist/libs/layout
npm publish
```

### Installing (Other Projects)

```bash
# Configure
npm config set @swinburne-dev:registry https://npm.pkg.github.com

# Install
npm install @swinburne-dev/layout
```

---

## Troubleshooting

### Error: "401 Unauthorized"

**Cause:** Invalid or missing token
**Solution:**

```bash
# Verify token is set
echo $NPM_TOKEN

# Clear npm cache
npm cache clean --force

# Re-authenticate
npm login --scope=@swinburne-dev --registry=https://npm.pkg.github.com
```

### Error: "403 Forbidden - Package not allowed"

**Cause:** Insufficient permissions or wrong scope
**Solution:**

- Verify token has `write:packages` scope
- Check package name matches GitHub username: `@swinburnedev/layout`

### Error: "404 Not Found" When Installing

**Cause:** Registry not configured for installation
**Solution:**

```bash
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm install
```

### Token Exposed

**Cause:** Token accidentally committed to git
**Solution:**

```bash
# Revoke token immediately at https://github.com/settings/tokens
# Create new token
# Update environment and npm config
```

---

## Environment Configuration for Different Machines

### Development Machine

```bash
# ~/.zshrc or ~/.bash_profile
export NPM_TOKEN=your_github_pat_here
```

### GitHub Actions (Already Configured)

Uses `${{ secrets.GITHUB_TOKEN }}` - no additional setup needed!

### CI/CD Pipeline (GitLab, Jenkins, etc.)

Add `NPM_TOKEN` as a secret environment variable in your CI/CD provider.

---

## Using GitHub Packages with Private Repositories

If your repository is private, ensure:

1. Token includes `repo` scope (for repository access)
2. Users installing the package have repository access
3. Alternative: Use GitHub App for programmatic access

---

## Installing in Multiple Projects

Once published, install in any project:

```bash
# One-time setup per machine
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN

# Then in any project
npm install @swinburne-dev/layout
```

Or add to `.npmrc` in each project:

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

---

## Security Best Practices

1. ✅ **Never commit tokens** - Add `.npmrc` to `.gitignore`
2. ✅ **Use environment variables** - `${NPM_TOKEN}` in .npmrc
3. ✅ **Rotate tokens regularly** - Delete old tokens
4. ✅ **Use GitHub Actions** - Leverages built-in `GITHUB_TOKEN`
5. ✅ **Limit token scope** - Only `write:packages`, `read:packages`
6. ✅ **Revoke immediately if exposed** - Do this via GitHub settings

---

## Package Privacy Settings

Your package is private by default (access: "restricted"). To change:

In `libs/layout/package.json`:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted" // or "public"
  }
}
```

---

## Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Creating Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Actions Node Setup](https://github.com/actions/setup-node)

---

**Next Steps:**

1. Create GitHub PAT (Step 1)
2. Configure `.npmrc` (Step 2)
3. Set `NPM_TOKEN` environment variable (Step 3)
4. Build and publish (Step 5)
5. Verify installation (Step 6)
6. (Optional) Set up GitHub Actions for automatic publishing (Step 7)
