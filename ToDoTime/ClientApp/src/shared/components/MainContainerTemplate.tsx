import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

interface MainContainerTemplateProps {
  title?: React.ReactNode;
}

export const MainContainerTemplate: React.FC<PropsWithChildren<MainContainerTemplateProps>> = ({
  title,
  children
}) => {
  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ContainerContent>{children}</ContainerContent>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 45px 1fr 15px;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  padding: 4px;
  height: 100%;
  margin-top: 5px;
`;

const ContainerTitle = styled.span`
  font-size: 20px;
  color: var(--app-gold-color);
  font-weight: bold;
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid var(--app-gold-color);
  height: 35px;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
`;

const ContainerContent = styled.div`
  height: calc(100% - 40px);
  overflow-x: hidden;
  padding: 20px;
`;
