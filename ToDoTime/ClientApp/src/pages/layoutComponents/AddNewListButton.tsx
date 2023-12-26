import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { newListRoute, routes } from "routes";

interface AddNewListButtonProps {
  isSidebarExpanded: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddNewListButton: React.FC<AddNewListButtonProps> = ({ isSidebarExpanded }) => {
  return <Button to={routes[newListRoute]}>+ New List</Button>;
};

const Button = styled(Link)`
  color: #f9cc0b;
`;
