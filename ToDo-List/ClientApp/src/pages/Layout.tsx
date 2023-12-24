import React from "react";
import styled from "@emotion/styled";
import { listsMockData } from "mockData/ListData";
import logo from "../assets/logo.svg";
import { Link, Outlet } from "react-router-dom";
import { homeRoute, newListRoute, routes } from "routes";

export const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <LeftBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  background-color: black;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  background-color: #282c34;
`;

const LeftBar = () => {
  return (
    <Container>
      <AppTitle to={routes[homeRoute]}>
        <img src={logo} alt="logo" />
      </AppTitle>
      <BodyContainer>
        <ListsContainer>
          {listsMockData.map((list) => {
            return <ListItem key={list.id}>{list.name}</ListItem>;
          })}
        </ListsContainer>
        <AddList />
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

const AppTitle = styled(Link)`
  padding: 10px;
  height: 20px;
  border-bottom: 1px solid #f9cc0b;
`;

const BodyContainer = styled.div``;
const ListsContainer = styled.ul`
  color: #f9cc0b;
`;
const ListItem = styled.li``;

const AddList = () => {
  return <AddNewListButton to={routes[newListRoute]}>+ New List</AddNewListButton>;
};

const AddNewListButton = styled(Link)`
  color: #f9cc0b;
`;
