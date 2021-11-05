import path from 'path';
import { readJson } from '@src/util/json-client';

export const categorizeProjects = (rushProjects: RushProject[]): CategorizationResult => {
  const result: CategorizationResult = {
    category: {},
  };

  return rushProjects.reduce<CategorizationResult>((categories, project) => {
    updatePackageCategories(project, categories);
    return categories;
  }, result);
};

const updatePackageCategories = (project: RushProject, output: CategorizationResult): void => {
  const { category } = output;
  const { projectFolder, shouldPublish } = project;
  const packageJsonPath = path.resolve(projectFolder, 'package.json');
  const { deployCategory } = readJson(packageJsonPath);
  if (deployCategory) {
    if (!category[deployCategory]) {
      category[deployCategory] = [];
    }
    category[deployCategory].push(project);
  }
  if (shouldPublish) {
    if (!category.npmPublish) {
      category.npmPublish = [];
    }
    category.npmPublish.push(project);
  }
};
