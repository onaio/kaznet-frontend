/* eslint-disable import/prefer-default-export */
export const dataSentToApi = {
  data: {
    type: 'Task',
    id: null,
    attributes: {
      name: 'test task',
      estimated_time: 900,
      required_expertise: '1',
      description: "I can't write any more descriptions",
      start: '2019-10-02T12:00',
      end: '2019-10-02T12:00',
      user_submission_target: 10,
      status: 'd',
      target_id: '95',
      target_content_type: 16,
      amount: 200,
      client: {
        type: 'Client',
        id: '1'
      },
      locations_input: [
        {
          location: {
            type: 'Location',
            id: '1'
          },
          timing_rule: 'FREQ=DAILY;INTERVAL=1;COUNT=1',
          start: '09:00',
          end: '17:00'
        }
      ]
    }
  }
};

export const successMessageFromTaskApi = {
  data: {
    attributes: {
      approved_submissions_count: 0,
      client_name: 'frankline',
      created: '2019-10-03T18:14:44.216468+03:00',
      created_by_name: 'franklineapiyo@gmail.com',
      current_bounty_amount: null,
      description: 'giberish',
      end: '2019-10-03T12:00:00+03:00',
      estimated_time: '00:15:00',
      modified: '2019-10-03T18:14:44.216496+03:00',
      name: 'fdadfa',
      pending_submissions_count: 0,
      rejected_submissions_count: 0,
      required_expertise: '1',
      required_expertise_display: 'Beginner',
      start: '2019-10-03T12:00:00+03:00',
      status: 'd',
      status_display: 'Draft',
      submission_count: 0,
      target_id: 104,
      task_locations: [
        {
          created: '2019-10-03T18:14:44.280837+03:00',
          end: '17:00:00',
          location: {
            id: '3',
            type: 'Location'
          },
          location_description: 'description for my test location',
          location_name: 'test location',
          modified: '2019-10-03T18:14:44.280860+03:00',
          start: '09:00:00',
          task: {
            id: '24',
            type: 'Task'
          },
          timing_rule: 'FREQ=DAILY;INTERVAL=1;COUNT=1'
        }
      ],
      timing_rule: null,
      total_bounty_payout: '0 KES',
      total_submission_target: null,
      user_submission_target: 10,
      xform_id_string: 'contributor_profilepp',
      xform_ona_id: 414121,
      xform_owner: 'kaznet',
      xform_owner_url: 'https://api.ona.io/api/v1/users/kaznet',
      xform_project_id: 72968,
      xform_title: 'Contributor Profilepp',
      xform_version: 'kaznet_contributor_profile_ph2_pp'
    },
    id: '24',
    relationships: {
      bounty: {
        data: null
      },
      client: {
        data: {
          id: '1',
          type: 'Client'
        }
      },
      created_by: {
        data: {
          id: '1',
          type: 'User'
        }
      },
      locations: {
        data: [
          {
            id: '3',
            type: 'Location'
          }
        ],
        meta: {
          count: 1
        }
      },
      parent: {
        data: null
      },
      segment_rules: {
        data: [],
        meta: {
          count: 0
        }
      },
      target_content_type: {
        data: {
          id: '16',
          type: 'ContentType'
        }
      }
    },
    type: 'Task'
  }
};

export const errorReceivedFromApi = {
  errors: [
    {
      detail: {
        location: ['This field is required.']
      },
      source: {
        pointer: '/data/attributes/locations_input'
      },
      status: '400'
    }
  ]
};

export const dataReceivedFromApi = {
  type: 'Task',
  id: '19',
  attributes: {
    created: '2019-10-02T17:23:12.445048+03:00',
    modified: '2019-10-02T17:23:12.445070+03:00',
    name: 'test task',
    estimated_time: '00:15:00',
    approved_submissions_count: 0,
    pending_submissions_count: 0,
    rejected_submissions_count: 0,
    total_bounty_payout: '0 KES',
    current_bounty_amount: '200.00 KES',
    required_expertise: '1',
    description: "I can't write any more descriptions",
    xform_title: 'Contributor Profile06062019',
    xform_id_string: 'contributor_profile06062019',
    xform_version: 'kaznet_contributor_profile_ph2_06062019',
    xform_owner: 'kaznet',
    xform_owner_url: 'https://api.ona.io/api/v1/users/kaznet',
    xform_ona_id: 414104,
    xform_project_id: 72968,
    status_display: 'Draft',
    required_expertise_display: 'Beginner',
    start: '2019-10-02T12:00:00+03:00',
    end: '2019-10-02T12:00:00+03:00',
    timing_rule: null,
    total_submission_target: null,
    user_submission_target: 10,
    status: 'd',
    submission_count: 0,
    target_id: 95,
    created_by_name: 'franklineapiyo@gmail.com',
    client_name: 'frankline',
    task_locations: [
      {
        task: {
          type: 'Task',
          id: '19'
        },
        created: '2019-10-02T17:23:12.523379+03:00',
        modified: '2019-10-02T17:23:12.523398+03:00',
        location: {
          type: 'Location',
          id: '1'
        },
        location_name: 'test location',
        location_description: 'test location',
        timing_rule: 'FREQ=DAILY;INTERVAL=1;COUNT=1',
        start: '09:00:00',
        end: '17:00:00'
      }
    ]
  },
  relationships: {
    created_by: {
      data: {
        type: 'User',
        id: '1'
      }
    },
    parent: {
      data: null
    },
    client: {
      data: {
        type: 'Client',
        id: '1'
      }
    },
    bounty: {
      data: {
        type: 'Bounty',
        id: '35'
      }
    },
    target_content_type: {
      data: {
        type: 'ContentType',
        id: '16'
      }
    },
    segment_rules: {
      meta: {
        count: 0
      },
      data: []
    },
    locations: {
      meta: {
        count: 1
      },
      data: [
        {
          type: 'Location',
          id: '1'
        }
      ]
    }
  }
};

export const formlistApiResult = {
  data: [
    {
      attributes: {
        created: '2019-09-06T09:24:00.296843+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'agenttest',
        last_updated: '2019-08-09T15:57:09.785788+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:32.038095+03:00',
        ona_pk: 381357,
        ona_project_id: 72968,
        task_name: null,
        title: 'agenttest',
        version: '2019-08-09T15:30:48+03:00'
      },
      id: '64',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:01.654955+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'agenttest_1',
        last_updated: '2019-03-04T11:58:30.916499+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:33.374719+03:00',
        ona_pk: 381367,
        ona_project_id: 72968,
        task_name: null,
        title: 'agenttest_1',
        version: '2019-03-04T11:58:27+03:00'
      },
      id: '66',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:03.112082+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'agenttest_x',
        last_updated: '2019-09-12T13:58:23.697974+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:34.831985+03:00',
        ona_pk: 381372,
        ona_project_id: 72968,
        task_name: 'test task 3',
        title: 'agenttest_xx',
        version: '201909121058'
      },
      id: '68',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:40.856373+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'buyer_market_performance',
        last_updated: '2019-03-04T11:56:42.732110+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:12.910244+03:00',
        ona_pk: 328766,
        ona_project_id: 64867,
        task_name: null,
        title: 'Buyers Perspective of Market Performance',
        version: '2019-03-04T11:56:40+03:00'
      },
      id: '31',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:40.743673+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'camel_livestock_price_quality06062019',
        last_updated: '2019-06-07T19:26:48.959823+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:06.474067+03:00',
        ona_pk: 414105,
        ona_project_id: 72968,
        task_name: 'test task 2',
        title: 'Camel Price and Quality06062019',
        version: 'camel_price_quality_ph2_06062019'
      },
      id: '96',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:42.478924+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'cattle_price_quality06062019',
        last_updated: '2019-06-08T12:30:37.776626+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:08.172834+03:00',
        ona_pk: 414106,
        ona_project_id: 72968,
        task_name: 'test',
        title: 'Cattle Price and Quality06062019',
        version: 'cattle_price_quality_ph2_06062019'
      },
      id: '97',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:42.073839+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'contributor_profile_v1_0',
        last_updated: '2019-01-12T16:31:14.622896+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:17.211883+03:00',
        ona_pk: 358338,
        ona_project_id: 72968,
        task_name: null,
        title: 'Contributor Profile',
        version: '2019-01-12T16:31:02+03:00'
      },
      id: '32',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:08.897438+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'contributor_profile_v1_0',
        last_updated: '2019-03-04T11:55:33.893375+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:36.949454+03:00',
        ona_pk: 352699,
        ona_project_id: 64867,
        task_name: null,
        title: 'Contributor Profile',
        version: '2019-03-04T11:55:25+03:00'
      },
      id: '75',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:36.231591+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'contributor_profile_v1_1',
        last_updated: '2019-08-09T15:57:15.054806+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:02.330493+03:00',
        ona_pk: 413497,
        ona_project_id: 72968,
        task_name: null,
        title: 'Contributor Profile',
        version: '2019-08-09T15:57:11+03:00'
      },
      id: '93',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:39.209140+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'contributor_profile06062019',
        last_updated: '2019-08-22T11:39:18.314198+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:04.894991+03:00',
        ona_pk: 414104,
        ona_project_id: 72968,
        task_name: 'test task',
        title: 'Contributor Profile06062019',
        version: 'kaznet_contributor_profile_ph2_06062019'
      },
      id: '95',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:53.949176+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'contributor_profilepp',
        last_updated: '2019-06-06T12:06:05.551440+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:18.627194+03:00',
        ona_pk: 414121,
        ona_project_id: 72968,
        task_name: null,
        title: 'Contributor Profilepp',
        version: 'kaznet_contributor_profile_ph2_pp'
      },
      id: '104',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:37.680914+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'contributor_profile_v1_2',
        last_updated: '2019-06-06T11:45:36.088495+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:11:03.515901+03:00',
        ona_pk: 413591,
        ona_project_id: 72968,
        task_name: null,
        title: 'Contributor Profile V 1.0',
        version: '2019-06-06T11:45:13+03:00'
      },
      id: '94',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:30.878160+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'coupon_distributon_survey_1_000',
        last_updated: '2019-01-22T12:38:17.591931+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:05.065984+03:00',
        ona_pk: 373484,
        ona_project_id: 76762,
        task_name: 'test task 4',
        title: 'Coupon Distributon Survey version 1.00',
        version: '201901131022'
      },
      id: '2',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:32.185193+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'coupon_distributon_survey_2019_01_14',
        last_updated: '2019-01-22T12:38:17.739308+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:06.428184+03:00',
        ona_pk: 373795,
        ona_project_id: 76762,
        task_name: 'test task 5',
        title: 'Coupon Distributon Survey version 1.01',
        version: '201901141803'
      },
      id: '8',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:33.909470+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'dummy',
        last_updated: '2019-03-04T11:57:49.754490+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:07.639777+03:00',
        ona_pk: 381425,
        ona_project_id: 76762,
        task_name: null,
        title: 'dummy',
        version: '2019-03-04T11:57:39+03:00'
      },
      id: '14',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:37.138413+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'dummy1',
        last_updated: '2019-03-04T11:57:54.150946+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:10.349510+03:00',
        ona_pk: 381438,
        ona_project_id: 76762,
        task_name: null,
        title: 'dummy1',
        version: '2019-03-04T11:57:50+03:00'
      },
      id: '22',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:58.134306+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'Ephraim_tests_2',
        last_updated: '2019-06-20T08:26:54.790733+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:26.591477+03:00',
        ona_pk: 340550,
        ona_project_id: 64867,
        task_name: null,
        title: 'Ephraim_tests_2',
        version: '2019-03-04T11:57:15+03:00'
      },
      id: '61',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:59.574926+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'Ephraim_tests_3',
        last_updated: '2019-03-04T11:55:59.728805+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: false,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:27.840764+03:00',
        ona_pk: 343030,
        ona_project_id: 64867,
        task_name: null,
        title: 'Ephraim_tests_3',
        version: '2019-03-04T11:55:56+03:00'
      },
      id: '63',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:24:04.495107+03:00',
        deleted_at: null,
        has_task: true,
        id_string: 'idiottest',
        last_updated: '2019-09-12T14:08:58.842468+03:00',
        metadata: {
          configuration_status: 'correctly_configured',
          downloadable: true,
          owner: 'kaznet',
          owner_url: 'https://api.ona.io/api/v1/users/kaznet'
        },
        modified: '2019-09-27T10:10:36.240520+03:00',
        ona_pk: 381382,
        ona_project_id: 72968,
        task_name: 'test task *',
        title: 'fooltest',
        version: '201909121108'
      },
      id: '70',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    },
    {
      attributes: {
        created: '2019-09-06T09:23:30.516868+03:00',
        deleted_at: null,
        has_task: false,
        id_string: 'idiottest',
        last_updated: '2019-09-04T11:00:35.315207+03:00',
        metadata: {
          configuration_status: 'wrong_owner',
          downloadable: true,
          owner: 'kaznettest',
          owner_url: 'https://api.ona.io/api/v1/users/kaznettest'
        },
        modified: '2019-09-27T10:10:03.086816+03:00',
        ona_pk: 442084,
        ona_project_id: 96841,
        task_name: null,
        title: 'fooltest',
        version: 'idiottest'
      },
      id: '1',
      relationships: {
        project: {
          data: null
        }
      },
      type: 'XForm'
    }
  ],
  links: {
    first: 'http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=1',
    last: 'http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=6',
    next: 'http://127.0.0.1:8000/api/v1/forms/?format=vnd.api%2Bjson&page=2',
    prev: null
  },
  meta: {
    pagination: {
      count: 117,
      page: 1,
      pages: 6
    }
  }
};

export const locationlistApi = {
  locationArray: [
    {
      type: 'Location',
      id: '1',
      attributes: {
        name: 'test location',
        country: '',
        parent_name: null,
        location_type_name: 'location test type',
        description: 'test location',
        geopoint: null,
        radius: null,
        shapefile: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [25.11999000000651, -25.76602000001003],
                [25.114709999994375, -25.76107000000775],
                [25.108810000005178, -25.755969999998342],
                [25.108916639903327, -25.74948415585095],
                [25.101981836138293, -25.749625878961524],
                [25.10384036967298, -25.742665857396787],
                [25.096859999990556, -25.74356999999145],
                [25.089139999996405, -25.742679999995744],
                [25.083320000005187, -25.737690000009025],
                [25.078699221921852, -25.732894481625408],
                [25.074029999988852, -25.738409999990836],
                [25.069160000013653, -25.739079999999376],
                [25.061229999992065, -25.740170000004582],
                [25.053309999988414, -25.74126999999862],
                [25.04537999999593, -25.742360000003828],
                [25.03745999999228, -25.743459999997867],
                [25.029529999999795, -25.744550000003073],
                [25.021609999996144, -25.745649999997113],
                [25.01368000000366, -25.74674000000232],
                [25.00576, -25.74783999999636],
                [24.997830000007525, -25.748930000001565],
                [24.99053000001004, -25.75039000000106],
                [24.984640000009676, -25.7546399999992],
                [24.977530000003753, -25.754270000004908],
                [24.972609999997076, -25.759110000013607],
                [24.965909999998985, -25.763319999998203],
                [24.959050000004936, -25.767439999995986],
                [24.952190000010887, -25.771550000004936],
                [24.9453199999989, -25.775660000013886],
                [24.938460000004852, -25.779769999993732],
                [24.931600000010803, -25.783880000002682],
                [24.92473999998765, -25.788000000000466],
                [24.917879999993602, -25.792110000009416],
                [24.91101000001072, -25.796219999989262],
                [24.904149999987567, -25.800329999998212],
                [24.897289999993518, -25.804449999995995],
                [24.89023097854806, -25.808742587832967],
                [24.884350000007544, -25.812659999995958],
                [24.88375000000815, -25.81302999999025],
                [24.8819599999988, -25.813880000001518],
                [24.874370000005, -25.816170000005513],
                [24.866379999992205, -25.81646999999066],
                [24.858390000008512, -25.816770000004908],
                [24.850390000006882, -25.817069999990053],
                [24.842399999994086, -25.817370000004303],
                [24.834399999992456, -25.817669999989448],
                [24.826410000008764, -25.817970000003697],
                [24.818410000007134, -25.818269999988843],
                [24.810419999994338, -25.818570000003092],
                [24.802469999995083, -25.81880999999703],
                [24.796487077896018, -25.8237583541777],
                [24.791720000008354, -25.821369999990566],
                [24.78536000000895, -25.81716000000597],
                [24.778140000009444, -25.819699999992736],
                [24.77129999999306, -25.81583999999566],
                [24.76459999999497, -25.811790000007022],
                [24.7567599999893, -25.811140000005253],
                [24.750009999988833, -25.814320000004955],
                [24.74226999998791, -25.812550000002375],
                [24.73636000000988, -25.807529999990948],
                [24.72941, -25.803779999987455],
                [24.721549999987474, -25.804689999989932],
                [24.71359999998822, -25.805289999989327],
                [24.706319999997504, -25.80830999999307],
                [24.69869742949959, -25.81084796896903],
                [24.69365000000107, -25.813280000002123],
                [24.689340000011725, -25.819450000009965],
                [24.68320199009031, -25.823785579908872],
                [24.6779899999965, -25.818700000003446],
                [24.670160000008764, -25.81807999999728],
                [24.662489999987883, -25.817299999995157],
                [24.655300000013085, -25.814580000005662],
                [24.64808000001358, -25.811370000010356],
                [24.641089999990072, -25.807889999996405],
                [24.633380000013858, -25.806409999990137],
                [24.62583999999333, -25.80429999998887],
                [24.61814000000595, -25.802250000007916],
                [24.611280000011902, -25.80085999998846],
                [24.60459999999148, -25.797300000005635],
                [24.5983899999992, -25.79331999999704],
                [24.5912299999909, -25.790230000013253],
                [24.585530000011204, -25.785310000006575],
                [24.58017000000109, -25.779429999995045],
                [24.573999999993248, -25.77455000000191],
                [24.566629999986617, -25.77155999999377],
                [24.55877000000328, -25.771119999990333],
                [24.55098, -25.77241000000504],
                [24.543199999985518, -25.771310000011],
                [24.535919999994803, -25.768210000009276],
                [24.528330000001006, -25.765749999991385],
                [24.521119999990333, -25.762820000003558],
                [24.514020000002347, -25.75995000000694],
                [24.506690000009257, -25.756839999987278],
                [24.499299999995856, -25.75427999999374],
                [24.491869999998016, -25.7514899999951],
                [24.484741130960174, -25.749891138955718],
                [24.483700000011595, -25.74892000001273],
                [24.4761, -25.747369999997318],
                [24.470369999995455, -25.74379000000772],
                [24.46799999999348, -25.737280000001192],
                [24.467070000013337, -25.64517999999225],
                [24.3684699999867, -25.644020000007004],
                [24.21869000000879, -25.503179999999702],
                [24.217440000007628, -25.251380000001518],
                [24.214949999994133, -24.965200000006007],
                [24.05144000001019, -24.810499999992317],
                [23.05918000001111, -24.809349999995902],
                [23.046689999988303, -23.95042999999714],
                [25.058660000009695, -24.561090000002878],
                [25.435620000003837, -24.676579999999376],
                [25.550450000009732, -24.748159999988275],
                [25.645309999992605, -24.751630000013392],
                [25.655289999995148, -24.76201000000583],
                [25.66777, -24.771260000008624],
                [25.661530000012135, -24.788570000004256],
                [25.65903999999864, -24.800110000011045],
                [25.649050000007264, -24.812810000003083],
                [25.63532000000123, -24.818579999991925],
                [25.625339999998687, -24.824359999998705],
                [25.616600000008475, -24.83358999999473],
                [25.609109999990324, -24.84283000000869],
                [25.609109999990324, -24.855530000000726],
                [25.606620000005933, -24.868229999992764],
                [25.60537000000477, -24.88208000001032],
                [25.60287000000244, -24.897090000013122],
                [25.59912999998778, -24.910940000001574],
                [25.592889999999898, -24.92133000001195],
                [25.586650000012014, -24.93171999999322],
                [25.580400000006193, -24.94326],
                [25.579159999993863, -24.957120000006398],
                [25.58290000000852, -24.968660000013188],
                [25.59038999999757, -24.98021000000881],
                [25.592889999999898, -24.98021000000881],
                [25.60287000000244, -24.985979999997653],
                [25.616600000008475, -24.987129999994067],
                [25.629080000013346, -24.987129999994067],
                [25.641559999989113, -24.991749999986496],
                [25.651550000009593, -25.003300000011222],
                [25.661530000012135, -25.017149999999674],
                [25.62434999999823, -25.058090000005905],
                [25.616849999991246, -25.0985900000087],
                [25.594349999999395, -25.163089999987278],
                [25.56284999998752, -25.25010000000475],
                [25.52799000000232, -25.319619999994757],
                [25.53047999998671, -25.32078000000911],
                [25.53047999998671, -25.324239999987185],
                [25.524239999998827, -25.335779999993974],
                [25.518000000010943, -25.347320000000764],
                [25.511759999993956, -25.358869999996386],
                [25.508009999990463, -25.370410000003176],
                [25.504270000004908, -25.383109999995213],
                [25.504270000004908, -25.402739999990445],
                [25.508009999990463, -25.415440000011586],
                [25.508039999986067, -25.425809999986086],
                [25.51425000000745, -25.423520000011194],
                [25.53047999998671, -25.42697999998927],
                [25.546709999995073, -25.431600000010803],
                [25.5629299999855, -25.44430000000284],
                [25.57292000000598, -25.453539999987697],
                [25.592889999999898, -25.465079999994487],
                [25.609109999990324, -25.47547000000486],
                [25.62283999999636, -25.481239999993704],
                [25.656870000006165, -25.47996999998577],
                [25.653229999996256, -25.487099999998463],
                [25.649789999995846, -25.49431999999797],
                [25.646249999990687, -25.5014899999951],
                [25.642740000010235, -25.508679999999003],
                [25.63923000000068, -25.515870000002906],
                [25.635739999997895, -25.52306999999564],
                [25.63224999999511, -25.530269999988377],
                [25.629780076502357, -25.537865258869715],
                [25.625170000013895, -25.547359999996843],
                [25.603609999991022, -25.59189999999944],
                [25.5950399999856, -25.6095900000073],
                [25.593759999988833, -25.612229999998817],
                [25.58554, -25.62919000000693],
                [25.580863550218055, -25.638809118856443],
                [25.580060000007506, -25.638650000008056],
                [25.579230000003008, -25.638509999989765],
                [25.578409999987343, -25.63841000001412],
                [25.577699999994365, -25.638830000010785],
                [25.576980000012554, -25.63927000001422],
                [25.576299999986077, -25.639740000013262],
                [25.575580000004265, -25.64016999999876],
                [25.57503999999608, -25.64079999999376],
                [25.57468590771896, -25.64154037006665],
                [25.573319999995874, -25.64269000000786],
                [25.571449999988545, -25.643069999990985],
                [25.569690000003902, -25.64374999998836],
                [25.568430000013905, -25.64517999999225],
                [25.567069999990053, -25.646520000009332],
                [25.565579999994952, -25.647709999990184],
                [25.563950000010664, -25.64869999999064],
                [25.562160000001313, -25.649310000007972],
                [25.560077368689235, -25.649440647946903],
                [25.553509999997914, -25.653649999992922],
                [25.546930000011344, -25.65749000001233],
                [25.540360000013607, -25.6619500000088],
                [25.533989999996265, -25.666540000005625],
                [25.52799000000232, -25.671529999992345],
                [25.521450000000186, -25.675929999997607],
                [25.515990000014426, -25.68153999999049],
                [25.509720000001835, -25.685659999988275],
                [25.503300000011222, -25.688209999992978],
                [25.49655054847244, -25.690398222068325],
                [25.49259000000893, -25.690100000007078],
                [25.488794290460646, -25.68872061028378],
                [25.486750000010943, -25.69201999998768],
                [25.48397999998997, -25.694690000003902],
                [25.480160000006435, -25.695940000005066],
                [25.476158746576402, -25.696204896230483],
                [25.472199999989243, -25.695940000005066],
                [25.46838000000571, -25.696380000008503],
                [25.46634485782124, -25.69987700675847],
                [25.461760000005597, -25.702939999988303],
                [25.45626999999513, -25.708320000005187],
                [25.45003999999608, -25.711719999992056],
                [25.443490000005113, -25.715820000012172],
                [25.437670000013895, -25.721019999997225],
                [25.430980000004638, -25.72492000000784],
                [25.42530999999144, -25.730299999995623],
                [25.418030000000726, -25.7333299999882],
                [25.41086999999243, -25.736410000012256],
                [25.40356033007265, -25.739224420307437],
                [25.39926999999443, -25.740469999989728],
                [25.395040000003064, -25.741760000004433],
                [25.390740000002552, -25.742780000000494],
                [25.386549999995623, -25.744249999988824],
                [25.382790000003297, -25.746630000008736],
                [25.37917999998899, -25.7491699999955],
                [25.375189999991562, -25.751010000007227],
                [25.371149999991758, -25.75278999999864],
                [25.368929999996908, -25.756489999999758],
                [25.365669999999227, -25.758029999997234],
                [25.362120000005234, -25.75906000001123],
                [25.35857000001124, -25.760149999987334],
                [25.355000000010477, -25.761150000005728],
                [25.35138000000734, -25.76188999999431],
                [25.3485900000087, -25.76430999999866],
                [25.34625999999116, -25.766990000003716],
                [25.34291000000667, -25.7685899999924],
                [25.33927535029943, -25.769262031593826],
                [25.331869999994524, -25.77058000001125],
                [25.32456999999704, -25.771409999986645],
                [25.316870000009658, -25.772259999997914],
                [25.31025999999838, -25.7685899999924],
                [25.302770000009332, -25.76620000001276],
                [25.294939999992494, -25.765950000000885],
                [25.287080000009155, -25.765559999999823],
                [25.27960000000894, -25.767599999991944],
                [25.27176000000327, -25.767109999986133],
                [25.264159999991534, -25.76691999999457],
                [25.25680000000284, -25.76756999999634],
                [25.249050000013085, -25.76642],
                [25.241130000009434, -25.766260000003967],
                [25.233490000013262, -25.765240000007907],
                [25.225929999985965, -25.764549999992596],
                [25.219639999995707, -25.76675000000978],
                [25.212650000001304, -25.763219999993453],
                [25.2067199999874, -25.76029999999446],
                [25.199150000000373, -25.75964999999269],
                [25.1919399999897, -25.762890000012703],
                [25.184000000008382, -25.763160000002244],
                [25.176780000008876, -25.76652999999351],
                [25.16889000000083, -25.76644999999553],
                [25.160919999994803, -25.76720000000205],
                [25.152960000006715, -25.767950000008568],
                [25.14499000000069, -25.76871000000392],
                [25.1370300000126, -25.76946000001044],
                [25.12891474206117, -25.770572733716108],
                [25.12109559759847, -25.770961540547432],
                [25.11999000000651, -25.76602000001003]
              ]
            ]
          ]
        },
        created: '2019-09-12T07:58:21.768659+03:00',
        modified: '2019-09-12T07:58:21.768677+03:00',
        has_submissions: false
      },
      relationships: {
        location_type: {
          data: {
            type: 'LocationType',
            id: '1'
          }
        },
        parent: {
          data: null
        }
      }
    }
  ],
  pageLinks: {
    first: 'http://127.0.0.1:8000/api/v1/locations/?page=1',
    last: 'http://127.0.0.1:8000/api/v1/locations/?page=1',
    next: null,
    prev: null
  },
  currentPage: 1,
  totalPages: 1,
  totalCount: 1
};

export const resultsFromClientListApi = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
    last: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
    next: null,
    prev: null
  },
  data: [
    {
      type: 'Client',
      id: '1',
      attributes: {
        name: 'frankline',
        created: '2019-09-12T07:58:29.522037+03:00',
        modified: '2019-09-12T07:58:29.522096+03:00'
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 1,
      count: 1
    }
  }
};

export const contentTypeApiResults = {
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
