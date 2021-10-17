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