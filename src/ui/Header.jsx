import styled from "styled-components";
import Heading from "./Heading";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  border-bottom: 2px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h2">Dashboard</Heading>

      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
