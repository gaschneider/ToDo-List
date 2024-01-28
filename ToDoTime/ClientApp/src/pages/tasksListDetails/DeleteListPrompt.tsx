import styled from "@emotion/styled";
import { Button } from "shared/components/Button";
import { Modal } from "shared/components/Modal";

type DeleteListPromptProps = {
  isOpen: boolean;
  onClose: () => void;
  tasksListName: string;
  tasksListId: number;
  onConfirm: (id: number) => void;
};

export const DeleteListPrompt: React.FC<DeleteListPromptProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tasksListId,
  tasksListName
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete: ${tasksListName}?`}
      onBackdropClick={onClose}
    >
      <ModalContent>
        <ModalText>Are you sure you want to delete the selected list ?</ModalText>
        <ModalButtons>
          <Button onClick={() => onConfirm(tasksListId)}>Delete</Button>
          <Button onClick={onClose} neutral>
            Cancel
          </Button>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );
};

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
