import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.collapsed ? "10rem auto" : "30rem auto"};
  grid-template-rows: auto 1fr;
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem ${({ collapsed }) => (collapsed ? "2rem" : "4.5rem")} 6rem;
  overflow: scroll;
  transition: all 0.3s ease;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 845) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", handleResize);
    // Run once on mount to set initial state correctly
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <StyledAppLayout collapsed={collapsed}>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
