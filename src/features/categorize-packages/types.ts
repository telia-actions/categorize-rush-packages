export type PackageCategories = {
  [key: string]: string[];
};

export type CategorizationResult = {
  byDeployCategory: PackageCategories;
  shouldPublish?: string[];
};
