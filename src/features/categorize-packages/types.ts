export type PackageCategories = {
  [key: string]: string[];
};

export type CategorizationResult = {
  byDeployCategory: PackageCategories;
  npm?: string[];
};
