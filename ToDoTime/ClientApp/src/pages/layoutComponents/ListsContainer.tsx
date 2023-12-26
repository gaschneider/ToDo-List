import styled from "@emotion/styled";
import { useGetTasksLists } from "api/hooks/useGetTasksLists";
import { Link } from "react-router-dom";
import { routes, tasksListDetailsRoute } from "routes";
import { TasksList } from "shared/types/List";
import { NoListFound } from "./NoListFound";
import spinner from "../../assets/spinner.svg";
import { useEffect, useMemo, useState } from "react";

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
      return <SpinnerIcon src={spinner} />;
    }

    return tasksLists.length > 0 ? (
      tasksLists.map((list) => {
        return <LeftSidebarListItem key={list.id} list={list} />;
      })
    ) : (
      <NoListFound />
    );
  }, [tasksLists]);

  return <Container>{containerContent}</Container>;
};

const Container = styled.div`
  color: #f9cc0b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 8px 15px 30px;
  border-bottom: 1px solid #f9cc0b;
`;

const SpinnerIcon = styled.img`
  width: 20px;
  height: 20px;
`;

interface LeftSidebarListItemProps {
  list: TasksList;
}

const LeftSidebarListItem: React.FC<LeftSidebarListItemProps> = ({ list }) => {
  return (
    <ListItem>
      <ListItemLink to={routes[tasksListDetailsRoute].replace(":listId", list.id.toString())}>
        {list.name}
      </ListItemLink>
    </ListItem>
  );
};

const ListItem = styled.span`
  width: 100%;
  text-align: center;
  padding: 6px;
  &:hover {
    background-color: white;
  }
`;
const ListItemLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
