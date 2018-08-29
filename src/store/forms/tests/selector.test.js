import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as forms from "../reducer";
import * as fixtures from "./fixtures";

const emptyState = Immutable({
  forms: {
    formsById: {},
    formsIdArray: [],
    options: []
  }
});

const fullState = Immutable({
  forms: {
    formsById: fixtures.formsById,
    formsIdArray: fixtures.formsIdArray,
    options: fixtures.getFormOptions
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

  it("should get forms by title when empty", () => {
    Selector(forms.getFormOptions)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get forms by title when full", () => {
    Selector(forms.getFormOptions)
      .expect(fullState)
      .toReturn(fixtures.getFormOptions);
  });
});
