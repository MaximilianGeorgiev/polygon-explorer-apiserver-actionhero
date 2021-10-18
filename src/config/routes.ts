export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: "/status", action: "status" },
        { path: "/swagger", action: "swagger" },
        { path: "/createChatRoom", action: "createChatRoom" },

        { path: "/blocks/latest", action: "latestBlock" },
        { path: "/blocks/pending", action: "pendingBlocks" },
        { path: "/blocks/ByNumber/OrHash/:block", action: "blockByNumberOrHash" },
        { path: "/blocks/:fromBlock/:count", action: "multipleBlocksAfterThreshold" },

        { path: "/transactions/latest", action: "latestTransaction" },
        { path: "/transactions/pending", action: "pendingTransactions" },
        { path: "/transactions/address/:address", action: "transactionsCountByAddress" },
        { path: "/transactions/hash/:hash", action: "transactionByHash" }
      ],

      /* ---------------------
      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: https://www.actionherojs.com/tutorials/web-server#Routes

      examples:

      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:userID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/user/:userID', action: 'user', matchTrailingPathParts: true } // (*) /api/user/123, api/user/123/stuff
      ]

      ---------------------- */
    };
  },
};
