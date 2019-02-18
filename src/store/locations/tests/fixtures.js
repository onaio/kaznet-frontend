import _ from 'lodash';

export const locationsData = {
  links: {
    first: 'http://localhost:8000/api/v1/locations/?page=1',
    last: 'http://localhost:8000/api/v1/locations/?page=1',
    next: 'http://localhost:8000/api/v1/locations/?page=2',
    prev: null
  },
  data: [
    {
      type: 'Location',
      id: '1',
      attributes: {
        name: 'Nairobi',
        country: 'KE',
        parent_name: 'None',
        location_type_name: 'None',
        description: 'Such Big City , Much wow',
        geopoint: null,
        radius: null,
        has_submissions: true,
        shapefile: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-0.038795471191406, 0.030555723649271],
                [0.049095153808594, 0.013389587280456],
                [0.015106201171875, -0.063171373920095],
                [-0.044288635253906, -0.032615659859611],
                [-0.038795471191406, 0.030555723649271]
              ]
            ]
          ]
        },
        created: '2018-06-20T12:09:02.916318+03:00',
        modified: '2018-06-20T12:09:02.916345+03:00'
      },
      relationships: {
        location_type: {
          data: null
        },
        parent: {
          data: null
        }
      }
    },
    {
      type: 'Location',
      id: '7',
      attributes: {
        name: 'Sol Point',
        country: 'CK',
        parent_name: null,
        location_type_name: null,
        description: 'Something',
        geopoint: null,
        radius: null,
        shapefile: null,
        has_submissions: false,
        created: '2018-07-09T14:53:09.732230+03:00',
        modified: '2018-07-09T14:53:09.732261+03:00'
      },
      relationships: {
        location_type: {
          data: null
        },
        parent: {
          data: null
        }
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 2,
      count: 1
    }
  }
};

export const locationsDataSecondPage = {
  links: {
    first: 'http://localhost:8000/api/v1/locations/?page=1',
    last: 'http://localhost:8000/api/v1/locations/?page=2',
    next: null,
    prev: 'http://localhost:8000/api/v1/locations/?page=1'
  },
  data: [
    {
      type: 'Location',
      id: '1',
      attributes: {
        name: 'Tampa',
        country: 'KE',
        parent_name: 'None',
        location_type_name: 'None',
        description: 'Such Big City , Much wow',
        geopoint: null,
        radius: null,
        has_submissions: true,
        shapefile: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-0.038795471191406, 0.030555723649271],
                [0.049095153808594, 0.013389587280456],
                [0.015106201171875, -0.063171373920095],
                [-0.044288635253906, -0.032615659859611],
                [-0.038795471191406, 0.030555723649271]
              ]
            ]
          ]
        },
        created: '2018-06-20T12:09:02.916318+03:00',
        modified: '2018-06-20T12:09:02.916345+03:00'
      },
      relationships: {
        location_type: {
          data: null
        },
        parent: {
          data: null
        }
      }
    },
    {
      type: 'Location',
      id: '7',
      attributes: {
        name: 'Kona Mbaya',
        country: 'CK',
        parent_name: null,
        location_type_name: null,
        description: 'Something',
        geopoint: null,
        radius: null,
        shapefile: null,
        has_submissions: false,
        created: '2018-07-09T14:53:09.732230+03:00',
        modified: '2018-07-09T14:53:09.732261+03:00'
      },
      relationships: {
        location_type: {
          data: null
        },
        parent: {
          data: null
        }
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

export const singleLocation = {
  type: 'Location',
  id: '999',
  attributes: {
    name: 'Isiolo Market X',
    country: 'KE',
    parent_name: null,
    location_type_name: null,
    description: 'Something',
    geopoint: null,
    radius: null,
    shapefile: null,
    has_submissions: true,
    created: '2018-07-09T14:53:09.732230+03:00',
    modified: '2018-07-09T14:53:09.732261+03:00'
  },
  relationships: {
    location_type: {
      data: null
    },
    parent: {
      data: null
    }
  }
};

export const locationsArray = _.map(locationsData.data, location => location);

export const locationsArraySecondPage = _.map(locationsDataSecondPage.data, location => location);

export const locationsById = _.keyBy(locationsArray, location => location.id);
export const locationsIdArray = _.keys(locationsById);
export const locationById = _.get(locationsById, 1);
export const locationWithNoSumissions = _.get(locationsById, 7);

export const singleLocationData = {
  data: singleLocation
};

export const singleLocationArray = _.map(singleLocationData, location => {
  return location;
});
export const singleLocationById = _.keyBy(singleLocationArray, location => location.id);

export const currentPage = locationsData.meta.pagination.page;
export const totalPages = locationsData.meta.pagination.pages;
export const totalCount = locationsData.meta.pagination.count;
export const pageLinks = locationsData.links;
export const firstPage = 1;
export const lastPage = 2;

export const pageLinksSecondPage = locationsDataSecondPage.links;
export const currentPageSecondPage = locationsDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = locationsDataSecondPage.meta.pagination.pages;
export const locationsByIdSecondPage = _.keyBy(locationsArraySecondPage, location => location.id);

export const selectOptions = locationsArray.map(d => ({
  value: d.id,
  label: d.attributes.name
}));

export const selectOptionsSecondPage = locationsArraySecondPage.map(d => ({
  value: d.id,
  label: d.attributes.name
}));
