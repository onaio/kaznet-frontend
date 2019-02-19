import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as clientActions from '../../store/clients/actions';
import ClientForm from './ClientForm';
import FormView from '../../components/FormView';
import * as globalActions from '../../store/global/actions';

export class ClientCreateForm extends Component {
  componentDidMount() {
    this.props.noTitle();
  }

  render() {
    const action = clientActions.createClient;
    const initialData = {
      name: ''
    };
    return <FormView form={<ClientForm action={action} initialData={initialData} />} />;
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
)(ClientCreateForm);
