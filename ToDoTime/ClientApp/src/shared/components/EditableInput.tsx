import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { Input } from "shared/components/Input";

type EditableTitleProps = {
  value: string;
  onChange: (newValue: string) => boolean;
};

export const EditableInput: React.FC<EditableTitleProps> = ({ value, onChange }) => {
  const [editedValue, setEditedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const onConfirm = useCallback(() => {
    const result = onChange(editedValue);
    setIsInvalid(!result);
    if (result) {
      setIsEditing(false);
    }
  }, [editedValue, onChange]);

  const onCancel = useCallback(() => {
    setEditedValue(value);
    setIsEditing(false);
  }, [value]);

  if (isEditing) {
    return (
      <ValuContainer>
        <Input
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          style={{ paddingRight: "70px", color: isInvalid ? "red" : "black" }}
        />
        <IconsContainer>
          <BoxCustomIcon
            nameIcon="BiCheck"
            propsIcon={{
              size: 20,
              color: "green",
              onClick: onConfirm,
              style: {
                cursor: "pointer",
                border: "1px solid lightgray",
                borderRadius: "4px",
                padding: "0px 2px"
              }
            }}
          />
          <BoxCustomIcon
            nameIcon="BiX"
            propsIcon={{
              size: 20,
              color: "red",
              onClick: onCancel,
              style: {
                cursor: "pointer",
                border: "1px solid lightgray",
                borderRadius: "4px",
                padding: "0px 2px"
              }
            }}
          />
        </IconsContainer>
      </ValuContainer>
    );
  }

  return (
    <ValuContainer>
      {value}
      <BoxCustomIcon
        nameIcon="BiEditAlt"
        propsIcon={{ size: 20, onClick: () => setIsEditing(true), style: { cursor: "pointer" } }}
      />
    </ValuContainer>
  );
};

const ValuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const IconsContainer = styled.div`
  position: absolute;
  right: 0;
  width: 70px;
  display: flex;
  gap: 10px;
`;
