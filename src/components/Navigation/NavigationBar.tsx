import LogoutButton from "../Button/LogoutButton";
import styled from "styled-components";
import intel from "../../assets/intel.svg";
import "./nav.css";
const size = {
  tablet: "768px",
};

export const device = {
  tablet: `(max-width: ${size.tablet})`,
};

const Navigation = styled.div`
  background-color: white;
  height: 10%;
  min-height: 80px;
  width: 100%;
  display: flex;
  flex: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 80px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.05);
  z-index: 2;

  @media ${device.tablet} {
    padding: 0px 20px;
    min-height: 60px;
  }
`;

export const NavigationBar = () => {
  return (
    <Navigation>
      <img src={intel} alt="Intel logo" className="nav-logo" />
      <LogoutButton></LogoutButton>
    </Navigation>
  );
};
