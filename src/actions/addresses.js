import { Action } from "actionhero";
import Web3 from 'web3';

const web3 = new Web3('https://polygon-rpc.com/');

export class AccountBalance extends Action {
    constructor() {
        super();
        this.name = "accountBalance";
        this.description = "Fetches the account balance of an address hash.";

        this.inputs = {
            address: {
                required: true
            }
        };
    }

    async run(data){
        let response;

        await web3.eth.getBalance(data.params.address).then(value => {
            response = JSON.parse(JSON.stringify(web3.utils.fromWei(value)));
        });

        return { response: response };
    }
}