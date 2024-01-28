import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { AvailableIconsEnum } from "shared/availableIcons";
import styles from "./UseIconSelector.module.scss";
import { CSSObjectWithLabel, ControlProps, GroupBase } from "react-select";

type IconOptionType = {
  value: string;
  label: string;
};

type UseIconSelectorParams = {
  initialSelectedIcon?: AvailableIconsEnum;
  onChangeIconCallback?: (value?: string) => void;
};

export const useIconSelector = ({
  initialSelectedIcon,
  onChangeIconCallback
}: UseIconSelectorParams) => {
  const options = useMemo(() => {
    const innerOptions: IconOptionType[] = [];
    Object.keys(AvailableIconsEnum).forEach((k) => {
      // Remove the first two characters
      const trimmedString = k.slice(2);

      // Split the string whenever an uppercase letter is found
      const formattedString = trimmedString.replace(/([A-Z])/g, " $1");

      innerOptions.push({
        value: k,
        label: formattedString.trim()
      });
    });

    return innerOptions;
  }, []);

  const [selectedIcon, setSelectedIcon] = useState<IconOptionType | undefined>(() => {
    if (initialSelectedIcon) {
      return options.find((o) => o.value === initialSelectedIcon);
    }
    return undefined;
  });

  const resetSelectedIcon = useCallback(() => {
    setSelectedIcon(() => {
      if (initialSelectedIcon) {
        return options.find((o) => o.value === initialSelectedIcon);
      }
      return undefined;
    });
  }, [initialSelectedIcon, options]);

  const iconSelectProps = useMemo(
    () => ({
      value: selectedIcon,
      onChange: (option: IconOptionType) => {
        setSelectedIcon(option);
        onChangeIconCallback?.(option?.value);
      },
      options,
      formatOptionLabel: (option: IconOptionType) => {
        return (
          <IconOptionRendered>
            <BoxCustomIcon
              nameIcon={option.value}
              propsIcon={{ size: 25, style: { marginRight: 10 } }}
            />
            {option.label}
          </IconOptionRendered>
        );
      },
      styles: {
        control: (
          provided: CSSObjectWithLabel,
          state: ControlProps<unknown, false, GroupBase<unknown>>
        ) => ({
          ...provided,
          background: "#fff",
          borderColor: "#9e9e9e",
          minHeight: "30px",
          height: "30px",
          boxShadow: state.isFocused ? null : null
        }),

        valueContainer: (provided: CSSObjectWithLabel) => ({
          ...provided,
          height: "30px",
          padding: "0 6px"
        }),

        input: (provided: CSSObjectWithLabel) => ({
          ...provided,
          margin: "0px"
        }),
        indicatorSeparator: () => ({
          display: "none"
        }),
        indicatorsContainer: (provided: CSSObjectWithLabel) => ({
          ...provided,
          height: "30px"
        })
      },
      classNames: {
        container: () => styles["new-list-icon-select-container"],
        menu: () => styles["new-list-icon-select-menu"]
      }
    }),
    [onChangeIconCallback, options, selectedIcon]
  );

  return { iconSelectProps, resetSelectedIcon };
};

const IconOptionRendered = styled.div`
  display: flex;
  align-items: center;
`;
