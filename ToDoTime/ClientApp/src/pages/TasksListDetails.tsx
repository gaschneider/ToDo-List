import styled from "@emotion/styled";
import { useGetTasksListDetails } from "api/hooks/useGetTasksListDetails";
import { useEffect, useState } from "react";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { TasksList } from "shared/types/TasksList";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";

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
  }, [getTasksListDetails, listId]);

  if (!listDetails) {
    return (
      <MainContainerTemplate title="Loading...">
        <TasksListDetailContainer>
          <OneEightyRingWithBg color="#f9cc0b" width={150} height={150} />
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
