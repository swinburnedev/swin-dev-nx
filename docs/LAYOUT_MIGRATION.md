# Layout Component Migration Guide

## Overview

The `Layout` component has been extracted from `apps/swinburne-dev/components/layout` into a standalone, publishable npm package: `@swinburne-dev/layout`.

This allows the component to be:

- **Versioned independently** from the main application
- **Published to a private npm feed** for reuse across projects
- **Installed as a dependency** rather than directly imported from the monorepo

## What Changed

### Before

```tsx
import { Layout } from '../components/layout';
```

Local component in `apps/swinburne-dev/components/layout/`:

- `layout.tsx`
- `layout.types.ts`
- `layout.spec.tsx`
- `index.ts`

### After

```tsx
import { Layout } from '@swinburne-dev/layout';
```

Published as npm package: `@swinburne-dev/layout`

## Location Changes

**Old Location:**

```
apps/swinburne-dev/components/layout/
├── index.ts
├── layout.tsx
├── layout.types.ts
└── layout.spec.tsx
```

**New Location:**

```
libs/layout/
├── src/
│   ├── lib/
│   │   ├── layout.tsx
│   │   ├── layout.types.ts
│   │   └── layout.spec.tsx
│   └── index.ts
├── jest.config.ts
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── project.json
├── package.json
├── README.md
└── CONTRIBUTING.md
```

## Updated Files in Main App

All imports have been updated from relative paths to the npm package:

- ✅ `apps/swinburne-dev/pages/index.tsx`
- ✅ `apps/swinburne-dev/pages/contact.tsx`
- ✅ `apps/swinburne-dev/pages/projects/[slug].tsx`
- ✅ `apps/swinburne-dev/pages/projects/index.tsx`
- ✅ `apps/swinburne-dev/pages/projects/mdx.tsx`
- ✅ `apps/swinburne-dev/app/home-page.tsx`

## Development Workflow

### Building the Layout Package

```bash
# Build the library
nx build layout

# Build with production optimizations
nx build layout --configuration=production
```

### Testing

```bash
# Run tests for the layout package
nx test layout

# Run with coverage
nx test layout --coverage
```

### Linting

```bash
# Lint the layout package
nx lint layout
```

## Publishing to Private Registry

See `docs/PUBLISHING_LAYOUT.md` for complete publishing instructions.

### Quick Start

```bash
# 1. Build the package
nx build layout

# 2. Navigate to dist
cd dist/libs/layout

# 3. Publish
npm publish
```

## Next Steps

1. **Configure Private Registry**: Update `.npmrc` with your private registry URL
2. **Set Authentication**: Add your registry credentials as environment variables
3. **Build & Publish**: Follow steps in `docs/PUBLISHING_LAYOUT.md`
4. **Install in Other Projects**: Use `npm install @swinburne-dev/layout`

## FAQ

### Can I still develop layout locally?

Yes. The component still builds as part of the Nx workspace during development. Once published, you can use it in other projects.

### How do I make changes to the layout component?

Edit files in `libs/layout/src/`. Tests are in `libs/layout/src/lib/layout.spec.tsx`.

### What if I need to use it in another app in the monorepo?

Currently, you can use `nx` to reference it as a library dependency. After publishing to npm, you can install it like any other dependency.

### Why extract to a separate package?

This enables:

- **Version control**: Track breaking changes independently
- **Code reuse**: Share the component with other projects/teams
- **Team autonomy**: Separate teams can depend on the layout without tight coupling

## Rollback (if needed)

If you need to revert to the local component approach:

1. Restore from git history: `apps/swinburne-dev/components/layout/`
2. Update all imports back to relative paths: `import { Layout } from '../components/layout'`
3. Remove `@swinburne-dev/layout` from `package.json`
4. Delete `libs/layout/` directory

## Questions?

Refer to:

- **Publishing**: `docs/PUBLISHING_LAYOUT.md`
- **Package Details**: `libs/layout/README.md`
- **Contributing**: `libs/layout/CONTRIBUTING.md`
