import _ from 'lodash';

export const currentLoggedInUserData = {
  type: 'UserProfile',
  id: '1',
  attributes: {
    created: '2018-06-19T16:03:10.184043+03:00',
    modified: '2018-06-20T08:45:12.976916+03:00',
    role_display: 'Admin',
    first_name: 'Davis',
    last_name: 'Raymond',
    email: 'sol@admin.me',
    ona_pk: null,
    ona_username: 'davisraym',
    payment_number: '',
    approved_submissions: 1,
    rejected_submissions: 0,
    approval_rate: 0.0,
    amount_earned: '0 KES',
    last_login: '2018-06-19T16:03:22+03:00',
    avg_submissions: 0.0,
    avg_approved_submissions: 0.0,
    avg_rejected_submissions: 0.0,
    avg_approval_rate: 0.0,
    avg_amount_earned: 0.0,
    phone_number: '',
    role: '1',
    expertise: '1',
    gender: '1',
    national_id: null,
    submission_count: 5,
    metadata: {}
  }
};

export const singleUserData = _.omit(currentLoggedInUserData, 'attributes.metadata');

export const userData = {
  links: {
    first: 'http://localhost:8000/api/v1/userprofiles/?page=1',
    last: 'http://localhost:8000/api/v1/userprofiles/?page=1',
    next: 'http://localhost:8000/api/v1/userprofiles/?page=2',
    prev: null
  },
  data: [singleUserData],
  meta: {
    pagination: {
      page: 1,
      pages: 2,
      count: 1
    }
  }
};

export const userDataSecondPage = {
  links: {
    first: 'http://localhost:8000/api/v1/userprofiles/?page=1',
    last: 'http://localhost:8000/api/v1/userprofiles/?page=2',
    next: null,
    prev: 'http://localhost:8000/api/v1/userprofiles/?page=1'
  },
  data: [
    {
      type: 'UserProfile',
      id: '1',
      attributes: {
        created: '2018-06-19T16:03:10.184043+03:00',
        modified: '2018-06-20T08:45:12.976916+03:00',
        role_display: 'Admin',
        first_name: 'Davis',
        last_name: 'Raymond',
        email: 'sol@admin.me',
        ona_pk: null,
        ona_username: 'davisraym',
        payment_number: '',
        approved_submissions: 0,
        rejected_submissions: 0,
        approval_rate: 0.0,
        amount_earned: '0 KES',
        last_login: '2018-06-19T16:03:22+03:00',
        avg_submissions: 0.0,
        avg_approved_submissions: 0.0,
        avg_rejected_submissions: 0.0,
        avg_approval_rate: 0.0,
        avg_amount_earned: 0.0,
        phone_number: '',
        role: '1',
        expertise: '1',
        gender: '1',
        national_id: null,
        submission_count: 0
      }
    }
  ],
  meta: {
    pagination: {
      page: 2,
      pages: 2,
      count: 1
    }
  }
};

export const usersArray = _.map(userData.data, user => {
  return user;
});

export const usersById = _.keyBy(usersArray, user => user.id);

export const userById = _.get(usersById, 1);
export const singleUser = _.get(usersById, 1);

export const usersIdArray = _.keys(usersById);

export const currentPage = userData.meta.pagination.page;
export const totalPages = userData.meta.pagination.pages;
export const totalCount = userData.meta.pagination.count;
export const pageLinks = userData.links;
export const firstPage = 1;
export const lastPage = 2;

export const usersArraySecondPage = _.map(userDataSecondPage.data, user => {
  return user;
});

export const usersByIdSecondPage = _.keyBy(usersArraySecondPage, user => user.id);
export const currentPageSecondPage = userDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = userDataSecondPage.meta.pagination.pages;
export const pageLinksSecondPage = userDataSecondPage.links;

export const UserFormInitialData = {
  first_name: 'kamau',
  last_name: 'kahama',
  email: 'kamau@gmail.com',
  password: 'hello123',
  confirmation: 'hello123',
  gender: 'male',
  role: 'Admin',
  expertise: 'Intermediate',
  national_id: '30090087',
  payment_number: '',
  phone_number: '',
  ona_username: 'kahama'
};

export const badExportFilter = {
  userprofile: '1',
  modified__gte: null,
  modified__lte: null,
  status: 'a',
  format: 'csv'
};

export const userExport = {
  file: {
    data: [
      {
        attributes: {
          amount_earned: '0 KES',
          approval_rate: 0,
          approved_submissions: 0,
          avg_amount_earned: 0,
          avg_approval_rate: 0,
          avg_approved_submissions: 0,
          avg_rejected_submissions: 0,
          avg_submissions: 0,
          created: '2018-06-19T16:03:10.184043+03:00',
          email: 'sol@admin.me',
          expertise: '1',
          first_name: 'Davis',
          gender: '1',
          last_login: '2018-06-19T16:03:22+03:00',
          last_name: 'Raymond',
          modified: '2018-06-20T08:45:12.976916+03:00',
          national_id: null,
          ona_pk: null,
          ona_username: 'davisraym',
          payment_number: '',
          phone_number: '',
          rejected_submissions: 0,
          role: '1',
          role_display: 'Admin',
          submission_count: 0
        },
        id: '1',
        type: 'UserProfile'
      }
    ],
    links: {
      first: 'http://localhost:8000/api/v1/userprofiles/?page=1',
      last: 'http://localhost:8000/api/v1/userprofiles/?page=1',
      next: 'http://localhost:8000/api/v1/userprofiles/?page=2',
      prev: null
    },
    meta: { pagination: { count: 1, page: 1, pages: 2 } }
  },
  type: 'users.FILE_EXPORTED'
};
