import { getInput, setFailed, setOutput } from '@actions/core';
import { categorizeProjects } from '@src/lib/categorize-projects';

export const run = (): void => {
  try {
    const rushProjectsInput = getInput('rushProjects');
    const rushProjects: RushProject[] = JSON.parse(rushProjectsInput);
    const projectsByCategory = categorizeProjects(rushProjects);
    for (const [category, projects] of Object.entries(projectsByCategory.category)) {
      setOutput(category, projects);
    }
    setOutput('preview', rushProjects.filter(p => p.packageName === "@telia/b2c-support"));
  } catch (error: any) {
    setFailed(error.message);
  }
};
