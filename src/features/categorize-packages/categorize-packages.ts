import path from 'path';
import { CategorizationResult } from './types';
import { read } from '../../services/json-client';

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

  const { deployCategory } = read(packageJsonPath);

  if (deployCategory) {
    if (!byDeployCategory[deployCategory]) {
      byDeployCategory[deployCategory] = [];
    }
    byDeployCategory[deployCategory].push(pkg);
  }

  if (shouldPublish) {
    if (!output.npmPublish) {
      output.npmPublish = [];
    }
    output.npmPublish.push(pkg);
  }
};
