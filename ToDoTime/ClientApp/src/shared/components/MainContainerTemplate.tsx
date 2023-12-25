import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

interface MainContainerTemplateProps {
  title: string;
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
  grid-template-rows: 45px 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  padding: 4px;
  height: 100%;
`;

const ContainerTitle = styled.span`
  font-size: 20px;
  color: #f9cc0b;
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: 5px;
  border-bottom: 1px solid #f9cc0b;
  height: 30px;
`;

const ContainerContent = styled.div`
  height: 100%;
`;
