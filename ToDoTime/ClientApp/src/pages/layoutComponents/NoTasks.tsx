import styled from "@emotion/styled";

export const NoTasks = () => {
  return <Container>No tasks yet, why not starting creating some right now ?</Container>;
};

const Container = styled.div`
  display: grid;
  place-items: center;
  color: var(--app-gold-color);
  font-weight: bold;
`;
