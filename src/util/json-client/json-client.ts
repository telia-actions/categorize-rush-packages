import fs from 'fs';

export const readJson = (path: string): any => {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};
