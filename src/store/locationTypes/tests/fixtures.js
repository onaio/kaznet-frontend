import _ from "lodash";

export const locationTypeData = {
  links: {
    first:
      "http://127.0.0.1:8000/api/v1/locationtypes/?format=vnd.api%2Bjson&page=1",
    last:
      "http://127.0.0.1:8000/api/v1/locationtypes/?format=vnd.api%2Bjson&page=1",
    next: null,
    prev: null
  },
  data: [
    {
      type: "LocationType",
      id: "2",
      attributes: {
        created: "2018-07-13T17:34:27.023947+03:00",
        name: "Hospital",
        modified: "2018-07-13T17:34:27.023970+03:00"
      }
    },
    {
      type: "LocationType",
      id: "1",
      attributes: {
        created: "2018-07-13T17:34:14.408576+03:00",
        name: "Market",
        modified: "2018-07-13T17:34:14.408599+03:00"
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

export const locationTypesArray = _.map(locationTypeData.data, locationType => {
  return locationType;
});

export const locationTypesById = _.keyBy(
  locationTypesArray,
  locationType => locationType.id
);

export const locationTypesIdArray = _.keys(locationTypesById);

export const locationTypeIdOneById = _.get(locationTypesById, 1);

export const singleLocationType = {
  type: "LocationType",
  id: "999",
  attributes: {
    created: "2018-07-13T17:34:14.408576+03:00",
    name: "Office",
    modified: "2018-07-13T17:34:14.408599+03:00"
  }
};

export const singleLocationTypeData = {
  data: singleLocationType
};
export const singleLocationTypeArray = _.map(
  singleLocationTypeData,
  locationType => {
    return locationType;
  }
);
export const singleLocationTypeById = _.keyBy(
  singleLocationTypeArray,
  locationType => locationType.id
);
