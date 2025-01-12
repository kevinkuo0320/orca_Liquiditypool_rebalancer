'use client';

import { useEffect, useState } from 'react';
import { Position } from '@/types/Position';
import { Pool } from '@/types/Pool';
import { fetchPositionsForOwner, setWhirlpoolsConfig, 
  fetchConcentratedLiquidityPool } from '@orca-so/whirlpools';
import { createSolanaRpc, mainnet, address } from '@solana/web3.js';
import { fetchPositions } from '@/utils/positions';
import { fetchBalance } from '@/utils/balance';
import {sqrtPriceToPrice, tickIndexToPrice, positionRatio, positionStatus} from "@orca-so/whirlpools-core";
import { handlePositionStatus } from '@/utils/handlePositionStatus';
import { handlePositionRatio } from '@/utils/handlePositionRatio';

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [pool, setPool] = useState<Pool>();
  const [loading, setLoading] = useState(true);
  const [myPositionStatus, setMyPositionStatus] = useState<string>();
  const [myPositionRatio, setMyPositionRatio] = useState<{tokenARatioPercentage: string, tokenBRatioPercentage: string}>();

  const MY_ADDRESS = "HKhMuLcetQ163owVrpKT3fgUszV64Cqa3bgdYGJQj4qh";

  useEffect(() => {
    async function loadData() {
      try {
        //fetch positions
        await setWhirlpoolsConfig('solanaMainnet');
        const mainnetRpc = createSolanaRpc(
          mainnet('https://cold-multi-bridge.solana-mainnet.quiknode.pro/c8f03632452f3e5aff634215cd656ebb5c074023'),
          { httpHeaders: { 'Content-Type': 'application/json' } }
        );
        const owner = address(MY_ADDRESS);
        const positionsData = await fetchPositionsForOwner(mainnetRpc, owner);
        console.log(positionsData);
        setPositions(positionsData as Position[]);

        //fetch pool info
        const tokenMintOne = address("So11111111111111111111111111111111111111112");
        const tokenMintTwo = address("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
        const tickSpacing = 4;  
        const poolInfo = await fetchConcentratedLiquidityPool(
          mainnetRpc,
          tokenMintOne,
          tokenMintTwo,
          tickSpacing
        );
        console.log(poolInfo);
        setPool(poolInfo); 
        
        //fetch position satus
        const currentPositionStatus = positionStatus(
          poolInfo.sqrtPrice,
          positionsData[0].data.tickLowerIndex,
          positionsData[0].data.tickUpperIndex,
        );
        setMyPositionStatus(handlePositionStatus(currentPositionStatus));

        //fetch position ratio
        const currentPositionRatio = positionRatio(
          poolInfo.sqrtPrice,
          positionsData[0].data.tickLowerIndex,
          positionsData[0].data.tickUpperIndex,
        );
        setMyPositionRatio(handlePositionRatio(currentPositionRatio));

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

 

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Whirlpool Positions</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
        <p className="text-lg">{MY_ADDRESS}</p>
        <p className="text-lg">{balance.toFixed(4)} SOL</p>
      </div>
      {positions.map((position, index) => (
        <div key={position.address} className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Position {index + 1}</h2>
          
          <div className="grid grid-cols-2 gap-4">

            <div>
              <h3 className="font-medium text-gray-700">Current Position Ratio</h3>
              <p className="text-sm">SOL: {(myPositionRatio?.tokenARatioPercentage)} </p>
              <p className="text-sm">USDC: {(myPositionRatio?.tokenBRatioPercentage)} </p>      
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Position Status</h3>
              <p className="text-sm">{(myPositionStatus)}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Tick Range</h3>
              <p className="text-sm">
                ${tickIndexToPrice(position.data.tickLowerIndex,9,6).toFixed(3)} 
                 - ${tickIndexToPrice(position.data.tickUpperIndex,9,6).toFixed(3)}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Current Price</h3>
              <p className="text-sm">{pool?.price.toFixed(3)}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Position Address</h3>
              <p className="text-sm break-all">{position.address}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Whirlpool Address</h3>
              <p className="text-sm break-all">{position.data.whirlpool}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Lamports</h3>
              <p className="text-sm break-all">{position.lamports}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Position NFT</h3>
              <p className="text-sm break-all">{position.data.positionMint}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Liquidity</h3>
              <p className="text-sm">{position.data.liquidity.toString()}</p>
            </div>
            

            
            <div>
              <h3 className="font-medium text-gray-700">Program Address</h3>
              <p className="text-sm break-all">{position.programAddress}</p>
            </div>

           
          </div>
        </div>
      ))}
    
      
    </main>
  );
} 