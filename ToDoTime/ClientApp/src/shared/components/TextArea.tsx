import styled from "@emotion/styled";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

type TextAreaProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const TextArea: React.FC<TextAreaProps & React.ComponentPropsWithRef<"textarea">> = ({
  onConfirm,
  onCancel,
  ...props
}) => {
  return (
    <TextAreaContainer>
      <TextAreaElement {...props} addBorder={!!(onConfirm && onCancel)} />
      {onConfirm && onCancel && (
        <IconsContainer>
          <BoxCustomIcon
            nameIcon="BiCheck"
            propsIcon={{
              size: 30,
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
              size: 30,
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
      )}
    </TextAreaContainer>
  );
};

const TextAreaContainer = styled.div`
  width: calc(100% - 20px);
  height: 100px;
  max-height: calc(100% - 20px);
  position: relative;
`;

const TextAreaElement = styled.textarea<{ addBorder: boolean }>`
  width: -webkit-fill-available;
  border-radius: 6px;
  resize: none;
  height: -webkit-fill-available;
  padding: 10px;
  border-bottom: ${(props) => (props.addBorder ? "30px solid #fff" : "unset")};
`;

const IconsContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 80px;
  display: flex;
  gap: 10px;
`;
