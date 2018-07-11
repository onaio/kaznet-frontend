import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as forms from "../reducer";
import * as fixtures from "./fixtures";

const emptyState = Immutable({
  forms: {
    formsById: {},
    formsIdArray: []
  }
});

const fullState = Immutable({
  forms: {
    formsById: fixtures.formsById,
    formsIdArray: fixtures.formsIdArray
  }
});

describe("store/forms/selectors", () => {
  it("should get default forms by id when empty", () => {
    Selector(forms.getFormsById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default forms ids array when empty", () => {
    Selector(forms.getFormsIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get forms by id when full", () => {
    Selector(forms.getFormsById)
      .expect(fullState)
      .toReturn(fixtures.formsById);
  });

  it("should get forms ids array when full", () => {
    Selector(forms.getFormsIdArray)
      .expect(fullState)
      .toReturn(fixtures.formsIdArray);
  });

  it("should get form by id when full", () => {
    Selector(forms.getFormById)
      .expect(fullState, 1)
      .toReturn(fixtures.formIdOneById);
  });
});
