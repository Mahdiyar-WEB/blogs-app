const toPersianDigits = (n: number) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n
    .toString()
    .split("")
    .map((x: string) => farsiDigits[Number(x)])
    .join("");
};
export default toPersianDigits;
