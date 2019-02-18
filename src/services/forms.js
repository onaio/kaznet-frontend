import _ from 'lodash';
import * as constants from '../constants';

class formService {
  async getFormList(url = `${constants.API_ENDPOINT}/forms/?format=vnd.api%2Bjson`) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`FormService getFormList failed, HTTP status ${response.status}`);
    }

    const {
      data,
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = await response.json();

    if (!data) {
      throw new Error(`FormService getFormList failed, data not returned`);
    }
    const formArray = _.map(data, form => form);

    return {
      formArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };
  }
}

export default new formService();
