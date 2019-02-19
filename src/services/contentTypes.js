import _ from 'lodash';
import * as constants from '../constants';

class contentTypeService {
  async getContentTypeList() {
    const url = `${constants.API_ENDPOINT}/contenttypes/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `ContentTypeService getContentTypeList failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();
    const data = _.get(apiResponse, 'data');

    if (!data) {
      throw new Error(`ContentTypeService getContentTypeList failed, data not returned`);
    }
    return _.map(data, client => {
      return client;
    });
  }
}

export default new contentTypeService();
