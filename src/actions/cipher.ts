import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error(
    "CRITICAL: SECRET_KEY environment variable is not set. This is required for password encryption.",
  );
}

// Ensure key is 32 bytes for aes-256-cbc.
const getSecretKey = () => {
  if (!SECRET_KEY || SECRET_KEY.length !== 64) {
    throw new Error(
      "SECRET_KEY must be a 64-character hex string (32 bytes for AES-256)",
    );
  }
  return Buffer.from(SECRET_KEY, "hex");
};

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", getSecretKey(), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  try {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", getSecretKey(), iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed");
    throw new Error("Failed to decrypt password");
  }
}
