// global selector tests
import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as global from "../reducer";

const emptyState = Immutable({
  global: {
    pageTitle: "Kaznet",
    pageTitleButton: "Friendly Button",
    pageTarget: "/",
    errors: false,
    errorMessage: null
  }
});

describe("store/global/selectors", () => {
  it("should get default page title when empty", () => {
    Selector(global.getPageTitle)
      .expect(emptyState)
      .toReturn("Kaznet");
  });

  it("should get default page title button when empty", () => {
    Selector(global.getPageTitleButton)
      .expect(emptyState)
      .toReturn("Friendly Button");
  });

  it("should get default page target when empty", () => {
    Selector(global.getPageTarget)
      .expect(emptyState)
      .toReturn("/");
  });

  if (
    ("should get default invert of errors",
    () => {
      Selector(global.getIsRetrieving)
        .expect(emptyState)
        .toReturn(true);
    })
  );

  if (
    ("should get default errorMessage",
    () => {
      Selector(global.getErrorMessage)
        .expect(emptyState)
        .toReturn(null);
    })
  );
});
