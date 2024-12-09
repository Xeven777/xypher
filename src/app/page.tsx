import { HeroHighlightDemo } from "@/components/HeroH";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/pw");
  }
  return (
    <div className="overflow-x-hidden max-w-screen flex flex-col items-center justify-center min-h-screen">
      <HeroHighlightDemo />
      <footer className="fixed bottom-2 right-10 border py-2 px-3 bg-green-100/60 dark:bg-green-950/65 border-green-700 rounded-md text-green-900 dark:text-green-200 z-[51] md:text-base text-sm">
        made by{" "}
        <a
          href="http://bento.me/anish7"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 hover:underline"
        >
          Anish💚
        </a>
      </footer>
      <div className="absolute bg-green-700/20 -left-20 top-0 blur-3xl w-96 h-60 rounded-full z-0" />
      <div className="fixed bg-green-200/30 dark:bg-green-700/20 -right-20 bottom-0 blur-3xl w-96 h-60 rounded-full" />
    </div>
  );
}
