// eslint-disable-next-line import/prefer-default-export
export const response1 = {
  errors: [
    {
      detail: 'Profile with this National ID Number already exists.',
      source: {
        pointer: '/data/attributes/national_id'
      },
      status: '400'
    },
    {
      detail: 'Profile with this Ona Username already exists.',
      source: {
        pointer: '/data/attributes/ona_username'
      },
      status: '400'
    }
  ]
};

export const response2 = {
  data: {
    attributes: {
      address: null,
      amount_earned: '0 KES',
      approval_rate: 0.0,
      approved_submissions: 0,
      avg_amount_earned: '0.0 KES',
      avg_approval_rate: 0.0,
      avg_approved_submissions: 0.0,
      avg_rejected_submissions: 0.0,
      avg_submissions: 0.0,
      created: '2019-10-01T15:14:22.380632+03:00',
      email: 'arnoldjackson@gmail.com',
      expertise: '1',
      expertise_display: 'Beginner',
      first_name: 'Jack',
      gender: '',
      gender_display: '',
      last_login: null,
      last_name: 'Arnold',
      metadata: {
        gravatar:
          'https://secure.gravatar.com/avatar/ba5300eb17be140ab5cafd254a9e8bf5?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
        last_password_edit: '2019-10-01T12:14:19.023795+00:00'
      },
      modified: '2019-10-01T15:14:22.398453+03:00',
      national_id: '2323234234',
      ona_pk: 71013,
      ona_username: 'ArnoldJack',
      payment_number: '',
      phone_number: '',
      rejected_submissions: 0,
      role: '2',
      role_display: 'Contributor',
      submission_count: 0
    },
    id: '8',
    type: 'UserProfile'
  }
};
