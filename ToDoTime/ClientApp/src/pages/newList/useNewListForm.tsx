import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { validateListName } from "shared/helpers/validations";
import { useCreateNewTasksList } from "api/hooks/TasksList/useCreateNewTasksList";
import { CreateTasksListDTO } from "api/types/CreateTasksListDTO";
import { useIconSelector } from "shared/hooks/useIconSelector/useIconSelector";

type NewListFormErrorMessagesType = {
  invalidName?: string;
  invalidIcon?: string;
};

export const useNewListForm = () => {
  const [listName, setListName] = useState("My List");
  const [listDescription, setListDescription] = useState<string>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState<NewListFormErrorMessagesType>();
  const {
    errorMessage: submitErrorMessage,
    isLoading: submitIsProcessing,
    createNewTasksList
  } = useCreateNewTasksList();

  const fieldsChangedRef = useRef({ listName: false, listIcon: false });

  const { iconSelectProps } = useIconSelector({
    onChangeIconCallback: () => (fieldsChangedRef.current.listIcon = true)
  });

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
      if (!iconSelectProps.value) {
        newErrorMessages.invalidIcon = "An icon must be selected.";
      }
    }

    setErrorMessages(newErrorMessages);
    if (Object.keys(newErrorMessages).length > 0) {
      return false;
    }

    return fieldsChanged.listIcon;
  }, [listName, iconSelectProps.value]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [validateForm]);

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
      icon: iconSelectProps.value?.value ?? "",
      description: listDescription
    };
    createNewTasksList(dto);
  }, [createNewTasksList, iconSelectProps.value?.value, listDescription, listName]);

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
