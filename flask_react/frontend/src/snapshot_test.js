import renderer from "react-test-renderer";
import App from "./src";

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://34.250.91.72/">Group 15: Dublin Bus App</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
