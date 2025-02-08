import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TraviaContract } from '../wrappers/TraviaContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TraviaContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TraviaContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let traviaContract: SandboxContract<TraviaContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        traviaContract = blockchain.openContract(TraviaContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await traviaContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: traviaContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and traviaContract are ready to use
    });
});
