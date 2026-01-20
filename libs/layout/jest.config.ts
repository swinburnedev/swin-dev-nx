/* eslint-disable */
export default {
  displayName: 'layout',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/../../__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/../../__mocks__/styleMock.js',
  },
  coverageDirectory: '../../coverage/libs/layout',
};
