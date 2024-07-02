import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function page() {
  return (
    <div>
      This page is protected - but you can view it because you are authenticated
      This page is protected, please <LoginLink>Login</LoginLink> to view it
    </div>
  );
}
