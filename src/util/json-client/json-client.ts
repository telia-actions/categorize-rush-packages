import fs from 'fs';

export const readJson = (path: string): any => {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

export const readJsonWithComments = (path: string): any => {
  return JSON.parse(
    fs
      .readFileSync(path, 'utf-8')
      .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (jsonKeyOrValue, comment) =>
        comment ? '' : jsonKeyOrValue
      )
  );
};
