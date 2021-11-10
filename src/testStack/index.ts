import * as cdk from '@aws-cdk/core';

import { IntegrationTests } from '../constructs/integrationTests';

export class TestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    
    new IntegrationTests(this, `IntegrationTests`, {
      testEntry: require.resolve("./tests"),
    });
  }
}