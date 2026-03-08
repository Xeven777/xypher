import { HeroHighlightDemo } from "@/components/HeroH";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  ArrowRight,
  Check,
  FolderKanban,
  Import,
  KeyRound,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const stats = [
  {
    value: "256-bit",
    label: "encryption protecting every stored password",
  },
  {
    value: "1 place",
    label: "to generate, organize, and audit credentials",
  },
  {
    value: "0 chaos",
    label: "when tags, favorites, and search all work together",
  },
];

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Encrypted vault",
    description:
      "Passwords are encrypted before storage, so your vault feels fast without feeling flimsy.",
    icon: LockKeyhole,
  },
  {
    title: "Built-in password generator",
    description:
      "Generate strong passwords with length and character controls right where you save them.",
    icon: WandSparkles,
  },
  {
    title: "Security audit",
    description:
      "Spot weak and reused passwords quickly with an audit view that turns clutter into clear action.",
    icon: ScanSearch,
  },
  {
    title: "Organized your way",
    description:
      "Use categories, tags, favorites, and search to keep your digital life neat instead of noodle-coded.",
    icon: FolderKanban,
  },
  {
    title: "Import and export",
    description:
      "Move your data in and out without drama when you need backups or a fresh start.",
    icon: Import,
  },
  {
    title: "Simple, modern workflow",
    description:
      "Add, edit, copy, and review credentials in a clean interface designed to stay out of your way.",
    icon: Workflow,
  },
];

const steps = [
  {
    title: "Create your secure vault",
    description:
      "Sign in, add your first login, and generate a stronger password in the same flow.",
  },
  {
    title: "Organize everything that matters",
    description:
      "Use categories, tags, notes, favorites, and search to keep accounts easy to find later.",
  },
  {
    title: "Audit and improve regularly",
    description:
      "Review weak or reused passwords, then fix them before they become tomorrow’s problem.",
  },
];

const trustPoints = [
  "Kinde authentication for a smooth sign-in flow",
  "AES-256 style encryption with a dedicated server-side secret",
  "Search, favorites, tags, notes, and category management",
  "A focused UI that feels lightweight on desktop and mobile",
];

const faqs = [
  {
    question: "What makes Xypher feel different?",
    answer:
      "It keeps the experience lean: save passwords fast, organize them clearly, and audit them without a maze of enterprise-only clutter.",
  },
  {
    question: "Can I generate stronger passwords here too?",
    answer:
      "Yes. Xypher includes a generator with adjustable length and character settings directly in the add-password flow.",
  },
  {
    question: "Does it help clean up reused passwords?",
    answer:
      "Yes. The audit view highlights weak and reused passwords so you know exactly what to fix first.",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
      <Sparkles className="size-3.5" />
      <span>{children}</span>
    </div>
  );
}

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/pw");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,hsla(var(--primary),0.22),transparent_52%)]" />
      <div className="absolute -left-28 top-20 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-0 top-40 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl dark:bg-primary/10" />
      <div className="absolute bottom-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <HeroHighlightDemo />
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <SectionEyebrow>Modern password management</SectionEyebrow>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                A sleek password vault for people who want
                <span className="text-primary"> stronger security </span>
                without a clunky workflow.
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                Xypher helps you generate better passwords, store them in one
                encrypted place, organize them beautifully, and audit weak spots
                before they become a headache.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <LoginLink>
                <Button
                  size="lg"
                  className="group h-12 rounded-full px-6 text-base shadow-lg shadow-primary/20"
                >
                  Launch your vault
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </LoginLink>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-6 text-base"
              >
                <Link href="#features">See what makes it shine</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="mt-0.5 rounded-full bg-primary/15 p-1 text-primary">
                    <Check className="size-4" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 p-4 shadow-2xl shadow-primary/10 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/95 p-5">
                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo-base-256x256.png"
                      alt="Xypher logo"
                      width={44}
                      height={44}
                      className="rounded-2xl border border-primary/20 bg-primary/10 p-1"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Xypher vault
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Clean storage. Stronger credentials. Less chaos.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Secure by design
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="rounded-2xl border border-border/70 bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Password health
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Generated, stored, and ready to audit
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <ShieldCheck className="size-5" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Strength score</span>
                          <span>Excellent</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="h-2 w-[82%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="rounded-xl bg-primary/10 px-3 py-2 text-center text-primary">
                          32 chars
                        </div>
                        <div className="rounded-xl bg-muted px-3 py-2 text-center text-muted-foreground">
                          symbols on
                        </div>
                        <div className="rounded-xl bg-muted px-3 py-2 text-center text-muted-foreground">
                          unique tag
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-card p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <KeyRound className="size-4 text-primary" />
                        Vault snapshot
                      </div>
                      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2">
                          <span>Work</span>
                          <span>12 logins</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2">
                          <span>Finance</span>
                          <span>4 accounts</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2">
                          <span>Favorites</span>
                          <span className="inline-flex items-center gap-1 text-foreground">
                            <Star className="size-3.5 fill-primary text-primary" />{" "}
                            7 pinned
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <ScanSearch className="size-4 text-primary" />
                        Audit focus
                      </div>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-700 dark:text-red-300">
                          2 weak passwords need attention
                        </div>
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-700 dark:text-amber-300">
                          1 reused password found
                        </div>
                        <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-primary">
                          9 secure entries looking very smug
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/60 p-4 shadow-sm backdrop-blur-sm md:grid-cols-3 md:p-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-border/70 bg-background/80 px-5 py-6"
            >
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Everything you need</SectionEyebrow>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A focused feature set that makes security feel crisp, not crowded.
          </h2>
          <p className="mt-4 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
            Xypher is built around the essentials that matter most: safer
            passwords, cleaner organization, and fast visibility into what needs
            fixing.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[1.75rem] border border-border/70 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="inline-flex rounded-2xl border border-primary/15 bg-primary/10 p-3 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-border/70 bg-card/70 p-8">
            <SectionEyebrow>How it flows</SectionEyebrow>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built to help you go from scattered credentials to steady control.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The experience stays intentionally simple: add credentials fast,
              keep them organized, and revisit security with clear next steps.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-background/80 p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-card/70 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <SectionEyebrow>Security at a glance</SectionEyebrow>
                <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  The kind of visibility that actually helps you improve.
                </h2>
              </div>
              <div className="hidden rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary sm:block">
                <ShieldCheck className="size-6" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <p className="text-sm font-semibold text-foreground">
                  Why it works
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    Encryption is baked into the save flow, not bolted on later.
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    Categories, notes, and tags reduce hunt-and-peck friction.
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    Audit signals surface weak and reused passwords quickly.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <p className="text-sm font-semibold text-foreground">
                  What you feel
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                    Add credentials without wrestling a giant form.
                  </div>
                  <div className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                    Find favorites fast when you’re mid-login and mildly
                    annoyed.
                  </div>
                  <div className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                    Fix issues from the audit page before they pile up.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border/70 bg-card/70 p-8 md:p-10">
          <div className="max-w-3xl">
            <SectionEyebrow>Quick answers</SectionEyebrow>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A few things people usually ask before they jump in.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-[1.5rem] border border-border/70 bg-background/80 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-primary/20 bg-primary/10 p-8 shadow-xl shadow-primary/10 md:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.18),transparent_65%)] lg:block" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>Ready when you are</SectionEyebrow>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Upgrade from password sprawl to a vault that actually feels good
                to use.
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Start with your most-used accounts, generate stronger
                replacements, and let Xypher keep the rest tidy.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <LoginLink>
                <Button size="lg" className="h-12 rounded-full px-6 text-base">
                  Get started free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </LoginLink>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-primary/20 bg-background/80 px-6 text-base"
              >
                <Link href="#features">Explore features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-10 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-base-256x256.png"
            alt="Xypher logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <p>Xypher — a clean, encrypted password manager for calmer logins.</p>
        </div>
        <p>
          made by{" "}
          <a
            href="https://anish7.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary hover:underline"
          >
            Anish💚
          </a>
        </p>
      </footer>
    </main>
  );
}
