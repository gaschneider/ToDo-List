import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: var(--app-gold-color);
  border-radius: 10px;
  height: 40px;
  padding: 10px;
  min-width: fit-content;
  width: 100px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 1);

  :hover {
    background-color: black;
    color: var(--app-gold-color);
    cursor: pointer;
    box-shadow: 2px 2px 5px 0px var(--app-gold-color);
  }
`;
