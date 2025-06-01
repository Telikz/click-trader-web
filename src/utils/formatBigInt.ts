export function formatBitInt(value: bigint): string {
   const suffixes = [
      { suffix: "Sx", threshold: 1_000_000_000_000_000_000_000n },
      { suffix: "Qt", threshold: 1_000_000_000_000_000_000n },
      { suffix: "Q", threshold: 1_000_000_000_000_000n },
      { suffix: "T", threshold: 1_000_000_000_000n },
      { suffix: "B", threshold: 1_000_000_000n },
      { suffix: "M", threshold: 1_000_000n },
      { suffix: "K", threshold: 1_000n },
   ];

   const sign = value < 0n ? "-" : "";
   const absValue = value < 0n ? -value : value;
   const currencySymbol = "$";

   if (absValue < 1000n) {
      return `${currencySymbol}${sign}${absValue.toString()}`;
   }

   for (const { suffix, threshold } of suffixes) {
      if (absValue >= threshold) {
         const scaledValue = (absValue * 1000n) / threshold;
         const wholePart = scaledValue / 1000n;
         const decimalPart = scaledValue % 1000n;

         let decimalString = "";
         if (decimalPart !== 0n) {
            let rawDecimalStr = decimalPart.toString();
            while (rawDecimalStr.length < 3) {
               rawDecimalStr = "0" + rawDecimalStr;
            }

            decimalString = `.${rawDecimalStr.substring(0, 3)}`;

            if (decimalString.endsWith("0")) {
               decimalString = decimalString.substring(
                  0,
                  decimalString.length - 1
               );
            }
            if (decimalString.endsWith("0")) {
               decimalString = decimalString.substring(
                  0,
                  decimalString.length - 1
               );
            }
            if (decimalString === ".") {
               decimalString = "";
            }
         }

         return `${currencySymbol}${sign}${wholePart}${decimalString}${suffix}`;
      }
   }

   return `${currencySymbol}${sign}${absValue.toString()}`;
}
