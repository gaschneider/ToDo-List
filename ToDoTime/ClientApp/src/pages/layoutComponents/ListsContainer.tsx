import styled from "@emotion/styled/macro";
import { useGetTasksLists } from "api/hooks/useGetTasksLists";
import { Link } from "react-router-dom";
import { routes, tasksListDetailsRoute } from "routes";
import { TasksList } from "shared/types/List";
import { NoListFound } from "./NoListFound";
import { useEffect, useMemo, useState } from "react";
import { OneEightyRingWithBg } from "react-svg-spinners";

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
      <Container isSidebarExpanded={isSidebarExpanded}>{containerContent}</Container>;
    </>
  );
};

const Container = styled.div<{ isSidebarExpanded: boolean }>`
  color: #f9cc0b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: ${(props) => (props.isSidebarExpanded ? "8px 15px 30px" : "8px 5px 30px")};
  border-bottom: 1px solid #f9cc0b;
  width: -webkit-fill-available;
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
    <ListItem>
      <ListItemLink to={routes[tasksListDetailsRoute].replace(":listId", list.id.toString())}>
        {list.name}
      </ListItemLink>
      <ListItemTooltip isSidebarExpanded={isSidebarExpanded}>{list.name}</ListItemTooltip>
    </ListItem>
  );
};

const ListItem = styled.span`
  width: 100%;
  text-align: center;
  padding: 6px;
  border-radius: 8px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const ListItemTooltip = styled.span<{ isSidebarExpanded: boolean }>``;

const ListItemLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
