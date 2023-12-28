import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { DynamicIcon } from "shared/DynamicIcon";
import { AvailableIconsEnum } from "shared/availableIcons";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface LeftSidebarItemProps {
  isSidebarExpanded: boolean;
  to: string;
  title: string;
  icon: AvailableIconsEnum;
  tooltipId: string;
}

export const LeftSidebarItem: React.FC<LeftSidebarItemProps> = ({
  isSidebarExpanded,
  to,
  title,
  icon,
  tooltipId
}) => {
  return (
    <ListItem isSidebarExpanded={isSidebarExpanded} data-tooltip-id={tooltipId}>
      <ListItemLink to={to}>
        {isSidebarExpanded ? (
          title
        ) : (
          <DynamicIcon nameIcon={icon} propsIcon={{ size: 30, color: "black" }} />
        )}
      </ListItemLink>
      <ReactTooltip
        id={tooltipId}
        place="right"
        content={title}
        hidden={isSidebarExpanded}
        offset={20}
        style={{
          boxShadow: "0 0.5rem 0.8rem rgba(255, 255, 255, 0.5)",
          backgroundColor: "black",
          padding: "6px 10px",
          lineHeight: "20px",
          borderRadius: "8px",
          color: "#f9cc0b",
          zIndex: 10000
        }}
      />
    </ListItem>
  );
};

const ListItem = styled.span<{ isSidebarExpanded: boolean }>`
  color: #f9cc0b;
  width: ${(props) => (props.isSidebarExpanded ? "200px" : "fit-content")};
  text-align: center;
  padding: 6px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    color: black;
  }

  &:not(:hover) a svg {
    filter: invert(80%) sepia(33%) saturate(1862%) hue-rotate(356deg) brightness(105%) contrast(95%);
  }
`;

const ListItemLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
