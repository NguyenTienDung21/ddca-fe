import { Link } from "react-router-dom";
import "../MyStyleComponents/my-styles.css";
import {
  CreateNewFolder,
  FindInPage,
  More,
  Article,
} from "@mui/icons-material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import UserGuard from "../UserGuard/UserGuard";

import { NavigationBar } from "../Navigation/NavigationBar";
const iconStyle = {
  backgroundColor: "#6EC7DF",
  iconFontSize: 64,
};

export const SupervisorFeatures = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="flex flex-col h-screen bg-blue-100 bg">
      <NavigationBar></NavigationBar>
      <div className="bg-slate-100 px-20 py-5 container1">
        <p className="menu-title">Supervisor Dash Board</p>
        <div className="flex-container-row cards-container">
          {/* card item 1 */}
          <div className="card flex-container-column">
            <div className="card-item flex-container-column">
              <p className="title fontWeight500">Create Session</p>
              <CreateNewFolder
                sx={{ fontSize: width < 770 ? "50px" : "80px" }}
                style={{ color: iconStyle.backgroundColor }}
              ></CreateNewFolder>
            </div>
            <Link to={"/signup"}>
              <button className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white rounded-lg card-item card-item-button">
                Creating Account
              </button>
            </Link>
          </div>
          {/* card item 2 */}
          <div className="card flex-container-column">
            {/* title container*/}
            <div className="card-item flex-container-column">
              <p className="title fontWeight500">Manage Account</p>

              <Article
                sx={{ fontSize: width < 770 ? "50px" : "80px" }}
                style={{ color: iconStyle.backgroundColor }}
                className="logo"
              ></Article>
            </div>

            <Link to={"/manage-account"}>
              <button className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white rounded-lg card-item card-item-button">
                Manage Account
              </button>
            </Link>
          </div>
          {/* card item 3 */}
          <div className="card flex-container-column">
            {/* title container*/}
            <div className="card-item flex-container-column">
              <p className="title fontWeight500">View Session</p>

              <FindInPage
                sx={{ fontSize: width < 770 ? "50px" : "80px" }}
                style={{ color: iconStyle.backgroundColor }}
                className="logo"
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
                sx={{ fontSize: width < 770 ? "50px" : "80px" }}
                style={{ color: iconStyle.backgroundColor }}
                className="logo"
              ></More>
            </div>

            <button className="bg-[#6EC7DF] hover:bg-[#2691b4] text-white rounded-lg card-item card-item-button">
              More To Come
            </button>
          </div>
        </div>
      </div>
      <UserGuard />
    </div>
  );
};
