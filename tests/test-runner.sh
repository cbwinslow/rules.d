#!/bin/bash

# test-runner.sh
# Main test runner for the rules.d repository

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           rules.d - Test Suite Runner                   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

TOTAL_PASSED=0
TOTAL_FAILED=0
START_TIME=$(date +%s)

# Function to run a test script
run_test() {
    local test_name="$1"
    local test_script="$2"
    
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Running: $test_name${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    if [ -f "$test_script" ]; then
        chmod +x "$test_script"
        if "$test_script"; then
            echo -e "\n${GREEN}✓ $test_name: PASSED${NC}"
            TOTAL_PASSED=$((TOTAL_PASSED + 1))
            return 0
        else
            echo -e "\n${RED}✗ $test_name: FAILED${NC}"
            TOTAL_FAILED=$((TOTAL_FAILED + 1))
            return 1
        fi
    else
        echo -e "${YELLOW}⚠ Test script not found: $test_script${NC}"
        return 1
    fi
}

# Run all tests
echo "Starting test suite..."

# Test 1: Directory Structure
run_test "Directory Structure Check" "$SCRIPT_DIR/check-structure.sh"

# Test 2: Rule File Validation
run_test "Rule File Validation" "$SCRIPT_DIR/validate-rules.sh"

# Test 3: Link Check (if check-links.sh exists)
if [ -f "$SCRIPT_DIR/check-links.sh" ]; then
    run_test "Link Validation" "$SCRIPT_DIR/check-links.sh"
fi

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Final summary
echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                   Test Suite Summary                     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Tests Run:    $((TOTAL_PASSED + TOTAL_FAILED))"
echo -e "  ${GREEN}Passed:${NC}       $TOTAL_PASSED"
echo -e "  ${RED}Failed:${NC}       $TOTAL_FAILED"
echo -e "  Duration:     ${DURATION}s"
echo ""

if [ $TOTAL_FAILED -gt 0 ]; then
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}                    TEST SUITE FAILED                      ${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    exit 1
else
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}                   ALL TESTS PASSED!                       ${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    exit 0
fi
