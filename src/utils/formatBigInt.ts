// You can keep this in ~/utils/formatBigInt.ts or rename it to formatCurrency.ts

const PRICE_SCALE_FACTOR = 1000n;

export function formatBigInt(scaledValue: bigint): string {
   if (scaledValue === undefined || scaledValue === null) {
      return "$0.000";
   }

   // These thresholds are now also scaled by 1000 to match the input value.
   // e.g., the "K" threshold is now 1,000 * 1,000 = 1,000,000.
   const suffixes = [
      { suffix: "Sx", threshold: 1_000_000_000_000_000_000_000_000n },
      { suffix: "Qt", threshold: 1_000_000_000_000_000_000_000n },
      { suffix: "Q", threshold: 1_000_000_000_000_000_000n },
      { suffix: "T", threshold: 1_000_000_000_000_000n },
      { suffix: "B", threshold: 1_000_000_000_000n },
      { suffix: "M", threshold: 1_000_000_000n },
      { suffix: "K", threshold: 1_000_000n },
   ];

   const sign = scaledValue < 0n ? "-" : "";
   const absValue = scaledValue < 0n ? -scaledValue : scaledValue;
   const currencySymbol = "$";

   // First, check if the value is large enough to need abbreviation.
   for (const { suffix, threshold } of suffixes) {
      if (absValue >= threshold) {
         // This logic creates a number with 3 decimal places for formatting.
         // e.g. for 1.25M, this will be 1250n
         const scaledDisplayValue = (absValue * 1000n) / threshold;

         const wholePart = scaledDisplayValue / 1000n;
         const decimalPart = scaledDisplayValue % 1000n;

         // No need to change the decimal formatting logic, it's solid.
         let decimalString = "";
         if (decimalPart !== 0n) {
            const rawDecimalStr = decimalPart.toString().padStart(3, "0");
            decimalString = `.${rawDecimalStr}`.replace(/\.?0+$/, "");
         }

         return `${currencySymbol}${sign}${wholePart}${decimalString}${suffix}`;
      }
   }

   // ✅ NEW FALLBACK LOGIC
   // If the number is too small to be abbreviated (e.g., less than $1,000),
   // we format it as a standard dollar amount by un-scaling it.
   const dollars = absValue / PRICE_SCALE_FACTOR;
   const cents = absValue % PRICE_SCALE_FACTOR;
   const formattedCents = cents.toString().padStart(3, "0");

   return `${currencySymbol}${sign}${dollars}.${formattedCents}`;
}
