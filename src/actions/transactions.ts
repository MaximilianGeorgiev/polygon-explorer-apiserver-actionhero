import { Action } from "actionhero";
import Web3 from 'web3';

const web3 = new Web3('https://polygon-rpc.com/');

export class LatestTransaction extends Action {
    constructor() {
        super();
        this.name = "latestTransaction";
        this.description = "Fetches the latest transaction.";
    }

    async run() {
        let response;
        let latestBlock;

        await web3.eth.getBlock('latest', true, () => { })
            .then(value => {
                latestBlock = JSON.parse(JSON.stringify(value));
            });

        const transactionsCount = latestBlock.transactions.length - 1; // last TX
        const blockNumber = latestBlock.number;

        await web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };
    }
}

export class PendingTransactions extends Action {
    constructor() {
        super();
        this.name = "pendingTransactions";
        this.description = "Fetches the pending and unvalidated transactions.";
    }

    async run() {
        let response = {};

        await web3.eth.getPendingTransactions().then((value) => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };
    }
}

export class TransactionsCountByAddress extends Action {
    constructor() {
        super();
        this.name = "transactionsCountByAddress";
        this.description = "Fetches the transactions of a specific Polygon address.";

        this.inputs = {
            address: {
                required: true
            }
        };
    }

    async run(data) {
        let response = {};

        await web3.eth.getTransactionCount(data.params.address).then((value) => {
            response = JSON.parse(JSON.stringify(value));
        });

        return { response: response };
    };
}

export class TransactionsByHash extends Action {
    constructor() {
        super();
        this.name = "transactionByHash";
        this.description = "Provides detailed information about a specific transaction hash.";

        this.inputs = {
            hash: {
                required: true
            }
        };
    }

    async run(data) {
        let response = {};

        await web3.eth.getTransaction(data.params.hash).then((value) => {
            response = JSON.parse(JSON.stringify(value));
        })

        return { response: response };
    };
}