import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  return (
    <header className="sticky bg-background/20 border-b backdrop-blur-md p-2 w-full top-0 z-50">
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-0 justify-center">
          <Image
            src={"/logo-base-256x256.png"}
            alt="X"
            className="active:hue-rotate-60 transition-all hover:animate-spin"
            width={50}
            height={50}
          />
          <h1 className="text-2xl md:text-3xl font-bold">Xypher</h1>
        </div>
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
          <div>
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
