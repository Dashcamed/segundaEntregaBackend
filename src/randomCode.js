export default function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = Array.from(
    { length: 5 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  const randomNumbers = Array.from(
    { length: 5 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join("");

  return randomLetters + randomNumbers;
}
