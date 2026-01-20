# GitHub Packages Setup Complete! 🎉

Everything is now configured to publish `@swinburne-dev/layout` to GitHub Packages.

## 📋 What's Ready

✅ **GitHub Packages Configuration**

- `.npmrc` configured for GitHub Packages
- `.github/workflows/publish-layout.yml` ready for automatic publishing
- `libs/layout/package.json` configured with GitHub registry

✅ **Documentation Complete**

- `docs/GITHUB_PACKAGES_QUICK_START.md` - 5-minute quick start
- `docs/GITHUB_PACKAGES_SETUP.md` - Complete step-by-step guide
- `.gitignore` updated to prevent token leaks

✅ **Security**

- `.npmrc` uses environment variable `${NPM_TOKEN}`
- `.npmrc.local` and `.npmrc-private` added to `.gitignore`
- Token never committed to repository

---

## 🚀 Quick Start (Choose One Method)

### Method 1: Manual Publishing (Recommended for Testing)

**Time: 5 minutes**

1. **Create GitHub Personal Access Token**

   - Go to: https://github.com/settings/tokens
   - Name: `NPM_PUBLISH_TOKEN`
   - Scopes: `write:packages`, `read:packages`, `repo`
   - Copy token

2. **Set Environment Variable**

   ```bash
   export NPM_TOKEN=your_token_here
   ```

3. **Build and Publish**
   ```bash
   nx build layout --configuration=production
   cd dist/libs/layout
   npm publish
   ```

**That's it!** ✨

### Method 2: Automatic Publishing (Recommended for CI/CD)

**Time: 0 minutes (already set up!)**

The `.github/workflows/publish-layout.yml` workflow automatically:

- ✅ Publishes when `libs/layout/**` files change
- ✅ Runs tests before publishing
- ✅ Uses GitHub's built-in `GITHUB_TOKEN` (no PAT needed)
- ✅ Only publishes to main branch

**It's already configured and ready to use!**

---

## 📚 Documentation Files

| File                                     | Purpose                                      |
| ---------------------------------------- | -------------------------------------------- |
| **docs/GITHUB_PACKAGES_QUICK_START.md**  | ⭐ START HERE - 5 minute setup               |
| **docs/GITHUB_PACKAGES_SETUP.md**        | Complete step-by-step guide with all options |
| **docs/PUBLISHING_LAYOUT.md**            | General publishing guide (updated)           |
| **.github/workflows/publish-layout.yml** | GitHub Actions automation                    |

---

## 🎯 Next Steps

### If You Want to Publish Manually Now:

1. Go to: https://github.com/settings/tokens
2. Create personal access token with `write:packages` scope
3. Set: `export NPM_TOKEN=your_token_here`
4. Run: `nx build layout --configuration=production && cd dist/libs/layout && npm publish`

**Result:** Package published to GitHub Packages ✅

### If You Want to Use GitHub Actions (Automated):

1. Push your changes to main branch
2. GitHub Actions automatically runs workflow
3. Package publishes if all tests pass
4. No additional setup needed!

### If You Want to Learn More:

Read: `docs/GITHUB_PACKAGES_QUICK_START.md`

---

## 🔑 Token Setup (One-Time)

Add to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
export NPM_TOKEN=your_github_pat_here
```

Then reload:

```bash
source ~/.zshrc
# or
source ~/.bash_profile
```

⚠️ **IMPORTANT:** Never commit the token! Only set as environment variable.

---

## 📦 Using the Published Package

Once published, install in any project:

```bash
# Configure npm for GitHub Packages (one-time per machine)
npm config set @swinburne-dev:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN

# Install the package
npm install @swinburne-dev/layout
```

Or create `.npmrc` in your project:

```properties
@swinburne-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Then:

```bash
npm install @swinburne-dev/layout
```

---

## 🔍 Verify Publishing

After publishing, check your package:

**GitHub URL:**
https://github.com/swinburnedev/swin-dev-nx/packages

**Or view via npm CLI:**

```bash
npm view @swinburne-dev/layout
```

---

## 🔄 Updating Your Package

To publish a new version:

1. **Update version** in `libs/layout/package.json`:

   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Follow semantic versioning:**

   - `1.0.0` → `1.0.1` = bug fix (patch)
   - `1.0.0` → `1.1.0` = new feature (minor)
   - `1.0.0` → `2.0.0` = breaking change (major)

3. **Publish:**
   ```bash
   nx build layout --configuration=production
   cd dist/libs/layout
   npm publish
   ```

**Or automatically via GitHub Actions:**

- Push to main with version update
- Workflow runs automatically
- Package publishes if tests pass

---

## 🛡️ Security Checklist

- ✅ `.npmrc` uses `${NPM_TOKEN}` environment variable
- ✅ `.npmrc.local` added to `.gitignore`
- ✅ Token never committed to repository
- ✅ Can revoke token anytime at https://github.com/settings/tokens
- ✅ GitHub Actions uses built-in `GITHUB_TOKEN` (more secure)
- ✅ Access control via GitHub permissions

---

## ❓ Troubleshooting

### "401 Unauthorized"

```bash
# Verify token
echo $NPM_TOKEN

# Reconfigure if needed
npm login --scope=@swinburne-dev --registry=https://npm.pkg.github.com
```

### "403 Forbidden"

- Token missing `write:packages` scope
- Create new token with proper scopes

### "404 Not Found"

- Registry not configured when installing
- Run: `npm config set @swinburne-dev:registry https://npm.pkg.github.com`

### Package Already Exists

- Increment version number in `libs/layout/package.json`
- Try publishing again

---

## 📞 Help

For detailed instructions:

- **Quick Start:** `docs/GITHUB_PACKAGES_QUICK_START.md`
- **Complete Guide:** `docs/GITHUB_PACKAGES_SETUP.md`
- **Publishing:** `docs/PUBLISHING_LAYOUT.md`

---

## ✨ What's Configured

```
✅ GitHub Packages enabled
✅ .npmrc configured with GitHub registry
✅ Environment variable support (${NPM_TOKEN})
✅ GitHub Actions workflow for automated publishing
✅ Security best practices (no token commits)
✅ Package.json ready for GitHub Packages
✅ Complete documentation
```

---

## 🎯 Recommended Workflow

1. **Local Development:**

   - Edit `libs/layout/src/`
   - Run tests: `nx test layout`
   - Commit changes

2. **Ready to Publish:**

   - Update version in `libs/layout/package.json`
   - Push to main
   - GitHub Actions automatically publishes!

3. **Use in Projects:**
   - Install: `npm install @swinburne-dev/layout`
   - Import: `import { Layout } from '@swinburne-dev/layout'`

---

## 📊 Summary

| Feature          | Status         |
| ---------------- | -------------- |
| GitHub Packages  | ✅ Configured  |
| .npmrc           | ✅ Ready       |
| GitHub Actions   | ✅ Ready       |
| Documentation    | ✅ Complete    |
| Security         | ✅ Implemented |
| Package Metadata | ✅ Set up      |

---

**You're all set!** 🚀

Start publishing your layout package to GitHub Packages now!
