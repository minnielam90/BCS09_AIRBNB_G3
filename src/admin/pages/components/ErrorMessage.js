import React from "react";

const ErrorMessage = ({ err }) => {
  return err && <p className="text-red-500 text-xs">{err.message}</p>;
};

export default ErrorMessage;
