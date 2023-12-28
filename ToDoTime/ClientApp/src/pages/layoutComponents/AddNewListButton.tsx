import styled from "@emotion/styled";
import { newListRoute, routes } from "routes";
import { AvailableIconsEnum } from "shared/availableIcons";
import { LeftSidebarItem } from "shared/components/LeftSidebarItem";

interface AddNewListButtonProps {
  isSidebarExpanded: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddNewListButton: React.FC<AddNewListButtonProps> = ({ isSidebarExpanded }) => {
  return (
    <Container isSidebarExpanded={isSidebarExpanded}>
      <LeftSidebarItem
        isSidebarExpanded={isSidebarExpanded}
        to={routes[newListRoute]}
        title="Add new list"
        icon={AvailableIconsEnum.BiAddToQueue}
        tooltipId="add-new-list"
      />
    </Container>
  );
};

const Container = styled.div<{ isSidebarExpanded: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${(props) => (props.isSidebarExpanded ? "10px 15px 10px" : "10px 5px 10px")};
  border-top: 1px solid #f9cc0b;
  width: -webkit-fill-available;
  height: 50px;
`;
