import React from "react";
import styled from "@emotion/styled";
import { listsMockData } from "mockData/ListData";

export const Layout = () => {
  return (
    <LayoutContainer>
      <LeftBar />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
`;

const LeftBar = () => {
  return (
    <Container>
      <AppTitle>To-Do Time</AppTitle>
      <BodyContainer>
        <ListsContainer>
          {listsMockData.map((list) => {
            return <ListItem key={list.id}>{list.name}</ListItem>;
          })}
        </ListsContainer>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 4px;
`;

const AppTitle = styled.span`
  font-weight: bold;
  color: #03afff;
`;
const BodyContainer = styled.div``;
const ListsContainer = styled.ul``;
const ListItem = styled.li``;
