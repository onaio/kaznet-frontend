import React from "react";
import { withFormik } from "formik";
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

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
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
        />
        {touched.name &&
          errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Col sm="3">
        <Label for="status">Status</Label>
      </Col>
      <Col md="9">
        <Input
          name="status"
          type="email"
          bsSize="lg"
          placeholder="status"
          aria-label="status"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
          className={errors.status ? "is-invalid" : ""}
        />
        {touched.status &&
          errors.status && (
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
        {touched.description &&
          errors.description && (
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
          value={values.status}
          className={errors.amount ? "is-invalid" : ""}
        />
        <FormText color="muted">
          The reward paid for successful submissions.
        </FormText>
        {touched.amount &&
          errors.amount && (
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
          type="email"
          bsSize="lg"
          placeholder="form"
          aria-label="form"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
          className={errors.form ? "is-invalid" : ""}
        />
        {touched.form &&
          errors.form && <div className="invalid-feedback">{errors.form}</div>}
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
            {touched.end &&
              errors.end && (
                <div className="invalid-feedback">{errors.end}</div>
              )}
          </Col>
        </Row>
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Col sm="3">
        <Label for="estimated_time">Estimated time to complete task</Label>
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
          The esitmated time that a contributor would take to complete the task,
          in minutes.
        </FormText>
        {touched.estimated_time &&
          errors.estimated_time && (
            <div className="invalid-feedback">{errors.estimated_time}</div>
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
          type="email"
          bsSize="lg"
          placeholder="client"
          aria-label="client"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.client}
          className={errors.client ? "is-invalid" : ""}
        />
        {touched.client &&
          errors.client && (
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
        {touched.user_submission_target &&
          errors.user_submission_target && (
            <div className="invalid-feedback">
              {errors.user_submission_target}
            </div>
          )}
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Col sm="3">
        <Label for="required_expertise">Minimum contributor level</Label>
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
        {touched.required_expertise &&
          errors.required_expertise && (
            <div className="invalid-feedback">{errors.required_expertise}</div>
          )}
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Col sm="3">
        <Label for="email">Email</Label>
      </Col>
      <Col md="9">
        <Input
          name="email"
          type="email"
          bsSize="lg"
          placeholder="Email"
          aria-label="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email ? "is-invalid" : "is-valid"}
        />
        {touched.email &&
          errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
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
);

// Wrap our form with the using withFormik HoC
const TaskForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: "", name: "" }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      data: {
        type: "Task",
        id: null,
        attributes: {
          name: values.name,
          // estimated_time: getEstimatedTime(values.estimated_time),
          required_expertise: values.required_expertise,
          description: values.description,
          // start: getDate(values.start),
          // end: getDate(values.end),
          // timing_rule: getRRule(),
          total_submission_target: null,
          user_submission_target: values.user_submission_target,
          status: values.status
          // target_id: getTargetId(),
          // target_content_type: getXFormContentType()
        },
        client: {
          type: "Client",
          id: values.client
        }
      }
    };

    setTimeout(() => {
      // submit them do the server. do whatever you like!
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 7000);
  }
})(InnerForm);

export default TaskForm;
