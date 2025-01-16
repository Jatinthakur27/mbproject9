import React from "react";
import { Loader } from "lucide-react";

const MyLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin text-indigo-600">
        <Loader size={48} />
      </div>
    </div>
  );
};

export default MyLoader;
