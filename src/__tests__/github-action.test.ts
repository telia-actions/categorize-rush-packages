import * as actionsCore from '@actions/core';
import * as lib from '@src/lib/categorize-projects';
import * as util from '@src/util/json-client';
import { project1, project2 } from '../__mocks__/projects';
import { run } from '../github-action';

jest.mock('@actions/core');
jest.mock('@src/util/json-client');
jest.mock('@src/lib/categorize-projects');

describe('github action', () => {
  beforeEach(() => {
    jest.spyOn(lib, 'categorizeProjects').mockReturnValue({
      category: {
        category1: [project1],
        category2: [project2],
        npmPublish: [project2],
      },
    });
    jest.spyOn(util, 'readJsonWithComments').mockReturnValue({
      projects: [],
    });
  });
  it('set outputs for every deploy category', () => {
    const setOutputSpy = jest.spyOn(actionsCore, 'setOutput');
    run();
    expect(setOutputSpy).toHaveBeenCalledTimes(3);
    expect(setOutputSpy).toHaveBeenNthCalledWith(1, 'category1', [project1]);
    expect(setOutputSpy).toHaveBeenNthCalledWith(2, 'category2', [project2]);
    expect(setOutputSpy).toHaveBeenNthCalledWith(3, 'npmPublish', [project2]);
  });
  describe('given that error occurs', () => {
    const errorMessage = 'mocked error';
    beforeEach(() => {
      jest.spyOn(actionsCore, 'getInput').mockImplementation(() => {
        throw new Error(errorMessage);
      });
    });
    it('should fail workflow and print out error', () => {
      const setFailedSpy = jest.spyOn(actionsCore, 'setFailed');
      run();
      expect(setFailedSpy).toHaveBeenCalledTimes(1);
      expect(setFailedSpy).toHaveBeenCalledWith(errorMessage);
    });
  });
});
