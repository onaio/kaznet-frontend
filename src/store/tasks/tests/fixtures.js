// Fixtures for task tests
import _ from 'lodash';

export const taskData = {
    "links": {
        "first": "http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1",
        "last": "http://127.0.0.1:8000/api/v1/tasks/?format=vnd.api%2Bjson&page=1",
        "next": null,
        "prev": null
    },
    "data": [{
        "type": "Task",
        "id": "1",
        "attributes": {
            "created": "2018-06-14T16:25:00.925745+03:00",
            "modified": "2018-06-14T16:25:00.925766+03:00",
            "name": "Kaznet",
            "estimated_time": "4 01:15:20",
            "approved_submissions_count": 0,
            "pending_submissions_count": 0,
            "rejected_submissions_count": 0,
            "total_bounty_payout": "0 KES",
            "current_bounty_amount": null,
            "description": "This is amazing",
            "start": "2018-06-14T16:23:51+03:00",
            "end": null,
            "timing_rule": "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=5",
            "total_submission_target": 100,
            "user_submission_target": 100,
            "status": "d",
            "submission_count": 0,
            "target_id": null
        },
        "relationships": {
            "parent": {
                "data": null
            },
            "client": {
                "data": {
                    "type": "Client",
                    "id": "1"
                }
            },
            "bounty": {
                "data": null
            },
            "target_content_type": {
                "data": null
            },
            "segment_rules": {
                "data": [],
                "meta": {
                    "count": 0
                }
            },
            "locations": {
                "data": [{
                    "type": "Location",
                    "id": "1"
                }],
                "meta": {
                    "count": 1
                }
            }
        }
    }, {
        "type": "Task",
        "id": "2",
        "attributes": {
            "created": "2018-06-19T21:01:21.545847+03:00",
            "modified": "2018-06-19T21:01:21.545888+03:00",
            "name": "Example Task",
            "estimated_time": "4 01:15:20",
            "approved_submissions_count": 0,
            "pending_submissions_count": 0,
            "rejected_submissions_count": 0,
            "total_bounty_payout": "0 KES",
            "current_bounty_amount": null,
            "description": "This is a description.",
            "start": "2018-06-19T21:00:34+03:00",
            "end": "2018-08-16T21:00:40+03:00",
            "timing_rule": "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=5",
            "total_submission_target": 123,
            "user_submission_target": 234,
            "status": "d",
            "submission_count": 0,
            "target_id": null
        },
        "relationships": {
            "parent": {
                "data": null
            },
            "client": {
                "data": {
                    "type": "Client",
                    "id": "11"
                }
            },
            "bounty": {
                "data": null
            },
            "target_content_type": {
                "data": null
            },
            "segment_rules": {
                "data": [],
                "meta": {
                    "count": 0
                }
            },
            "locations": {
                "data": [{
                    "type": "Location",
                    "id": "1"
                }],
                "meta": {
                    "count": 1
                }
            }
        }
    }],
    "meta": {
        "pagination": {
            "page": 1,
            "pages": 1,
            "count": 2
        }
    }
}

export const tasksArray = _.map(taskData.data, (task) => {
    return task;
});

export const tasksById = _.keyBy(tasksArray, (task) => task.id);

export const tasksIdArray = _.keys(tasksById);