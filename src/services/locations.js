import _ from 'lodash';
import Cookies from 'js-cookie';

import * as constants from '../constants';

class LocationService {
  async getLocationList(url = `${constants.API_ENDPOINT}/locations/`) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`LocationService getLocationList failed, HTTP status ${response.status}`);
    }

    const {
      data,
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = await response.json();

    if (!data) {
      throw new Error(`LocationService getLocationList failed, data not returned`);
    }

    const locationArray = _.map(data, location => location);

    return {
      locationArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };
  }

  async createLocation(location_data) {
    const url = `${constants.API_ENDPOINT}/locations/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(location_data),
      cache: 'no-cache'
    });
    if (!response.ok && response.status !== 400) {
      throw new Error(`LocationService createLocation failed, HTTP status ${response.status}`);
    }
    const apiResponse = await response.json();
    if (response.status === 400) {
      throw apiResponse.errors;
    }
    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error(`LocationService createLocation failed, data not returned`);
    }

    return data;
  }

  async editLocation(location_data, id) {
    const url = `${constants.API_ENDPOINT}/locations/${id}/`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(location_data),
      cache: 'no-cache'
    });

    if (!response.ok && response.status !== 400) {
      throw new Error(`LocationService editLocation failed, HTTP status ${response.status}`);
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error('LocationService editLocation failed, data not returned');
    }

    return data;
  }

  async deleteLocation(location_id) {
    const url = `${constants.API_ENDPOINT}/locations/${location_id}/`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`LocationService deleteLocation failed, HTTP status ${response.status}`);
    }

    return location_id;
  }

  async getLocation(id) {
    const url = `${constants.API_ENDPOINT}/locations/${id}/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`LocationService getLocation failed, HTTP status ${response.status}`);
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, 'data');
    if (!data) {
      throw new Error('LocationService getLocation failed, data not returned');
    }

    return data;
  }
}

export default new LocationService();
