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
        created: "2018-06-21T13:51:57.580166+03:00",
        modified: "2018-06-21T13:51:57.580197+03:00",
        name: "Task Test",
        estimated_time: null,
        approved_submissions_count: 0,
        pending_submissions_count: 0,
        rejected_submissions_count: 0,
        total_bounty_payout: "0 KES",
        current_bounty_amount: null,
        required_expertise: "4",
        description: "Hey here is task one huh",
        xform_title: "",
        status_display: "Active",
        start: "2018-06-21T13:51:39+03:00",
        end: "2018-06-21T13:51:42+03:00",
        timing_rule: "FREQ=DAILY;INTERVAL=1;UNTIL=20180621T210000Z",
        total_submission_target: null,
        user_submission_target: null,
        status: "a",
        submission_count: 0,
        target_id: null
      },
      relationships: {
        parent: {
          data: null
        },
        client: {
          data: {
            type: "Client",
            id: "1"
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

export const tasksArray = _.map(taskData.data, task => {
  return task;
});

export const tasksById = _.keyBy(tasksArray, task => task.id);

export const tasksIdArray = _.keys(tasksById);
