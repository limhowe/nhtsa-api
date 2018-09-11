import path from 'path';
import merge from 'lodash/merge';
import axios from 'axios';

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
    };
  },

  version: require('../../package.json').version,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 8888,
  nhtsaApiPrefix: 'https://one.nhtsa.gov/webapi/api/SafetyRatings',
};

// Recursively merge configurations
export default merge(defaultConfig);
