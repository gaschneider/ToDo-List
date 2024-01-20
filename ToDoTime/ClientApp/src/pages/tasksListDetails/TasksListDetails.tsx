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
import { memo, useCallback, useMemo, useState } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { useIconSelector } from "shared/hooks/useIconSelector/useIconSelector";
import { Modal } from "shared/components/Modal";
import { Button } from "shared/components/Button";

type WithTasksListProps = {
  tasksList: TasksList;
};

const TasksListDetailsComponent: React.FC<WithTasksListProps> = ({ tasksList }) => {
  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const {
    onChangeName,
    onChangeDescription,
    onChangeIcon,
    isPatching,
    patchErrorMessage,
    deleteErrorMessage,
    isDeleting,
    onDelete
  } = useManageTasksList(tasksList);
  const { listOfTasks, toggleTaskDone, onCreateTask } = useManageListOfTasks(tasksList.tasks);
  const { iconSelectProps, resetSelectedIcon } = useIconSelector({
    initialSelectedIcon: tasksList.icon
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        <InputSection>
          <EditableInput key={tasksList.id} value={tasksList.name} onChange={onChangeName} />
        </InputSection>
        <DeleteSection>
          <BoxCustomIcon
            nameIcon="BiTrash"
            propsIcon={{
              size: 32,
              color: APP_GOLD_COLOR,
              onClick: () => setIsDeleteModalOpen(true),
              style: { cursor: "pointer" }
            }}
          />
        </DeleteSection>
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

  const closeModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  if (isPatching || isDeleting) {
    let message = patchErrorMessage ? "Error updating" : "Updating...";
    if (isDeleting || deleteErrorMessage) {
      message = deleteErrorMessage ? "Error deleting" : "Deleting...";
    }
    return (
      <MainContainerTemplate title={message}>
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
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
          title={`Delete: ${tasksList.name}?`}
          onBackdropClick={closeModal}
        >
          <ModalContent>
            <ModalText>Are you sure you want to delete the selected list ?</ModalText>
            <ModalButtons>
              <Button onClick={() => onDelete(tasksList.id)}>Delete</Button>
              <Button onClick={closeModal} neutral>
                Cancel
              </Button>
            </ModalButtons>
          </ModalContent>
        </Modal>
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
  grid-template-rows: 100px 1fr 85px;
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
const InputSection = styled.div`
  width: fit-content;
  max-width: calc(100% - 37px - 37px);
  overflow: hidden;
  margin-left: auto;
`;
const DeleteSection = styled.div`
  margin-left: auto;
`;

const IconSelectorSection = styled.div`
  max-width: 300px;
  width: 100%;
`;

const Divider = styled.hr`
  border-color: var(--app-gold-color);
`;

const Footer = styled.div`
  height: fit-content;
  padding: 3px;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
`;
const ModalText = styled.div`
  width: 100%;
  font-size: 15px;
`;
const ModalButtons = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
`;
