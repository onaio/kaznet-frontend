import React, { Component } from "react";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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

const transformMyApiErrors = function(array) {
  const errors = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split("/").pop();

    if (field === "target_id" || field === "target_content_type") {
      errors.form = "Please select a valid form.";
    }

    errors[field] = msg;
  }

  return errors;
};

export class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.targetId = props.targetId || null;
  }

  componentDidMount() {
    this.props.fetchLocations();
    this.props.fetchLocationTypes();
  }

  render() {
    return (
      <Formik
        initialValues={{
          name:
            this.props.initialData.name != null
              ? this.props.initialData.name
              : "",
          parent:
            this.props.initialData.parent != null
              ? this.props.initialData.parent
              : "",
          location_type:
            this.props.initialData.location_type != null
              ? this.props.initialData.location_type
              : "",
          geopoint:
            this.props.initialData.geopoint != null
              ? this.props.initialData.geopoint
              : "",
          radius:
            this.props.initialData.radius != null
              ? this.props.initialData.radius
              : "",
          shapefile: ""
        }}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const payload = {
            data: {
              type: "Location",
              id: this.targetId != null ? this.targetId : null,
              attributes: {
                name: values.name,
                description: values.description,
                parent:
                  values.parent != null
                    ? { type: "Location", id: values.parent }
                    : undefined,
                location_type:
                  values.location_type != null
                    ? { type: "LocationType", id: values.location_type }
                    : undefined,
                geopoint: values.geopoint,
                radius: values.radius,
                shapefile: values.shapefile
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
          isSubmitting
        }) => (
          <div>
            <Form onSubmit={handleSubmit}>
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
                <Col md="9">
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
                <Col md="9">
                  <Input
                    name="parent"
                    type="select"
                    bsSize="lg"
                    placeholder="Parent Location"
                    aria-label="Parent Location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.parentLocation}
                    className={errors.parent ? "is-invalid" : ""}
                  >
                    <OptionMap
                      obj={this.props.parentLocationChoicesById}
                      titleField="name"
                    />
                  </Input>
                  {errors.parent && (
                    <div className="invalid-feedback">{errors.parent}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="location_type">Location Type</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="location_type"
                    type="select"
                    bsSize="lg"
                    placeholder="Location Type"
                    aria-label="Location Type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location_type}
                    className={errors.location_type ? "is-invalid" : ""}
                  >
                    <OptionMap
                      obj={this.props.locationTypesById}
                      titleField="name"
                    />
                  </Input>
                  {errors.location_type && (
                    <div className="invalid-feedback">
                      {errors.location_type}
                    </div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="geopoint">Geopoint</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="geopoint"
                    type="text"
                    bsSize="lg"
                    placeholder="Geopoint"
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
                <Col md="9">
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
                    The radius from the geopoint
                  </FormText>
                  {errors.radius && (
                    <div className="invalid-feedback">{errors.radius}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="shapefile">Shapefile</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="shapefile"
                    type="file"
                    bsSize="lg"
                    placeholder="Shapefile"
                    aria-label="Shapefile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.shapefile}
                    className={errors.shapefile ? "is-invalid" : ""}
                  />
                  <FormText color="muted">
                    The shapefile of the location
                  </FormText>
                  {errors.shapefile && (
                    <div className="invalid-feedback">{errors.shapefile}</div>
                  )}
                </Col>
              </FormGroup>
              <Button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving" : "Save Location"}
              </Button>
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
    parentLocationChoicesById: locationSelectors.getParentLocationChoicesById(
      state
    ),
    locationTypesById: locationTypeSelectors.getLocationTypesById(state)
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
