import { useQuery } from "react-query";
import { DataRow } from "../types";
import axios from "axios";

// Fetch CSV Data
export const useImportedStocks = (sessionName: string) => {
  return useQuery<DataRow[], Error>(
    ["stocks", sessionName],
    async () => {
      const { data } = await axios.get<DataRow[]>(
        "http://localhost:8081/stocks/admin",
        {
          params: {
            sessionName: encodeURIComponent(sessionName as string),
          },
        }
      );
      return data;
    },
    {
      retry: (_failureCount, error) => {
        // Retry only if there's an error
        return error ? true : false;
      },
      retryOnMount: false,
      staleTime: Infinity,
    }
  );
};
