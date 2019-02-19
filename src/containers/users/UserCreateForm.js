import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../store/users/actions';
import UserForm from './UserForm';
import FormView from '../../components/FormView';
import * as globalActions from '../../store/global/actions';

import * as constants from '../../constants';

export class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.props.noTitle();
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) return this.renderLoading();
    const action = userActions.createUser;
    const initialData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmation: '',
      gender: '',
      role: constants.CONTRIBUTOR_ROLE,
      expertise: constants.BEGINNER,
      national_id: '',
      payment_number: '',
      phone_number: '',
      ona_username: ''
    };

    return (
      <FormView
        form={<UserForm initialData={initialData} action={action} redirectAfterAction="/users" />}
      />
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return (
        <center>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </center>
      );
    }
    if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(UserCreateForm);
