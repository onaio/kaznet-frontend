import download from "downloadjs";

import * as constants from "../constants";

class ExportService {
  async exportUserSubmissions(user_name, user_id, from, to) {
    const url = `${
      constants.API_ENDPOINT
    }/exports/submissions/?user=${user_id}&modified__gte=${from}&modified__lte=${to}&format=csv`;
    let fileName = `${user_name} ${from} to ${to} Submissions`;

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
