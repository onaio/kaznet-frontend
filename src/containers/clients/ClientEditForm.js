import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ClientForm from './ClientForm';
import FormView from '../../components/FormView';
import * as clientSelectors from '../../store/clients/reducer';
import * as clientActions from '../../store/clients/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as globalActions from '../../store/global/actions';

export class ClientEditForm extends Component {
  componentDidMount() {
    this.props.fetchClient(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.client = this.props.clientById;
    if (!this.client) return this.renderLoading();
    const action = clientActions.editClient;
    const initialData = {
      name: this.client.attributes.name
    };

    return (
      <FormView
        form={<ClientForm action={action} initialData={initialData} targetId={this.client.id} />}
      />
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    }
    if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    clientById: clientSelectors.getClientById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError,
    errorMessage: errorHandlerSelectors.getErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClient: clientActions.getClient,
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientEditForm);
