import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/*.test.ts'],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
};

export default jestConfig;
