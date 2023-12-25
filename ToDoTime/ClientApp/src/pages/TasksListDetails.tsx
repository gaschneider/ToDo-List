import styled from "@emotion/styled";
import { useGetTasksListDetails } from "api/hooks/useGetTasksListDetails";
import { useEffect, useState } from "react";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { TasksList } from "shared/types/List";
import spinner from "../assets/spinner.svg";
import { useLoaderData } from "react-router-dom";

export const TasksListDetails: React.FC = () => {
  const listId = useLoaderData() as number;
  const getTasksListDetails = useGetTasksListDetails();
  const [listDetails, setListDetails] = useState<TasksList>();

  useEffect(() => {
    // this triggers the spinner in the screen
    setListDetails(undefined);
    getTasksListDetails(listId).then((details) => {
      setListDetails(details);
    });
  }, [listId]);

  if (!listDetails) {
    return (
      <MainContainerTemplate title="Loading...">
        <TasksListDetailContainer>
          <SpinnerIcon src={spinner} />
        </TasksListDetailContainer>
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate title={listDetails.name}>
      <TasksListDetailContainer>Details on your list</TasksListDetailContainer>
    </MainContainerTemplate>
  );
};

const TasksListDetailContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  color: #f9cc0b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  height: 100%;
`;

const SpinnerIcon = styled.img`
  width: 150px;
  height: 150px;
`;
