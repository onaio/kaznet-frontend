import download from "downloadjs";

import * as constants from "../constants";

class ExportService {
  async exportUserSubmissions(filter_dict, username = null) {
    const filters = Object.keys(filter_dict)
      .map(
        k => `${encodeURIComponent(k)}=${encodeURIComponent(filter_dict[k])}`
      )
      .join("&");
    const url = `${
      constants.API_ENDPOINT
    }/exports/submissions/?${filters}&format=csv`;

    let fileName = `${username}_${filter_dict["modified__gte"]}_to_${
      filter_dict["modified__lte"]
    } Submissions`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${constants.API_TOKEN}`
      }
    })
      .then(function(resp) {
        if (!resp.ok) {
          throw new Error(
            `Submission Export Failed, HTTP status ${resp.status}`
          );
        }
        return resp.blob();
      })
      .then(function(blob) {
        download(blob, fileName);
      });

    return await response;
  }
}

export default new ExportService();
