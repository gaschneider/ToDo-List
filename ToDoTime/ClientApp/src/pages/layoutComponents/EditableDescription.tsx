import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { TextArea } from "shared/components/TextArea";

type EditableDescriptionProps = {
  taskListDescription?: string;
  onSetDescription: Dispatch<SetStateAction<string | undefined>>;
};

export const EditableDescription: React.FC<EditableDescriptionProps> = ({
  taskListDescription,
  onSetDescription
}) => {
  const [editedDescription, setEditedDescription] = useState(taskListDescription);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedDescription(taskListDescription);
  }, [taskListDescription]);

  if (isEditing) {
    return (
      <TextAreaContainer>
        <TextArea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onConfirm={() => {
            onSetDescription(editedDescription);
            setIsEditing(false);
          }}
          onCancel={() => {
            setEditedDescription(taskListDescription);
            setIsEditing(false);
          }}
        />
      </TextAreaContainer>
    );
  }

  return (
    <DescriptionContainer>
      <Description>{taskListDescription}</Description>
      <BoxCustomIcon
        nameIcon="BiCommentEdit"
        propsIcon={{
          style: { width: 25, height: 25, cursor: "pointer" },
          onClick: () => {
            setIsEditing(true);
          }
        }}
      />
    </DescriptionContainer>
  );
};

const DescriptionContainer = styled.div`
  color: var(--app-gold-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Description = styled.span`
  width: fit-content;
  max-width: 300px;
  max-height: 100%;
  overflow: auto;
`;

const TextAreaContainer = styled.div`
  width: 300px;
  justify-self: center;
`;
