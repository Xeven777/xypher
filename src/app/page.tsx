import { HeroHighlightDemo } from "@/components/HeroH";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/pw");
  }
  return (
    <div className="overflow-x-hidden max-w-screen">
      <div className="absolute bg-green-700/20 -left-20 top-0 blur-3xl w-96 h-60 rounded-full z-50" />

      <HeroHighlightDemo />
      {/* <div className="absolute bg-green-700/20 -right-20 bottom-0 blur-3xl w-96 h-60 rounded-full z-50" /> */}
    </div>
  );
}
