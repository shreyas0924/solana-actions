import {
  DEFAULT_STAKE_AMOUNT,
  DEFAULT_VALIDATOR_VOTE_PUBKEY,
} from "@/lib/constants";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
} from "@solana/actions";
import {
  Authorized,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
} from "@solana/web3.js";

const headers = createActionHeaders();

//Steps to create an action/blink

//1. GET Request
//   - create a base url for the icon and it can be used anywhere
//   - get the request paramaters and validate them
//   - create the payload
//   - return the payload

//2. POST Request
//   - create a base url for the icon and it can be used anywhere
//   - get the request paramaters and validate them
//   - get the body as ActionPostRequest type
//   - validate the input
//   - create a connection with the RPC
//   - do some other checks which requires the RPC connection
//   - create a keypair
//   - create a transaction with programs
//   - set the transaction.feepayer as the account
//   - set the transaction.recentBlockhash
//   - create a payload with the transaction with type ActionPostResponse
//   - return the payload with headers

export const OPTIONS = async () => {
  return new Response(null, { headers });
};

export const GET = async (req: Request) => {
  const { validator, amount } = validateQueryParams(new URL(req.url));
  const baseHref = new URL(
    `/api/actions/stake?validator=${validator.toBase58()}`,
    new URL(req.url).origin
  ).toString();
  try {
    const payload: ActionGetResponse = {
      title: "Stake SOL",
      icon: new URL("/send-image.png", new URL(req.url).origin).toString(),
      label: "Stake your SOL",
      description: `Stake your SOL to the validator: ${validator.toBase58()}`,
      links: {
        actions: [
          {
            label: "Stake 1 SOL",
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Stake 5 SOL",
            href: `${baseHref}&amount=${"5"}`,
          },
          {
            label: "Stake 10 SOL",
            href: `${baseHref}&amount=${"10"}`,
          },
          {
            label: "Stake SOL",
            href: `${baseHref}&amount=${amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount in SOL",
                required: false,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const { validator, amount } = validateQueryParams(new URL(req.url));
    const body: ActionPostRequest = await req.json();

    //validate the input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      });
    }

    const connection = new Connection(clusterApiUrl("devnet"));

    // other checks - here it is the minimum stake amount
    const minStake = await connection.getStakeMinimumDelegation();
    if (amount < minStake.value) {
      return new Response(`Stake amount must be greater than ${minStake}`, {
        status: 400,
        headers,
      });
    }

    const stakeKeyPair = Keypair.generate();

    //create a transaction
    const transaction = new Transaction().add(
      //add programs as required

      //program to create a stake account
      StakeProgram.createAccount({
        stakePubkey: stakeKeyPair.publicKey,
        authorized: new Authorized(account, account),
        fromPubkey: account,
        lamports: 1 * LAMPORTS_PER_SOL,
      }),
      //program to delegate to the validator
      StakeProgram.delegate({
        authorizedPubkey: account,
        stakePubkey: stakeKeyPair.publicKey,
        votePubkey: validator,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Stake SOL",
      },
      signers: [stakeKeyPair],
    });

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

function validateQueryParams(url: URL) {
  let validator = DEFAULT_VALIDATOR_VOTE_PUBKEY;
  let amount = DEFAULT_STAKE_AMOUNT;

  try {
    if (url.searchParams.get("validator")) {
      validator = new PublicKey(url.searchParams.get("validator")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: validator";
  }

  try {
    if (url.searchParams.get("amount")) {
      amount = parseFloat(url.searchParams.get("amount")!);
    }
    if (amount <= 0) throw "Invalid input query parameter: amount";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return { amount, validator };
}
