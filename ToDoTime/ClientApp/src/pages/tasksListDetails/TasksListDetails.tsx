import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { useFetchTasksForList } from "./useFetchTasksForList";
import { NoTasks } from "pages/layoutComponents/NoTasks";
import { ListOfTasks } from "pages/layoutComponents/ListOfTasks";
import { CreateNewTaskInline } from "shared/components/CreateNewTaskInline";

export const TasksListDetails: React.FC = () => {
  const listId = useLoaderData() as number;
  const tasksList = useFetchTasksForList(listId);

  if (!tasksList) {
    return (
      <MainContainerTemplate title="Loading...">
        <TasksWrapper>
          <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
        </TasksWrapper>
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate title={tasksList.name}>
      <ContentWrapper>
        <TasksWrapper>
          {Object.keys(tasksList.tasks).length === 0 ? (
            <NoTasks />
          ) : (
            <ListOfTasks tasks={tasksList.tasks} />
          )}
        </TasksWrapper>
        <Footer>
          <Divider />
          <CreateNewTaskInline onCreate={() => {}} />
        </Footer>
      </ContentWrapper>
    </MainContainerTemplate>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px;
  height: 100%;
`;

const TasksWrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 10px;
  grid-template-rows: max-content;
  gap: 20px;
`;

const Divider = styled.hr`
  border-color: var(--app-gold-color);
`;

const Footer = styled.div`
  padding: 3px;
`;
