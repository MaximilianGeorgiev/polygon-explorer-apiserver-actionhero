import { Action } from "actionhero";
import Web3 from 'web3';

const web3 = new Web3('https://polygon-rpc.com/');

export class LatestBlock extends Action {
    constructor() {
        super();
        this.name = "latestBlock";
        this.description = "Get the latest validated block with all transactions.";
    }

    async run() {
        let response = {};

        await web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };

    }
}

export class PendingBlocks extends Action {
    constructor() {
        super();
        this.name = "pendingBlocks";
        this.description = "Fetch all pending blocks awaiting validation.";
    }

    async run() {
        let response = {};

        await web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };
    }
}

export class BlockByNumberOrHash extends Action {
    constructor() {
        super();
        this.name = "blockByNumberOrHash";
        this.description = "Search for a specific block either by block hash or block number.";

        this.inputs = {
            block: {
                required: true
            }
        };
    }

    async run(data) {
        let response = {};

        await web3.eth.getBlock(data.params.block, true, (error, result) => {
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };
    }
}

export class MultipleBlocksAfterThreshold extends Action {
    constructor() {
        super();
        this.name = "multipleBlocksAfterThreshold";
        this.description = "Get X blocks starting from a specific block.";

        this.inputs = {
            fromBlock: {
                required: true
            },
            count: {
                required: true,
                validator: (param) => {
                    if (param <= 0) {
                        throw new Error('Blocks count must be a positive number.');
                    }
                }
            }
        };
    }

    async run(data) {
        let response = [];

        await web3.eth.getBlock('latest', false, (error, result) => { }).then((value) => {
            const startBlockNumber = value.number - data.params.fromBlock; // get latest block number for calculations
            const blockCount = data.params.count;

            let fetchedBlocks = [];

            for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
                web3.eth.getBlock(i, false, (error, result) => { }).then((value) => {
                    fetchedBlocks.push(value);

                    if (i == startBlockNumber - blockCount) {
                        return { response: response };
                    }
                })
            }
        });
    }
}