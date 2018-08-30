import React, { Component } from "react";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";

import * as errorHandlerSelectors from "../../store/errorHandler/reducer";

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

export class ClientForm extends Component {
  constructor(props) {
    super(props);

    this.targetId = props.targetId || null;
  }

  render() {
    return (
      <Formik
        initialValues={{
          name:
            this.props.initialData.name != null
              ? this.props.initialData.name
              : null
        }}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          const payload = {
            data: {
              type: "Client",
              id: this.targetId != null ? this.targetId : null,
              attributes: {
                name: values.name
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
                <Col sm="12">
                  <Input
                    name="name"
                    type="text"
                    bsSize="lg"
                    placeholder="Client Name"
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
                    {isSubmitting ? "Saving" : "Save Client"}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            {status === "done" && <Redirect to={"/clients"} />}
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

function mapDisptachToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      formActionDispatch: ownProps.action
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(ClientForm);
