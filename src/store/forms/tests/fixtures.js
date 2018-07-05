import _ from "lodash";

export const formData = {
  links: {
    first: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1",
    last: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1",
    next: null,
    prev: null
  },
  data: [
    {
      type: "XForm",
      id: "1",
      attributes: {
        ona_pk: 1903,
        project_id: 4328,
        last_updated: null,
        title: "Form 1",
        id_string: "form_1",
        created: "2018-06-21T12:15:23.170271+03:00",
        modified: "2018-06-21T12:15:23.170313+03:00",
        deleted_at: null
      }
    },
    {
      type: "XForm",
      id: "2",
      attributes: {
        ona_pk: 6373,
        project_id: 5522,
        last_updated: null,
        title: "Form 2",
        id_string: "form_2",
        created: "2018-06-21T12:15:23.175198+03:00",
        modified: "2018-06-21T12:15:23.175232+03:00",
        deleted_at: null
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

export const formsArray = _.map(formData.data, form => {
  return form;
});

export const formsById = _.keyBy(formsArray, form => form.id);

export const formsIdArray = _.keys(formsById);

export const formIdOneById = _.get(formsById, 1);
