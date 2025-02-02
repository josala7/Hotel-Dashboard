import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. load  authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. If there is no authenticated user , redirect /login

  if (!isAuthenticated && !isLoading) return navigate("/login");

  //3. while loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //4. If there is authenticated user , render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
