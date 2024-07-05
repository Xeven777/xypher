import { decrypt } from "@/actions/cipher";
import { passwordById } from "@/actions/prisma";
import CopyComp from "@/components/copyComp";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const res = await passwordById(params.id);
  if (!res) return <div>not found</div>;
  const decryptedPassword = decrypt(res.password);
  return (
    <div className="container mt-4 flex flex-col max-w-5xl">
      <h1 className="text-3xl md:text-5xl py-6">{res.title}</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/50 transition-all duration-300">
          <span className="text-muted-foreground">Username: </span>
          {res.userName}
        </p>
        <CopyComp text={decryptedPassword} />
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/50 transition-all duration-300">
          <span className="text-muted-foreground">Email:</span>{" "}
          {res.email || "..."}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/50 transition-all duration-300">
          <span className="text-muted-foreground">Category:</span>{" "}
          {res.category}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/50 transition-all duration-300">
          <span className="text-muted-foreground">Notes:</span>{" "}
          {res.notes || "..."}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/50 transition-all duration-300">
          <span className="text-muted-foreground">URL:</span> {res.url || "..."}
        </p>
      </div>
    </div>
  );
};

export default page;
