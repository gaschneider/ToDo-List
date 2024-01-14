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
import { validateListName } from "shared/helpers/validations";
import { useCreateNewTasksList } from "api/hooks/useCreateNewTasksList";
import { CreateTasksListDTO } from "api/types/CreateTasksListDTO";

type IconOptionType = {
  value: string;
  label: string;
};

type NewListFormErrorMessagesType = {
  invalidName?: string;
  invalidIcon?: string;
};

export const useNewListForm = () => {
  const [listName, setListName] = useState("My List");
  const [selectedIcon, setSelectedIcon] = useState<IconOptionType>();
  const [listDescription, setListDescription] = useState<string>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState<NewListFormErrorMessagesType>();
  const {
    errorMessage: submitErrorMessage,
    isLoading: submitIsProcessing,
    createNewTasksList
  } = useCreateNewTasksList();

  const fieldsChangedRef = useRef({ listName: false, listIcon: false });

  const validateForm = useCallback(() => {
    const newErrorMessages: NewListFormErrorMessagesType = {};
    const fieldsChanged = fieldsChangedRef.current;
    if (fieldsChanged.listName) {
      const result = validateListName(listName);
      if (!result.isValid) {
        newErrorMessages.invalidName = result.message;
      }
    }

    if (fieldsChanged.listIcon) {
      if (!selectedIcon) {
        newErrorMessages.invalidIcon = "An icon must be selected.";
      }
    }

    setErrorMessages(newErrorMessages);
    if (Object.keys(newErrorMessages).length > 0) {
      return false;
    }

    return fieldsChanged.listIcon;
  }, [listName, selectedIcon]);

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

  const nameInputProps = useMemo(
    () => ({
      value: listName,
      onChange: onChangeListName
    }),
    [listName, onChangeListName]
  );

  const iconSelectProps = useMemo(
    () => ({
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
    }),
    [options, selectedIcon]
  );

  const onChangeListDescription: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setListDescription(e.target.value);
  }, []);

  const descriptionAreaProps = useMemo(
    () => ({
      value: listDescription,
      onChange: onChangeListDescription
    }),
    [listDescription, onChangeListDescription]
  );

  const onSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    const dto: CreateTasksListDTO = {
      name: listName,
      icon: selectedIcon?.value ?? "",
      description: listDescription
    };
    createNewTasksList(dto);
  }, [createNewTasksList, listDescription, listName, selectedIcon?.value]);

  const submitFormProps = useMemo(
    () => ({
      onClick: onSubmit,
      disabled: !isFormValid
    }),
    [isFormValid, onSubmit]
  );

  return useMemo(
    () => ({
      nameInputProps,
      iconSelectProps,
      descriptionAreaProps,
      submitFormProps,
      errorMessages,
      submitErrorMessage,
      submitIsProcessing
    }),
    [
      descriptionAreaProps,
      errorMessages,
      iconSelectProps,
      nameInputProps,
      submitErrorMessage,
      submitFormProps,
      submitIsProcessing
    ]
  );
};

const IconOptionRendered = styled.div`
  display: flex;
  align-items: center;
`;
