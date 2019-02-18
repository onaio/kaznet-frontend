import _ from 'lodash';
import React, { Component } from 'react';
import { Formik } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import { Alert, Form, FormGroup, Col, Input, Button, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

import './LocationForm.css';

import * as locationActions from '../../store/locations/actions';
import * as locationTypeActions from '../../store/locationTypes/actions';
import * as locationSelectors from '../../store/locations/reducer';
import * as locationTypeSelectors from '../../store/locationTypes/reducer';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as constants from '../../constants';

const transformMyApiErrors = function(array) {
  const errors = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split('/').pop();
    errors[field] = msg;
  }

  return errors;
};

export class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapefile: null,
      uploading: false
    };
    this.targetId = props.targetId || null;
    this.getLocationTypeOptions.bind(this);
    this.loadLocationTypeOptions.bind(this);
    this.getParentOptions.bind(this);
    this.loadParentOptions.bind(this);
    this.onChangeShapefile = this.onChangeShapefile.bind(this);
  }

  onChangeShapefile(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (files.length) {
      this.createShapefile(files[0]);
    }
  }

  createShapefile(file) {
    const reader = new FileReader();
    reader.onloadstart = e => {
      this.setState({
        uploading: true
      });
    };
    reader.onloadend = e => {
      this.setState({
        uploading: false
      });
    };
    reader.onload = e => {
      this.setState({
        shapefile: new Uint8Array(e.target.result)
      });
    };
    reader.readAsArrayBuffer(file);
  }

  componentDidMount() {
    this.props.fetchLocations();
    this.props.fetchLocationTypes();
  }

  getLocationTypeOptions() {
    return this.props.locationTypeOptions.asMutable();
  }

  getParentOptions() {
    return this.props.parentOptions.asMutable();
  }

  loadLocationTypeOptions = (inputValue, callback) => {
    this.props.fetchLocationTypes(`${constants.API_ENDPOINT}/locationtypes/?search=${inputValue}`);
    setTimeout(() => {
      callback(this.getLocationTypeOptions());
    }, constants.ASYNC_SEARCH_TIMEOUT);
  };

  loadParentOptions = (inputValue, callback) => {
    this.props.fetchLocations(`${constants.API_ENDPOINT}/locations/?search=${inputValue}`);
    setTimeout(() => {
      callback(this.getParentOptions());
    }, constants.ASYNC_SEARCH_TIMEOUT);
  };

  render() {
    return (
      <Formik
        initialValues={this.props.initialData}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const payload = {
            data: {
              type: 'Location',
              id: this.targetId != null ? this.targetId : null,
              attributes: {
                name: values.name,
                description: values.description,
                parent: values.parent ? { type: 'Location', id: values.parent.value } : undefined,
                location_type: values.location_type
                  ? { type: 'LocationType', id: values.location_type.value }
                  : undefined,
                geopoint:
                  !this.state.shapefile && values.geopoint
                    ? _.toString(values.geopoint)
                    : undefined,
                radius: !this.state.shapefile && values.radius ? values.radius : undefined,
                shapefile: this.state.shapefile ? this.state.shapefile : undefined
              }
            }
          };

          try {
            this.props.formActionDispatch(payload, this.targetId).then(() => {
              setSubmitting(false);
              if (this.props.hasError) {
                setErrors(transformMyApiErrors(this.props.errorMessage));
              } else {
                setStatus('done');
              }
            });
          } catch (error) {
            console.error(error);
          }
        }}
        render={({
          values,
          errors,
          status,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setStatus,
          setFieldValue
        }) => (
          <div>
            {errors.data && <Alert color="danger">{errors.data}</Alert>}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormGroup className="row">
                <Col sm="12">
                  <Input
                    name="name"
                    type="text"
                    bsSize="lg"
                    placeholder="Location Name"
                    aria-label="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={errors.name ? 'is-invalid' : ''}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="description">Location Description</Label>
                </Col>
                <Col md="8">
                  <Input
                    name="description"
                    type="textarea"
                    cols="2"
                    bsSize="lg"
                    placeholder="Description"
                    aria-label="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className={errors.description ? 'is-invalid' : ''}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="parent">Parent Location</Label>
                </Col>
                <Col
                  md="8"
                  className={
                    errors.parent
                      ? 'is-invalid async-select-container'
                      : 'async-select async-select-container'
                  }
                >
                  <AsyncSelect
                    name="parent"
                    bsSize="lg"
                    placeholder="Select Parent Location"
                    aria-label="Select Parent Location"
                    value={values.parent}
                    onChange={value => setFieldValue('parent', value)}
                    onBlur={handleBlur}
                    defaultOptions={this.props.parentOptions.asMutable()}
                    loadOptions={this.loadParentOptions}
                    isClearable
                    cacheOptions
                    className={errors.parent ? 'is-invalid async-select' : 'async-select'}
                    classNamePrefix={errors.parent ? 'is-invalid async-select' : 'async-select'}
                  />
                  <FormText color="muted">{constants.ASYNC_FORM_TEXT}</FormText>
                  {errors.parent && <div className="invalid-feedback">{errors.parent}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="location_type">Location Type</Label>
                </Col>
                <Col
                  md="8"
                  className={
                    errors.location_type
                      ? 'is-invalid async-select-container'
                      : 'async-select async-select-container'
                  }
                >
                  <AsyncSelect
                    name="location_type"
                    bsSize="lg"
                    placeholder="Select Location Type"
                    aria-label="Select Location Type"
                    value={values.location_type}
                    onChange={value => setFieldValue('location_type', value)}
                    onBlur={handleBlur}
                    defaultOptions={this.props.locationTypeOptions.asMutable()}
                    loadOptions={this.loadLocationTypeOptions}
                    isClearable
                    cacheOptions
                    className={errors.location_type ? 'is-invalid async-select' : 'async-select'}
                    classNamePrefix={
                      errors.location_type ? 'is-invalid async-select' : 'async-select'
                    }
                  />
                  <FormText color="muted">{constants.ASYNC_FORM_TEXT}</FormText>
                  {errors.location_type && (
                    <div className="invalid-feedback">{errors.location_type}</div>
                  )}
                </Col>
                <Col md="1">
                  <Link to="/locationTypes/new">
                    <Button type="button" className="btn my-1 btn-sm btn-primary" aria-label="+">
                      +
                    </Button>
                  </Link>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="geopoint">Geopoint</Label>
                </Col>
                <Col md="8">
                  <Input
                    name="geopoint"
                    type="text"
                    bsSize="lg"
                    placeholder="longitude, latitude"
                    aria-label="Geopoint"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.geopoint}
                    className={errors.geopoint ? 'is-invalid' : ''}
                  />
                  <FormText color="muted">
                    The geopoint coordinates in "longitude,latitude" format
                  </FormText>
                  {errors.geopoint && <div className="invalid-feedback">{errors.geopoint}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="radius">Radius</Label>
                </Col>
                <Col md="8">
                  <Input
                    name="radius"
                    type="number"
                    bsSize="lg"
                    placeholder="Radius"
                    aria-label="Radius"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.radius}
                    className={errors.radius ? 'is-invalid' : ''}
                  />
                  <FormText color="muted">The radius from the geopoint in metres</FormText>
                  {errors.radius && <div className="invalid-feedback">{errors.radius}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="shapefile">Shapefile</Label>
                </Col>
                <Col md="8">
                  <Input
                    name="shapefile"
                    type="file"
                    bsSize="lg"
                    placeholder="Shapefile"
                    aria-label="Shapefile"
                    onChange={this.onChangeShapefile}
                    accept=".zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                    className={`custom-file-input ml-5 ${errors.shapefile ? 'is-invalid' : ''}`}
                  />
                  <label
                    className={
                      this.props.initialData.shapefile || this.state.shapefile
                        ? 'custom-file-label inactive-file-label'
                        : 'custom-file-label'
                    }
                  >
                    {this.props.initialData.shapefile || this.state.shapefile
                      ? values.name
                        ? [values.name, '.shp']
                        : 'Uploaded shapefile'
                      : 'Upload Shapefile'}
                  </label>
                  <FormText color="muted">The zipped file of the shapefile</FormText>
                  {errors.shapefile && <div className="invalid-feedback">{errors.shapefile}</div>}
                </Col>
                <Col md="1">{this.state.uploading && <div className="loader" />}</Col>
              </FormGroup>
              <FormGroup className="row my-5">
                <Col md={{ size: 5, offset: 1 }}>
                  <Button
                    className="btn btn-secondary btn-block"
                    aria-label="Cancel"
                    onClick={() => {
                      setStatus('done');
                    }}
                  >
                    {' '}
                    Cancel{' '}
                  </Button>
                </Col>
                <Col md={{ size: 5 }}>
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    aria-label="Save Location"
                    disabled={isSubmitting || this.state.uploading}
                  >
                    {isSubmitting ? 'Saving' : 'Save Location'}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            {status === 'done' && <Redirect to="/locations" />}
          </div>
        )}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state),
    locationsById: locationSelectors.getLocationsById(state),
    locationTypesById: locationTypeSelectors.getLocationTypesById(state),
    locationTypeOptions: locationTypeSelectors.getLocationTypeOptions(state),
    parentOptions: locationSelectors.getParentLocationOptions(state, ownProps.targetId)
  };
}

function mapDisptachToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      formActionDispatch: ownProps.action,
      fetchLocations: locationActions.fetchLocations,
      fetchLocationTypes: locationTypeActions.fetchLocationTypes
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(LocationForm);
