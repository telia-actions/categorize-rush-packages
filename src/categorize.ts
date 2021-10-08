import { setOutput, setFailed, getInput } from '@actions/core';
import { categorizePackages } from './features/categorize-packages';

export const categorize = (): void => {
  try {
    const rushProjectsInput = getInput('rushProjects');

    const rushProjects: RushPackage[] = JSON.parse(rushProjectsInput);

    const categories = categorizePackages(rushProjects);

    setOutput('categories', categories);
  } catch (e) {
    setFailed(e.message);
  }
};
