import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { AvailableIconsEnum } from "shared/availableIcons";
import styles from "./NewList.module.scss";
import styled from "@emotion/styled";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

type IconOptionType = {
  value: string;
  label: string;
};

export const useNewListForm = () => {
  const [listName, setListName] = useState("My List");
  const [selectedIcon, setSelectedIcon] = useState<IconOptionType>();
  const [listDescription, setListDescription] = useState<string>();

  const options = useMemo(() => {
    const innerOptions: IconOptionType[] = [];
    Object.keys(AvailableIconsEnum).forEach((k) => {
      // Remove the first two characters
      const trimmedString = k.slice(2);

      // Split the string whenever an uppercase letter is found
      const formattedString = trimmedString.replace(/([A-Z])/g, " $1");

      innerOptions.push({
        value: k,
        label: formattedString.trim()
      });
    });

    return innerOptions;
  }, []);

  const onChangeListName: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setListName(e.target.value);
  }, []);

  const nameInputProps = {
    value: listName,
    onChange: onChangeListName
  };

  const iconSelectProps = {
    value: selectedIcon,
    onChange: (option: IconOptionType) => {
      setSelectedIcon(option);
    },
    options,
    formatOptionLabel: (option: IconOptionType) => {
      return (
        <IconOptionRendered>
          <BoxCustomIcon
            nameIcon={option.value}
            propsIcon={{ size: 25, style: { marginRight: 10 } }}
          />
          {option.label}
        </IconOptionRendered>
      );
    },
    classNames: {
      container: () => styles["new-list-icon-select-container"],
      menu: () => styles["new-list-icon-select-menu"]
    }
  };

  const onChangeListDescription: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setListDescription(e.target.value);
  }, []);

  const descriptionAreaProps = {
    value: listDescription,
    onChange: onChangeListDescription
  };

  return {
    nameInputProps,
    iconSelectProps,
    descriptionAreaProps
  };
};

const IconOptionRendered = styled.div`
  display: flex;
  align-items: center;
`;
