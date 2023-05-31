export const digitsNumber = (price) => {
  const numberString = String(price);
  const digits = numberString.split("");
  const result = [];
  for (let i = digits.length - 1; i >= 0; i -= 3) {
    const chunk = digits.slice(Math.max(i - 2, 0), i + 1);
    result.unshift(chunk.join(""));
  }
  return result.join(",");
};
