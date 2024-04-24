const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "components/(.*)": "<rootDir>/src/components/$1",
    "pages/(.*)": "<rootDir>/src/pages/$1",
    "styles/(.*)": "<rootDir>/src/styles/$1",
    // "lib/(.*)": "<rootDir>/src/lib/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./public/test-report.html",
      },
    ],
  ],
};

module.exports = createJestConfig(config);
