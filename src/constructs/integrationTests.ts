import * as nodeLambda from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

interface IntegrationTestsProps {
  testEntry: string;
  timeout: cdk.Duration;

  /** These values will be passed into the context of your tests */
  properties?: Record<string, string>;
}

export class IntegrationTests extends cdk.Construct implements iam.IGrantable {
  private handler: lambda.IFunction;

  constructor(scope: cdk.Construct, id: string, props: IntegrationTestsProps) {
    super(scope, id);

    this.handler = new nodeLambda.NodejsFunction(this, 'TestRunner', {
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: props.timeout,
      bundling: {
        define: {
          "process.env.TEST_FILE": `"${props.testEntry}"`,
        },
      }
    });

    new cdk.CustomResource(this, 'IntegrationTestResource', {
      serviceToken: this.handler.functionArn,
      properties: {
        ...props.properties,
        Version: new Date().toISOString()
      }
    });
  }

  get grantPrincipal(): iam.IPrincipal {
    return this.handler.grantPrincipal;
  }
}