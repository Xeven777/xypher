import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-svh w-full flex items-center justify-center">
      <Loader size={40} />
    </div>
  );
};

export default loading;
