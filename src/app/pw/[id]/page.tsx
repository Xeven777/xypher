import { decrypt } from "@/actions/cipher";
import { passwordById } from "@/actions/prisma";
import CopyComp from "@/components/copyComp";
import EditDialog from "@/components/editDialog";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const res = await passwordById(params.id);

  if (!res)
    return <div className="p-6 text-primary mt-12">Error. Not Found.</div>;

  if (res.userId !== user.id)
    return <div className="p-6 text-primary mt-12">Error. Not Found.</div>;

  const decryptedPassword = decrypt(res.password);
  return (
    <div className="container mt-16 flex flex-col max-w-5xl">
      <div className="flex items-center pr-2 md:pr-10 justify-between my-4">
        <h1 className="text-3xl md:text-5xl py-2 px-1 font-semibold flex-1">
          {res.title}
        </h1>
        <EditDialog passwordDetails={res} />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300">
          <span className="text-muted-foreground pr-2">Username: </span>
          {res.userName}
        </p>
        <CopyComp text={decryptedPassword} />
        <p className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300 overflow-clip truncate">
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
