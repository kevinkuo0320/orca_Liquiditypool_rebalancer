import { fetchWhirlpoolsByTokenPair, setWhirlpoolsConfig } from '@orca-so/whirlpools';
import { createSolanaRpc, devnet, address } from '@solana/web3.js';

async function main() {
    await setWhirlpoolsConfig('solanaDevnet');
    const devnetRpc = createSolanaRpc(devnet('https://api.devnet.solana.com'));

    const tokenMintOne = address("So11111111111111111111111111111111111111112");
    const tokenMintTwo = address("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k");

    const poolInfos = await fetchWhirlpoolsByTokenPair(
        devnetRpc,
        tokenMintOne,
        tokenMintTwo
    );

    poolInfos.forEach((poolInfo) => {
        if (poolInfo.initialized) {
            console.log("Pool is initialized:", poolInfo);
        } else {
            console.log("Pool is not initialized:", poolInfo);
        }
    });
}

main().catch(console.error);