// global thunk tests
import { Thunk } from "redux-testkit";

import * as global from "../actions";

describe("store/topics/actions", () => {
  it("should set page title", async () => {
    const dispatches = await Thunk(global.changePageTitle).execute(
      "Fancy Title"
    );
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTitle: "Fancy Title",
      type: "global.CHANGE_PAGETITLE"
    });
  });

  it("should set page title button", async () => {
    const dispatches = await Thunk(global.changePageTitleButton).execute(
      "Fancy Button"
    );
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTitleButton: "Fancy Button",
      type: "global.CHANGE_PAGETITLE_BUTTON"
    });
  });

  it("should set page target", async () => {
    const dispatches = await Thunk(global.changePageTarget).execute(
      "/tasks/new"
    );
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTarget: "/tasks/new",
      type: "global.CHANGE_PAGE_TARGET"
    });
  });
});
