import { getInput, setFailed, setOutput } from '@actions/core';
import { categorizeProjects } from '@src/lib/categorize-projects';
import { readJsonWithComments } from '@src/util/json-client';

export const run = (): void => {
  try {
    const rushJsonPath = getInput('rushJsonPath');
    const rushProjects: RushProject[] = readJsonWithComments(rushJsonPath).projects;
    const projectsByCategory = categorizeProjects(rushProjects);
    for (const [category, projects] of Object.entries(projectsByCategory.category)) {
      setOutput(category, projects);
    }
  } catch (error: any) {
    setFailed(error.message);
  }
};
