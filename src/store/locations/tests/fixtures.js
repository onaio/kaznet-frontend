import _ from 'lodash';

export const locationData = {
    "links": {
        "first": "http://localhost:8000/api/v1/locations/?page=1",
        "last": "http://localhost:8000/api/v1/locations/?page=1",
        "next": null,
        "prev": null
    },
    "data": [
        {
            "type": "Location",
            "id": "1",
            "attributes": {
                "name": "Nairobi",
                "country": "KE",
                "parent_name": "None",
                "location_type_name": "None",
                "description": "Such Big City , Much wow",
                "geopoint": null,
                "radius": null,
                "shapefile": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [
                                    -0.038795471191406,
                                    0.030555723649271
                                ],
                                [
                                    0.049095153808594,
                                    0.013389587280456
                                ],
                                [
                                    0.015106201171875,
                                    -0.063171373920095
                                ],
                                [
                                    -0.044288635253906,
                                    -0.032615659859611
                                ],
                                [
                                    -0.038795471191406,
                                    0.030555723649271
                                ]
                            ]
                        ]
                    ]
                },
                "created": "2018-06-20T12:09:02.916318+03:00",
                "modified": "2018-06-20T12:09:02.916345+03:00"
            },
            "relationships": {
                "location_type": {
                    "data": null
                },
                "parent": {
                    "data": null
                }
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pages": 1,
            "count": 1
        }
    }
}

export const locationArray = _.map(locationData.data, (location) => {
    return location;
});

export const locationById = _.keyBy(locationArray, (location) => location.id);

export const locationIdArray = _.keys(locationById)