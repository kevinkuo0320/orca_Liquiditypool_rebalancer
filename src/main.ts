import { setWhirlpoolsConfig } from '@orca-so/whirlpools';

async function init() {
    await setWhirlpoolsConfig('solanaDevnet');
}

init();