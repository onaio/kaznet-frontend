import React, { Component } from "react";
import { connect } from "react-redux";
import * as clientActions from "../../store/clients/actions";
import * as clientSelectiors from "../../store/clients/reducer";
import * as globalActions from "../../store/global/actions";
import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

class ClientsList extends Component {
  componentDidMount() {
    this.props.dispatch(clientActions.fetchClients());
    this.props.dispatch(globalActions.changePageTitle("Clients"));
    this.props.dispatch(globalActions.changePageTitleButton("+ Create Client"));
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
    const headerItems = ["Name"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [row.attributes.name];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: clientSelectiors.getClientsById(state),
    rowsIdArray: clientSelectiors.getClientsIdArray(state)
  };
}

export default connect(mapStateToProps)(ClientsList);
