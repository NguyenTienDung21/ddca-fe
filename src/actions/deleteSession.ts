import axios from "axios";
import { API_SESSION } from "../utils";

//Delete Session
export const deleteSession = async (name: string) => {
  console.log("deleteSession name: " + name);

  //Get the JWT String
  const now = new Date();
  const date = String(now.toLocaleDateString);
  //Get value from localstorage
  const existedLocalStorageJWT = localStorage.getItem(date);
  
  //http://localhost:8081/sessions/delete
  const response = await axios.delete(API_SESSION.deleteSession, {
    data: {
      name: name,
    },
    headers : {
      Authorization: `Bearer ${existedLocalStorageJWT}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  return response.data;
};
