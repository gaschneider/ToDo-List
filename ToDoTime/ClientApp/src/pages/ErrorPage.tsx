import styled from "@emotion/styled";
import { Link, useRouteError } from "react-router-dom";
import { homeRoute, routes } from "routes";

export const ErrorPage = () => {
  const error = useRouteError() as {
    statusText: string;
    message: string;
  };

  return (
    <ErrorContainer id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={routes[homeRoute]}>Click here to go back to home page</Link>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
