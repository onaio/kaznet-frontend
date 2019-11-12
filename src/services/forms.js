/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import * as constants from '../constants';

class FormService {
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

  async getForm(id) {
    const url = `${constants.API_ENDPOINT}/forms/${id}/?format=vnd.api%2Bjson`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`FormService getForm failed, HTTP status ${response.status}`);
    }

    const { data } = await response.json();

    if (!data) {
      throw new Error(`FormService getForm failed, HTTP status ${response.status}`);
    }

    return data;
  }
}

export default new FormService();
