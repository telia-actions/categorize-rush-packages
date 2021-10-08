import { setOutput, setFailed, getInput, debug } from '@actions/core';
import { categorizePackages } from './features/categorize-packages';

export const categorize = (): void => {
  try {
    const rushProjectsInput = getInput('rushProjects');

    const rushProjects: RushPackage[] = JSON.parse(rushProjectsInput);

    const categories = categorizePackages(rushProjects);

    debug(JSON.stringify(categories, null, 2));

    for (const [category, packages] of Object.entries(categories.byDeployCategory)) {
      setOutput(category, packages);
    }

    setOutput('should-publish', categories.shouldPublish);
  } catch (e) {
    setFailed(e.message);
  }
};
