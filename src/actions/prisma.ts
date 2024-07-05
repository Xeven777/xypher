"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { encrypt } from "./cipher";

export const addPassword = async (passwordData: {
  title: string;
  username: string;
  password: string;
  category: string;
  email?: string;
  notes?: string;
  url?: string;
}) => {
  const prisma = new PrismaClient();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
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
      },
    });
    console.log("Password saved:", result);
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to save password:", error);
    return null;
  }
};

export const fetchPasswords = async () => {
  const prisma = new PrismaClient();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
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
    return null;
  }
};

export const deletePassword = async (passwordId: string) => {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.passwords.delete({
      where: {
        id: passwordId,
      },
    });
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to delete password:", error);
    return null;
  }
};

export const updatePassword = async (passwordData: {
  id: string;
  title: string;
  username: string;
  password: string;
  category: string;
  email?: string;
  notes?: string;
  url?: string;
}) => {
  const prisma = new PrismaClient();
  const encryptedPassword = encrypt(passwordData.password);
  try {
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
      },
    });
    console.log("Password updated:", result);
    revalidatePath("/pw");
    return result;
  } catch (error) {
    console.error("Failed to update password:", error);
    return null;
  }
};

export const passwordById = async (passwordId: string) => {
  const prisma = new PrismaClient();
  try {
    const password = await prisma.passwords.findUnique({
      where: {
        id: passwordId,
      },
    });
    console.log("Password fetched:", password);
    return password;
  } catch (error) {
    console.error("Failed to fetch password:", error);
    return null;
  }
};
