import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserForm from "./UserForm";
import FormView from "../../components/FormView";
import * as userActions from "../../store/users/actions";
import * as userSelectors from "../../store/users/reducer";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as globalActions from "../../store/global/actions";

export class UserEditForm extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    console.log("shiit");
    this.user = this.props.rowsById;
    if (!this.user) {
      return this.renderLoading();
    }
    const action = userActions.editUser;
    const initialData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmation: "",
      gender: "",
      role: "",
      expertise: "",
      national_id: "",
      payment_number: "",
      phone_number: "",
      ona_username: ""
    };

    return (
      <FormView
        form={
          <UserForm
            action={action}
            initialData={initialData}
            targetId={this.user.id}
          />
        }
      />
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    } else if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    rowsById: userSelectors.getUsersById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError,
    errorMessage: errorHandlerSelectors.getErrorMessage
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
