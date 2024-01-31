import { format } from "date-fns";

export const formattedDate = (date) => {
  const originalDate = new Date(date);
  return format(originalDate, "dd-MM-yyyy");
};

export const dateFromIsoString = (date) => {
  const originalDate = new Date(date);
  return originalDate.toISOString();
};
