import { mergeTests } from '@playwright/test';
import { test as fillPracticeForm } from './fillPracticeForm';
import { test as consoleLogText } from './consoleLogText';
import { test as dashboard } from './selectDashboardOptions';

export const test = mergeTests(fillPracticeForm, consoleLogText, dashboard);
