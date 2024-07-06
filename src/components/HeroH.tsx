"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/HighLight";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <button
        type="button"
        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 inline-block transition-all hover:scale-105 active:scale-100"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-background py-0.5 px-4 ring-1 ring-white/10 ">
          <span>Xypher</span>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-green-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Secure your passwords with the <br />
        <Highlight>
          Best 256-bit encryption
        </Highlight>{" "}
        <br />
        in the cloud
      </motion.h1>
      <Button
        asChild
        size={"lg"}
        className="mx-auto text-xl md:text-3xl p-5  md:px-6 md:py-8 -rotate-2 hover:rotate-0 mt-5"
      >
        <Link href="/pw">
          Get Started{" "}
          <span>
            <ArrowUpRight size={34} className="ml-4" />
          </span>
        </Link>
      </Button>
    </HeroHighlight>
  );
}
