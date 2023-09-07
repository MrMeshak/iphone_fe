import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  verbose: true,
};

export default config;
