import path from 'path';
import { CategorizationResult } from './types';

export const categorizePackages = (rushPackages: RushPackage[]): CategorizationResult => {
  const result: CategorizationResult = {
    byDeployCategory: {},
  };

  return rushPackages.reduce<CategorizationResult>((categories, _package) => {
    updatePackageCategories(_package, categories);
    return categories;
  }, result);
};

const updatePackageCategories = (pkg: RushPackage, output: CategorizationResult): void => {
  const { byDeployCategory } = output;
  const { projectFolder, shouldPublish } = pkg;

  const packageJsonPath = path.resolve(projectFolder, 'package.json');

  const { deployCategory } = require(packageJsonPath);

  if (deployCategory) {
    if (!byDeployCategory[deployCategory]) {
      byDeployCategory[deployCategory] = [projectFolder];
    }
    byDeployCategory[deployCategory].push(projectFolder);
  }

  if (shouldPublish) {
    if (!output.npm) {
      output.npm = [];
    }
    output.npm.push(projectFolder);
  }
};
