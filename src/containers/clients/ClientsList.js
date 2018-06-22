import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";

import * as clientActions from "../../store/clients/actions";
import * as clientSelectiors from "../../store/clients/reducer";
import * as globalActions from "../../store/global/actions";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class ClientsList extends Component {
  componentDidMount() {
    this.props.fetchClients();
    this.props.changePageTitle("Clients");
    this.props.changePageTitleButton("+ Create Client");
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="ClientsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderHeaders() {
    const headerItems = ["Name", "Created"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      row.attributes.name,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.created}
      </Moment>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: clientSelectiors.getClientsById(state),
    rowsIdArray: clientSelectiors.getClientsIdArray(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: clientActions.fetchClients,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);
