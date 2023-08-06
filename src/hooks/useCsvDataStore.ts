import { useQueryClient } from "react-query";
import { DataRow } from "../types";

const CSV_DATA_QUERY_KEY = "csvData";

export const useCsvData = () => {
  const queryClient = useQueryClient();
  const csvData = queryClient.getQueryData<DataRow[]>(CSV_DATA_QUERY_KEY) || [];
  const setCsvData = (data: DataRow[]) => {
    queryClient.setQueryData(CSV_DATA_QUERY_KEY, data);
  };

  return { csvData, setCsvData };
};
