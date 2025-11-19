import React from "react";

export default function Loader() {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}
