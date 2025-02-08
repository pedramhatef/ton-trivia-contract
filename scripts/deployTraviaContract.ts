import { toNano } from '@ton/core';
import { TraviaContract } from '../wrappers/TraviaContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const traviaContract = provider.open(TraviaContract.createFromConfig({}, await compile('TraviaContract')));

    await traviaContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(traviaContract.address);

    // run methods on `traviaContract`
}
