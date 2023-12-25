import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";

export const NewList = () => {
  return (
    <MainContainerTemplate title="New Task List">
      <NewListContainer>Lets create something here</NewListContainer>
    </MainContainerTemplate>
  );
};

const NewListContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  color: #f9cc0b;
  display: flex;
  justify-content: center;
  font-size: 45px;
`;
