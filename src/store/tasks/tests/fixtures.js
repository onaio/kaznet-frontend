// Fixtures for task tests
import _ from "lodash";

export const taskData = {
  links: {
    first: "http://localhost:8000/api/v1/tasks/?page=1",
    last: "http://localhost:8000/api/v1/tasks/?page=1",
    next: null,
    prev: null
  },
  data: [
    {
      type: "Task",
      id: "1",
      attributes: {
        created: "2018-06-21T12:15:45.349936+03:00",
        modified: "2018-06-21T12:22:09.703447+03:00",
        name: "Awesome Task",
        estimated_time: "4 01:15:20",
        approved_submissions_count: 1,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: "55.00 KES",
        current_bounty_amount: "55.00 KES",
        required_expertise: "1",
        description: "This is pure joy.",
        xform_title: "Form 1",
        status_display: "Active",
        required_expertise_display: "Beginner",
        start: "2018-06-21T12:15:45+03:00",
        end: "2019-01-30T12:17:40+03:00",
        timing_rule: "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=12",
        total_submission_target: 100,
        user_submission_target: 100,
        status: "a",
        submission_count: 1,
        target_id: 1
      },
      relationships: {
        parent: {
          data: null
        },
        client: {
          data: {
            type: "Client",
            id: "7"
          }
        },
        bounty: {
          data: {
            type: "Bounty",
            id: "2"
          }
        },
        target_content_type: {
          data: {
            type: "ContentType",
            id: "16"
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
              type: "Location",
              id: "1"
            }
          ],
          meta: {
            count: 1
          }
        }
      }
    },
    {
      type: "Task",
      id: "2",
      attributes: {
        created: "2018-06-21T12:15:45.363700+03:00",
        modified: "2018-06-21T12:25:06.164454+03:00",
        name: "Kill Bill",
        estimated_time: "00:00:19",
        approved_submissions_count: 2,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: "300000.00 KES",
        current_bounty_amount: "150000.00 KES",
        required_expertise: "3",
        description: "The best and most delicious task ever.",
        xform_title: "Form 2",
        status_display: "Scheduled",
        required_expertise_display: "Advanced",
        start: "2018-08-17T12:15:45+03:00",
        end: null,
        timing_rule: "RRULE:FREQ=DAILY;INTERVAL=1;COUNT=500",
        total_submission_target: 200,
        user_submission_target: 2,
        status: "s",
        submission_count: 2,
        target_id: 2
      },
      relationships: {
        parent: {
          data: null
        },
        client: {
          data: {
            type: "Client",
            id: "2"
          }
        },
        bounty: {
          data: {
            type: "Bounty",
            id: "1"
          }
        },
        target_content_type: {
          data: {
            type: "ContentType",
            id: "16"
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
              type: "Location",
              id: "2"
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
      page: 1,
      pages: 1,
      count: 2
    }
  }
};

export const tasksArray = _.map(taskData.data, task => {
  return task;
});

export const tasksById = _.keyBy(tasksArray, task => task.id);
export const taskById = _.get(tasksById, 1);

export const singleTaskData = {
  data: {
    type: "Task",
    id: "999",
    attributes: {
      created: "2018-06-21T12:15:45.363700+03:00",
      modified: "2018-06-21T12:25:06.164454+03:00",
      name: "Kill Bill",
      estimated_time: "00:00:19",
      approved_submissions_count: 0,
      pending_submissions_count: 0,
      rejected_submissions_count: 0,
      total_bounty_payout: "0 KES",
      current_bounty_amount: "150000.00 KES",
      required_expertise: "3",
      description: "The best and most delicious task ever.",
      xform_title: "Form 2",
      status_display: "Scheduled",
      start: "2018-08-17T12:15:45+03:00",
      end: null,
      timing_rule: "RRULE:FREQ=DAILY;INTERVAL=1;COUNT=500",
      total_submission_target: 200,
      user_submission_target: 2,
      status: "s",
      submission_count: 0,
      target_id: 2
    },
    relationships: {
      parent: {
        data: null
      },
      client: {
        data: {
          type: "Client",
          id: "2"
        }
      },
      bounty: {
        data: {
          type: "Bounty",
          id: "1"
        }
      },
      target_content_type: {
        data: {
          type: "ContentType",
          id: "16"
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
            type: "Location",
            id: "2"
          }
        ],
        meta: {
          count: 1
        }
      }
    }
  }
};

export const singleTask = {
  type: "Task",
  id: "999",
  attributes: {
    created: "2018-06-21T12:15:45.363700+03:00",
    modified: "2018-06-21T12:25:06.164454+03:00",
    name: "Kill Bill",
    estimated_time: "00:00:19",
    approved_submissions_count: 0,
    pending_submissions_count: 0,
    rejected_submissions_count: 0,
    total_bounty_payout: "0 KES",
    current_bounty_amount: "150000.00 KES",
    required_expertise: "3",
    description: "The best and most delicious task ever.",
    xform_title: "Form 2",
    status_display: "Scheduled",
    start: "2018-08-17T12:15:45+03:00",
    end: null,
    timing_rule: "RRULE:FREQ=DAILY;INTERVAL=1;COUNT=500",
    total_submission_target: 200,
    user_submission_target: 2,
    status: "s",
    submission_count: 0,
    target_id: 2
  },
  relationships: {
    parent: {
      data: null
    },
    client: {
      data: {
        type: "Client",
        id: "2"
      }
    },
    bounty: {
      data: {
        type: "Bounty",
        id: "1"
      }
    },
    target_content_type: {
      data: {
        type: "ContentType",
        id: "16"
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
          type: "Location",
          id: "2"
        }
      ],
      meta: {
        count: 1
      }
    }
  }
};

export const tasksIdArray = _.keys(tasksById);
export const singleTaskArray = _.map(singleTaskData, task => {
  return task;
});

export const singleTaskById = _.keyBy(singleTaskArray, task => task.id);

export const TaskFormInitialData = {
  amount: 55,
  client: "7",
  description: undefined,
  end: "2019-01-30",
  estimated_time: 15,
  form: 1,
  name: "Awesome Task",
  required_expertise: "1",
  start: "2018-06-21",
  status: "a",
  timing_rule: "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=12",
  user_submission_target: 100
};
