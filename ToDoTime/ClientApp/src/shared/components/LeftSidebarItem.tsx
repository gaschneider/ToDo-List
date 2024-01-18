import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { AvailableIconsEnum } from "shared/availableIcons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

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
  const navigate = useNavigate();

  return (
    <ListItem
      isSidebarExpanded={isSidebarExpanded}
      data-tooltip-id={tooltipId}
      onClick={() => navigate(to)}
    >
      <ListItemSpan>
        {isSidebarExpanded ? (
          title
        ) : (
          <BoxCustomIcon nameIcon={icon} propsIcon={{ size: 30, color: APP_GOLD_COLOR }} />
        )}
      </ListItemSpan>
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
          color: APP_GOLD_COLOR,
          zIndex: 10000
        }}
      />
    </ListItem>
  );
};

const ListItem = styled.span<{ isSidebarExpanded: boolean }>`
  color: var(--app-gold-color);
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

const ListItemSpan = styled.span`
  color: inherit;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
`;
