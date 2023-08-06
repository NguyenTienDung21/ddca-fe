import { toast } from "react-hot-toast";
import { useUserStore } from "../../hooks/useUserStore";
import { useEffect } from "react";

export default function UserGuard() {


  const userJWTString = useUserStore((state) => state.jwtToken);

  //Check if the JWT localstorage exist
  const checkJWTLocalStorage = () => {
    //Check if the jwt string exist first
    const now = new Date();
    const date = String(now.toLocaleDateString);

    //Get value from localstorage
    const existedLocalStorageJWT = localStorage.getItem(date);

    //If not exist then we will add a new one
    if (existedLocalStorageJWT === null) {
        toast.error("No JWT found ! Please Log in", {
            duration: 800,
          });
    } 

  };

  //Check if the userStoreJWT exist
  const checkJWTUserStore = () => {
    const data = userJWTString;
    if(data === ""){
        toast.error("No JWT found ! Please log in", {
            duration: 800,
          });
    }
  }

  useEffect(() => {
    checkJWTLocalStorage();
    checkJWTUserStore();
  })

  return (null);
}
