import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { NoTasks } from "pages/layoutComponents/NoTasks";
import { ListOfTasks } from "pages/layoutComponents/ListOfTasks";
import { CreateNewTaskInline } from "pages/layoutComponents/CreateNewTaskInline";
import { useManageListOfTasks } from "./useManageListOfTasks";
import { useManageTasksList } from "./useManageTasksList";
import { EditableDescription } from "pages/layoutComponents/EditableDescription";
import { EditableInput } from "shared/components/EditableInput";
import { useGetTasksListDetails } from "api/hooks/useGetTasksListDetails";
import { TasksList } from "shared/types/TasksList";
import { memo } from "react";

type WithTasksListProps = {
  tasksList: TasksList;
};

const TasksListDetailsComponent: React.FC<WithTasksListProps> = ({ tasksList }) => {
  const { onChangeName, onChangeDescription, isPatching, patchErrorMessage } =
    useManageTasksList(tasksList);
  const { listOfTasks, toggleTaskDone, onCreateTask } = useManageListOfTasks(tasksList.tasks);

  if (isPatching) {
    return (
      <MainContainerTemplate title={patchErrorMessage ? "Error updating" : "Updating..."}>
        <TasksWrapper>
          {patchErrorMessage || (
            <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
          )}
        </TasksWrapper>
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate
      title={<EditableInput key={tasksList.id} value={tasksList.name} onChange={onChangeName} />}
    >
      <ContentWrapper>
        <EditableDescription
          key={tasksList.id}
          taskListDescription={tasksList.description}
          onSetDescription={onChangeDescription}
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

const withTasksList = <TProps extends WithTasksListProps>(
  Component: React.ComponentType<TProps>
) => {
  const displayName = Component.displayName || "Component";

  const ComponentWithTasksList = (props: Omit<TProps, keyof WithTasksListProps>) => {
    const listId = useLoaderData() as number;
    const { tasksList, isLoading, errorMessage } = useGetTasksListDetails(listId);

    if (isLoading || !tasksList) {
      return (
        <MainContainerTemplate title={errorMessage ? "Error loading" : "Loading..."}>
          <TasksWrapper>
            {errorMessage || (
              <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
            )}
          </TasksWrapper>
        </MainContainerTemplate>
      );
    }

    return <Component {...(props as TProps)} tasksList={tasksList} />;
  };

  ComponentWithTasksList.displayName = `withTasksList${displayName}`;

  return ComponentWithTasksList;
};

export const TasksListDetails = withTasksList(memo(TasksListDetailsComponent));

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
  color: var(--app-gold-color);
`;

const Divider = styled.hr`
  border-color: var(--app-gold-color);
`;

const Footer = styled.div`
  padding: 3px;
`;
