import { useQuery } from "react-query";
import { OriginalData } from "../types";
import axios from "axios";
import { API_STOCK } from "../utils";

// Fetch Stocks Belonging to a Session and Operator
export const useStocks = (sessionName: string, operatorName: string) => {


  //Get the JWT String
  const now = new Date();
  const date = String(now.toLocaleDateString);
  //Get value from localstorage
  const existedLocalStorageJWT = localStorage.getItem(date);

  return useQuery<OriginalData[], Error>(
    ["stocks", sessionName, operatorName],
    async () => {
      const { data } = await axios.get<OriginalData[]>(
        //"http://localhost:8081/stocks/operator"
        API_STOCK.getStocksOperator,
        {
          params: {
            sessionName: encodeURIComponent(sessionName as string),
            operatorName: operatorName,
          },
          headers : {
            Authorization: `Bearer ${existedLocalStorageJWT}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      );
      console.log(data);
      
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
