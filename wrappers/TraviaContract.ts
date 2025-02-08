import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TraviaContractConfig = {};

export function traviaContractConfigToCell(config: TraviaContractConfig): Cell {
    return beginCell().endCell();
}

export class TraviaContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TraviaContract(address);
    }

    static createFromConfig(config: TraviaContractConfig, code: Cell, workchain = 0) {
        const data = traviaContractConfigToCell(config);
        const init = { code, data };
        return new TraviaContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
