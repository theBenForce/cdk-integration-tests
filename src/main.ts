import * as cdk from '@aws-cdk/core';
import { TestStack } from './testStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new TestStack(app, 'integration-test-stack', {
  env: devEnv,
});

app.synth();