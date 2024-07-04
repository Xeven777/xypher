import crypto from "crypto";

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "64f3741257970460babe323d493d2b8177b44849f221be6e1435e0a9d0987f29";

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// console.log(encrypt("Hello, World!"));
// console.log(decrypt(encrypt("Hello, World!")));

// Function to generate a 256-bit key
// const generate256BitKey = (): string => {
//   const key = crypto.randomBytes(32).toString("hex");
//   return key;
// };

// console.log(generate256BitKey());
