import styled from "@emotion/styled";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { homeRoute, routes } from "routes";
import logo from "../../assets/logo.svg";
import collapsedLogo from "../../assets/collapsedLogo.webp";
import { css } from "@emotion/react";

interface AppTitleContainerProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppTitleContainer: React.FC<AppTitleContainerProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded
}) => {
  const appTitleRender = (
    <AppTitle to={routes[homeRoute]}>
      <LogoComponent
        isExpanded={isSidebarExpanded}
        src={isSidebarExpanded ? logo : collapsedLogo}
        alt="logo"
      />
    </AppTitle>
  );

  const iconRender = (
    <BiMenu color="#f9cc0b" onClick={() => setIsSidebarExpanded((prev) => !prev)} size={48} />
  );

  return (
    <Container isSidebarExpanded={isSidebarExpanded}>
      {iconRender}
      {appTitleRender}
    </Container>
  );
};

const LogoComponent = styled.img<{ isExpanded: boolean }>`
  width: ${(props) => (props.isExpanded ? "100%" : "30px")};
`;

type AppTitleContainerStyleParams = {
  isSidebarExpanded: boolean;
};

const appTitleContainerStyle = ({ isSidebarExpanded }: AppTitleContainerStyleParams) => {
  if (isSidebarExpanded) {
    return css`
      display: flex;
      width: 100%;
      border-bottom: 1px solid #f9cc0b;
    `;
  }
  return css`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f9cc0b;
  `;
};

const Container = styled.div`
  ${appTitleContainerStyle};
`;

const AppTitle = styled(Link)`
  padding: 10px;
  height: 20px;
  width: 100%;
`;
