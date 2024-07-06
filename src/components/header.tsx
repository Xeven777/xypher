import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { ModeToggle } from "./themebutton";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="sticky bg-background/20 border-b backdrop-blur-md p-2 w-full top-0 z-50">
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link href={"/pw"} className="flex items-center  justify-center">
          <Image
            src={"/logo-base-256x256.png"}
            priority
            alt="X"
            className="active:hue-rotate-60 transition-all hover:animate-spin"
            width={50}
            height={50}
          />
          <h1 className="text-2xl md:text-3xl font-bold">Xypher</h1>
        </Link>
        <div className="flex gap-2 sm:gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={user.picture || "/logo-base-256x256.png"}
                    alt={user.given_name || "Friend"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Hey {user?.given_name || "Friend"}!
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || "Opps! No email found."}
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LogoutLink>
                      <Button variant={"outline"} className="w-full">
                        Logout
                      </Button>
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
