import { mergeTests } from '@playwright/test';
import { test as fillPracticeForm } from './fillPracticeForm.fixture';
import { test as consoleLogText } from './consoleLogText.fixture';
import { test as dashboard } from './selectDashboardOptions.fixture';

export const test = mergeTests(fillPracticeForm, consoleLogText, dashboard);
