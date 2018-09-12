import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, FieldArray, Field } from "formik";
import AsyncSelect from "react-select/lib/Async";
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
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { OptionMap } from "../Select";

import "../LoadListAnimation.css";
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
import { ONA_PROFILE_URL } from "../../constants";
import * as constants from "../../constants";

const transformMyApiErrors = function(array) {
  const errors = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split("/").pop();

    if (field === "target_id" || field === "target_content_type") {
      errors.form = "Please select a valid form.";
    }

    if (field === "locations_input") {
      errors.taskLocations = msg;
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

    this.getClientOptions.bind(this);
    this.loadClientOptions.bind(this);
    this.getFormOptions.bind(this);
    this.loadFormOptions.bind(this);
    this.getLocationOptions.bind(this);
    this.loadLocationOptions.bind(this);
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

  componentDidMount() {
    this.props.fetchForms();
    this.props.fetchClients();
    this.props.fetchLocations();
    this.props.fetchContentTypes();
  }

  getClientOptions() {
    return this.props.clientOptions.asMutable();
  }

  loadClientOptions = (inputValue, callback) => {
    this.props.fetchClients(
      `${constants.API_ENDPOINT}/clients/?search=${inputValue}`
    );
    setTimeout(() => {
      callback(this.getClientOptions());
    }, constants.ASYNC_SEARCH_TIMEOUT);
  };

  getFormOptions() {
    return this.props.formOptions.asMutable();
  }

  loadFormOptions = (inputValue, callback) => {
    this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?search=${inputValue}&has_task=false`
    );
    setTimeout(() => {
      callback(this.getFormOptions());
    }, constants.ASYNC_SEARCH_TIMEOUT);
  };

  getLocationOptions() {
    return this.props.locationOptions.asMutable();
  }

  loadLocationOptions = (inputValue, callback) => {
    this.props.fetchLocations(
      `${constants.API_ENDPOINT}/locations/?search=${inputValue}`
    );
    setTimeout(() => {
      callback(this.getLocationOptions());
    }, constants.ASYNC_SEARCH_TIMEOUT);
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
          const locations_input = values.taskLocations.map(d => ({
            location: d.location
              ? { type: "Location", id: d.location.value }
              : undefined,
            timing_rule: d.timing_rule,
            start: d.start,
            end: d.end
          }));

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
                target_id: values.form ? values.form.value : undefined,
                target_content_type: this.props.formContentTypeId,
                amount:
                  values.amount != null && values.amount !== ""
                    ? values.amount
                    : undefined,
                client: values.client
                  ? { type: "Client", id: values.client.value }
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
          setStatus,
          setFieldValue
        }) => (
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
                <Col sm={{ size: 3 }}>
                  <Label for="status">Status</Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                    disabled={this.targetId != null ? false : true}
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
                <Col sm={{ size: 3 }}>
                  <Label for="description">Description</Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                <Col sm={{ size: 3 }}>
                  <Label for="amount">Reward</Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                <Col sm={{ size: 3 }}>
                  <Label for="form">Form</Label>
                </Col>
                <Col
                  md={{ size: 9 }}
                  className={
                    errors.form
                      ? "is-invalid is-invalid async-select-container"
                      : "async-select-container"
                  }
                >
                  <AsyncSelect
                    name="form"
                    bsSize="lg"
                    placeholder="Select Form"
                    aria-label="Select Form"
                    value={values.form}
                    onChange={value => setFieldValue("form", value)}
                    onBlur={handleBlur}
                    defaultOptions={this.props.formOptions.asMutable()}
                    loadOptions={this.loadFormOptions}
                    isClearable
                    cacheOptions
                    className={
                      errors.form ? "is-invalid async-select" : "async-select"
                    }
                  />
                  {errors.form && (
                    <div className="invalid-feedback">{errors.form}</div>
                  )}
                </Col>
                <Col md="3ss">
                  <Button
                    className="btn btn-light btn-sm white my-2"
                    color="secondary"
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={ONA_PROFILE_URL}
                      className="kaznet-action-links"
                    >
                      <FontAwesomeIcon icon="external-link-alt" />&nbsp; GO TO
                      ONA FORM
                    </a>
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="start">Active dates</Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                          <div className="invalid-feedback">{errors.start}</div>
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
                <Col sm={{ size: 3 }}>
                  <Label for="estimated_time">
                    Estimated time to complete task
                  </Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                    The esitmated time that a contributor would take to complete
                    the task, in minutes.
                  </FormText>
                  {errors.estimated_time && (
                    <div className="invalid-feedback">
                      {errors.estimated_time}
                    </div>
                  )}
                </Col>
              </FormGroup>

              <h4 className="mt-5">Location</h4>

              <FieldArray
                name="taskLocations"
                render={arrayHelpers => (
                  <div>
                    {values.taskLocations &&
                      values.taskLocations.length > 0 &&
                      values.taskLocations.map((friend, index) => (
                        <div
                          className="tasklocation-item position-relative"
                          key={index}
                        >
                          {values.taskLocations &&
                            values.taskLocations.length > 1 && (
                              <button
                                type="button"
                                className="close position-absolute locationClose"
                                aria-label="Close"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            )}

                          <FormGroup className="row mt-3">
                            <Col sm={{ size: 3 }}>
                              <Label for={`taskLocations[${index}]location`}>
                                Location
                              </Label>
                            </Col>
                            <Col md={{ size: 9 }}>
                              {
                                <Row key={index}>
                                  <Col
                                    md={{ size: 12 }}
                                    className={
                                      errors.taskLocations &&
                                      errors.taskLocations.location
                                        ? "is-invalid async-select-container"
                                        : "async-select async-select-container"
                                    }
                                  >
                                    <AsyncSelect
                                      name={`taskLocations[${index}]location`}
                                      bsSize="lg"
                                      placeholder="Select Location"
                                      aria-label="Select Location"
                                      defaultOptions={this.props.locationOptions.asMutable()}
                                      loadOptions={this.loadLocationOptions}
                                      onChange={value =>
                                        setFieldValue(
                                          `taskLocations.${index}.location`,
                                          value
                                        )
                                      }
                                      isClearable
                                      cacheOptions
                                      className={
                                        errors.taskLocations &&
                                        errors.taskLocations.location
                                          ? "is-invalid async-select"
                                          : "async-select"
                                      }
                                      required
                                      value={
                                        values.taskLocations[index]
                                          ? values.taskLocations[index].location
                                          : ""
                                      }
                                    />
                                    {errors.taskLocations &&
                                      errors.taskLocations.location &&
                                      errors.taskLocations.location[0] && (
                                        <div className="invalid-feedback">
                                          {errors.taskLocations.location[0]}
                                        </div>
                                      )}
                                  </Col>
                                </Row>
                              }
                            </Col>
                          </FormGroup>

                          <FormGroup className="row">
                            <Col sm={{ size: 3 }}>
                              <Label for={`taskLocations[${index}]start`}>
                                Hours
                              </Label>
                            </Col>
                            <Col md="9">
                              <Row>
                                <Col md="5">
                                  <Field
                                    name={`taskLocations[${index}]start`}
                                    type="time"
                                    placeholder="Start"
                                    aria-label="Start"
                                    className={
                                      errors.taskLocations &&
                                      errors.taskLocations.start
                                        ? "is-invalid time-picker form-control form-control-lg"
                                        : "time-picker form-control form-control-lg"
                                    }
                                    required={true}
                                    value={
                                      values.taskLocations[index]
                                        ? values.taskLocations[index].start
                                        : ""
                                    }
                                  />
                                  {errors.taskLocations &&
                                    errors.taskLocations.start &&
                                    errors.taskLocations.start[0] && (
                                      <div className="invalid-feedback">
                                        {errors.taskLocations.end[0]}
                                      </div>
                                    )}
                                </Col>
                                <Col md="2">
                                  <p className="text-center align-middle">to</p>
                                </Col>
                                <Col md="5">
                                  <Field
                                    name={`taskLocations[${index}]end`}
                                    type="time"
                                    placeholder="End"
                                    aria-label="End"
                                    className={
                                      errors.taskLocations &&
                                      errors.taskLocations.end
                                        ? "is-invalid time-picker form-control form-control-lg"
                                        : "time-picker form-control form-control-lg"
                                    }
                                    required={true}
                                    value={
                                      values.taskLocations[index]
                                        ? values.taskLocations[index].end
                                        : ""
                                    }
                                  />
                                  {errors.taskLocations &&
                                    errors.taskLocations.end &&
                                    errors.taskLocations.end[0] && (
                                      <div className="invalid-feedback">
                                        {errors.taskLocations.end[0]}
                                      </div>
                                    )}
                                </Col>
                              </Row>
                            </Col>
                          </FormGroup>

                          <FormGroup className="row">
                            <Col sm={{ size: 3 }}>
                              <Label for={`taskLocations[${index}]timing_rule`}>
                                Timing Rule
                              </Label>
                            </Col>
                            <Col md="9">
                              <Field
                                name={`taskLocations[${index}]timing_rule`}
                                type="hidden"
                                placeholder="Timing Rule"
                                aria-label="timing rule"
                                className={
                                  errors.taskLocations &&
                                  errors.taskLocations.timing_rule
                                    ? "is-invalid form-control form-control-lg"
                                    : "form-control form-control-lg"
                                }
                                value={
                                  values.taskLocations[index]
                                    ? values.taskLocations[index].timing_rule
                                    : ""
                                }
                              />
                              {errors.taskLocations &&
                                errors.taskLocations.timing_rule &&
                                errors.taskLocations.timing_rule[0] && (
                                  <div className="invalid-feedback">
                                    {errors.taskLocations.timing_rule[0]}
                                  </div>
                                )}
                              <RRuleGenerator
                                onChange={rrule =>
                                  setFieldValue(
                                    `taskLocations.${index}.timing_rule`,
                                    rrule
                                  )
                                }
                                value={
                                  values.taskLocations[index]
                                    ? values.taskLocations[index].timing_rule
                                    : ""
                                }
                              />
                            </Col>
                          </FormGroup>
                        </div>
                      ))}
                    <FormGroup className="row">
                      <Col md={{ size: 4, offset: 4 }}>
                        <Button
                          className="btn btn-primary btn-block add-location"
                          onClick={() =>
                            arrayHelpers.push({
                              start: constants.TASK_LOCATION_START,
                              end: constants.TASK_LOCATION_END,
                              timing_rule: constants.TASK_LOCATION_TIMING_RULE,
                              location: ""
                            })
                          }
                        >
                          + Add Locations
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                )}
              />

              <FormGroup className="row mt-5">
                <Col sm={{ size: 3 }}>
                  <Label for="client">Client</Label>
                </Col>
                <Col
                  md={{ size: 9 }}
                  className={
                    errors.client
                      ? "is-invalid async-select-container"
                      : "async-select-container"
                  }
                >
                  <AsyncSelect
                    name="client"
                    bsSize="lg"
                    placeholder="Select Client"
                    aria-label="Select Client"
                    value={values.client}
                    onChange={value => setFieldValue("client", value)}
                    onBlur={handleBlur}
                    defaultOptions={this.props.clientOptions.asMutable()}
                    loadOptions={this.loadClientOptions}
                    isClearable
                    cacheOptions
                    className={
                      errors.client ? "is-invalid async-select" : "async-select"
                    }
                  />
                  {errors.client && (
                    <div className="invalid-feedback">{errors.client}</div>
                  )}
                </Col>

                <Col md="3">
                  <a href="/clients/new">
                    <Button type="button" className="btn my-1 btn-primary">
                      +
                    </Button>
                  </a>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="user_submission_target">
                    Submission limit (per contributor)
                  </Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                <Col sm={{ size: 3 }}>
                  <Label for="required_expertise">
                    Minimum contributor level
                  </Label>
                </Col>
                <Col md={{ size: 9 }}>
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
                    <option value="">----</option>
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
              <FormGroup className="row mt-5">
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
        )}
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
    clientOptions: clientSelectors.getClientOptions(state),
    formOptions: formSelectors.getFormOptions(state),
    locationOptions: locationSelectors.getLocationOptions(state)
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
