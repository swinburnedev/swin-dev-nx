#!/bin/bash

# Layout Component Extraction Verification Script
# This script verifies that the layout component has been properly extracted

echo "🔍 Verifying Layout Component Extraction Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0

# Check 1: Verify libs/layout directory exists
echo -n "✓ Checking libs/layout directory... "
if [ -d "libs/layout" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

# Check 2: Verify key files exist in libs/layout
echo -n "✓ Checking libs/layout/package.json... "
if [ -f "libs/layout/package.json" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

echo -n "✓ Checking libs/layout/project.json... "
if [ -f "libs/layout/project.json" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

echo -n "✓ Checking libs/layout/src/index.ts... "
if [ -f "libs/layout/src/index.ts" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

echo -n "✓ Checking libs/layout/src/lib/layout.tsx... "
if [ -f "libs/layout/src/lib/layout.tsx" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

# Check 3: Verify imports have been updated
echo -n "✓ Checking updated imports in pages/index.tsx... "
if grep -q "from '@swinburne-dev/layout'" apps/swinburne-dev/pages/index.tsx; then
    echo -e "${GREEN}Updated${NC}"
else
    echo -e "${RED}NOT UPDATED${NC}"
    ((errors++))
fi

echo -n "✓ Checking updated imports in app/home-page.tsx... "
if grep -q "from '@swinburne-dev/layout'" apps/swinburne-dev/app/home-page.tsx; then
    echo -e "${GREEN}Updated${NC}"
else
    echo -e "${RED}NOT UPDATED${NC}"
    ((errors++))
fi

# Check 4: Verify package.json has the dependency
echo -n "✓ Checking package.json for @swinburne-dev/layout dependency... "
if grep -q '"@swinburne-dev/layout"' package.json; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

# Check 5: Verify documentation exists
echo -n "✓ Checking docs/LAYOUT_MIGRATION.md... "
if [ -f "docs/LAYOUT_MIGRATION.md" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

echo -n "✓ Checking docs/PUBLISHING_LAYOUT.md... "
if [ -f "docs/PUBLISHING_LAYOUT.md" ]; then
    echo -e "${GREEN}Found${NC}"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

# Check 6: Verify .npmrc is configured
echo -n "✓ Checking .npmrc configuration... "
if [ -f ".npmrc" ]; then
    echo -e "${GREEN}Found${NC}"
    echo "  Note: Configure your private registry URL in .npmrc"
else
    echo -e "${RED}MISSING${NC}"
    ((errors++))
fi

echo ""
echo "📊 Verification Summary"
echo "========================"

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Configure your private registry in .npmrc"
    echo "2. Run: nx build layout"
    echo "3. Follow docs/PUBLISHING_LAYOUT.md to publish"
    echo ""
else
    echo -e "${RED}❌ ${errors} check(s) failed${NC}"
    echo ""
    echo "Please review the LAYOUT_EXTRACTION_SETUP.md file for details"
fi

exit $errors
