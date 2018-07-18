import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
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
  }

  componentDidMount() {
    this.props.fetchForms();
    this.props.fetchClients();
    this.props.fetchLocations();
    this.props.fetchContentTypes();
  }

  render() {
    return (
      <Formik
        initialValues={this.props.initialData}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const locations_input = [
            {
              location: {
                type: "Location",
                id: values.tasklocation_location
              },
              timing_rule:
                values.tasklocation_timing_rule !== ""
                  ? values.tasklocation_timing_rule
                  : undefined,
              start: values.tasklocation_start,
              end: values.tasklocation_end
            }
          ];

          const payload = {
            data: {
              type: "Task",
              id: this.targetId != null ? this.targetId : null,
              attributes: {
                name: values.name,
                estimated_time: values.estimated_time * 60,
                required_expertise: values.required_expertise,
                description: values.description,
                start: moment(values.start).format("YYYY-MM-DD") + "T12:00",
                end: moment(values.end).format("YYYY-MM-DD") + "T12:00",
                timing_rule: undefined,
                total_submission_target: undefined,
                user_submission_target: values.user_submission_target,
                status:
                  values.status !== this.props.initialData.status
                    ? values.status
                    : this.props.initialData.status,
                target_id: values.form,
                target_content_type: this.props.formContentTypeId,
                amount: values.amount,
                client:
                  values.client != null
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
                <Col sm="3">
                  <Label for="status">Status</Label>
                </Col>
                <Col md="9">
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
                  <Label for="amount">Reward</Label>
                </Col>
                <Col md="9">
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
                <Col md="9">
                  <Input
                    name="form"
                    type="select"
                    bsSize="lg"
                    placeholder="Form"
                    aria-label="form"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.form}
                    className={errors.form ? "is-invalid" : ""}
                  >
                    <OptionMap
                      obj={this.props.unusedFormsById}
                      additionalObj={this.props.currentForm}
                      titleField="title"
                    />
                  </Input>
                  {errors.form && (
                    <div className="invalid-feedback">{errors.form}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="start">Active dates</Label>
                </Col>
                <Col md="9">
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
                        className={errors.start ? "is-invalid" : ""}
                      />
                      {touched.start &&
                        errors.start && (
                          <div className="invalid-feedback">{errors.start}</div>
                        )}
                    </Col>
                    <Col md="2">
                      <p>to</p>
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
                        className={errors.end ? "is-invalid" : ""}
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
                <Col md="9">
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
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="client">Client</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="client"
                    type="select"
                    bsSize="lg"
                    placeholder="Client"
                    aria-label="client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.client}
                    className={errors.client ? "is-invalid" : ""}
                  >
                    <OptionMap obj={this.props.clientsById} titleField="name" />
                  </Input>
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
                <Col md="9">
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
                <Col md="9">
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

              <h4>Location</h4>

              <div className="tasklocation-item">
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="tasklocation_location">Location</Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      name="tasklocation_location"
                      type="select"
                      bsSize="lg"
                      placeholder="Location"
                      aria-label="location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tasklocation_location}
                      className={
                        errors.tasklocation_location ? "is-invalid" : ""
                      }
                      required={true}
                    >
                      <OptionMap
                        obj={this.props.locationsById}
                        titleField="name"
                      />
                    </Input>
                    {errors.tasklocation_location && (
                      <div className="invalid-feedback">
                        {errors.tasklocation_location}
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Col sm="3">
                    <Label for="tasklocation_start">Hours</Label>
                  </Col>
                  <Col md="9">
                    <Row>
                      <Col md="5">
                        <Input
                          name="tasklocation_start"
                          type="time"
                          bsSize="lg"
                          placeholder="Start"
                          aria-label="start"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tasklocation_start}
                          className={
                            errors.tasklocation_start ? "is-invalid" : ""
                          }
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
                        <p>to</p>
                      </Col>
                      <Col md="5">
                        <Input
                          name="tasklocation_end"
                          type="time"
                          bsSize="lg"
                          placeholder="End"
                          aria-label="end"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tasklocation_end}
                          className={
                            errors.tasklocation_end ? "is-invalid" : ""
                          }
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
                    <Label for="tasklocation_timing_rule">Timing Rule</Label>
                  </Col>
                  <Col md="9">
                    <Input
                      name="tasklocation_timing_rule"
                      type="hidden"
                      bsSize="lg"
                      placeholder="Timing Rule"
                      aria-label="timing rule"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tasklocation_timing_rule}
                      className={
                        errors.tasklocation_timing_rule ? "is-invalid" : ""
                      }
                    />
                    {errors.tasklocation_timing_rule && (
                      <div className="invalid-feedback">
                        {errors.tasklocation_timing_rule}
                      </div>
                    )}

                    <RRuleGenerator
                      onChange={rrule =>
                        setFieldValue("tasklocation_timing_rule", rrule)
                      }
                      value={values.tasklocation_timing_rule}
                    />
                  </Col>
                </FormGroup>
              </div>

              <Button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Form>
            {status === "done" && (
              <Redirect to={this.props.redirectAfterAction} />
            )}
          </div>
        )}
      />
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
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
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
