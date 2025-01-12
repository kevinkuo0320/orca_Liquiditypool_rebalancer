import { fetchPositionsForOwner, setWhirlpoolsConfig } from '@orca-so/whirlpools';
import { createSolanaRpc, mainnet, address } from '@solana/web3.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await setWhirlpoolsConfig('solanaMainnet');
    const mainnetRpc = createSolanaRpc(
      mainnet('https://cold-multi-bridge.solana-mainnet.quiknode.pro/c8f03632452f3e5aff634215cd656ebb5c074023'),
      { httpHeaders: { 'Content-Type': 'application/json' } }
    );
    const owner = address("HKhMuLcetQ163owVrpKT3fgUszV64Cqa3bgdYGJQj4qh");
    const positionsData = await fetchPositionsForOwner(mainnetRpc, owner);
    console.log(positionsData);
    return NextResponse.json(positionsData);
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 });
  }
} 