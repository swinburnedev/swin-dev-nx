# 🎯 GitHub Packages Integration - Complete Summary

Your layout component is **fully configured** to publish to GitHub Packages. Here's everything you need to know.

---

## 📦 What You Have

### Configuration Files

```
✅ .npmrc                                    - GitHub Packages registry configured
✅ .github/workflows/publish-layout.yml      - Automatic publishing workflow
✅ libs/layout/package.json                  - npm package metadata
✅ .gitignore                                - Updated to protect tokens
```

### Documentation

```
✅ docs/GITHUB_PACKAGES_QUICK_START.md       - 5-minute quick start
✅ docs/GITHUB_PACKAGES_SETUP.md             - Complete setup guide
✅ docs/GITHUB_PACKAGES_COMPLETE.md          - This summary
✅ docs/PUBLISHING_LAYOUT.md                 - Updated with GitHub recommendation
```

### Package Structure

```
libs/layout/
├── src/lib/layout.tsx                      - Component code
├── package.json                            - Configured for GitHub Packages
└── README.md                               - Package documentation
```

---

## 🚀 How to Publish

### Option A: Manual Publishing (Best for Testing)

**Time: 5 minutes**

```bash
# 1. Create GitHub PAT at https://github.com/settings/tokens
#    - Scopes: write:packages, read:packages, repo

# 2. Set environment variable
export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 3. Build
nx build layout --configuration=production

# 4. Publish
cd dist/libs/layout
npm publish
```

### Option B: Automatic Publishing (Best for Continuous Delivery)

**Time: 0 minutes (already configured!)**

```bash
# 1. Make changes to libs/layout/
# 2. Update version in libs/layout/package.json
# 3. Push to main branch
# 4. GitHub Actions automatically publishes! ✨
```

The workflow in `.github/workflows/publish-layout.yml`:

- ✅ Triggers on changes to `libs/layout/**`
- ✅ Runs tests automatically
- ✅ Publishes if all tests pass
- ✅ Uses GitHub's built-in `GITHUB_TOKEN` (no PAT needed)

---

## 📋 Step-by-Step: First Time Publishing

### Step 1: Create GitHub Token (2 min)

1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `NPM_PUBLISH_TOKEN`
4. Check these scopes:
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `repo` (optional but recommended)
5. Click: **"Generate token"**
6. **COPY THE TOKEN** (won't show again!)

### Step 2: Set Environment Variable (1 min)

```bash
# Temporarily
export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Or permanently add to ~/.zshrc or ~/.bash_profile
echo 'export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' >> ~/.zshrc
source ~/.zshrc
```

Verify:

```bash
echo $NPM_TOKEN
```

### Step 3: Build Package (1 min)

```bash
cd /path/to/swin-dev-nx
nx build layout --configuration=production
```

### Step 4: Publish (1 min)

```bash
cd dist/libs/layout
npm publish
```

### Step 5: Verify (1 min)

Visit: **https://github.com/swinburnedev/swin-dev-nx/packages**

You should see `@swinburne-dev/layout` listed!

---

## 📝 Using Published Package

### Install in Any Project

```bash
# One-time setup (per machine)
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN

# Install package
npm install @swinburne-dev/layout
```

### Or Add to .npmrc

Create `.npmrc` in your project:

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Then install:

```bash
npm install @swinburne-dev/layout
```

### Use in Code

```tsx
import { Layout } from '@swinburne-dev/layout';

export default function Page() {
  return (
    <Layout title="My Page">
      <div>Content</div>
    </Layout>
  );
}
```

---

## 🔄 Updating Your Package

### Every Time You Publish

1. **Update version** in `libs/layout/package.json`

   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Build and publish:**
   ```bash
   nx build layout --configuration=production
   cd dist/libs/layout
   npm publish
   ```

### Semantic Versioning

- `1.0.0` → `1.0.1` = Bug fix (patch)
- `1.0.0` → `1.1.0` = New feature (minor)
- `1.0.0` → `2.0.0` = Breaking change (major)

---

## 🔐 Security

### ✅ What's Protected

- **No tokens in git** - `.npmrc-local` in `.gitignore`
- **Environment variables** - `${NPM_TOKEN}` in `.npmrc`
- **Can revoke tokens** - Delete at https://github.com/settings/tokens
- **GitHub Actions secure** - Uses built-in `GITHUB_TOKEN`

### ⚠️ Never Do This

```bash
# ❌ DON'T do this
echo $NPM_TOKEN > .npmrc
git add .npmrc
git push
```

### ✅ Do This Instead

```bash
# ✅ DO this
export NPM_TOKEN=your_token_here
# Publish manually or via GitHub Actions
```

---

## 🎯 Recommended Workflow

### Development

```bash
# Edit component
nano libs/layout/src/lib/layout.tsx

# Test locally
nx test layout

# Commit
git add libs/layout/
git commit -m "feat: update layout component"
git push origin feature-branch
```

### Ready to Release

```bash
# Update version
nano libs/layout/package.json
# Change: "version": "1.0.0" → "version": "1.0.1"

# Commit
git add libs/layout/package.json
git commit -m "chore: bump layout version to 1.0.1"

# Push to main
git push origin main
# Or merge PR

# GitHub Actions automatically publishes! ✨
```

### Check Package

```bash
# View via npm
npm view @swinburne-dev/layout

# Or visit GitHub
# https://github.com/swinburnedev/swin-dev-nx/packages
```

---

## 📊 GitHub Actions Workflow

The `.github/workflows/publish-layout.yml` workflow:

**Triggers When:**

- ✅ Changes pushed to `libs/layout/**` on main
- ✅ Changes to `.github/workflows/publish-layout.yml` on main
- ✅ Changes to `package.json` on main
- ✅ Manually triggered via GitHub UI

**Does:**

1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Lint the package
5. Run tests with coverage
6. Build the package
7. Publish to GitHub Packages
8. Comments on commit with status

**Requirements:**

- All tests must pass
- No manual token needed (uses built-in `GITHUB_TOKEN`)

---

## 🆘 Troubleshooting

### Error: "401 Unauthorized"

**Problem:** Invalid or missing token

**Solution:**

```bash
# Check token is set
echo $NPM_TOKEN

# Create new token if needed
# https://github.com/settings/tokens

# Re-authenticate
npm logout --scope=@swinburne-dev --registry=https://npm.pkg.github.com
npm login --scope=@swinburne-dev --registry=https://npm.pkg.github.com
```

### Error: "403 Forbidden"

**Problem:** Token lacks permissions

**Solution:**

- Go to https://github.com/settings/tokens
- Create new token with `write:packages` scope

### Error: "404 Not Found" (when installing)

**Problem:** npm doesn't know where GitHub Packages is

**Solution:**

```bash
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm install @swinburne-dev/layout
```

### Package Already Exists

**Problem:** Version already published

**Solution:**

```bash
# Increment version
nano libs/layout/package.json
# Change "version": "1.0.0" to "version": "1.0.1"

# Publish again
nx build layout --configuration=production
cd dist/libs/layout
npm publish
```

---

## 📚 Documentation

| File                               | Purpose            | Read Time |
| ---------------------------------- | ------------------ | --------- |
| **GITHUB_PACKAGES_QUICK_START.md** | 5-minute setup     | 5 min     |
| **GITHUB_PACKAGES_SETUP.md**       | Complete guide     | 15 min    |
| **GITHUB_PACKAGES_COMPLETE.md**    | Summary            | 5 min     |
| **PUBLISHING_LAYOUT.md**           | General publishing | 10 min    |

**Start with:** `docs/GITHUB_PACKAGES_QUICK_START.md`

---

## ✨ Files Changed/Created

```
✅ .npmrc                                   - Updated with GitHub Packages config
✅ .gitignore                               - Added npm credential files
✅ .github/workflows/publish-layout.yml     - Automatic publishing workflow
✅ docs/GITHUB_PACKAGES_QUICK_START.md      - Quick 5-minute guide
✅ docs/GITHUB_PACKAGES_SETUP.md            - Complete setup guide
✅ docs/GITHUB_PACKAGES_COMPLETE.md         - This file
✅ docs/PUBLISHING_LAYOUT.md                - Updated with GitHub recommendation
```

---

## 🎯 Next Actions

### Choose Your Path:

**Path A: I want to publish manually right now**

1. Read: `docs/GITHUB_PACKAGES_QUICK_START.md`
2. Create GitHub PAT
3. Run: `nx build layout --configuration=production && cd dist/libs/layout && npm publish`
4. Done! ✅

**Path B: I want to use automatic GitHub Actions**

1. Update version in `libs/layout/package.json`
2. Push to main
3. GitHub Actions publishes automatically
4. Done! ✅

**Path C: I want to learn everything first**

1. Read: `docs/GITHUB_PACKAGES_SETUP.md`
2. Understand all options
3. Choose your approach
4. Execute
5. Done! ✅

---

## 📞 Quick Reference

```bash
# Build
nx build layout --configuration=production

# Publish manually
cd dist/libs/layout && npm publish

# View package
npm view @swinburne-dev/layout

# Install in projects
npm install @swinburne-dev/layout

# Set token (one-time)
export NPM_TOKEN=your_token_here

# Create token
# https://github.com/settings/tokens
```

---

## ✅ Final Checklist

- ✅ GitHub Packages configured in `.npmrc`
- ✅ GitHub Actions workflow ready
- ✅ Security best practices implemented
- ✅ Documentation complete
- ✅ Package metadata configured
- ✅ Ready to publish!

---

**You're all set! 🚀**

Choose your approach above and start publishing `@swinburne-dev/layout` to GitHub Packages!

For any questions, refer to the documentation files in the `docs/` directory.
