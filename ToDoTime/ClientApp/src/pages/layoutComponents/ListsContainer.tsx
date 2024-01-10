import styled from "@emotion/styled";
import { useGetTasksLists } from "api/hooks/useGetTasksLists";
import { routes, tasksListDetailsRoute } from "routes";
import { TasksList } from "shared/types/TasksList";
import { NoListFound } from "./NoListFound";
import { useMemo } from "react";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { LeftSidebarItem } from "shared/components/LeftSidebarItem";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";

interface ListsContainerProps {
  isSidebarExpanded: boolean;
}

export const ListsContainer: React.FC<ListsContainerProps> = ({ isSidebarExpanded }) => {
  const { tasksLists, isLoading, errorMessage } = useGetTasksLists();

  const containerContent = useMemo(() => {
    if (isLoading) {
      return <OneEightyRingWithBg color={APP_GOLD_COLOR} width={20} height={20} />;
    }

    if (errorMessage) {
      return <ErrorContainer>{errorMessage}</ErrorContainer>;
    }

    return tasksLists.length > 0 ? (
      tasksLists.map((list) => {
        return (
          <LeftSidebarListItem isSidebarExpanded={isSidebarExpanded} key={list.id} list={list} />
        );
      })
    ) : (
      <NoListFound />
    );
  }, [errorMessage, isLoading, isSidebarExpanded, tasksLists]);

  return (
    <>
      <ListsContainerTitle>My lists</ListsContainerTitle>
      <Container isSidebarExpanded={isSidebarExpanded}>{containerContent}</Container>
    </>
  );
};

const Container = styled.div<{ isSidebarExpanded: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: ${(props) => (props.isSidebarExpanded ? "8px 15px 0px" : "8px 5px 0px")};
  width: 100vw;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;

  // TODO Issue #5: Review scrollbar style
  scrollbar-gutter: true;

  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-track-piece {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const ErrorContainer = styled.div`
  width: 200px;
  color: var(--app-gold-color);
  text-align: center;
`;

const ListsContainerTitle = styled.span`
  color: var(--app-gold-color);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

interface LeftSidebarListItemProps {
  isSidebarExpanded: boolean;
  list: TasksList;
}

const LeftSidebarListItem: React.FC<LeftSidebarListItemProps> = ({ isSidebarExpanded, list }) => {
  return (
    <LeftSidebarItem
      isSidebarExpanded={isSidebarExpanded}
      to={routes[tasksListDetailsRoute].replace(":listId", list.id.toString())}
      title={list.name}
      icon={list.icon}
      tooltipId={`list-${list.id}`}
    />
  );
};
