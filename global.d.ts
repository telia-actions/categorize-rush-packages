interface PackageCategories {
  [key: string]: string[];
}

interface CategorizationResult {
  byDeployCategory: PackageCategories;
  distinct: string[];
  npm: string[];
}

interface RushPackage {
  packageName: string;
  projectFolder: string;
  shouldPublish: boolean;
}
