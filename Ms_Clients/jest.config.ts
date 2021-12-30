/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/config/*.ts"],
  coverageProvider: "v8",
  preset: "ts-jest",
  // testTimeout:100000
};
