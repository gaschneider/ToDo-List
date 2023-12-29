import styled from "@emotion/styled";

export const TaskDetail = () => {
  return <TaskDetailContainer>Details on your taks</TaskDetailContainer>;
};

const TaskDetailContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  color: var(--app-gold-color);
  display: flex;
  justify-content: center;
  font-size: 45px;
`;
