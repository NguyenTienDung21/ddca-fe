import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { LoginJWT, LoginUser } from "../../types";
import toast from "react-hot-toast";
import intel from "../../assets/intel.svg";
import { useUserStore } from "../../hooks/useUserStore";
import { getLoginUser } from "../../actions/getLoginUser";
import { CustomOtherButton } from "../Button/CustomButton";
import "./loginPage.css";
import jwt_decode from "jwt-decode";

export const LoginPage = () => {
  // User store state and actions
  const setUsername = useUserStore((state) => state.setUsername);
  const setPassword = useUserStore((state) => state.setPassword);
  const username = useUserStore((state) => state.username);
  const password = useUserStore((state) => state.password);

  // Navigation and user role state
  const navigate = useNavigate();
  const userRole = useUserStore((state) => state.setRole);
  const userJWTData = useUserStore((state) => state.setJwtToken);

  // Login mutation using react-query
  const loginMutation = useMutation(getLoginUser, {
    onSuccess: (jwtString: LoginJWT) => {
      const userWholeData: LoginUser = jwt_decode(jwtString.data);

      //Set the JWT for the user
      userJWTData(jwtString.data);

      //Add jwt to local storage
      storeJWTString(jwtString.data);

      //Case to assign to the role
      // Redirect based on user role
      switch (userWholeData.role) {
        case "Admin":
          navigate("/admin-features");
          userRole("Admin");
          break;
        case "Supervisor":
          navigate("/supervisor-features");
          userRole("Supervisor");
          break;
        case "Operator":
          navigate("/operator-features");
          userRole("Operator");
          break;
        default:
          toast.error("Invalid role");
          break;
      }
    },
    onError: (error: unknown) => {
      console.error("Error while logging in:", error);
      toast.error("Login Error");
    },
    retry: 1, // Limit retries on failure
  });

  const storeJWTString = (jwtString: string) => {
    //Check if the jwt string exist first
    const now = new Date();
    const date = String(now.toLocaleDateString);

    //Get value from localstorage
    const existedLocalStorageJWT = localStorage.getItem(date);

    //If not exist then we will add a new one
    if (existedLocalStorageJWT === null) {
      console.log("null");
      localStorage.setItem(date, jwtString);
    } else if (existedLocalStorageJWT !== null) {
      console.log(existedLocalStorageJWT);
    }
  };

  // Form submission handler
  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      loginMutation.mutate({ username, password });
    },
    [loginMutation, username, password]
  );

  return (
    <div
      className="flex flex-col h-screen items-center justify-center bg-blue-100"
      style={{ backgroundColor: "#F8FCFF" }}
    >
      <div
        className=" px-10 login_container rounded-xl	"
        style={{ backgroundColor: "#fdfdfd" }}
      >
        <img src={intel} alt="Intel logo" className="w-28 h-28  img" />
        <form onSubmit={handleSubmit} className="login_form">
          <div>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input"
            ></input>
          </div>
          <CustomOtherButton
            className="login_button"
            type="submit"
            buttonText="Login"
            onClick={() => {
              handleSubmit;
            }}
          />
        </form>
      </div>
    </div>
  );
};
