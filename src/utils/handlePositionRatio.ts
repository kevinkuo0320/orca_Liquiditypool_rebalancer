import { PositionRatio } from "@orca-so/whirlpools-core";

export const handlePositionRatio = (positionRatio: PositionRatio) => {
const tokenARatio = positionRatio.ratioA / 100 ;
const tokenBRatio = positionRatio.ratioB / 100;
const tokenARatioPercentage = tokenARatio.toString() + "%";
const tokenBRatioPercentage = tokenBRatio.toString() + "%";
  return {tokenARatioPercentage, tokenBRatioPercentage};
}


