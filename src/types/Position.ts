export interface Position {
  address: string;
  programAddress: string;
  lamports: number;
  data: {
    whirlpool: string;
    positionMint: string;
    liquidity: bigint;
    tickLowerIndex: number;
    tickUpperIndex: number;
  };
} 