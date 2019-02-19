import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LocationTypeForm from './LocationTypeForm';
import FormView from '../../components/FormView';
import * as locationTypeSelectors from '../../store/locationTypes/reducer';
import * as locationTypeActions from '../../store/locationTypes/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as globalActions from '../../store/global/actions';

export class LocationTypeEditForm extends Component {
  componentDidMount() {
    this.props.fetchLocationType(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.locationType = this.props.locationTypeById;
    if (!this.locationType) return this.renderLoading();
    const action = locationTypeActions.editLocationType;
    const initialData = {
      name: this.locationType.attributes.name
    };

    return (
      <FormView
        form={
          <LocationTypeForm
            action={action}
            initialData={initialData}
            targetId={this.locationType.id}
          />
        }
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
    locationTypeById: locationTypeSelectors.getLocationTypeById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError,
    errorMessage: errorHandlerSelectors.getErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocationType: locationTypeActions.fetchLocationType,
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationTypeEditForm);
