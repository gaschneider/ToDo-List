import styled from "@emotion/styled";
import { DynamicIcon } from "shared/DynamicIcon";
import { AvailableIconsEnum } from "shared/availableIcons";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";

export const NewList = () => {
  return (
    <MainContainerTemplate title="New Task List">
      <NewListContainer>Lets create something here</NewListContainer>
      <IconsGrid>
        {Object.keys(AvailableIconsEnum).map((k) => {
          return (
            <DynamicIcon
              key={k}
              nameIcon={AvailableIconsEnum[k as AvailableIconsEnum]}
              propsIcon={{ color: "#f9cc0b", size: 45 }}
            />
          );
        })}
      </IconsGrid>
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

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 50px;
`;
