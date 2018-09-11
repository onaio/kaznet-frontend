import _ from "lodash";
import React, { Component } from "react";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AsyncSelect from "react-select/lib/Async";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Button,
  Label,
  FormText
} from "reactstrap";

import { OptionMap } from "../Select";
import * as locationActions from "../../store/locations/actions";
import * as locationTypeActions from "../../store/locationTypes/actions";
import * as locationSelectors from "../../store/locations/reducer";
import * as locationTypeSelectors from "../../store/locationTypes/reducer";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as constants from "../../constants";

const transformMyApiErrors = function(array) {
  const errors = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split("/").pop();
    errors[field] = msg;
  }

  return errors;
};

export class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.targetId = props.targetId || null;
    this.getOptions.bind(this);
    this.loadOptions.bind(this);
    this.getOptions.bind(this);
  }

  componentDidMount() {
    this.props.fetchLocations();
    this.props.fetchLocationTypes();
  }

  getOptions() {
    return this.props.locationTypeOptions.asMutable();
  }

  loadOptions = (inputValue, callback) => {
    this.props.fetchLocationTypes(
      `${constants.API_ENDPOINT}/locationtypes/?search=${inputValue}`
    );
    setTimeout(() => {
      callback(this.getOptions());
    }, 10);
  };

  render() {
    return (
      <Formik
        initialValues={this.props.initialData}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const payload = {
            data: {
              type: "Location",
              id: this.targetId != null ? this.targetId : null,
              attributes: {
                name: values.name,
                description: values.description,
                parent: values.parent
                  ? { type: "Location", id: values.parent }
                  : undefined,
                location_type: values.location_type
                  ? { type: "LocationType", id: values.location_type.value }
                  : undefined,
                geopoint: _.toString(values.geopoint),
                radius: values.radius,
                shapefile: values.shapefile ? values.shapefile : undefined
              }
            }
          };

          try {
            this.props.formActionDispatch(payload, this.targetId).then(() => {
              setSubmitting(false);
              if (this.props.hasError) {
                setErrors(transformMyApiErrors(this.props.errorMessage));
              } else {
                setStatus("done");
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
                    className={errors.name ? "is-invalid" : ""}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
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
                    className={errors.description ? "is-invalid" : ""}
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
                <Col md="8">
                  <Input
                    name="parent"
                    type="select"
                    bsSize="lg"
                    placeholder="Parent Location"
                    aria-label="Parent Location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.parent}
                    className={errors.parent ? "is-invalid" : ""}
                  >
                    <OptionMap
                      obj={
                        this.props.targetId
                          ? _.omit(
                              this.props.locationsById,
                              this.props.targetId
                            )
                          : this.props.locationsById
                      }
                      titleField="name"
                    />
                  </Input>
                  {errors.parent && (
                    <div className="invalid-feedback">{errors.parent}</div>
                  )}
                </Col>
                <Col md="1">
                  <a href="/locations/new">
                    <Button type="button" className="btn my-1 btn-primary">
                      +
                    </Button>
                  </a>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="location_type">Location Type</Label>
                </Col>
                <Col md="8">
                  <AsyncSelect
                    name="location_type"
                    bsSize="lg"
                    placeholder="Select Location Type"
                    aria-label="Select Location Type"
                    value={values.location_type}
                    onChange={value => setFieldValue("location_type", value)}
                    onBlur={handleBlur}
                    defaultOptions={this.props.locationTypeOptions.asMutable()}
                    loadOptions={this.loadOptions}
                    isClearable
                    cacheOptions
                    className={errors.location_type ? "is-invalid" : ""}
                  />
                  {errors.location_type && (
                    <div className="invalid-feedback">
                      {errors.location_type}
                    </div>
                  )}
                </Col>
                <Col md="1">
                  <a href="/locationTypes/new">
                    <Button type="button" className="btn my-1 btn-primary">
                      +
                    </Button>
                  </a>
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
                    className={errors.geopoint ? "is-invalid" : ""}
                  />
                  <FormText color="muted">
                    The geopoint coordinates in "longitude,latitude" format
                  </FormText>
                  {errors.geopoint && (
                    <div className="invalid-feedback">{errors.geopoint}</div>
                  )}
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
                    className={errors.radius ? "is-invalid" : ""}
                  />
                  <FormText color="muted">
                    The radius from the geopoint in metres
                  </FormText>
                  {errors.radius && (
                    <div className="invalid-feedback">{errors.radius}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row my-5">
                <Col md={{ size: 5, offset: 1 }}>
                  <Button
                    className="btn btn-secondary btn-block"
                    onClick={() => {
                      setStatus("done");
                    }}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                </Col>
                <Col md={{ size: 5 }}>
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving" : "Save Location"}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            {status === "done" && <Redirect to={"/locations"} />}
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
    locationTypeOptions: locationTypeSelectors.getLocationTypeOptions(state)
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
