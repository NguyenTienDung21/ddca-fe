import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";
import "./buttonStyle.css";
export default function LogoutButton() {
  const navigate = useNavigate();

  //JWT of the user store in state
  const userJWTData = useUserStore((state) => state.setJwtToken);

  //Delete JWT from the UserStore
  const removeJWTUserStoreData = () => {
    //Clear JWT
    userJWTData("");
  };

  //Delete JWT from LocalStorage
  const removeJWTLocalStorage = () => {
    //Check if the jwt string exist first
    const now = new Date();
    const date = String(now.toLocaleDateString);

    //Get value from localstorage
    const existedLocalStorageJWT = localStorage.getItem(date);

    //If it exist, we remove it
    if (existedLocalStorageJWT !== null) {
      console.log("jwt found !");
      localStorage.removeItem(date);
    }
  };

  return (
    <>
      <button
        className="bg-[#6ec7df] hover:bg-[#3eb8da] logout_button"
        onClick={() => {
          removeJWTLocalStorage();
          removeJWTUserStoreData();
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </>
  );
}
