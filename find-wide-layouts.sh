#!/usr/bin/env bash
# find-wide-layouts.sh
# Recursively search for layout-forcing patterns and print file:line:match
# Usage: ./find-wide-layouts.sh [dir]
# If no dir is given, current directory is used.

set -euo pipefail

DIR="${1:-.}"

# Extended regex patterns to search for
PATTERN='(min-w-\[|w-\[[0-9]+px|min-width:|transform:[[:space:]]*scale|min-w-)'

# Ignore binary files and skip unwanted directories
grep -rIEn --binary-files=without-match \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  --exclude-dir=build \
  --exclude-dir=.next \
  --exclude-dir=.cache \
  --exclude-dir=.vercel \
  --exclude-dir=coverage \
  -E "$PATTERN" "$DIR"
