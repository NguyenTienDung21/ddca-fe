import { SearchParams } from "../types";

// Parse the search parameters from the URL query string
export const getSearchParams = (search: string): SearchParams => {
  const searchParams = new URLSearchParams(search);
  const sessionName = searchParams.get("session");
  return { sessionName };
};
