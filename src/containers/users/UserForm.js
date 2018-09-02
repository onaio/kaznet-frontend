import React, { Component } from "react";
import { Formik } from "formik";
import Yup from "yup";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Col, Input, Button, Label } from "reactstrap";

import * as errorHandlerSelectors from "../../store/errorHandler/reducer";

const transformMyApiErrors = function(array) {
  const errors = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split("/").pop();

    if (field === "username") {
      errors.ona_username = msg;
    }
    errors[field] = msg;
  }

  return errors;
};

function getValidationSchema(values) {
  return Yup.object().shape({
    national_id: Yup.string().required("National ID is required."),
    ona_username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required."),
    email: Yup.string().email("E-mail is not valid!"),
    confirmation: Yup.string()
      .oneOf([values.password], "Passwords don't match!")
      .required("Password confirmation is required!")
  });
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    };
  }, {});
}

function validate(getValidationSchema) {
  return values => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
}

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.targetId = props.targetId || null;
    this.renderLink = props.redirectAfterAction;
  }

  redirect(link) {
    return <Redirect to={link} />;
  }

  render() {
    return (
      <Formik
        initialValues={this.props.initialData}
        validate={validate(getValidationSchema)}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const payload = {
            data: {
              type: "UserProfile",
              id: this.targetId !== null ? this.targetId : null,
              attributes: {
                first_name: values.first_name,
                last_name: values.last_name,
                role: values.role,
                national_id: values.national_id,
                ona_username: values.ona_username,
                password: values.password,
                gender: values.gender,
                expertise: values.expertise,
                email: values.email,
                payment_number: values.payment_number,
                phone_number: values.phone_number
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
          setStatus
        }) => (
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="row">
                <Col sm="6">
                  <Input
                    name="last_name"
                    type="text"
                    bsSize="lg"
                    placeholder="Last Name"
                    aria-label="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    className={errors.last_name ? "is-invalid" : ""}
                  />
                  {errors.last_name && (
                    <div className="invalid-feedback">{errors.last_name}</div>
                  )}
                </Col>
                <Col sm="6">
                  <Input
                    name="first_name"
                    type="text"
                    bsSize="lg"
                    placeholder="First Name"
                    aria-label="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    className={errors.first_name ? "is-invalid" : ""}
                  />
                  {errors.first_name && (
                    <div className="invalid-feedback">{errors.first_name}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="role">Role</Label>
                </Col>
                <Col md="3">
                  <Input
                    name="role"
                    type="radio"
                    aria-label="admin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.role === "1"}
                    value="1"
                    className={errors.role ? "is-invalid" : ""}
                  />{" "}
                  Admin
                </Col>
                <Col md="3">
                  <Input
                    name="role"
                    type="radio"
                    aria-label="contributor"
                    checked={values.role === "2"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value="2"
                    className={errors.role ? "is-invalid" : ""}
                  />{" "}
                  Contributor
                </Col>
              </FormGroup>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
              <FormGroup className="row">
                <Col md="3">
                  <Label for="national_id">National ID*</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="national_id"
                    type="text"
                    aria-label="national_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.national_id}
                    className={errors.national_id ? "is-invalid" : ""}
                  />
                  {errors.national_id && (
                    <div className="invalid-feedback">{errors.national_id}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="ona_username">Username*</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="ona_username"
                    type="text"
                    aria-label="ona_username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ona_username}
                    className={errors.ona_username ? "is-invalid" : ""}
                  />
                  {errors.ona_username && (
                    <div className="invalid-feedback">
                      {errors.ona_username}
                    </div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="password">Password*</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="password"
                    type="password"
                    aria-label="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={errors.password ? "is-invalid" : ""}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="confirmation">Confirm Password*</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="confirmation"
                    type="password"
                    aria-label="confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmation}
                    className={errors.confirmation ? "is-invalid" : ""}
                  />
                  {errors.confirmation && (
                    <div className="invalid-feedback">
                      {errors.confirmation}
                    </div>
                  )}
                </Col>
              </FormGroup>

              <h4 className="title"> DETAILS </h4>

              <FormGroup className="row">
                <Col md="3">
                  <Label for="gender">Gender</Label>
                </Col>
                <Col md="2">
                  <Input
                    name="gender"
                    type="radio"
                    aria-label="male"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value="0"
                    checked={values.gender === "0"}
                    className={errors.gender ? "is-invalid" : ""}
                  />{" "}
                  Male
                </Col>
                <Col md="2">
                  <Input
                    name="gender"
                    type="radio"
                    aria-label="female"
                    onChange={handleChange}
                    value="1"
                    checked={values.gender === "1"}
                    onBlur={handleBlur}
                    className={errors.gender ? "is-invalid" : ""}
                  />{" "}
                  Female
                </Col>
                <Col md="2">
                  <Input
                    name="gender"
                    type="radio"
                    aria-label="other"
                    onChange={handleChange}
                    value="2"
                    checked={values.gender === "2"}
                    onBlur={handleBlur}
                    className={errors.gender ? "is-invalid" : ""}
                  />{" "}
                  Other
                </Col>
              </FormGroup>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
              <FormGroup className="row">
                <Col md="3">
                  <Label for="address">Address</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="address"
                    type="textarea"
                    aria-label="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className={errors.address ? "is-invalid" : ""}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm="3">
                  <Label for="experties">Level of experties</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="expertise"
                    type="select"
                    bsSize="lg"
                    placeholder="Expertise"
                    aria-label="required expertise"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expertise != null ? values.expertise : "1"}
                    className={errors.required_expertise ? "is-invalid" : ""}
                  >
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                    <option value="4">Expert</option>
                  </Input>
                  {errors.expertise && (
                    <div className="invalid-feedback">{errors.expertise}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="email">Email</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="email"
                    type="email"
                    aria-label="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={errors.email ? "is-invalid" : ""}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="payment_no">MPESA No.</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="payment_number"
                    type="text"
                    aria-label="payment_number"
                    placeholder="+254 722 000 000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_number}
                    className={errors.payment_number ? "is-invalid" : ""}
                  />
                  {errors.payment_number && (
                    <div className="invalid-feedback">
                      {errors.payment_number}
                    </div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col md="3">
                  <Label for="number">Mobile number</Label>
                </Col>
                <Col md="9">
                  <Input
                    name="phone_number"
                    type="text"
                    aria-label="phone_number"
                    placeholder="+254 722 000 000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    className={errors.phone_number ? "is-invalid" : ""}
                  />
                  {errors.phone_number && (
                    <div className="invalid-feedback">
                      {errors.phone_number}
                    </div>
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
                    {isSubmitting ? "Creating" : "Add User"}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            {status === "done" && <Redirect to={"/users"} />}
          </div>
        )}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      formActionDispatch: ownProps.action
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
