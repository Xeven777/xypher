import { decrypt } from "@/actions/cipher";
import { passwordById, toggleFavorite } from "@/actions/prisma";
import CopyComp from "@/components/copyComp";
import EditDialog from "@/components/editDialog";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Star } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";

const page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const res = await passwordById((await params)?.id);

  if (!res || !user || res.userId !== user.id)
    return <div className="p-6 text-primary mt-12">Error. Not Found.</div>;

  const decryptedPassword = decrypt(res.password);
  return (
    <div className="container mt-16 flex flex-col max-w-5xl">
      <div className="flex items-center pr-2 md:pr-10 justify-between my-4">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-3xl md:text-5xl py-2 px-1 font-semibold">
            {res.title}
          </h1>
          <FavoriteButton
            id={res.id}
            isFavorite={res.isFavorite}
          />
        </div>
        <EditDialog
          passwordDetails={res}
          decryptedPassword={decryptedPassword}
        />
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
        <div className="p-4 border rounded flex hover:shadow-md hover:shadow-primary/40 transition-all duration-300 gap-2 flex-wrap">
          <span className="text-muted-foreground pr-2">Tags:</span>{" "}
          {res.tags && res.tags.length > 0 ? (
            res.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            "..."
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
