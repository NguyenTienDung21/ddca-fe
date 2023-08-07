import axios from "axios";
import { API_STOCK } from "../utils";
import instance from "./instance";
//Delete Stock by Session ID
export const deleteStockBySessionId = async (name: string) => {

  console.log("deleteStockBySessionId name: " + name);

  //Get the JWT String
  const now = new Date();
  const date = String(now.toLocaleDateString);
  //Get value from localstorage
  const existedLocalStorageJWT = localStorage.getItem(date);


  const response = await instance.delete(
    //http://localhost:8081/stocks/delete-stocks-session
    API_STOCK.deleteStockSession,
    {
      params: {
        sessionName: encodeURIComponent(name),
      },
      headers : {
        Authorization: `Bearer ${existedLocalStorageJWT}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  );
  return response.data;
};
