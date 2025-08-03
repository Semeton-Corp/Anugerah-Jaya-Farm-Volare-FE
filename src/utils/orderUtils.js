export function formatOrderId(orderId, minLength = 6) {
  const idStr = orderId.toString();
  if (idStr.length >= minLength) {
    return idStr;
  }
  return idStr.padStart(minLength, "0");
}