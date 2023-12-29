import renderer from "react-test-renderer";
import { BoxCustomIcon } from "shared/BoxCustomIcon";

test("BoxCustomIcon - Icon not found renders default", () => {
  const iconThatDoesntExist = renderer.create(<BoxCustomIcon nameIcon="icon-that-doesnt-exist" />);
  const defaultIcon = renderer.create(<BoxCustomIcon />);
  expect(iconThatDoesntExist.toJSON()).toEqual(defaultIcon.toJSON());
});

test("BoxCustomIcon - Icon found renders properly", () => {
  const iconThatExists = renderer.create(<BoxCustomIcon nameIcon="BiAbacus" />);
  const defaultIcon = renderer.create(<BoxCustomIcon />);
  expect(iconThatExists.toJSON()).not.toEqual(defaultIcon.toJSON());
});
