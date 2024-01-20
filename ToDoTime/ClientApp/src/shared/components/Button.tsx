import styled from "@emotion/styled";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";

export const Button = styled.button<{ neutral?: boolean }>`
  background-color: ${(props) => (props.neutral ? "white" : APP_GOLD_COLOR)};
  border-radius: 10px;
  height: 30px;
  min-width: fit-content;
  width: 100px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 1);

  :hover:not(:disabled) {
    background-color: black;
    color: ${(props) => (props.neutral ? "white" : APP_GOLD_COLOR)};
    cursor: pointer;
    box-shadow: ${(props) =>
      props.neutral ? "2px 2px 5px 0px black" : `2px 2px 5px 0px ${APP_GOLD_COLOR}`};
  }
`;

export const SmallButton = styled.button`
  background-color: var(--app-gold-color);
  border-radius: 10px;
  height: 20px;
  min-width: fit-content;
  width: 100px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 1);

  :hover:not(:disabled) {
    background-color: black;
    color: var(--app-gold-color);
    cursor: pointer;
    box-shadow: 2px 2px 5px 0px var(--app-gold-color);
  }
`;
