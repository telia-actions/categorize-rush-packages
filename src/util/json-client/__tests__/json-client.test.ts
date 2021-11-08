import { readJson, readJsonWithComments } from '../json-client';
import jsonMock from '../__mocks__/mock';

describe('json client utilities', () => {
  describe('readJson method', () => {
    const path = 'src/util/json-client/__mocks__/mock.json';
    it('should parse json file content', () => {
      const result = readJson(path);
      expect(result).toEqual(jsonMock);
    });
  });
  describe('readJsonWithComments method', () => {
    const path = 'src/util/json-client/__mocks__/mock-comments.json';
    it('should parse json file content', () => {
      const result = readJsonWithComments(path);
      expect(result).toEqual(jsonMock);
    });
  });
});
