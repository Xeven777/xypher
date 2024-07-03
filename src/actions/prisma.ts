"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addPassword = async (passwordData: {
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
    const result = await prisma.passwords.create({
      data: {
        userId: user.id,
        title: passwordData.title,
        userName: passwordData.username,
        password: passwordData.password,
        email: passwordData.email,
        category: passwordData.category,
        notes: passwordData.notes,
        url: passwordData.url,
      },
    });
    console.log("Password saved:", result);
    return result;
  } catch (error) {
    console.error("Failed to save password:", error);
    return null;
  }
  revalidatePath("/pw");
  redirect("/pw");
};

export default addPassword;
