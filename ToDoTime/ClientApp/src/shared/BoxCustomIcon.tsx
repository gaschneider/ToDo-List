import { IconBaseProps } from "react-icons/lib";
import * as BiIcons from "react-icons/bi";

interface BoxCustomIconProps {
  nameIcon?: string;
  propsIcon?: IconBaseProps;
}

export const BoxCustomIcon = ({ nameIcon = "BiAddToQueue", propsIcon }: BoxCustomIconProps) => {
  // @ts-expect-error - For some reason ts doesnt understand this, but it works
  const ElementIcon = BiIcons[nameIcon];

  if (!ElementIcon) {
    return <BiIcons.BiAddToQueue {...propsIcon} />;
  }

  return <ElementIcon {...propsIcon} />;
};
