import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { useFetchTasksForList } from "./useFetchTasksForList";
import { NoTasks } from "pages/layoutComponents/NoTasks";
import { ListOfTasks } from "pages/layoutComponents/ListOfTasks";
import { CreateNewTaskInline } from "pages/layoutComponents/CreateNewTaskInline";
import { useManageListOfTasks } from "./useManageListOfTasks";
import { useManageTasksList } from "./useManageTasksList";
import { EditableDescription } from "pages/layoutComponents/EditableDescription";
import { EditableInput } from "shared/components/EditableInput";

export const TasksListDetails: React.FC = () => {
  const listId = useLoaderData() as number;
  const tasksList = useFetchTasksForList(listId);
  const { taskListDescription, taskListName, setDescription, onSetName } =
    useManageTasksList(tasksList);
  const { listOfTasks, toggleTaskDone, onCreateTask } = useManageListOfTasks(tasksList?.tasks);

  if (!tasksList || !taskListDescription || !taskListName) {
    return (
      <MainContainerTemplate title="Loading...">
        <TasksWrapper>
          <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
        </TasksWrapper>
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate title={<EditableInput value={taskListName} onChange={onSetName} />}>
      <ContentWrapper>
        <EditableDescription
          taskListDescription={taskListDescription}
          onSetDescription={setDescription}
        />
        <TasksWrapper>
          {Object.keys(listOfTasks).length === 0 ? (
            <NoTasks />
          ) : (
            <ListOfTasks tasks={listOfTasks} toggleTaskDone={toggleTaskDone} />
          )}
        </TasksWrapper>
        <Footer>
          <Divider />
          <CreateNewTaskInline onCreate={onCreateTask} />
        </Footer>
      </ContentWrapper>
    </MainContainerTemplate>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 50px;
  height: 100%;
`;

const TasksWrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 10px;
  grid-auto-rows: max-content;
  gap: 20px;
  max-height: 100%;
  overflow: auto;
  grid-template-columns: 1fr;
  place-items: center;
`;

const Divider = styled.hr`
  border-color: var(--app-gold-color);
`;

const Footer = styled.div`
  padding: 3px;
`;
