"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { encrypt, decrypt } from "./cipher";

// Validate password strength and length
// const validatePassword = (password: string) => {
//   if (password.length < 8) {
//     throw new Error("Password must be at least 8 characters long");
//   }
//   if (password.length > 256) {
//     throw new Error("Password must not exceed 256 characters");
//   }
//   // Check for at least one uppercase, one lowercase, and one number
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasLowercase = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   if (!hasUppercase || !hasLowercase || !hasNumber) {
//     throw new Error(
//       "Password must contain uppercase letters, lowercase letters, and numbers",
//     );
//   }
// };

export const addPassword = async (passwordData: {
  title: string;
  username?: string;
  password: string;
  category: string;
  email?: string;
  notes?: string;
  url?: string;
  isFavorite?: boolean;
  tags?: string[];
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // validatePassword(passwordData.password);
    const encryptedPassword = encrypt(passwordData.password);
    const result = await prisma.passwords.create({
      data: {
        userId: user.id,
        title: passwordData.title,
        userName: passwordData.username,
        password: encryptedPassword,
        email: passwordData.email,
        category: passwordData.category,
        notes: passwordData.notes,
        url: passwordData.url,
        isFavorite: passwordData.isFavorite || false,
        tags: passwordData.tags || [],
      },
    });
    console.log("Password saved:", result.id);
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to save password:", error);
    throw new Error("Failed to save password");
  }
};

export const fetchDecryptedPasswords = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const passwords = await fetchPasswords();
  if (!passwords) return null;

  return passwords.map((p) => ({
    ...p,
    password: decrypt(p.password),
  }));
};

export const fetchPasswords = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const passwords = await prisma.passwords.findMany({
      where: {
        userId: user.id,
      },
    });
    return passwords;
  } catch (error) {
    console.error("Failed to fetch passwords:", error);
    throw new Error("Failed to fetch passwords");
  }
};

export const deletePassword = async (passwordId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const password = await prisma.passwords.findUnique({
      where: { id: passwordId },
    });

    if (!password || password.userId !== user.id) {
      throw new Error("Not found or unauthorized");
    }

    const result = await prisma.passwords.delete({
      where: {
        id: passwordId,
      },
    });
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to delete password:", error);
    throw new Error("Failed to delete password");
  }
};

export const updatePassword = async (passwordData: {
  id: string;
  title: string;
  username?: string;
  password: string;
  category: string;
  email?: string;
  notes?: string;
  url?: string;
  isFavorite?: boolean;
  tags?: string[];
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const password = await prisma.passwords.findUnique({
      where: { id: passwordData.id },
    });

    if (!password || password.userId !== user.id) {
      throw new Error("Not found or unauthorized");
    }

    // validatePassword(passwordData.password);
    const encryptedPassword = encrypt(passwordData.password);
    const result = await prisma.passwords.update({
      where: {
        id: passwordData.id,
      },
      data: {
        title: passwordData.title,
        userName: passwordData.username,
        password: encryptedPassword,
        email: passwordData.email,
        category: passwordData.category,
        notes: passwordData.notes,
        url: passwordData.url,
        isFavorite: passwordData.isFavorite,
        tags: passwordData.tags,
      },
    });
    console.log("Password updated:", result.id);
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to update password:", error);
    throw new Error("Failed to update password");
  }
};

export const toggleFavorite = async (
  passwordId: string,
  isFavorite: boolean,
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const password = await prisma.passwords.findUnique({
      where: { id: passwordId },
    });

    if (!password || password.userId !== user.id) {
      throw new Error("Not found or unauthorized");
    }

    const result = await prisma.passwords.update({
      where: {
        id: passwordId,
      },
      data: {
        isFavorite: !isFavorite,
      },
    });
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    throw new Error("Failed to toggle favorite");
  }
};

export const passwordById = async (passwordId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const password = await prisma.passwords.findUnique({
      where: {
        id: passwordId,
      },
    });

    if (!password || password.userId !== user.id) {
      return null;
    }

    return password;
  } catch (error) {
    console.error("Failed to fetch password:", error);
    throw new Error("Failed to fetch password");
  }
};
