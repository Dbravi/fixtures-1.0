#!/bin/bash
set -e

# 1. Run the first set of tests and save the blob report
echo "Running first test set..."
PLAYWRIGHT_BLOB_OUTPUT_FILE=blob-report/report-1.zip npx playwright test test1

# 2. Run the second set of tests and save the blob report
echo "Running second test set..."
PLAYWRIGHT_BLOB_OUTPUT_FILE=blob-report/report-2.zip npx playwright test test2

# 3. Merge the blob reports into a single HTML report
echo "Merging reports into a single HTML report..."
npx playwright merge-reports --reporter html blob-report

echo "Done merging!"

echo "Opening report..."
npx playwright show-report
