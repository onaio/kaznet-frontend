import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as locationActions from '../../store/locations/actions';
import * as locationSelectors from '../../store/locations/reducer';
import * as globalActions from '../../store/global/actions'

import ListView from '../../components/ListView';
import ElementMap from '../ElementMap';


class LocationsList extends Component {

    componentDidMount() {
        this.props.dispatch(locationActions.fetchLocations());
        this.props.dispatch(globalActions.changePageTitle('Locations'));
        this.props.dispatch(globalActions.changePageTitleButton('+ Create Location'))
    }

    render() {
        if (!this.props.rowsById) return this.renderLoading();
        return (
            <div className="LocationList">
                <ListView
                    renderHeaders={this.renderHeaders}
                    rowsIdArray={this.props.rowsIdArray}
                    rowsById={this.props.rowsById}
                    renderRow={this.renderRow} />
            </div>
        );
    }

    renderLoading() {
        return (
            <p>Loading...</p>
        );
    }

    renderRow(row) {
        const rowItems = [
            row.attributes.name,
            row.attributes.parent_name,
            row.attributes.location_type_name,
            row.attributes.description
        ];
        return (
            <ElementMap items={rowItems} HTMLTag='td' />
        );
    }

    renderHeaders() {
        const headerItems = [
          'Name',
          'Parent',
          'Type',
          'Description',
        ];
        return (
          <ElementMap items={headerItems} HTMLTag='th' />
        );
      }
}

function mapStateToProps(state) {
    return {
        rowsById: locationSelectors.getLocationsById(state),
        rowsIdArray: locationSelectors.getLocationsIdArray(state)
    };
}

export default connect(mapStateToProps)(LocationsList);