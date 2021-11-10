const { AwsCdkTypeScriptApp } = require('projen');
const { inspect } = require('util');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.130.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-integration-tests',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
  ], /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  deps: [
    'uvu@^0.5.2',
    'cfn-lambda@^5.1.0',
  ], /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['esbuild'],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  release: false, /* Add release management to this project. */
  github: false,
  buildWorkflow: false,
  pullRequestTemplate: false,
});

project.synth();