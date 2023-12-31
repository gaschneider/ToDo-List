import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { useFetchTasksForList } from "./useFetchTasksForList";
import { NoTasks } from "pages/layoutComponents/NoTasks";
import { ListOfTasks } from "pages/layoutComponents/ListOfTasks";

export const TasksListDetails: React.FC = () => {
  const listId = useLoaderData() as number;
  const tasksList = useFetchTasksForList(listId);

  if (!tasksList) {
    return (
      <MainContainerTemplate title="Loading...">
        <TasksListDetailContainer>
          <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
        </TasksListDetailContainer>
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate title={tasksList.name}>
      <TasksListDetailContainer>Details on your list</TasksListDetailContainer>
      {Object.keys(tasksList.tasks).length === 0 ? (
        <NoTasks />
      ) : (
        <ListOfTasks tasks={tasksList.tasks} />
      )}
    </MainContainerTemplate>
  );
};

const TasksListDetailContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  color: var(--app-gold-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
`;
