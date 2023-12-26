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
    <Container isExpanded={isExpanded}>
      <AppTitleContainer isSidebarExpanded={isExpanded} setIsSidebarExpanded={setIsExpanded} />
      <BodyContainer>
        <ListsContainerTitle>My lists</ListsContainerTitle>
        <ListsContainer isSidebarExpanded={isExpanded} />
        <AddNewListButton isSidebarExpanded={isExpanded} />
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div<{ isExpanded: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props) => (props.isExpanded ? "45px 1fr" : "90px 1fr")};
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 4px;
`;

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 8px 0px;
`;

const ListsContainerTitle = styled.span`
  color: #f9cc0b;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;
