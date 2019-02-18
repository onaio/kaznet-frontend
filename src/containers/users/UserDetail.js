import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userSelectors from '../../store/users/reducer';
import * as userActions from '../../store/users/actions';
import * as globalActions from '../../store/global/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';

import NestedElementMap from '../NestedElementMap';
import DetailView from '../../components/DetailView';
import UserDetailTitle from '../../components/users/UserDetailTitle';

export class UserDetail extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.user = this.props.usersById;
    if (!this.user) return this.renderLoading();
    return (
      <div className="UsersList">
        <UserDetailTitle user={this.user} />
        <DetailView
          renderMainDetails={this.renderMainDetails()}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
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

  renderMainDetails() {
    const headerItems = {
      Username: this.user.attributes.ona_username,
      Role: this.user.attributes.role_display,
      'National ID': this.user.attributes.national_id
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderAdditionalDetails() {
    const headerItems = {
      Gender: this.user.attributes.gender_display,
      Address: this.user.attributes.address,
      'Level of Expertise': this.user.attributes.expertise_display,
      Email: this.user.attributes.email,
      'Phone Number': this.user.attributes.phone_number
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state, props) {
  return {
    usersById: userSelectors.getUserById(state, props.match.params.id),
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
)(UserDetail);
