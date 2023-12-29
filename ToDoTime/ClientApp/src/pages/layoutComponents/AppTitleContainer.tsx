import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { homeRoute, routes } from "routes";
import logo from "../../assets/logo.svg";
import { css } from "@emotion/react";
import { AvailableIconsEnum } from "shared/availableIcons";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

interface AppTitleContainerProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppTitleContainer: React.FC<AppTitleContainerProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded
}) => {
  const appTitleRender = isSidebarExpanded && (
    <AppTitle to={routes[homeRoute]}>
      <LogoComponent src={logo} alt="logo" />
    </AppTitle>
  );

  const iconRender = (
    <IconContainer
      isSidebarExpanded={isSidebarExpanded}
      onClick={() => setIsSidebarExpanded((prev) => !prev)}
    >
      <BoxCustomIcon
        nameIcon={AvailableIconsEnum.BiMenu}
        propsIcon={{ color: APP_GOLD_COLOR, size: 45 }}
      />
    </IconContainer>
  );

  return (
    <Container isSidebarExpanded={isSidebarExpanded}>
      {iconRender}
      {appTitleRender}
    </Container>
  );
};

type IconContainerStyleParams = {
  isSidebarExpanded: boolean;
};

const iconContainerStyle = ({ isSidebarExpanded }: IconContainerStyleParams) => {
  const commonStyle = css`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 45px;
    cursor: pointer;
  `;

  if (isSidebarExpanded) {
    return [
      commonStyle,
      css`
        width: unset;
      `
    ];
  }
  return commonStyle;
};

const IconContainer = styled.div`
  ${iconContainerStyle}
`;

const AppTitle = styled(Link)`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoComponent = styled.img`
  width: 100%;
`;

type AppTitleContainerStyleParams = {
  isSidebarExpanded: boolean;
};

const appTitleContainerStyle = ({ isSidebarExpanded }: AppTitleContainerStyleParams) => {
  const commonStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--app-gold-color);
    height: 100%;
  `;

  if (isSidebarExpanded) {
    return [
      commonStyle,
      css`
        width: 100%;
      `
    ];
  }
  return [
    commonStyle,
    css`
      flex-direction: column;
    `
  ];
};

const Container = styled.div`
  ${appTitleContainerStyle};
`;
