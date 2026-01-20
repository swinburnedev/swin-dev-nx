# Copilot Instructions for swin-dev-nx

## Workspace Overview

This is an **Nx monorepo** containing a full-stack portfolio application with:

- **Frontend**: Next.js app (`apps/swinburne-dev`) with React components and GraphQL integration
- **Backend**: NestJS API (`apps/swinburne-dev-nest`) serving portfolio data
- **Shared Libraries**:
  - `libs/shared/ui` - Tailwind + React components (shared across apps)
  - `libs/shared/mdx-elements` - MDX rendering components
  - `libs/gtag` - Google Analytics integration
  - `libs/markdown-parser` - Markdown processing utilities
- **Testing**: Cypress (e2e), Jest (unit), Playwright (e2e)
- **Documentation**: Storybook for component library (Storybook 8 migrated)

## Architecture Patterns

### Path Aliases & Module Resolution

All internal packages use `@swin-dev-nx/*` path aliases defined in `tsconfig.base.json`:

```
@swin-dev-nx/shared/ui → libs/shared/ui/src/index.ts
@swin-dev-nx/shared/mdx-elements/* → libs/shared/mdx-elements/src/lib/*
@swin-dev-nx/gtag → libs/gtag/src/index.ts
@swin-dev-nx/markdown-parser → libs/markdown-parser/src/index.ts
```

### Frontend Integration Points

- **Contentful CMS**: Apollo Client in `apps/swinburne-dev/apollo/client.ts` fetches from Contentful GraphQL API
- **Next.js Structure**: Hybrid app router (`app/layout.tsx`) + Pages router (`pages/`)
- **Styling**: Tailwind CSS with styled-components support
- **Component Library**: UI components live in `libs/shared/ui`, imported as `@swin-dev-nx/shared/ui`

### Backend (NestJS)

- Bootstraps with global prefix `/api` (see `apps/swinburne-dev-nest/src/main.ts`)
- Default port 3000, configurable via `PORT` env var
- E2E tests in `apps/swinburne-dev-nest-e2e` use axios with test setup in `src/support/test-setup.ts`

## Critical Developer Commands

### Core Nx Commands

- `nx serve` - Start dev server (defaults to swinburne-dev frontend)
- `nx build <app>` - Build application/library
- `nx test <project>` - Run Jest tests
- `nx e2e <project>` - Run Cypress e2e tests
- `nx affected:test` - Run tests only for changed projects
- `nx affected:e2e` - Run e2e tests for affected projects
- `nx graph` - Visualize monorepo dependency graph

### Storybook

```bash
nx storybook shared-ui        # Serve Storybook
nx build-storybook shared-ui  # Build Storybook
```

### Custom Generators

```bash
nx workspace-generator new-project "[title]" --excerpt="excerpt"
# Creates .mdx portfolio project file in ./_projects/
```

## Testing Strategy

### Jest Configuration

- Preset: `jest.preset.js` at workspace root
- Next.js app uses babel-jest: `'^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }]`
- React libraries use babel-jest: `'^.+\\.[tj]sx?$': ['babel-jest']`
- Node/NestJS use ts-jest
- Snapshot format: `{ escapeString: true, printBasicPrototype: true }`

### Mock Pattern (from `apps/swinburne-dev/app/home-page.test.tsx`)

```typescript
jest.mock("@swin-dev-nx/shared/ui", () => ({
  ...jest.requireActual("@swin-dev-nx/shared/ui"),
  ImageCaption: ({alt, caption, url}: ...) => (...)
}))
```

### E2E Testing

- **Cypress**: For integration tests (Cypress preset via `@nx/cypress/plugins`)
- **Playwright**: For advanced e2e (config in `playwright.config.base.ts`)
- Base config pattern: Playwright tests extend shared config

## Nx Caching & Build Dependencies

### Target Defaults (`nx.json`)

- `build`: Caches via `production` input, depends on `^build`
- `test` (@nx/jest:jest): Caches with `passWithNoTests: true`
- `lint` (@nx/eslint:lint): Caches, uses `.eslintrc.json` as input
- Storybook: Caches with workspace `.storybook/**/*` and project-specific configs

### Critical: Dependencies

- Backend build depends on its dependencies: `"dependsOn": ["^build"]`
- Never skip `nx affected` checks - these determine what tests to run

## Convention & Style

### Component Generation

Generate shared UI components with explicit style option:

```bash
npx nx generate @nx/react:component BackButton \
  --project=shared-ui \
  --style=none \
  --export \
  --no-interactive
```

### File Organization

- Components: `src/` (varies by project type)
- Tests: Colocated with `.test.tsx` or `.spec.ts` suffix
- MDX files: Portfolio projects in `apps/swinburne-dev/_projects/*.mdx`
- Assets: Static files in `public/` (frontend); `src/assets` (backend)

### Environment Variables

- Frontend: `.env.local` (Next.js convention)
- Contentful: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT`, `CONTENTFUL_ACCESS_TOKEN`
- Backend: `PORT` (defaults to 3000)

## Key Files to Reference

| File                                  | Purpose                                        |
| ------------------------------------- | ---------------------------------------------- |
| `nx.json`                             | Workspace config, caching, generators defaults |
| `tsconfig.base.json`                  | Path aliases for `@swin-dev-nx/*` imports      |
| `jest.preset.js`                      | Shared Jest configuration                      |
| `apps/swinburne-dev/next.config.js`   | Next.js build configuration                    |
| `apps/swinburne-dev-nest/src/main.ts` | NestJS bootstrap                               |
| `libs/shared/ui/src/index.ts`         | Shared component exports                       |
| `apps/swinburne-dev/apollo/client.ts` | Contentful GraphQL client                      |

## Common Pitfalls

1. **Import paths**: Always use `@swin-dev-nx/*` for workspace libraries, not relative paths
2. **Affected targets**: Use `nx affected:test` to validate changes before pushing; misses can break CI
3. **Storybook**: Migrated to Storybook 8 - check `storybook-migration-summary.md` for context
4. **NestJS bootstrap**: Global `/api` prefix is set in code, not Nx config
5. **Test coverage**: Jest passWithNoTests is enabled, but write tests anyway for shared-ui components
