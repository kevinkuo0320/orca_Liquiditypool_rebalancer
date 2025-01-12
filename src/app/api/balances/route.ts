import { fetchPositionsForOwner, setWhirlpoolsConfig } from '@orca-so/whirlpools';
import { createSolanaRpc, mainnet, address } from '@solana/web3.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const web3 = require("@solana/web3.js");
    (async () => {
    const publicKey = new web3.PublicKey(
        'HKhMuLcetQ163owVrpKT3fgUszV64Cqa3bgdYGJQj4qh'
    );
    const connect = new web3.Connection('https://solana-mainnet.core.chainstack.com/37fa43fe4fcbd98f17dcb1606bbbc7b5');
    console.log(await connect.getBalance(publicKey));
    })();
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 });
  }
} 