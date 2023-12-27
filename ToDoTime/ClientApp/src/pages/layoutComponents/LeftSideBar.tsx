import React from "react";
import styled from "@emotion/styled";
import { AppTitleContainer } from "./AppTitleContainer";
import { ListsContainer } from "./ListsContainer";
import { AddNewListButton } from "./AddNewListButton";

interface LeftSidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isExpanded, setIsExpanded }) => {
  return (
    <Container>
      <AppTitleContainer isSidebarExpanded={isExpanded} setIsSidebarExpanded={setIsExpanded} />
      <BodyContainer>
        <ListsContainer isSidebarExpanded={isExpanded} />
      </BodyContainer>
      <AddNewListButton isSidebarExpanded={isExpanded} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 45px 1fr 60px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 4px;
`;

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
