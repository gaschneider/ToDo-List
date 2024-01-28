import styled from "@emotion/styled";
import { useState } from "react";
import { AvailableIconsEnum } from "shared/availableIcons";
import { useIconSelector } from "shared/hooks/useIconSelector/useIconSelector";
import ReactSelectVirtualized from "react-select-virtualized";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { EditableInput } from "shared/components/EditableInput";

type TasksListTitleProps = {
  tasksListId: number;
  tasksListName: string;
  tasksListIcon: AvailableIconsEnum;
  onChangeIcon: (newIcon?: string) => void;
  onChangeName: (newName: string) => boolean;
  onRequestDelete: () => void;
};

export const TasksListTitle: React.FC<TasksListTitleProps> = ({
  tasksListIcon,
  onChangeIcon,
  tasksListId,
  tasksListName,
  onChangeName,
  onRequestDelete
}) => {
  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const { iconSelectProps, resetSelectedIcon } = useIconSelector({
    initialSelectedIcon: tasksListIcon
  });

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
        nameIcon={tasksListIcon}
        propsIcon={{
          size: 32,
          color: APP_GOLD_COLOR,
          onClick: () => setIsEditingIcon(true),
          style: { cursor: "pointer" }
        }}
      />
      <InputSection>
        <EditableInput key={tasksListId} value={tasksListName} onChange={onChangeName} />
      </InputSection>
      <DeleteSection>
        <BoxCustomIcon
          nameIcon="BiTrash"
          propsIcon={{
            size: 32,
            color: APP_GOLD_COLOR,
            onClick: onRequestDelete,
            style: { cursor: "pointer" }
          }}
        />
      </DeleteSection>
    </TitleSection>
  );
};

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
