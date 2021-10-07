import path from 'path';

export const categorize = (rushPackages: RushPackage[]): CategorizationResult => {
  const result: CategorizationResult = {
    byDeployCategory: {},
    distinct: [],
    npm: [],
  };

  return rushPackages.reduce<CategorizationResult>((categories, _package) => {
    updatePackageCategories(_package, categories);
    return categories;
  }, result);
};

const updatePackageCategories = (pkg: RushPackage, output: CategorizationResult): void => {
  console.log(pkg);

  const { byDeployCategory, distinct, npm } = output;
  const { projectFolder, shouldPublish } = pkg;

  const packageJsonPath = path.resolve(projectFolder, 'package.json');

  const { deployCategory } = require(packageJsonPath);

  if (deployCategory) {
    if (!byDeployCategory[deployCategory]) {
      byDeployCategory[deployCategory] = [];
    }
    byDeployCategory[deployCategory].push(projectFolder);
  }

  if (shouldPublish) {
    npm.push(projectFolder);
  }

  if (!distinct.includes(projectFolder)) {
    distinct.push(projectFolder);
  }
};
