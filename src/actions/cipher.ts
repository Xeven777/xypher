import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SECRET_KEY environment variable is not set");
  } else {
    console.warn("SECRET_KEY environment variable is not set. Using a temporary key for development.");
  }
}

// Ensure key is 32 bytes for aes-256-cbc.
// If it's a hex string of 64 chars, we use it directly.
// Otherwise, we'll use a fixed key in dev if not provided.
const getSecretKey = () => {
  if (!SECRET_KEY) {
      return Buffer.from("64f3741257970460babe323d493d2b8177b44849f221be6e1435e0a9d0987f29", "hex");
  }
  return Buffer.from(SECRET_KEY, "hex");
};

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    getSecretKey(),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  try {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      getSecretKey(),
      iv
    );
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed");
    throw new Error("Failed to decrypt password");
  }
}
