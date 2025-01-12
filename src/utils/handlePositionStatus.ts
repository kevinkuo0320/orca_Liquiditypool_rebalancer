
import { PositionStatus } from "@orca-so/whirlpools-core";

export const handlePositionStatus = (positionStatus: PositionStatus) => {
  if (positionStatus.toString() === "priceInRange") {
    return "In Range";
  } else if (positionStatus.toString() === "priceBelowRange") {
    return "Below Range";
  } else if (positionStatus.toString() === "priceAboveRange") {
    return "Above Range";
  } else if (positionStatus.toString() === "Invalid") {
    return "Invalid";
  } else {
    return "Unknown";
  }
}
