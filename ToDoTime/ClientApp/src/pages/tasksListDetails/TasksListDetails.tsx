import styled from "@emotion/styled";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { useLoaderData } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import ReactSelectVirtualized from "react-select-virtualized";
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
import { memo, useMemo, useState } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { useIconSelector } from "shared/hooks/useIconSelector/useIconSelector";

type WithTasksListProps = {
  tasksList: TasksList;
};

const TasksListDetailsComponent: React.FC<WithTasksListProps> = ({ tasksList }) => {
  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const { onChangeName, onChangeDescription, onChangeIcon, isPatching, patchErrorMessage } =
    useManageTasksList(tasksList);
  const { listOfTasks, toggleTaskDone, onCreateTask } = useManageListOfTasks(tasksList.tasks);
  const { iconSelectProps, resetSelectedIcon } = useIconSelector({
    initialSelectedIcon: tasksList.icon
  });

  const title = useMemo(() => {
    if (isEditingIcon) {
      return (
        <TitleSection>
          <IconSelectorSection>
            <ReactSelectVirtualized
              {...iconSelectProps}
              isClearable={false}
              menuPortalTarget={document.body}
            />
          </IconSelectorSection>
          <BoxCustomIcon
            nameIcon="BiCheck"
            propsIcon={{
              size: 20,
              color: "green",
              onClick: () => {
                onChangeIcon(iconSelectProps.value?.value);
                setIsEditingIcon(false);
              },
              style: {
                cursor: "pointer",
                border: "1px solid lightgray",
                borderRadius: "4px",
                padding: "0px 2px",
                background: "white"
              }
            }}
          />
          <BoxCustomIcon
            nameIcon="BiX"
            propsIcon={{
              size: 20,
              color: "red",
              onClick: () => {
                resetSelectedIcon();
                setIsEditingIcon(false);
              },
              style: {
                cursor: "pointer",
                border: "1px solid lightgray",
                borderRadius: "4px",
                padding: "0px 2px",
                background: "white"
              }
            }}
          />
        </TitleSection>
      );
    }

    return (
      <TitleSection>
        <BoxCustomIcon
          nameIcon={tasksList.icon}
          propsIcon={{
            size: 32,
            color: APP_GOLD_COLOR,
            onClick: () => setIsEditingIcon(true),
            style: { cursor: "pointer" }
          }}
        />
        <EditableInput key={tasksList.id} value={tasksList.name} onChange={onChangeName} />
      </TitleSection>
    );
  }, [
    iconSelectProps,
    isEditingIcon,
    onChangeIcon,
    onChangeName,
    resetSelectedIcon,
    tasksList.icon,
    tasksList.id,
    tasksList.name
  ]);

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
    <MainContainerTemplate title={title}>
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

const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: row;
`;

const IconSelectorSection = styled.div`
  max-width: 300px;
  width: 100%;
`;

const Divider = styled.hr`
  border-color: var(--app-gold-color);
`;

const Footer = styled.div`
  padding: 3px;
`;
