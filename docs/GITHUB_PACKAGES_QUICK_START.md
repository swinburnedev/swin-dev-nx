# 🚀 GitHub Packages - Quick Start (5 Minutes)

Get your layout package published to GitHub Packages in just 5 minutes!

## Prerequisites

- GitHub account with repository access
- Node.js 18+ installed locally
- `npm` CLI available

## Step 1: Create GitHub Personal Access Token (2 min)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Token name:** `NPM_PUBLISH_TOKEN`
4. **Scopes:** Check these boxes:
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `repo` (optional, recommended)
5. Click **"Generate token"** at bottom
6. **COPY THE TOKEN** (you'll only see it once!)

Example token: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 2: Set Environment Variable (1 min)

```bash
export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Add to your shell profile to make it permanent:

```bash
# For zsh (macOS)
echo 'export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' >> ~/.zshrc
source ~/.zshrc

# For bash
echo 'export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' >> ~/.bash_profile
source ~/.bash_profile
```

Verify it's set:

```bash
echo $NPM_TOKEN
# Should output: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 3: Build the Package (1 min)

```bash
cd /path/to/swin-dev-nx
nx build layout --configuration=production
```

## Step 4: Publish (1 min)

```bash
cd dist/libs/layout
npm publish
```

**Success output:**

```
npm notice 📦 @swinburne-dev/layout@1.0.0
npm notice published to https://npm.pkg.github.com/
```

✅ **Done!** Your package is now published!

## Step 5: Verify (Optional)

Visit: https://github.com/swinburnedev/swin-dev-nx/packages

You should see `@swinburne-dev/layout` listed!

---

## 🎉 Next: Install in Other Projects

```bash
# In another project
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm install @swinburne-dev/layout
```

---

## 🔧 Troubleshooting

### "401 Unauthorized" Error

```bash
# Check token is set
echo $NPM_TOKEN

# If empty, run Step 2 again

# If set but still failing, try:
npm logout --scope=@swinburne-dev --registry=https://npm.pkg.github.com
npm login --scope=@swinburne-dev --registry=https://npm.pkg.github.com
# Then paste your token when prompted
```

### "403 Forbidden" Error

- Make sure token includes `write:packages` scope
- Verify you have access to the repository

### Package Already Exists

- Increment version in `libs/layout/package.json`
- Change `"version": "1.0.0"` to `"version": "1.0.1"`
- Rebuild and republish

---

## 📝 Future Publishes

Every time you want to publish an update:

```bash
# 1. Update version in libs/layout/package.json
# 2. Build
nx build layout --configuration=production

# 3. Publish
cd dist/libs/layout
npm publish
```

Or use **GitHub Actions** to automate this! See `.github/workflows/publish-layout.yml`

---

## 📚 Full Documentation

For more details, see: [docs/GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md)
