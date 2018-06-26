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

import { OptionMap } from "../Select";
import * as clientActions from "../../store/clients/actions";
import * as formActions from "../../store/forms/actions";
import * as contentTypeActions from "../../store/contentTypes/actions";
import * as clientSelectors from "../../store/clients/reducer";
import * as formSelectors from "../../store/forms/reducer";
import * as contentTypeSelectors from "../../store/contentTypes/reducer";
import TaskService from "../../services/tasks";

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

  console.log(errors);

  return errors;
};

export class TaskForm extends Component {
  componentDidMount() {
    this.props.fetchForms();
    this.props.fetchClients();
    this.props.fetchContentTypes();
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          estimated_time: "",
          start: moment().format("YYYY-MM-DD"),
          end: moment().format("YYYY-MM-DD"),
          description: "",
          required_expertise: "",
          timing_rule: "",
          status: "d",
          form: "",
          target_content_type: ""
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const payload = {
            data: {
              type: "Task",
              id: null,
              attributes: {
                name: values.name,
                // estimated_time: getEstimatedTime(values.estimated_time),
                required_expertise: values.required_expertise,
                description: values.description,
                start: moment(values.start).format("YYYY-MM-DD") + "T12:00",
                end: moment(values.end).format("YYYY-MM-DD") + "T12:00",
                // timing_rule: getRRule(),
                total_submission_target: null,
                user_submission_target: values.user_submission_target,
                status: values.status,
                target_id: values.form,
                target_content_type: this.props.formContentTypeId
              },
              client: {
                type: "Client",
                id: values.client
              }
            }
          };

          console.log(payload);

          try {
            TaskService.createTask(payload).then(function(results) {
              if (results.errors) {
                setErrors(transformMyApiErrors(results.errors));
              } else {
                setTimeout(() => {
                  // submit them do the server. do whatever you like!
                  alert(JSON.stringify(values, null, 2));
                }, 7000);
              }
              setSubmitting(false);
            });
          } catch (error) {
            console.error(error);
          }
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup className="row">
              <Col sm="12">
                <Input
                  name="name"
                  type="text"
                  bsSize="lg"
                  placeholder="title"
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
                  placeholder="status"
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
                  type="email"
                  bsSize="lg"
                  placeholder="description"
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
                  placeholder="reward"
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
                  placeholder="form"
                  aria-label="form"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.form}
                  className={errors.form ? "is-invalid" : ""}
                >
                  <OptionMap obj={this.props.formsById} titleField="title" />
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
                  <Col md="6">
                    <Input
                      name="start"
                      type="date"
                      bsSize="lg"
                      placeholder="start"
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
                  <Col md="6">
                    <Input
                      name="end"
                      type="date"
                      bsSize="lg"
                      placeholder="end"
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
                  placeholder="estimated time"
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
                  placeholder="client"
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
                  placeholder="contributor submission target"
                  aria-label="Status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_submission_target}
                  className={errors.user_submission_target ? "is-invalid" : ""}
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
                  type="email"
                  bsSize="lg"
                  placeholder="required expertise"
                  aria-label="required expertise"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.required_expertise}
                  className={errors.required_expertise ? "is-invalid" : ""}
                />
                {errors.required_expertise && (
                  <div className="invalid-feedback">
                    {errors.required_expertise}
                  </div>
                )}
              </Col>
            </FormGroup>
            <Button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Activating" : "Activate"}
            </Button>
          </Form>
        )}
      />
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    clientsById: clientSelectors.getClientsById(state),
    clientsIdArray: clientSelectors.getClientsIdArray(state),
    formsById: formSelectors.getFormsById(state),
    formsIdArray: formSelectors.getFormsIdArray(state),
    formContentTypeId: contentTypeSelectors.getFormContentType(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: clientActions.fetchClients,
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
