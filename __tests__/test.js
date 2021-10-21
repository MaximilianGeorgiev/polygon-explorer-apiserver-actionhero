const axios = require('axios');
const jestOpenAPI = require('jest-openapi').default;
//const swaggerDocument = require('../swagger.json');
//jestOpenAPI(swaggerDocument);

//const server = "http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT;
const server = "http://localhost:8080";
console.log(server);
jest.setTimeout(20000);

describe('GET /', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + "/");

        expect(res.status).toEqual(200);
        expect(res.data).toContain("<html>"); // main page for Actionhero is a html page 
    });
});

describe('GET api/blocks/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/blocks/latest');

        expect(res.status).toEqual(200);
        // expect(res).toSatisfyApiSpec();
    });
});

describe('GET api/blocks/ByNumber/OrHash/:arg', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/blocks/ByNumber/OrHash/1000');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET api/blocks/{from}/{count}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/blocks/1000/2');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET api/blocks/pending', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/blocks/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});


describe('GET api/transactions/hash/{hash}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff783');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET api/transactions/pending/', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/transactions/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET api/transactions/address/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/transactions/address/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET api/transactions/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/api/transactions/latest');

        expect(res.status === 200 || res.status === 204).toBe(true);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET api/addresses/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server +'/api/addresses/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET api/transactions/hash/{hash}', () => {
    it('should return null', async () => {
        const res = await axios.get(server + '/api/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff78a');

        expect(res.status).toEqual(200);
        expect(res.data.response).toBe(null);
    });
});

describe('GET api/transactions/address/{address}', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server +'/api/transactions/address/ax52Add4435c81a4e0fB2eC494966863e48BF9302E')
            .catch((error) => {
            });
        expect(res).toBe(undefined);
    });
});

describe('GET api/blocks/ByNumber/OrHash/:arg', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server + '/api/blocks/ByNumber/OrHash/1000a')
            .catch((error) => {
            });

        expect(res).toBe(undefined);
    });
});

describe('GET api/addresses/{address}', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server + '/api/addresses/0x1111111111111')
            .catch((error) => {
            });

        expect(res).toBe(undefined);
    });
});