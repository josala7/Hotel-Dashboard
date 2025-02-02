import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiArrowCircleLeft } from "react-icons/hi";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  position: relative;
  background-color: var(--color-grey-0);
  padding: ${(props) => (props.collapsed ? "5rem 2rem" : "2rem 3rem")};
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: ${(props) => (props.collapsed ? "13rem" : "30rem")};
  transition: width 0.3s ease;
  /* overflow: hidden; */
`;
const StyledArrow = styled.div`
  position: absolute;
  top: 40%;
  right: -1.5rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-indigo-100);
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 555;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

function SideBar({ collapsed, setCollapsed }) {
  function handleResponsive() {
    setCollapsed((prev) => !prev);
  }

  return (
    <StyledSidebar collapsed={collapsed}>
      {!collapsed && <Logo />}
      <MainNav collapsed={collapsed} />
      <StyledArrow onClick={handleResponsive}>
        <HiArrowCircleLeft
          style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </StyledArrow>
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default SideBar;
