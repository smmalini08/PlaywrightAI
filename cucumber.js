require('ts-node/register');

module.exports = {
  default: {
    require: ['features/step_definitions/**/*.ts', 'features/page-objects/**/*.ts'],
    requireModule: ['ts-node/esm'],
    format: [
      'progress-bar',
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html',
      'junit:test-results/junit.xml'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 2,
    retryTagFilter: '@flaky',
    retry: 1
  }
};
