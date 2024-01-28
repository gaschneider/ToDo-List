import styled from "@emotion/styled";
// Useful to check for the props on react-select-virtualized since the lib doesnt have types
// import Select from "react-select";
import ReactSelectVirtualized from "react-select-virtualized";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { Input } from "shared/components/Input";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { useNewListForm } from "./useNewListForm";
import { TextArea } from "shared/components/TextArea";
import { Button } from "shared/components/Button";
import { OneEightyRingWithBg } from "react-svg-spinners";

export const NewList = () => {
  const {
    nameInputProps,
    iconSelectProps,
    descriptionAreaProps,
    submitFormProps,
    errorMessages,
    submitIsProcessing,
    submitErrorMessage
  } = useNewListForm();

  if (submitIsProcessing) {
    return (
      <MainContainerTemplate title="New List">
        <OneEightyRingWithBg color={APP_GOLD_COLOR} width={150} height={150} />
      </MainContainerTemplate>
    );
  }

  return (
    <MainContainerTemplate title="New List">
      {submitErrorMessage && <ErrorContainer>{submitErrorMessage}</ErrorContainer>}
      <FormGrid>
        <Field>Name:</Field>
        <Value>
          <Input {...nameInputProps} />
          <ErrorMessageSpan>{errorMessages?.invalidName}</ErrorMessageSpan>
        </Value>

        <Field>Icon</Field>
        <Value>
          <ValueWrapper>
            {/* Useful to check for the props on react-select-virtualized since the lib doesnt have types */}
            {/* <Select /> */}
            <ReactSelectVirtualized {...iconSelectProps} />
            {iconSelectProps.value && (
              <BoxCustomIcon
                nameIcon={iconSelectProps.value.value}
                propsIcon={{ size: 35, color: APP_GOLD_COLOR, style: { marginLeft: 10 } }}
              />
            )}
          </ValueWrapper>
          <ErrorMessageSpan>{errorMessages?.invalidIcon}</ErrorMessageSpan>
        </Value>
        <Field>
          Description <Optional>(optional)</Optional>
        </Field>
        <Value>
          <TextArea {...descriptionAreaProps} />
        </Value>
        <Value>
          <Button {...submitFormProps}>Create</Button>
        </Value>
      </FormGrid>
    </MainContainerTemplate>
  );
};

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: 100%;

  @media (min-width: 600px) {
    grid-template-columns: 150px 1fr;
  }
`;

const Field = styled.span`
  padding: 10px;
  color: var(--app-gold-color);
  font-weight: bold;
  font-size: 16px;
  grid-column: 1;
  text-align: center;

  @media (min-width: 600px) {
    text-align: unset;
  }
`;

const Value = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 500px;
  display: flex;
  max-height: 150px;
  grid-column: 1;

  @media (min-width: 600px) {
    grid-column: 2;
  }

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 20px;
`;

const ValueWrapper = styled.div`
  display: flex;
`;

const ErrorMessageSpan = styled.span`
  margin-left: 5px;
  color: #fc7a00;
`;

const Optional = styled.span`
  font-size: 9px;
`;

const ErrorContainer = styled.span`
  font-size: 16px;
`;
