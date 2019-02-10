import _ from "lodash";

export const formData = {
  links: {
    first: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1",
    last: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=2",
    next: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=2",
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
        has_task: false,
        task_name: null,
        deleted_at: null,
        metadata: {
          owner: "kaznet",
          owner_url: "http://127.0.0.1:8000/api/v1/users/kaznet",
          configuration_status: "correctly_configured"
        }
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
        has_task: false,
        task_name: null,
        deleted_at: null,
        metadata: {
          owner: "kaznet",
          owner_url: "http://127.0.0.1:8000/api/v1/users/kaznet",
          configuration_status: "correctly_configured"
        }
      }
    },
    {
      type: "XForm",
      id: "3",
      attributes: {
        ona_pk: 6373,
        project_id: 5522,
        last_updated: null,
        title: "Form 3",
        id_string: "form_3",
        created: "2018-06-21T12:15:23.175198+03:00",
        modified: "2018-06-21T12:15:23.175232+03:00",
        has_task: true,
        task_name: "Form 3 Task",
        deleted_at: null,
        metadata: {
          owner: "kaznet",
          owner_url: "http://127.0.0.1:8000/api/v1/users/kaznet",
          configuration_status: "members_cannot_submit"
        }
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 2,
      count: 3
    }
  }
};

export const secondForm = {
  type: "XForm",
  id: "99",
  attributes: {
    ona_pk: 6373,
    project_id: 5522,
    last_updated: null,
    title: "Form 99",
    id_string: "form_99",
    created: "2018-06-21T12:15:23.175198+03:00",
    modified: "2018-06-21T12:15:23.175232+03:00",
    has_task: false,
    task_name: null,
    deleted_at: null,
    metadata: {
      owner: "kaznet",
      owner_url: "http://127.0.0.1:8000/api/v1/users/kaznet",
      configuration_status: "correctly_configured"
    }
  }
};

export const formDataSecondPage = {
  links: {
    first: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1",
    last: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=2",
    next: null,
    prev: "http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1"
  },
  data: [secondForm],
  meta: {
    pagination: {
      page: 2,
      pages: 2,
      count: 1
    }
  }
};

export const formsArraySecondPage = _.map(
  formDataSecondPage.data,
  form => form
);

export const currentPage = formData.meta.pagination.page;
export const totalPages = formData.meta.pagination.pages;
export const totalCount = formData.meta.pagination.count;
export const pageLinks = formData.links;
export const firstPage = 1;
export const lastPage = 2;

export const formsArray = _.map(formData.data, form => form);

export const formsById = _.keyBy(formsArray, form => form.id);

export const formsIdArray = _.keys(formsById);

export const formIdOneById = _.get(formsById, 1);
export const formIdThreeById = _.get(formsById, 3);

export const currentPageSecondPage = formDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = formDataSecondPage.meta.pagination.pages;
export const pageLinksSecondPage = formDataSecondPage.links;

export const formsByIdSecondPage = _.keyBy(
  formsArraySecondPage,
  form => form.id
);
export const formsIdArraySecondPage = _.keys(formsByIdSecondPage);
export const formByIdSecondPage = _.get(formsByIdSecondPage, 1);

export const selectOptions = formsArray
  .filter(function(item) {
    return item.attributes.has_task === false;
  })
  .map(f => ({
    value: f.id,
    label: f.attributes.title
  }));

export const selectOptionsSecondPage = formsArraySecondPage
  .filter(function(item) {
    return item.attributes.has_task === false;
  })
  .map(f => ({
    value: f.id,
    label: f.attributes.title
  }));
