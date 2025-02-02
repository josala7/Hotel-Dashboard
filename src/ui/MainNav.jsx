import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiHome,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: ${(props) => (props.collapsed ? "0" : "1.2rem")};
    justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    width: 100%;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
function MainNav({ collapsed }) {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" collapsed={collapsed}>
            <HiHome />
            {!collapsed && <span>Home</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings" collapsed={collapsed}>
            <HiOutlineCalendarDays />
            {!collapsed && <span>Bookings</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins" collapsed={collapsed}>
            <HiOutlineHomeModern />
            {!collapsed && <span>Cabins</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users" collapsed={collapsed}>
            <HiOutlineUsers />
            {!collapsed && <span>Users</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" collapsed={collapsed}>
            <HiOutlineCog6Tooth />
            {!collapsed && <span>Settings</span>}
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
