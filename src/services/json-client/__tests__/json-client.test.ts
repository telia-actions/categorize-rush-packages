import { read } from '../json-client';

describe('services json client', () => {
  describe('read', () => {
    const path = 'path';

    it('should read json file contents', async () => {
      const result = await read('./__mocks__/mock-file.json');

      expect(result).toEqual({ prop1: 'prop1', prop2: 'prop2' });
    });
  });
});
