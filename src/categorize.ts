import { setOutput, setFailed, getInput } from '@actions/core';
import { categorizePackages } from './features/categorize-packages';

export const categorize = (): void => {
  try {
    const rushProjectsInput = getInput('rushProjects');

    const rushProjects: RushPackage[] = JSON.parse(rushProjectsInput);

    const categories = categorizePackages(rushProjects);

    for (const [category, packages] of Object.entries(categories.byDeployCategory)) {
      setOutput(category, packages);
    }

    setOutput('npm-package', categories.npmPublish);
  } catch (e) {
    setFailed(e.message);
  }
};
