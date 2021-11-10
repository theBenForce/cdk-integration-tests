import {Test} from 'uvu';
import * as assert from 'uvu/assert';

interface TestContext {
    Version: string;
}

export default (test: Test<TestContext>) => {
    test('First test', async (context) => {
        assert.not.equal(context.Version, undefined, 'version should be defined');
    });

    test.skip('Failing test', async (context) => {
        assert.equal(context.Version, '', 'test should fail');
    })
}