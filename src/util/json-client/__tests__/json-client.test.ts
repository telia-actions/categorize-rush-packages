import jsonMock from '../__mocks__/mock';
import { readJson } from '../json-client';

describe('json client utilities', () => {
  describe('readJson method', () => {
    const path = 'src/util/json-client/__mocks__/mock.json';
    it('should parse json file content', () => {
      const result = readJson(path);
      expect(result).toEqual(jsonMock);
    });
  });
});
