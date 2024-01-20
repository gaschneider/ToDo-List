import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBackdropClick?: () => void;
  title: string;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  title,
  onClose,
  onBackdropClick,
  children
}) => {
  if (!isOpen) {
    return null;
  }
  const component = (
    <Backdrop onClick={() => onBackdropClick?.()}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <ModalHeader>
          {title}
          <IconSection>
            <BoxCustomIcon
              nameIcon="BiX"
              propsIcon={{ size: 30, onClick: onClose, style: { cursor: "pointer" } }}
            />
          </IconSection>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrapper>
    </Backdrop>
  );
  return createPortal(component, document.body);
};

const Backdrop = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 50%);
  top: 0;
  left: 0;
`;

const ModalWrapper = styled.div`
  width: 300px;
  max-width: 80%;
  height: fit-content;
  max-height: 80%;
  box-shadow: 1px 1px 10px 1px black;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
`;

const IconSection = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
`;

const ModalBody = styled.div`
  width: 100%;
  height: fit-content;
`;
