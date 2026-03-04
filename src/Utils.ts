/**
 * In certain systems or contexts, the maximum value of an unsigned integer can be used to represent a specific value in signed integers.
 * This is due to the two's complement representation of signed integers in binary.
 * When interpreted as an unsigned integer, the binary representation of this specific signed integer corresponds to the maximum value of the unsigned integer.
 * Therefore, when dealing with values from such systems or contexts, we need to convert this maximum value to the corresponding signed integer value for correct interpretation.
 * for example, 18446744073709551615 can be -1.
 * @ignore
 */
export function parseIntPtr2Number(value: number | string): number {
  try {
    let bigIntVal = BigInt(value);
    if (bigIntVal > 2n ** 63n - 1n) {
      bigIntVal -= 2n ** 64n;
    }
    return Number(bigIntVal);
  } catch (e) {
    return value as number;
  }
}

export let debuggable = false;

/**
 * @internal
 */
export function setDebuggable(flag: boolean) {
  debuggable = flag;
}

/**
 * @internal
 */
export function isDebuggable() {
  return debuggable && __DEV__;
}
