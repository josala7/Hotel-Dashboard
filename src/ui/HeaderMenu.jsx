import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import DarkModeToggle from "./DarkModeToggle";

const StyledMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

function HeaderMenu() {
  const { isAuthenticated } = useUser();
  const { loggingout, isLoading } = useLogout();
  const navigate = useNavigate();
  return (
    <StyledMenu>
      <UserAvatar />
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>

      <li>
        {isAuthenticated && (
          <Button
            variations="secondary"
            onClick={() => loggingout()}
            disabled={isLoading}
          >
            Log Out
          </Button>
        )}
      </li>
    </StyledMenu>
  );
}

export default HeaderMenu;
