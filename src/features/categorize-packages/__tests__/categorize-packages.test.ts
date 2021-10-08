import { categorizePackages } from '../categorize-packages';

describe('features categorize packages', () => {
  describe('categorizePackages', () => {
    const package1 = {
      packageName: 'project1',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project1',
      shouldPublish: false,
    };

    const package2 = {
      packageName: 'project2',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project2',
      shouldPublish: false,
    };

    const package3 = {
      packageName: 'project3',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project3',
      shouldPublish: false,
    };

    const package4 = {
      packageName: 'project4',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project4',
      shouldPublish: true,
    };

    const package5 = {
      packageName: 'project5',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project5',
      shouldPublish: false,
    };

    const package6 = {
      packageName: 'project6',
      projectFolder: 'src/features/categorize-packages/__mocks__/mocked-projects/project6',
      shouldPublish: true,
    };

    it('should categorize rush packages by deploy category', () => {
      const rushPackages: RushPackage[] = [package1, package2];

      const result = categorizePackages(rushPackages);

      const deployCategory1 = result.byDeployCategory.deployCategory1;

      expect(deployCategory1).toHaveLength(1);
      expect(deployCategory1[0].packageName).toBe('project1');

      const deployCategory2 = result.byDeployCategory.deployCategory2;

      expect(deployCategory2).toHaveLength(1);
      expect(deployCategory2[0].packageName).toBe('project2');
    });

    it('should categorize multiple packages into same deploy category', () => {
      const rushPackages: RushPackage[] = [package2, package3];

      const result = categorizePackages(rushPackages);

      const deployCategory1 = result.byDeployCategory.deployCategory1;

      expect(deployCategory1).toBeUndefined();

      const deployCategory2 = result.byDeployCategory.deployCategory2;

      expect(deployCategory2).toHaveLength(2);
      expect(deployCategory2[0].packageName).toBe('project2');
      expect(deployCategory2[1].packageName).toBe('project3');
    });

    it('should categorize rush packages by deploy category', () => {
      const rushPackages: RushPackage[] = [package1, package2];

      const result = categorizePackages(rushPackages);

      const deployCategory1 = result.byDeployCategory.deployCategory1;

      expect(deployCategory1).toHaveLength(1);
      expect(deployCategory1[0].packageName).toBe('project1');

      const deployCategory2 = result.byDeployCategory.deployCategory2;

      expect(deployCategory2).toHaveLength(1);
      expect(deployCategory2[0].packageName).toBe('project2');
    });

    it('should categorize publishable packages', () => {
      const rushPackages: RushPackage[] = [package4];

      const result = categorizePackages(rushPackages);

      const shouldPublish = result.shouldPublish as RushPackage[];

      expect(shouldPublish).toHaveLength(1);
      expect(shouldPublish[0].packageName).toBe('project4');
    });

    it('should categorize multiple publishable packages', () => {
      const rushPackages: RushPackage[] = [package4, package6];

      const result = categorizePackages(rushPackages);

      const shouldPublish = result.shouldPublish as RushPackage[];

      expect(shouldPublish).toHaveLength(2);
      expect(shouldPublish[0].packageName).toBe('project4');
      expect(shouldPublish[1].packageName).toBe('project6');
    });

    it('should not categorize packages without deploy category', () => {
      const rushPackages: RushPackage[] = [package5];

      const result = categorizePackages(rushPackages);

      const shouldPublish = result.shouldPublish as RushPackage[];

      expect(shouldPublish).toBeUndefined();

      const byDeployCategory = result.byDeployCategory;

      expect(byDeployCategory).toEqual({});
    });
  });
});
