import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import ReactSelect from "react-select-virtualized";
import { CSSObjectWithLabel } from "react-select";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { AvailableIconsEnum } from "shared/availableIcons";
import { Input } from "shared/components/Input";
import { MainContainerTemplate } from "shared/components/MainContainerTemplate";

interface IIconOption {
  value: string;
  label: string;
}

export const NewList = () => {
  const [selectedIcon, setSelectedIcon] = useState<IIconOption>();
  const options = useMemo(() => {
    const innerOptions: IIconOption[] = [];
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

  return (
    <MainContainerTemplate title="New List">
      <FormGrid>
        <Field>Name:</Field>
        <Value>
          <Input />
        </Value>

        <Field>Icon</Field>
        <Value>
          {/* <Select /> */}
          <ReactSelect
            value={selectedIcon}
            onChange={(option: IIconOption) => {
              setSelectedIcon(option);
            }}
            options={options}
            formatOptionLabel={(option: IIconOption) => {
              return (
                <IconOptionRendered>
                  <BoxCustomIcon
                    nameIcon={option.value}
                    propsIcon={{ size: 25, style: { marginRight: 10 } }}
                  />
                  {option.label}
                </IconOptionRendered>
              );
            }}
            styles={{
              container: (base: CSSObjectWithLabel) => ({
                ...base,
                width: "100%",
                "--scrollbar-color": "black"
              })
            }}
          />
          {selectedIcon && (
            <BoxCustomIcon
              nameIcon={selectedIcon.value}
              propsIcon={{ size: 35, color: "#f9cc0b", style: { marginLeft: 10 } }}
            />
          )}
        </Value>
      </FormGrid>
    </MainContainerTemplate>
  );
};

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: repeat(15, 1fr);
  align-items: center;
  height: 100%;
`;

const Field = styled.span`
  color: #f9cc0b;
  font-weight: bold;
  font-size: 16px;
`;

const Value = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
`;

const IconOptionRendered = styled.div`
  display: flex;
  align-items: center;
`;
