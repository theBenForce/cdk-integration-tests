import CfnLambda from 'cfn-lambda';
import { inspect } from 'util';
import {suite, exec} from 'uvu';

const runTests = async (properties: unknown) => {
    const test = suite('Integration Test', properties);

    const {default: initTests} = await import(process.env.TEST_FILE!);

    initTests(test);

    test.run();


    // @ts-ignore
    const result = await exec();
    console.info(inspect(result));

    if (process.exitCode) {
      throw new Error(`Tests Failed`);
    }
};

export const handler = CfnLambda({
  async AsyncCreate(properties) {
    console.info('Create', inspect({ properties}));
    
    await runTests(properties);

    return {
      FnGetAttrsDataObj: {
        TestPassed: true,
        Finished: new Date().toISOString(),
      },
    };
  },
  async AsyncUpdate(physicalId, properties, oldProperties) {
    console.info('Update', inspect({physicalId, properties, oldProperties}));
    await runTests(properties);
    return {
      FnGetAttrsDataObj: {
        TestPassed: true,
        Finished: new Date().toISOString(),
      },
    };
  },
  async AsyncDelete(physicalId, properties) {
    console.info('Delete', inspect({physicalId, properties}));

    return {
      FnGetAttrsDataObj: {},
    };
  },
});