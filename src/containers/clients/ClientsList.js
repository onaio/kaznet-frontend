import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as clientActions from '../../store/clients/actions';
import * as clientSelectiors from '../../store/clients/reducer';
import ListView from '../../components/ClientListView'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './ClientsList.css'
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

class ClientsList extends Component {

    componentDidMount() {
        this.props.dispatch(clientActions.fetchClients());
    }

    render() {
        if(!this.props.rowsById) return this.renderLoading();
        return (
            <div className="Clients">
                <section className="page-title">
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <div>
                            <h1>Page Title</h1>
                            <Row>
                            <Col md="9">
                                <Form>
                                <InputGroup className="search-group">
                                    <InputGroupAddon addonType="prepend" className="search-prepend">
                                    <InputGroupText className="bg-white border-right-0">
                                        <FontAwesomeIcon icon="search" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" bsSize="lg" className="border-left-0" placeholder="Search" aria-label="Search" />
                                </InputGroup>
                                </Form>
                            </Col>
                            <Col md="3">
                                <Button block size="lg" color="primary">+ Add Client</Button>
                            </Col>
                            </Row>
                        </div>
                        </Col>
                    </Row>
                </section>
                <div className="ClientsList">
                    <ListView
                    rowsIdArray={this.props.rowsIdArray}
                    rowsById={this.props.rowsById}
                    renderRow={this.renderRow} />
                </div>
            </div>
        );
    }

    renderLoading() {
        return (
            <p>Loading...</p>
        );
    }

    renderRow(row) {
        return (
            [
                <td>{row.attributes.name}</td>
            ]
        );
    }
}

function mapStateToProps(state) {
    return {
        rowsById: clientSelectiors.getClientsById(state),
        rowsIdArray: clientSelectiors.getClientsIdArray(state)
    };
}

export default connect(mapStateToProps)(ClientsList);
