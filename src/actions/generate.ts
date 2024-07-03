import { generate } from "generate-password-browser";

export function generatePassword(options: {
  length: number;
  numbers: boolean;
  symbols: boolean;
  uppercase: boolean;
}): string {
  const password = generate(options);

  return password;
}
