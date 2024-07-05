import { decrypt } from "@/actions/cipher";
import { passwordById } from "@/actions/prisma";
import CopyComp from "@/components/copyComp";
import EditDialog from "@/components/editDialog";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const res = await passwordById(params.id);
  if (!res) return <div className="p-6 text-primary">not found!</div>;
  const decryptedPassword = decrypt(res.password);
  return (
    <div className="container mt-4 flex flex-col max-w-5xl">
      <div className="flex items-center pr-2 md:pr-10 justify-between">
        <h1 className="text-3xl md:text-5xl py-6">{res.title}</h1>
        <EditDialog passwordDetails={res} />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">Username: </span>
          {res.userName}
        </p>
        <CopyComp text={decryptedPassword} />
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">Email:</span>{" "}
          {res.email || "..."}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">Category:</span>{" "}
          {res.category}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">Notes:</span>{" "}
          {res.notes || "..."}
        </p>
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">URL:</span>{" "}
          {res.url || "..."}
        </p>
      </div>
    </div>
  );
};

export default page;
