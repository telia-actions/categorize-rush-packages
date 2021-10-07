import { setOutput, setFailed, getInput } from '@actions/core';
import { categorize } from './utils';

const run = (): void => {
  try {
    const rushProjectsInput = getInput('rushProjects');

    const rushProjects: RushPackage[] = JSON.parse(rushProjectsInput);

    const categories = categorize(rushProjects);

    setOutput('categories', categories);
  } catch (e) {
    setFailed(e.message);
  }
};

run();
