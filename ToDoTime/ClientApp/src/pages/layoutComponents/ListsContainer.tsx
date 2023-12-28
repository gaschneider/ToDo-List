import styled from "@emotion/styled";
import { useGetTasksLists } from "api/hooks/useGetTasksLists";
import { routes, tasksListDetailsRoute } from "routes";
import { TasksList } from "shared/types/TasksList";
import { NoListFound } from "./NoListFound";
import { useEffect, useMemo, useState } from "react";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { LeftSidebarItem } from "shared/components/LeftSidebarItem";

interface ListsContainerProps {
  isSidebarExpanded: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ListsContainer: React.FC<ListsContainerProps> = ({ isSidebarExpanded }) => {
  const [tasksLists, setTasksList] = useState<TasksList[]>();
  const getTasksLists = useGetTasksLists();

  useEffect(() => {
    getTasksLists().then((lists) => setTasksList(lists));
  }, [getTasksLists]);

  const containerContent = useMemo(() => {
    if (!tasksLists) {
      return <OneEightyRingWithBg color="#fff" width={20} height={20} />;
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
  }, [isSidebarExpanded, tasksLists]);

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

const ListsContainerTitle = styled.span`
  color: #f9cc0b;
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
