"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/HighLight";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
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
        <Highlight className="text-black dark:text-white">
          Best 256-bit encryption
        </Highlight>{" "}
        <br />
        in the cloud
      </motion.h1>
      <Button
        asChild
        size={"lg"}
        className="mx-auto text-xl md:text-3xl p-6 py-8 -rotate-2 hover:rotate-0 mt-5"
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
