/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/creator_link.json`.
 */
export type CreatorLink = {
  "address": "5xbQwuduFoaEQUKG7waf2oGiMvrPfZY5DFdLLMwtjtpb",
  "metadata": {
    "name": "creatorLink",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyT",
      "discriminator": [
        105,
        64,
        53,
        239,
        181,
        56,
        90,
        172
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true
        },
        {
          "name": "creatorState",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "buyerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "mint"
        }
      ],
      "args": [
        {
          "name": "tokenToBought",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeCreator",
      "discriminator": [
        29,
        153,
        44,
        99,
        52,
        172,
        81,
        115
      ],
      "accounts": [
        {
          "name": "creatorState",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "pubkey"
        },
        {
          "name": "basePrice",
          "type": "u64"
        },
        {
          "name": "slope",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "link",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "creatorState",
      "discriminator": [
        37,
        107,
        190,
        213,
        241,
        216,
        73,
        180
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "insufficientFunds",
      "msg": "Buyer has insufficient SOL to purchase token."
    }
  ],
  "types": [
    {
      "name": "creatorState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "basePrice",
            "type": "u64"
          },
          {
            "name": "slope",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "tokensSold",
            "type": "u64"
          },
          {
            "name": "link",
            "type": "string"
          }
        ]
      }
    }
  ]
};
