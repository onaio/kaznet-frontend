import _ from 'lodash';

export const locationTypeData = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/locationtypes/?page=1',
    last: 'http://127.0.0.1:8000/api/v1/locationtypes/?page=1',
    next: null,
    prev: null
  },
  data: [
    {
      type: 'LocationType',
      id: '2',
      attributes: {
        created: '2018-07-13T17:34:27.023947+03:00',
        name: 'Hospital',
        modified: '2018-07-13T17:34:27.023970+03:00'
      }
    },
    {
      type: 'LocationType',
      id: '1',
      attributes: {
        created: '2018-07-13T17:34:14.408576+03:00',
        name: 'Market',
        modified: '2018-07-13T17:34:14.408599+03:00'
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

export const locationTypeDataSecondPage = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/locationtypes/?page=1',
    last: 'http://127.0.0.1:8000/api/v1/locationtypes/?page=2',
    next: null,
    prev: 'http://127.0.0.1:8000/api/v1/locationtypes/?page=1'
  },
  data: [
    {
      type: 'LocationType',
      id: '3',
      attributes: {
        created: '2018-07-13T17:34:27.023947+03:00',
        name: 'Hospital',
        modified: '2018-07-13T17:34:27.023970+03:00'
      }
    },
    {
      type: 'LocationType',
      id: '4',
      attributes: {
        created: '2018-07-13T17:34:14.408576+03:00',
        name: 'Market',
        modified: '2018-07-13T17:34:14.408599+03:00'
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

export const locationTypeArraySecondPage = _.map(
  locationTypeDataSecondPage.data,
  locationType => locationType
);

export const locationTypesArray = _.map(locationTypeData.data, locationType => locationType);

export const locationTypesById = _.keyBy(locationTypesArray, locationType => locationType.id);

export const locationTypesIdArray = _.keys(locationTypesById);

export const locationTypeIdOneById = _.get(locationTypesById, 1);

export const singleLocationType = {
  type: 'LocationType',
  id: '999',
  attributes: {
    created: '2018-07-13T17:34:14.408576+03:00',
    name: 'Office',
    modified: '2018-07-13T17:34:14.408599+03:00'
  }
};

export const singleLocationTypeData = {
  data: singleLocationType
};
export const singleLocationTypeArray = _.map(singleLocationTypeData, locationType => {
  return locationType;
});
export const singleLocationTypeById = _.keyBy(
  singleLocationTypeArray,
  locationType => locationType.id
);

export const currentPage = locationTypeData.meta.pagination.page;
export const totalPages = locationTypeData.meta.pagination.pages;
export const totalCount = locationTypeData.meta.pagination.count;
export const pageLinks = locationTypeData.links;
export const firstPage = 1;
export const lastPage = 2;

export const pageLinksSecondPage = locationTypeDataSecondPage.links;
export const currentPageSecondPage = locationTypeDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = locationTypeDataSecondPage.meta.pagination.pages;
export const locationTypeByIdSecondPage = _.keyBy(
  locationTypeArraySecondPage,
  locationType => locationType.id
);

export const selectOptions = locationTypesArray.map(d => ({
  value: d.id,
  label: d.attributes.name
}));
