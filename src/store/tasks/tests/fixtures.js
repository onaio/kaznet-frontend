// Fixtures for task tests
import _ from 'lodash';

export const searchParam = '';
export const taskData = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1',
    last: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1',
    next: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=2',
    prev: null
  },
  data: [
    {
      type: 'Task',
      id: '4',
      attributes: {
        created: '2018-07-10T16:50:20.165320+03:00',
        modified: '2018-07-12T17:08:58.621899+03:00',
        name: 'Kaznet',
        estimated_time: '00:15:00',
        approved_submissions_count: 3,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: '0 KES',
        current_bounty_amount: null,
        required_expertise: '1',
        description: 'This is an awesome task',
        xform_title: 'Baseline_Questionnaire',
        xform_id_string: 'Baseline_Questionnaire',
        xform_owner: 'kahama',
        xform_ona_id: 328755,
        xform_project_id: 64867,
        status_display: 'Active',
        required_expertise_display: 'Beginner',
        start: '2018-07-10T12:00:00+03:00',
        end: '2020-07-10T12:00:00+03:00',
        timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
        total_submission_target: null,
        user_submission_target: 10,
        status: 'a',
        submission_count: 0,
        target_id: 20,
        created_by_name: 'Ona User',
        task_locations: [
          {
            task: {
              type: 'Task',
              id: '4'
            },
            created: '2018-07-12T17:38:21.527548+03:00',
            modified: '2018-07-12T17:38:21.527572+03:00',
            location: {
              type: 'Location',
              id: '1'
            },
            timing_rule: 'FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1',
            start: '06:00:00',
            end: '18:00:00'
          }
        ]
      },
      relationships: {
        created_by: {
          data: {
            type: 'User',
            id: '3'
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
          data: null
        },
        target_content_type: {
          data: {
            type: 'ContentType',
            id: '16'
          }
        },
        segment_rules: {
          data: [],
          meta: {
            count: 0
          }
        },
        locations: {
          data: [
            {
              type: 'Location',
              id: '1'
            }
          ],
          meta: {
            count: 1
          }
        }
      }
    },
    {
      type: 'Task',
      id: '10',
      attributes: {
        created: '2018-07-12T16:48:50.829735+03:00',
        modified: '2018-07-12T16:48:50.894406+03:00',
        name: 'Coconut Quest',
        estimated_time: '00:15:00',
        approved_submissions_count: 0,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: '0 KES',
        current_bounty_amount: null,
        required_expertise: '1',
        description: 'This is an awesome task',
        xform_title: '',
        xform_id_string: '',
        status_display: 'Draft',
        required_expertise_display: 'Beginner',
        start: '2018-07-10T12:00:00+03:00',
        end: '2020-07-10T12:00:00+03:00',
        timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
        total_submission_target: null,
        user_submission_target: 10,
        status: 'd',
        submission_count: 0,
        target_id: 20,
        created_by_name: 'Ona User',
        task_locations: []
      },
      relationships: {
        created_by: {
          data: {
            type: 'User',
            id: '3'
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
          data: null
        },
        target_content_type: {
          data: null
        },
        segment_rules: {
          data: [],
          meta: {
            count: 0
          }
        },
        locations: {
          data: [],
          meta: {
            count: 0
          }
        }
      }
    },
    {
      type: 'Task',
      id: '6',
      attributes: {
        created: '2018-07-10T19:38:07.391811+03:00',
        modified: '2018-07-12T17:11:01.785628+03:00',
        name: 'Coconut Quest2',
        estimated_time: '00:15:00',
        approved_submissions_count: 0,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: '0 KES',
        current_bounty_amount: null,
        required_expertise: '1',
        description: 'This is an awesome task',
        xform_title: 'bike_trip_repeat',
        xform_id_string: 'bike_trip_repeat',
        status_display: 'Draft',
        required_expertise_display: 'Beginner',
        start: '2018-07-10T12:00:00+03:00',
        end: '2020-07-10T12:00:00+03:00',
        timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
        total_submission_target: null,
        user_submission_target: 10,
        status: 'd',
        submission_count: 0,
        target_id: 168,
        created_by_name: 'Ona User',
        task_locations: []
      },
      relationships: {
        created_by: {
          data: {
            type: 'User',
            id: '3'
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
          data: null
        },
        target_content_type: {
          data: {
            type: 'ContentType',
            id: '16'
          }
        },
        segment_rules: {
          data: [],
          meta: {
            count: 0
          }
        },
        locations: {
          data: [],
          meta: {
            count: 0
          }
        }
      }
    },
    {
      type: 'Task',
      id: '8',
      attributes: {
        created: '2018-07-11T10:13:41.385184+03:00',
        modified: '2018-07-12T17:15:49.202427+03:00',
        name: 'Kill Bill',
        estimated_time: '00:15:00',
        approved_submissions_count: 0,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: '0 KES',
        current_bounty_amount: null,
        required_expertise: '1',
        description: '',
        xform_title: 'BRCiS - TARGETED COMMUNITIES (March 2015)',
        xform_id_string: 'brcis_targ_comm_march2015',
        status_display: 'Archived',
        required_expertise_display: 'Beginner',
        start: '2018-07-10T12:00:00+03:00',
        end: '2018-07-12T12:00:00+03:00',
        timing_rule: '',
        total_submission_target: null,
        user_submission_target: null,
        status: 'e',
        submission_count: 0,
        target_id: 7,
        created_by_name: '',
        task_locations: []
      },
      relationships: {
        created_by: {
          data: null
        },
        parent: {
          data: null
        },
        client: {
          data: null
        },
        bounty: {
          data: null
        },
        target_content_type: {
          data: {
            type: 'ContentType',
            id: '16'
          }
        },
        segment_rules: {
          data: [],
          meta: {
            count: 0
          }
        },
        locations: {
          data: [],
          meta: {
            count: 0
          }
        }
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 2,
      count: 4
    }
  }
};

export const taskDataSecondPage = {
  links: {
    first: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1',
    last: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1',
    next: null,
    prev: 'http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1'
  },
  data: [
    {
      type: 'Task',
      id: '4',
      attributes: {
        created: '2018-07-10T16:50:20.165320+03:00',
        modified: '2018-07-12T17:08:58.621899+03:00',
        name: 'Kaznet',
        estimated_time: '00:15:00',
        approved_submissions_count: 0,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: '0 KES',
        current_bounty_amount: null,
        required_expertise: '1',
        description: 'This is an awesome task',
        xform_title: 'Baseline_Questionnaire',
        xform_id_string: 'Baseline_Questionnaire',
        status_display: 'Active',
        required_expertise_display: 'Beginner',
        start: '2018-07-10T12:00:00+03:00',
        end: '2020-07-10T12:00:00+03:00',
        timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
        total_submission_target: null,
        user_submission_target: 10,
        status: 'a',
        submission_count: 0,
        target_id: 20,
        created_by_name: 'Ona User',
        task_locations: [
          {
            task: {
              type: 'Task',
              id: '4'
            },
            created: '2018-07-12T17:38:21.527548+03:00',
            modified: '2018-07-12T17:38:21.527572+03:00',
            location: {
              type: 'Location',
              id: '1'
            },
            timing_rule: 'FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1',
            start: '06:00:00',
            end: '18:00:00'
          }
        ]
      },
      relationships: {
        created_by: {
          data: {
            type: 'User',
            id: '3'
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
          data: null
        },
        target_content_type: {
          data: {
            type: 'ContentType',
            id: '16'
          }
        },
        segment_rules: {
          data: [],
          meta: {
            count: 0
          }
        },
        locations: {
          data: [
            {
              type: 'Location',
              id: '1'
            }
          ],
          meta: {
            count: 1
          }
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

export const singleTask = {
  type: 'Task',
  id: '999',
  attributes: {
    created: '2018-07-10T16:50:20.165320+03:00',
    modified: '2018-07-12T17:08:58.621899+03:00',
    name: 'Kaznet',
    estimated_time: '00:15:00',
    approved_submissions_count: 1,
    pending_submissions_count: 0,
    rejected_submissions_count: 0,
    total_bounty_payout: '0 KES',
    current_bounty_amount: '55 KES',
    required_expertise: '1',
    description: 'This is an awesome task',
    xform_title: 'Baseline_Questionnaire',
    xform_id_string: 'Baseline_Questionnaire',
    status_display: 'Active',
    required_expertise_display: 'Beginner',
    start: '2018-07-10T12:00:00+03:00',
    end: '2020-07-10T12:00:00+03:00',
    timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
    total_submission_target: null,
    user_submission_target: 10,
    status: 'a',
    submission_count: 0,
    target_id: 20,
    created_by_name: 'Ona User',
    client_name: 'Client 1',
    task_locations: [
      {
        task: {
          type: 'Task',
          id: '4'
        },
        created: '2018-07-12T17:38:21.527548+03:00',
        modified: '2018-07-12T17:38:21.527572+03:00',
        location: {
          type: 'Location',
          id: '1'
        },
        location_name: 'Voi',
        location_description: 'Voi is cool',
        timing_rule: 'FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1',
        start: '06:00:00',
        end: '18:00:00'
      }
    ]
  },
  relationships: {
    created_by: {
      data: {
        type: 'User',
        id: '3'
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
      data: null
    },
    target_content_type: {
      data: {
        type: 'ContentType',
        id: '16'
      }
    },
    segment_rules: {
      data: [],
      meta: {
        count: 0
      }
    },
    locations: {
      data: [
        {
          type: 'Location',
          id: '1'
        }
      ],
      meta: {
        count: 1
      }
    }
  }
};

export const tasksArray = _.map(taskData.data, task => {
  return task;
});

export const getTaskStatus = singleTask.attributes.status;

export const tasksArraySecondPage = _.map(taskDataSecondPage.data, task => task);

export const tasksById = _.keyBy(tasksArray, task => task.id);
export const taskById = _.get(tasksById, 4);

export const currentPage = taskData.meta.pagination.page;
export const totalPages = taskData.meta.pagination.pages;
export const totalCount = taskData.meta.pagination.count;
export const pageLinks = taskData.links;
export const firstPage = 1;
export const lastPage = 2;

export const tasksByIdSecondPage = _.keyBy(tasksArraySecondPage, task => task.id);
export const pageLinksSecondPage = taskDataSecondPage.links;
export const currentPageSecondPage = taskDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = taskDataSecondPage.meta.pagination.pages;

export const singleTaskData = {
  data: singleTask
};
export const tasksIdArray = _.keys(tasksById);
export const singleTaskArray = _.map(singleTaskData, task => {
  return task;
});
export const singleTaskById = _.keyBy(singleTaskArray, task => task.id);

export const TaskFormInitialData = {
  amount: 55,
  client: { value: '1', label: 'Client 1' },
  description: 'This is an awesome task',
  end: '2020-07-10',
  estimated_time: 15,
  form: { value: 20, label: 'Baseline_Questionnaire' },
  name: 'Kaznet',
  required_expertise: '1',
  start: '2018-07-10',
  status: 'a',
  taskLocations: [
    {
      start: '06:00:00',
      end: '18:00:00',
      timing_rule: 'FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1',
      location: {
        value: '1',
        label: 'Voi'
      }
    }
  ],
  timing_rule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=FR,SA',
  user_submission_target: 10
};
