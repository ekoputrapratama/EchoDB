// Karma configuration
// Generated on Wed Aug 30 2017 09:13:08 GMT+0800 (Malay Peninsula Standard Time)
require('ts-node/register');
import WebsocketServer from './examples/koa-server';

const browsers = [
  'ChromeWithDevTools',
  // 'FirefoxAutoAllowGUM',
  'Edge',
  'Safari',
];
WebsocketServer.start(3000);
module.exports = function (config: any) {
  config.set({
    browserNoActivityTimeout: 50000,
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'dist/worker.js', included: false },
      'dist/sonicdb.js',
      'test/setup.js',
      { pattern: 'test/integration/**/*.spec.js', included: true },
    ],

    // list of files to exclude
    exclude: [],
    preprocessors: {
      'dist/*.js': ['coverage'],
    },
    client: {
      // captureConsole: true,
      // mocha: {
      //   opts: 'test/mocha.opts'
      // }
    },
    browserConsoleLogOptions: {
      level: 'log',
      terminal: true,
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    coverageReporter: {
      type: 'html',
      dir: 'gh-pages/coverage/',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    // web server port
    port: 1212,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_LOG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    autoWatchBatchDelay: 300,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers.filter(function (browser) {
      let statisfied = true;
      if (browser === 'Edge' && !process.platform.startsWith('win32')) {
        statisfied = false;
      }
      if (browser === 'Safari' && !process.platform.startsWith('darwin')) {
        statisfied = false;
      }
      return statisfied;
    }),
    customLaunchers: {
      ChromeWithDevTools: {
        base: 'Chrome',
        flags: ['--auto-open-devtools-for-tabs', '--disable-web-security'],
      },
      ChromeWithoutSecurity: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security'],
      },
      FirefoxAutoAllowGUM: {
        base: 'Firefox',
        prefs: {
          'media.navigator.permission.disabled': true,
        },
        flags: ['-headless'],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
    ],
  });
};
