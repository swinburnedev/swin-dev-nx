# @swinburne-dev/layout

A React layout component for the Swinburne Dev portfolio site, featuring Navbar and Footer integration.

## Installation

```bash
npm install @swinburne-dev/layout
```

## Usage

```tsx
import { Layout } from '@swinburne-dev/layout';

export default function Page() {
  return (
    <Layout title="Home">
      <div>Your page content</div>
    </Layout>
  );
}
```

## Props

- `children: React.ReactNode` - The content to render inside the layout
- `title: string` - The page title (displays in browser tab as "title | Swinburne Dev")

## Development

```bash
# Run tests
nx test layout

# Build library
nx build layout

# Lint
nx lint layout
```

## Publishing

This package is published to a private npm registry. Configuration is in `package.json` under `publishConfig`.

To publish a new version:

```bash
nx build layout
cd dist/libs/layout
npm publish
```
