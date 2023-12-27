import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";
import { DynamicIcon } from "shared/DynamicIcon";
import { AvailableIconsEnum } from "shared/availableIcons";

interface LeftSidebarItemProps {
  isSidebarExpanded: boolean;
  to: string;
  title: string;
  icon: AvailableIconsEnum;
}

export const LeftSidebarItem: React.FC<LeftSidebarItemProps> = ({
  isSidebarExpanded,
  to,
  title,
  icon
}) => {
  return (
    <ListItem isSidebarExpanded={isSidebarExpanded}>
      <ListItemLink to={to}>
        {isSidebarExpanded ? (
          title
        ) : (
          <DynamicIcon nameIcon={icon} propsIcon={{ size: 30, color: "black" }} />
        )}
      </ListItemLink>
      <ListItemTooltip> {title}</ListItemTooltip>
    </ListItem>
  );
};

const ListItem = styled.span<{ isSidebarExpanded: boolean }>`
  color: #f9cc0b;
  width: 100%;
  text-align: center;
  padding: 6px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }

  &:hover span {
    display: ${(props) => (props.isSidebarExpanded ? "none" : "flex")};
  }

  &:not(:hover) a svg {
    filter: invert(80%) sepia(33%) saturate(1862%) hue-rotate(356deg) brightness(105%) contrast(95%);
  }
`;

const ListItemTooltip = styled.span`
  position: absolute;
  left: 125px;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0.5rem 0.8rem rgba(255, 255, 255, 0.5);
  background-color: black;
  width: max-content;
  padding: 6px 10px;
  line-height: 20px;
  border-radius: 8px;
  z-index: 20;
  color: #f9cc0b;
  display: none;
`;

const ListItemLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
