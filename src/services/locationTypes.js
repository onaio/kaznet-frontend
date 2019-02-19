import _ from 'lodash';
import Cookies from 'js-cookie';

import * as constants from '../constants';

class LocationTypeService {
  async getLocationTypeList(url = `${constants.API_ENDPOINT}/locationtypes/`) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `LocationTypeService getLocationTypeList failed, HTTP status ${response.status}`
      );
    }
    const {
      data,
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = await response.json();

    if (!data) {
      throw new Error(`LocationTypeService getLocationTypeList failed, data not returned`);
    }

    const locationTypeArray = _.map(data, locationType => locationType);

    return {
      locationTypeArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };
  }

  async createLocationType(locationType_data) {
    const url = `${constants.API_ENDPOINT}/locationtypes/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(locationType_data),
      cache: 'no-cache'
    });
    if (!response.ok && response.status !== 400) {
      throw new Error(
        `LocationTypeService createLocationType failed, HTTP status ${response.status}`
      );
    }
    const apiResponse = await response.json();
    if (response.status === 400) {
      throw apiResponse.errors;
    }
    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error(`LocationTypeService createLocationType failed, data not returned`);
    }

    return data;
  }

  async editLocationType(locationType_data, id) {
    const url = `${constants.API_ENDPOINT}/locationtypes/${id}/`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(locationType_data),
      cache: 'no-cache'
    });

    if (!response.ok && response.status !== 400) {
      throw new Error(
        `LocationTypeService editLocationType failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error('LocationTypeService editLocationType failed, data not returned');
    }

    return data;
  }

  async deleteLocationType(locationType_id) {
    const url = `${constants.API_ENDPOINT}/locationtypes/${locationType_id}/`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `LocationTypeService deleteLocationType failed, HTTP status ${response.status}`
      );
    }

    return locationType_id;
  }

  async getLocationType(id) {
    const url = `${constants.API_ENDPOINT}/locationtypes/${id}/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`LocationTypeService getLocationType failed, HTTP status ${response.status}`);
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error('LocationTypeService getLocationType failed, data not returned');
    }

    return data;
  }
}

export default new LocationTypeService();
