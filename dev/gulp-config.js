'use strict';

const srcBasePath = './src';
const buildBasePath = './dist';

let config = {};

config.srcPaths = {
  base: srcBasePath,
  html: [`${srcBasePath}/**/[^_]*.pug`],
  htmlAll: [`${srcBasePath}/**/*.pug`],
  js: `${srcBasePath}/**/*.js`,
  css: `${srcBasePath}/**/[^_]*.scss`,
  cssAll: `${srcBasePath}/**/*.scss`,
  img: [
    `${srcBasePath}/images/**/*.png`,
    `${srcBasePath}/images/**/*.jpg`,
    `${srcBasePath}/images/**/*.jpeg`,
    `${srcBasePath}/images/**/*.gif`
  ]
};

config.buildPaths = {
  base: buildBasePath,
  html: buildBasePath,
  js: `${buildBasePath}/js`,
  css: `${buildBasePath}/css`,
  img: `${buildBasePath}/images`
};

module.exports = config;
