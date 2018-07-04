// Test TaskCreation
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import TaskCreation from "../TaskCreation";

describe("containers/task/TaskCreation", () => {
  it("renders without crashing", () => {
    shallow(<TaskCreation />);
  });
});
