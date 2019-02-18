import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserForm from './UserForm';
import FormView from '../../components/FormView';
import * as userActions from '../../store/users/actions';
import * as userSelectors from '../../store/users/reducer';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as globalActions from '../../store/global/actions';

export class UserEditForm extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.user = this.props.userById;
    if (!this.user) {
      return this.renderLoading();
    }
    const action = userActions.editUser;
    const initialData = {
      first_name: this.user.attributes.first_name,
      last_name: this.user.attributes.last_name,
      email: this.user.attributes.email,
      password: '',
      confirmation: '',
      gender: this.user.attributes.gender !== null ? this.user.attributes.gender : '',
      role: this.user.attributes.role !== null ? this.user.attributes.role : '',
      expertise: this.user.attributes.expertise !== null ? this.user.attributes.expertise : '',
      national_id: this.user.attributes.national_id ? this.user.attributes.national_id : '',
      payment_number:
        this.user.attributes.payment_number !== null ? this.user.attributes.payment_number : '',
      phone_number: this.user.attributes.phone_number,
      ona_username: this.user.attributes.ona_username
    };

    return (
      <FormView
        form={<UserForm action={action} initialData={initialData} targetId={this.user.id} />}
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

function mapStateToProps(state, ownProps) {
  return {
    userById: userSelectors.getUserById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUser: userActions.fetchUser,
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditForm);
