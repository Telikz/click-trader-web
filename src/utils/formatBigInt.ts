export function formatBitInt(value: bigint): string {
   const suffixes = [
      { suffix: "Q", digits: 15n },
      { suffix: "T", digits: 12n },
      { suffix: "B", digits: 9n },
      { suffix: "M", digits: 6n },
      { suffix: "K", digits: 3n },
   ];

   const abs = value < 0n ? -value : value;

   for (const { suffix, digits } of suffixes) {
      const threshold = 10n ** digits;

      if (abs >= threshold) {
         const whole = value / threshold;
         const remainder = (abs % threshold) / 10n ** (digits - 1n);
         const decimal = remainder === 0n ? "" : `.${remainder.toString()[0]}`;
         return `${whole}${decimal}${suffix}`;
      }
   }

   return value.toString();
}
