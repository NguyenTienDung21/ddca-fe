import { Link } from "react-router-dom";
// import intel from "../../assets/intel.svg";
import * as Dialog from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useSessionStore } from "../../hooks/useSessionStore";
import { useUserStore } from "../../hooks/useUserStore";

import "../MyStyleComponents/my-styles.css";
import { CreateNewFolder, FindInPage, More } from "@mui/icons-material";
import UserGuard from "../UserGuard/UserGuard";
import { NavigationBar } from "../Navigation/NavigationBar";

import { API_SESSION } from "../../utils";

const iconStyle = {
  backgroundColor: "#6EC7DF",
  iconFontSize: 64,
};

export const AdminFeatures = () => {
  const { createSession } = useSessionStore();
  const [newSessionName, setNewSessionName] = useState("");
  const username = useUserStore((state) => state.username);
  const userJWTString = useUserStore((state) => state.jwtToken);

  const handleCreateSession = () => {
    const date = new Date();
    const formattedDate = format(date, "H'h'mm'm' - dd/MM/yyyy");
    const defaultSessionName = `${formattedDate}`;
    setNewSessionName(defaultSessionName);
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setNewSessionName(event.target.value);
  };

  const handleConfirmSession = async () => {
    if (!newSessionName.trim()) {
      toast.error("Session name cannot be empty");
      return;
    }
    createSession(newSessionName);
    const regex = /(\d{2}\/\d{2}\/\d{4})/;
    const createdAtMatch = newSessionName.match(regex);
    const createdAt = createdAtMatch ? createdAtMatch[1] : null;

    const config : AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${userJWTString}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    console.warn(config.headers);
    
    //`http://localhost:8081/sessions/${username}/add?name=${newSessionName}&createdAt=${createdAt}`
    await axios.post(
      `${API_SESSION.createSession(username)}?name=${newSessionName}&createdAt=${createdAt}`,{},config
    );

    setNewSessionName("");
  };

  return (
    <div className="flex flex-col h-screen bg-blue-100 bg">
      <NavigationBar></NavigationBar>
      <div className="bg-slate-100 px-20 py-5 container1">
        <p className="menu-title">Admin Dash Board</p>

        {/* <img src={intel} alt="Intel logo" className="w-20 h-20 mx-auto" /> */}
        <span className=""></span>
        <div className="flex-container-row cards-container">
          <Dialog.Root>
            <div className="card flex-container-column">
              <div className="card-item flex-container-column">
                <p className="title fontWeight500">Create Session</p>

                <CreateNewFolder
                  sx={{ fontSize: iconStyle.iconFontSize }}
                  style={{ color: iconStyle.backgroundColor }}
                  className="icon"
                ></CreateNewFolder>
              </div>

              <Dialog.Trigger asChild>
                <button
                  className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white rounded-lg card-item card-item-button"
                  onClick={handleCreateSession}
                >
                  Create Session
                </button>
              </Dialog.Trigger>
            </div>
            <Dialog.Content
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded shadow-lg"
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              <Dialog.Title className="text-xl font-semibold mb-4">
                Edit Session Name
              </Dialog.Title>
              <input
                type="text"
                value={newSessionName}
                onChange={handleNameChange}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <Dialog.Close asChild>
                <button
                  className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white py-2 px-4 rounded-lg "
                  onClick={handleConfirmSession}
                >
                  Confirm
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg ml-4">
                  Close
                </button>
              </Dialog.Close>
              <Dialog.Close className="absolute top-2 right-2">
                &times;
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Root>
          <div className="card flex-container-column">
            <div className="card-item flex-container-column">
              <p className="title fontWeight500">View Session</p>

              <FindInPage
                sx={{ fontSize: iconStyle.iconFontSize }}
                style={{ color: iconStyle.backgroundColor }}
                className="icon"
              ></FindInPage>
            </div>

            <Link to={"/sessions"}>
              <button className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white rounded-lg card-item card-item-button">
                View Session
              </button>
            </Link>
          </div>
          <div className="card flex-container-column">
            <div className="card-item flex-container-column">
              <p className="title fontWeight500">More to come</p>

              <More
                sx={{ fontSize: iconStyle.iconFontSize }}
                style={{ color: iconStyle.backgroundColor }}
              ></More>
            </div>
            <button
              className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white  rounded-lg card-item card-item-button"
              onClick={() => toast("Will Add More In The Future \uD83D\uDD27")}
            >
              More To Come
            </button>
          </div>
        </div>
      </div>
      <UserGuard/>
    </div>
  );
};
