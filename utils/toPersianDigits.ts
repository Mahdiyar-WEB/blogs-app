const toPersianDigits = (n: number | string): string => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n
    .toString()
    .split("")
    .map((x) => farsiDigits[Number(x)] ?? x)
    .join("");
};
export default toPersianDigits;
