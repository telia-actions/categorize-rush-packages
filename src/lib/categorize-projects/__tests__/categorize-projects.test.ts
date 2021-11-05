import { project1, project2, project3, project4, project5 } from '../__mocks__/projects';
import { categorizeProjects } from '../categorize-projects';

describe('categorize projects lib', () => {
  describe('categorizeProjects method', () => {
    it('should categorize rush packages by deploy category', () => {
      const rushProjects: RushProject[] = [project1, project2, project3];
      const result = categorizeProjects(rushProjects);
      const deployCategory = result.category.deployCategory1;
      expect(deployCategory).toHaveLength(2);
      expect(deployCategory).toContainEqual(expect.objectContaining(project1));
      expect(deployCategory).toContainEqual(expect.objectContaining(project2));
    });

    it('should categorize multiple publishable packages', () => {
      const rushProjects: RushProject[] = [project2, project3, project4];
      const result = categorizeProjects(rushProjects);
      const deployCategory = result.category.npmPublish;
      expect(deployCategory).toHaveLength(2);
      expect(deployCategory).toContainEqual(expect.objectContaining(project3));
      expect(deployCategory).toContainEqual(expect.objectContaining(project4));
    });

    it('should not categorize packages without deploy category', () => {
      const rushProjects: RushProject[] = [project5];
      const result = categorizeProjects(rushProjects);
      const deployCategory = result.category.npmPublish;
      expect(deployCategory).toBeUndefined();
    });
  });
});
