import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function proxy(req: Request) {
  return withAuth(req);
}

export const config = {
  matcher: ["/pw", "/pw/(.*)"],
};
