import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import AsyncSearch from "./AsyncSearch";
import {
  Form,
  Input,
  Button,
  FormGroup,
  Col,
  Row,
  Label,
  FormText
} from "reactstrap";
import moment from "moment";
import "react-rrule-generator/build/styles.css";
import RRuleGenerator from "react-rrule-generator";
import { Redirect } from "react-router-dom";
import { OptionMap } from "../Select";

import "./TaskForm.css";
import * as clientActions from "../../store/clients/actions";
import * as locationActions from "../../store/locations/actions";
import * as formActions from "../../store/forms/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as contentTypeActions from "../../store/contentTypes/actions";
import * as clientSelectors from "../../store/clients/reducer";
import * as locationSelectors from "../../store/locations/reducer";
import * as formSelectors from "../../store/forms/reducer";
import * as contentTypeSelectors from "../../store/contentTypes/reducer";
import "../LoadListAnimation.css";
import * as constants from "../../constants.js";

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

export class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.targetId = props.targetId || null;
    this.state = {
      locations: [
        {
          name: "",
          payload: {
            location: {
              type: "Location",
              id: null
            },
            timing_rule: "FREQ=DAILY;INTERVAL=1;COUNT=1",
            start: "09:00",
            end: "17:00"
          }
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddLocation = this.handleAddLocation.bind(this);
    this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
  }

  componentWillMount() {
    if (this.props.task) {
      const locations = this.props.task.attributes.task_locations;
      const locArray = locations.map(l => {
        return {
          name: l.location.id,
          payload: {
            location: {
              type: "Location",
              id: l.location.id
            },
            timing_rule: l.timing_rule,
            start: l.start,
            end: l.end
          }
        };
      });
      this.setState({
        locations: locArray
      });
    }
  }

  async componentDidMount() {
    await this.props.fetchForms(`${constants.API_ENDPOINT}/forms/`);
    this.props.fetchClients();
    this.props.fetchLocations();
    this.props.fetchContentTypes();
  }

  handleAddLocation = () => {
    this.setState({
      locations: this.state.locations.concat([
        {
          name: "",
          payload: {
            location: {
              type: "Location",
              id: null
            },
            timing_rule: "FREQ=DAILY;INTERVAL=1;COUNT=1",
            start: "09:00",
            end: "17:00"
          }
        }
      ])
    });
  };

  handleRemoveLocation = index => () => {
    this.setState({
      locations: this.state.locations.filter(
        (_, locIndex) => index !== locIndex
      )
    });
  };

  handleChange = index => e => {
    debugger;
    const start = e.target && e.target.name === "tasklocation_start";
    const end = e.target && e.target.name === "tasklocation_end";
    const location = e.target && e.target.name === "tasklocation_location";

    const newLocations = this.state.locations.map((loc, locIndex) => {
      if (index !== locIndex) {
        return loc;
      }

      return {
        ...loc,
        name: location ? e.target && e.target.value : loc.name,
        payload: {
          location: {
            type: "Location",
            id: location ? e.target.value : loc.payload.location.id
          },
          timing_rule: !e.target ? e : loc.payload.timing_rule,
          start: start ? e.target.value : loc.payload.start,
          end: end ? e.target.value : loc.payload.end
        }
      };
    });

    this.setState({
      locations: newLocations
    });
  };

  render() {
    if (
      Object.keys(this.props.locationsById).length === 0 &&
      this.props.locationsById.constructor === Object &&
      Object.keys(this.props.clientsById).length === 0 &&
      this.props.clientsById.constructor === Object
    )
      return this.renderLoading();
    return (
      <Formik
        initialValues={this.props.initialData}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const self = this;
          const locations_input = self.state.locations.map(d => d.payload);

          const payload = {
            data: {
              type: "Task",
              id: this.targetId !== null ? this.targetId : null,
              attributes: {
                name: values.name,
                estimated_time: values.estimated_time * 60,
                required_expertise: values.required_expertise,
                description: values.description,
                start: moment(values.start).format("YYYY-MM-DD") + "T12:00",
                end: moment(values.end).format("YYYY-MM-DD") + "T12:00",
                timing_rule: undefined,
                total_submission_target: undefined,
                user_submission_target:
                  (values.user_submission_target !== null) &
                  (values.user_submission_target !== "")
                    ? values.user_submission_target
                    : undefined,
                status:
                  values.status !== this.props.initialData.status
                    ? values.status
                    : this.props.initialData.status,
                target_id:
                  values.form !== null && values.form !== ""
                    ? values.form
                    : undefined,
                target_content_type: this.props.formContentTypeId,
                amount:
                  values.amount != null && values.amount !== ""
                    ? values.amount
                    : undefined,
                client:
                  values.client !== null && values.client !== ""
                    ? { type: "Client", id: values.client }
                    : undefined,
                locations_input: locations_input
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
          touched,
          status,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setStatus
        }) => {
          console.log("errors", errors);
          console.log("values", values);
          return (
            <div>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="row">
                  <Col sm="12">
                    <Input
                      name="name"
                      type="text"
                      bsSize="lg"
                      placeholder="Title"
                      aria-label="title"
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
                    <Label for="status">Status</Label>
                  </Col>
                  <Col md="6">
                    <Input
                      name="status"
                      type="select"
                      bsSize="lg"
                      placeholder="Status"
                      aria-label="status"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status}
                      className={errors.status ? "is-invalid" : ""}
                    >
                      <option>----</option>
                      <option value="d">Draft</option>
                      <option value="a">Active</option>
                    </Input>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="description">Description</Label>
                  </Col>
                  <Col md="6">
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
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="amount">Reward</Label>
                  </Col>
                  <Col md="6">
                    <Input
                      name="amount"
                      type="number"
                      bsSize="lg"
                      placeholder="Reward"
                      aria-label="reward"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                      className={errors.amount ? "is-invalid" : ""}
                    />
                    <FormText color="muted">
                      The reward paid for successful submissions.
                    </FormText>
                    {errors.amount && (
                      <div className="invalid-feedback">{errors.amount}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="form">Form</Label>
                  </Col>
                  <Col md={{ size: 6 }}>
                    <AsyncSearch type={"forms"} handleChange={handleChange} />
                    {errors.form && (
                      <div className="invalid-feedback">{errors.form}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="start">Active dates</Label>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="5">
                        <Input
                          name="start"
                          type="date"
                          bsSize="lg"
                          placeholder="Start Date"
                          aria-label="start"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start}
                          className={`time-picker ${
                            errors.start ? "is-invalid" : ""
                          }`}
                        />
                        {touched.start &&
                          errors.start && (
                            <div className="invalid-feedback">
                              {errors.start}
                            </div>
                          )}
                      </Col>
                      <Col md="2">
                        <p className="text-center align-middle">to</p>
                      </Col>
                      <Col md="5">
                        <Input
                          name="end"
                          type="date"
                          bsSize="lg"
                          placeholder="End Date"
                          aria-label="end"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.end}
                          className={`time-picker ${
                            errors.end ? "is-invalid" : ""
                          }`}
                        />
                        {errors.end && (
                          <div className="invalid-feedback">{errors.end}</div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>

                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="estimated_time">
                      Estimated time to complete task
                    </Label>
                  </Col>
                  <Col md="6">
                    <Input
                      name="estimated_time"
                      type="number"
                      bsSize="lg"
                      placeholder="Estimated Time"
                      aria-label="estimated time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.estimated_time}
                      className={errors.estimated_time ? "is-invalid" : ""}
                    />
                    <FormText color="muted">
                      The esitmated time that a contributor would take to
                      complete the task, in minutes.
                    </FormText>
                    {errors.estimated_time && (
                      <div className="invalid-feedback">
                        {errors.estimated_time}
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <h4>Location</h4>

                {this.state.locations.map((loc, i) => {
                  return (
                    <div className="tasklocation-item" key={i}>
                      <FormGroup className="row">
                        <Col sm={{ size: 3 }}>
                          <Label for="tasklocation_location">Location</Label>
                        </Col>
                        <Col md="9">
                          {
                            <Row id={loc} key={i}>
                              <Col md={{ size: 6 }}>
                                <AsyncSearch
                                  type={"locations"}
                                  handleChange={handleChange}
                                />
                                {errors.locations_input && (
                                  <div className="invalid-feedback">
                                    {errors.locations_input.location &&
                                      errors.locations_input.location[0]}
                                  </div>
                                )}
                              </Col>
                            </Row>
                          }
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Col sm="3">
                          <Label for="tasklocation_start">Hours</Label>
                        </Col>
                        <Col md="6">
                          <Row>
                            <Col md="5">
                              <Input
                                name="tasklocation_start"
                                type="time"
                                bsSize="lg"
                                placeholder="Start"
                                aria-label="start"
                                onChange={this.handleChange(i)}
                                onBlur={handleBlur}
                                value={loc.payload.start || ""}
                                className={`time-picker ${
                                  errors.tasklocation_start
                                    ? "location is-invalid"
                                    : ""
                                }`}
                                required={true}
                              />
                              {touched.tasklocation_start &&
                                errors.tasklocation_start && (
                                  <div className="invalid-feedback">
                                    {errors.tasklocation_start}
                                  </div>
                                )}
                            </Col>
                            <Col md="2">
                              <p className="text-center align-middle">to</p>
                            </Col>
                            <Col md="5">
                              <Input
                                name="tasklocation_end"
                                type="time"
                                bsSize="lg"
                                placeholder="End"
                                aria-label="end"
                                onChange={this.handleChange(i)}
                                onBlur={handleBlur}
                                value={loc.payload.end || ""}
                                className={`time-picker ${
                                  errors.tasklocation_end
                                    ? "location is-invalid"
                                    : ""
                                }`}
                                required={true}
                              />
                              {errors.tasklocation_end && (
                                <div className="invalid-feedback">
                                  {errors.tasklocation_end}
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Col sm="3">
                          <Label for="tasklocation_timing_rule">
                            Timing Rule
                          </Label>
                        </Col>
                        <Col md="9">
                          <Input
                            name="tasklocation_timing_rule"
                            type="hidden"
                            bsSize="lg"
                            placeholder="Timing Rule"
                            aria-label="timing rule"
                            onChange={this.handleChange(i)}
                            onBlur={handleBlur}
                            value={loc.payload.timing_rule || ""}
                            className={
                              errors.tasklocation_timing_rule
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {errors.tasklocation_timing_rule && (
                            <div className="invalid-feedback">
                              {errors.tasklocation_timing_rule}
                            </div>
                          )}

                          <RRuleGenerator
                            onChange={this.handleChange(i)}
                            value={loc.payload.timing_rule}
                          />
                        </Col>
                      </FormGroup>
                    </div>
                  );
                })}
                <FormGroup className="row">
                  <Col md={{ size: 4, offset: 4 }}>
                    <Button
                      className="btn btn-primary btn-block add-location"
                      onClick={this.handleAddLocation}
                    >
                      + Add Locations
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="client">Client</Label>
                  </Col>
                  <Col md={{ size: 6 }}>
                    <AsyncSearch handleChange={handleChange} type={"clients"} />
                    {errors.client && (
                      <div className="invalid-feedback">{errors.client}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="user_submission_target">
                      Submission limit (per contributor)
                    </Label>
                  </Col>
                  <Col md="6">
                    <Input
                      name="user_submission_target"
                      type="number"
                      bsSize="lg"
                      placeholder="Contributor Submission Target"
                      aria-label="contributor submission target"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.user_submission_target}
                      className={
                        errors.user_submission_target ? "is-invalid" : ""
                      }
                    />
                    {errors.user_submission_target && (
                      <div className="invalid-feedback">
                        {errors.user_submission_target}
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="required_expertise">
                      Minimum contributor level
                    </Label>
                  </Col>
                  <Col md="6">
                    <Input
                      name="required_expertise"
                      type="select"
                      bsSize="lg"
                      placeholder="Required Expertise"
                      aria-label="required expertise"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.required_expertise}
                      className={errors.required_expertise ? "is-invalid" : ""}
                    >
                      <option>----</option>
                      <option value="1">Beginner</option>
                      <option value="2">Intermediate</option>
                      <option value="3">Advanced</option>
                      <option value="4">Expert</option>
                    </Input>
                    {errors.required_expertise && (
                      <div className="invalid-feedback">
                        {errors.required_expertise}
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
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
                      {isSubmitting ? "Submitting" : "Submit"}
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
              {status === "done" && (
                <Redirect to={this.props.redirectAfterAction} />
              )}
            </div>
          );
        }}
      />
    );
  }
  renderLoading() {
    return (
      <center>
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </center>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state, ownProps) {
  return {
    clientsById: clientSelectors.getClientsById(state),
    locationsById: locationSelectors.getLocationsById(state),
    unusedFormsById: formSelectors.getUnusedFormsById(state),
    currentForm: formSelectors.getFormById(state, ownProps.initialData.form),
    formContentTypeId: contentTypeSelectors.getFormContentType(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state),
    selectedLocation: locationSelectors.getLocationSelectedOption(state),
    selectedForm: formSelectors.getFormSelectedOption(state),
    selectedClient: clientSelectors.getClientSelectedOption(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      formActionDispatch: ownProps.action,
      fetchClients: clientActions.fetchClients,
      fetchLocations: locationActions.fetchLocations,
      fetchForms: formActions.fetchForms,
      fetchContentTypes: contentTypeActions.fetchContentTypes
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
