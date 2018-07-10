import UserService from "../users";
import * as fixtures from "../../store/users/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/users", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch users", async () => {
    const data = fixtures.userData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const {
      userArray,
      pageLinks,
      currentPage
    } = await UserService.getUserList();
    expect(userArray).toEqual(fixtures.usersArray);
    expect(pageLinks).toEqual(fixtures.userData.links);
    expect(currentPage).toEqual(fixtures.userData.meta.pagination.page);
  });

  it("should handle default users http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await UserService.getUserList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("UserService getUserList failed, HTTP status 500")
    );
  });
});
