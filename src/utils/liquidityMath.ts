import { BN } from '@project-serum/anchor';
import Decimal from 'decimal.js';
import { TokenAmounts } from '@/types/TokenAmounts';

export class LiquidityMath {
  // Helper method for decimal conversions
  private static toX64_Decimal(num: Decimal): Decimal {
    return num.div(new Decimal(2).pow(64));
  }

  private static fromX64_Decimal(num: Decimal): Decimal {
    return num.mul(new Decimal(2).pow(64));
  }

  public static getTokenAmountsFromLiquidity(
    liquidity: BN,
    currentSqrtPrice: BN,
    lowerSqrtPrice: BN,
    upperSqrtPrice: BN,
    round_up: boolean,
  ): TokenAmounts {
    const _liquidity = new Decimal(liquidity.toString());
    const _currentPrice = new Decimal(currentSqrtPrice.toString());
    const _lowerPrice = new Decimal(lowerSqrtPrice.toString());
    const _upperPrice = new Decimal(upperSqrtPrice.toString());
    let tokenA, tokenB;

    if (currentSqrtPrice.lt(lowerSqrtPrice)) {
      tokenA = LiquidityMath.toX64_Decimal(_liquidity)
        .mul(_upperPrice.sub(_lowerPrice))
        .div(_lowerPrice.mul(_upperPrice));
      tokenB = new Decimal(0);
    } else if (currentSqrtPrice.lt(upperSqrtPrice)) {
      tokenA = LiquidityMath.toX64_Decimal(_liquidity)
        .mul(_upperPrice.sub(_currentPrice))
        .div(_currentPrice.mul(_upperPrice));
      tokenB = LiquidityMath.fromX64_Decimal(
        _liquidity.mul(_currentPrice.sub(_lowerPrice)),
      );
    } else {
      tokenA = new Decimal(0);
      tokenB = LiquidityMath.fromX64_Decimal(
        _liquidity.mul(_upperPrice.sub(_lowerPrice)),
      );
    }

    return {
      tokenA: new BN(round_up ? tokenA.ceil().toString() : tokenA.floor().toString()),
      tokenB: new BN(round_up ? tokenB.ceil().toString() : tokenB.floor().toString()),
    };
  }
} 