import download from 'downloadjs';

import * as constants from '../constants';

class ExportService {
  async exportSubmissions(filter_dict, name = null) {
    const filters = Object.keys(filter_dict)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filter_dict[k])}`)
      .join('&');
    const url = `${constants.API_ENDPOINT}/exports/submissions/?${filters}`;

    const tag = name !== null ? `${name}` : `${filter_dict.userprofile}`;

    const fileName = `${tag}_${filter_dict[constants.FILTER_TIME_START]}_to_${
      filter_dict[constants.FILTER_TIME_END]
    }_submissions.csv`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${constants.API_TOKEN}`
      }
    })
      .then(function(resp) {
        if (!resp.ok) {
          throw new Error(`Submission Export Failed, HTTP status ${resp.status}`);
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
