import styled from "@emotion/styled";

export const Lists = () => {
  return <ListsContainer>All your lists can be found here</ListsContainer>;
};

const ListsContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  color: var(--app-gold-color);
  display: flex;
  justify-content: center;
  font-size: 45px;
`;
