import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { AvailableIconsEnum } from "shared/availableIcons";
import styles from "./NewList.module.scss";
import styled from "@emotion/styled";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

type IconOptionType = {
  value: string;
  label: string;
};

type NewListFormErrorMessagesType = {
  invalidName?: string;
  invalidIcon?: string;
  invalidDescription?: string;
};

export const useNewListForm = () => {
  const [listName, setListName] = useState("My List");
  const [selectedIcon, setSelectedIcon] = useState<IconOptionType>();
  const [listDescription, setListDescription] = useState<string>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState<NewListFormErrorMessagesType>();

  const fieldsChangedRef = useRef({ listName: false, listIcon: false, listDescription: false });

  const validateForm = useCallback(() => {
    const newErrorMessages: NewListFormErrorMessagesType = {};
    const fieldsChanged = fieldsChangedRef.current;
    if (fieldsChanged.listName) {
      if (listName.length < 5) {
        newErrorMessages.invalidName = "Field name should have at least 5 characters.";
      } else if (listName.length > 20) {
        newErrorMessages.invalidName = "Field name should have up to 20 characters.";
      }
    }

    if (fieldsChanged.listIcon) {
      if (!selectedIcon) {
        newErrorMessages.invalidIcon = "An icon must be selected.";
      }
    }

    if (fieldsChanged.listDescription) {
      if ((listDescription?.length ?? 0) < 10) {
        newErrorMessages.invalidDescription =
          "Field description should have at least 10 characters.";
      }
    }

    setErrorMessages(newErrorMessages);
    if (Object.keys(newErrorMessages).length > 0) {
      return false;
    }

    return fieldsChanged.listIcon && fieldsChanged.listDescription;
  }, [listDescription?.length, listName.length, selectedIcon]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [validateForm]);

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
    fieldsChangedRef.current.listName = true;
  }, []);

  const nameInputProps = {
    value: listName,
    onChange: onChangeListName
  };

  const iconSelectProps = {
    value: selectedIcon,
    onChange: (option: IconOptionType) => {
      setSelectedIcon(option);
      fieldsChangedRef.current.listIcon = true;
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
    fieldsChangedRef.current.listDescription = true;
  }, []);

  const descriptionAreaProps = {
    value: listDescription,
    onChange: onChangeListDescription
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = () => {};

  const submitFormProps = {
    onClick: onSubmit,
    disabled: !isFormValid
  };

  return {
    nameInputProps,
    iconSelectProps,
    descriptionAreaProps,
    submitFormProps,
    errorMessages
  };
};

const IconOptionRendered = styled.div`
  display: flex;
  align-items: center;
`;
