"use client";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CopyComp = ({ text }: { text: string }) => {
  return (
    <p
      className="p-4 border rounded flex cursor-copy hover:shadow-md hover:shadow-primary/50 transition-all duration-300"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Password copied to clipboard");
      }}
    >
      <span className="text-muted-foreground">Password: </span> {text}{" "}
      <Copy size={18} className="ml-20" />
    </p>
  );
};

export default CopyComp;
