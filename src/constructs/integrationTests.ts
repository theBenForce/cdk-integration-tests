import * as nodeLambda from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

interface IntegrationTestsProps {
  testEntry: string;
}

export class IntegrationTests extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: IntegrationTestsProps) {
    super(scope, id);

    const handler = new nodeLambda.NodejsFunction(this, 'TestRunner', {
      runtime: lambda.Runtime.NODEJS_14_X,
      bundling: {
        define: {
          "process.env.TEST_FILE": `"${props.testEntry}"`,
        },
      }
    });

    new cdk.CustomResource(this, 'IntegrationTestResource', {
      serviceToken: handler.functionArn,
      properties: {
        Version: new Date().toISOString()
      }
    });
  }
}