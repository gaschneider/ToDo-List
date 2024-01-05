import styled from "@emotion/styled";

export const NoListFound = () => {
  return (
    <NoListToRenderContainer>
      No list found, start by creating one clicking below.
    </NoListToRenderContainer>
  );
};

const NoListToRenderContainer = styled.span`
  margin-top: 10px;
  padding: 8px;
  text-align: center;
  font-size: 11px;
`;
