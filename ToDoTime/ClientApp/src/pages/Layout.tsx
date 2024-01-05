import React, { useState } from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { LeftSidebar } from "./layoutComponents/LeftSideBar";

export const Layout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <LayoutContainer isExpanded={isExpanded}>
      <LeftSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div<{ isExpanded: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: ${(props) => (props.isExpanded ? "220px 1fr" : "60px 1fr")};
  grid-template-rows: 100vh;
  grid-row-gap: 0px;
  background-color: black;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  transition: all 0.4s ease;
`;

const MainContainer = styled.div`
  background-color: #282c34;
`;
