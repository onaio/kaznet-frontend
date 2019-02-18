import _ from 'lodash';

export const contentTypeData = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/contenttypes/?format=vnd.api%2Bjson&page=1',
    last: 'http://127.0.0.1:8000/api/v1/contenttypes/?format=vnd.api%2Bjson&page=1',
    next: null,
    prev: null
  },
  data: [
    {
      type: 'ContentType',
      id: '14',
      attributes: {
        app_label: 'ona',
        model: 'instance'
      }
    },
    {
      type: 'ContentType',
      id: '16',
      attributes: {
        app_label: 'ona',
        model: 'xform'
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 1,
      count: 2
    }
  }
};

export const contentTypesArray = _.map(contentTypeData.data, contentType => {
  return contentType;
});

export const contentTypesById = _.keyBy(contentTypesArray, contentType => contentType.id);

export const contentTypesIdArray = _.keys(contentTypesById);
