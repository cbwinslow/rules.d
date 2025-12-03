#!/bin/bash

# check-structure.sh
# Validates the directory structure of the rules.d repository

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "================================================"
echo "  rules.d - Directory Structure Check"
echo "================================================"
echo ""

PASSED=0
FAILED=0
WARNINGS=0

# Function to check if directory exists
check_dir() {
    local dir="$1"
    local required="$2"
    
    if [ -d "$REPO_ROOT/$dir" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $dir"
        PASSED=$((PASSED + 1))
        return 0
    else
        if [ "$required" = "required" ]; then
            echo -e "${RED}✗${NC} Missing required directory: $dir"
            FAILED=$((FAILED + 1))
            return 1
        else
            echo -e "${YELLOW}!${NC} Optional directory not found: $dir"
            WARNINGS=$((WARNINGS + 1))
            return 0
        fi
    fi
}

# Function to check if file exists
check_file() {
    local file="$1"
    local required="$2"
    
    if [ -f "$REPO_ROOT/$file" ]; then
        echo -e "${GREEN}✓${NC} File exists: $file"
        PASSED=$((PASSED + 1))
        return 0
    else
        if [ "$required" = "required" ]; then
            echo -e "${RED}✗${NC} Missing required file: $file"
            FAILED=$((FAILED + 1))
            return 1
        else
            echo -e "${YELLOW}!${NC} Optional file not found: $file"
            WARNINGS=$((WARNINGS + 1))
            return 0
        fi
    fi
}

# Function to check if directory has at least one markdown file
check_has_rules() {
    local dir="$1"
    
    if [ -d "$REPO_ROOT/$dir" ]; then
        if ls "$REPO_ROOT/$dir"/*.md >/dev/null 2>&1; then
            local count
            count=$(ls "$REPO_ROOT/$dir"/*.md 2>/dev/null | wc -l)
            echo -e "${GREEN}✓${NC} $dir contains $count rule file(s)"
            PASSED=$((PASSED + 1))
            return 0
        else
            echo -e "${RED}✗${NC} $dir has no markdown files"
            FAILED=$((FAILED + 1))
            return 1
        fi
    fi
}

echo "Checking required directories..."
echo ""

# Check required category directories
check_dir "general" "required"
check_dir "coding" "required"
check_dir "writing" "required"
check_dir "research" "required"
check_dir "communication" "required"
check_dir "data" "required"
check_dir "project-management" "required"
check_dir "security" "required"
check_dir "devops" "required"

echo ""
echo "Checking optional directories..."
echo ""

# Check optional directories
check_dir "docs" "optional"
check_dir "tests" "optional"
check_dir ".github" "optional"
check_dir ".github/workflows" "optional"

echo ""
echo "Checking required files..."
echo ""

# Check required files
check_file "README.md" "required"
check_file "general/rules.md" "required"
check_file "coding/rules.md" "required"
check_file "writing/rules.md" "required"
check_file "research/rules.md" "required"
check_file "communication/rules.md" "required"
check_file "data/rules.md" "required"
check_file "project-management/rules.md" "required"
check_file "security/rules.md" "required"
check_file "devops/rules.md" "required"

echo ""
echo "Checking optional files..."
echo ""

# Check optional files
check_file "CATALOG.md" "optional"
check_file "CHANGELOG.md" "optional"
check_file "LICENSE" "optional"
check_file "docs/rule-format.md" "optional"
check_file "docs/usage-guide.md" "optional"
check_file "docs/contributing.md" "optional"

echo ""
echo "Checking rule content..."
echo ""

# Check each directory has rule files
check_has_rules "general"
check_has_rules "coding"
check_has_rules "writing"
check_has_rules "research"
check_has_rules "communication"
check_has_rules "data"
check_has_rules "project-management"
check_has_rules "security"
check_has_rules "devops"

# Summary
echo ""
echo "================================================"
echo "  Structure Check Summary"
echo "================================================"
echo -e "  ${GREEN}Passed:${NC}   $PASSED"
echo -e "  ${RED}Failed:${NC}   $FAILED"
echo -e "  ${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Structure check failed with $FAILED errors${NC}"
    exit 1
else
    echo -e "${GREEN}All structure checks passed!${NC}"
    exit 0
fi
