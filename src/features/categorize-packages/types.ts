export type PackageCategories = {
  [key: string]: RushPackage[];
};

export type CategorizationResult = {
  byDeployCategory: PackageCategories;
  shouldPublish?: RushPackage[];
};
