import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LocationsList.css';
import * as locationActions from '../../store/locations/actions';
import * as locationSelectors from '../../store/locations/reducer';
import ListView from '../../components/LocationListView';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    Row,
    Col,
    Form,
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText
  } from 'reactstrap';

class LocationsList extends Component {

    componentDidMount() {
        this.props.dispatch(locationActions.fetchLocations());
    }

    render() {
        if (!this.props.rowsById) return this.renderLoading();
        return (
            <div className="Locations">
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
                            <Button block size="lg" color="primary">+ Add Location</Button>
                        </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
                </section>
                <div className="LocationList">
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
                <td>{row.attributes.name}</td>,
                <td>Parent name here</td>,
                <td>Type Here</td>,
                <td>{row.attributes.description}</td>,
            ]
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