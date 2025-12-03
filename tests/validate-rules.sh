#!/bin/bash

# validate-rules.sh
# Validates markdown rule files for proper formatting and structure

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "================================================"
echo "  rules.d - Rule File Validation"
echo "================================================"
echo ""

# Function to check if a markdown file has a title
check_title() {
    local file="$1"
    if head -1 "$file" | grep -q "^# "; then
        return 0
    else
        return 1
    fi
}

# Function to check if file is not empty
check_not_empty() {
    local file="$1"
    if [ -s "$file" ]; then
        return 0
    else
        return 1
    fi
}

# Function to check for required sections
check_sections() {
    local file="$1"
    
    # Check for at least one heading
    if ! grep -q "^## " "$file"; then
        echo -e "  ${YELLOW}Warning: No level-2 headings found${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    return 0
}

# Function to check markdown formatting
check_formatting() {
    local file="$1"
    local line_num=0
    local local_warnings=0
    
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Check for tabs (should use spaces)
        if [[ "$line" == *$'\t'* ]]; then
            if [ $local_warnings -lt 5 ]; then  # Limit warnings
                echo -e "  ${YELLOW}Warning (line $line_num): Tab character found (use spaces)${NC}"
            fi
            WARNINGS=$((WARNINGS + 1))
            local_warnings=$((local_warnings + 1))
        fi
        
    done < "$file"
    
    return 0
}

# Function to validate a single file
validate_file() {
    local file="$1"
    local relative_path="${file#$REPO_ROOT/}"
    local file_errors=0
    
    echo -e "\nChecking: ${relative_path}"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo -e "  ${RED}Error: File not found${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
    
    # Check if file is not empty
    if ! check_not_empty "$file"; then
        echo -e "  ${RED}Error: File is empty${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
    
    # Check for title
    if ! check_title "$file"; then
        echo -e "  ${RED}Error: Missing title (should start with '# ')${NC}"
        file_errors=$((file_errors + 1))
    fi
    
    # Check sections
    check_sections "$file"
    
    # Check formatting (limited)
    check_formatting "$file"
    
    if [ $file_errors -eq 0 ]; then
        echo -e "  ${GREEN}✓ Passed${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "  ${RED}✗ Failed${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Find and validate all markdown files in rule directories
echo "Validating rule files..."

# Define rule directories
RULE_DIRS=("general" "coding" "writing" "research" "communication" "data" "project-management" "security" "devops")

for dir in "${RULE_DIRS[@]}"; do
    if [ -d "$REPO_ROOT/$dir" ]; then
        for file in "$REPO_ROOT/$dir"/*.md; do
            if [ -f "$file" ]; then
                validate_file "$file"
            fi
        done
    fi
done

# Also validate docs directory
if [ -d "$REPO_ROOT/docs" ]; then
    echo -e "\n\nValidating documentation files..."
    for file in "$REPO_ROOT/docs"/*.md; do
        if [ -f "$file" ]; then
            validate_file "$file"
        fi
    done
fi

# Summary
echo ""
echo "================================================"
echo "  Validation Summary"
echo "================================================"
echo -e "  ${GREEN}Passed:${NC}   $PASSED"
echo -e "  ${RED}Failed:${NC}   $FAILED"
echo -e "  ${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Validation failed with $FAILED errors${NC}"
    exit 1
else
    echo -e "${GREEN}All validation checks passed!${NC}"
    exit 0
fi
