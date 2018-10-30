import React, { Component } from "react";
import { Col, Row, Input, FormGroup, Form, Button } from "reactstrap";
import { Formik, Field } from "formik";
import moment from "moment";
import * as constants from "../constants";

export default class ExportForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          start: moment().format("YYYY-MM-DD"),
          end: moment().format("YYYY-MM-DD"),
          status: constants.SUBMISSION_APPROVED
        }}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          this.props.onFormSubmit(values.start, values.end, values.status);
        }}
        render={({ values, handleChange, handleBlur, handleSubmit }) => (
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="row">
                <Row>
                  <p className="text-center align-middle ml-4">Status:</p>
                  <Col md={{ size: 8 }}>
                    <Field
                      name="status"
                      component="select"
                      className="form-control"
                    >
                      <option value={constants.SUBMISSION_APPROVED}>
                        Approved
                      </option>
                      <option value={constants.SUBMISSION_REJECTED}>
                        Rejected
                      </option>
                      <option value={constants.SUBMISSION_UNDER_REVIEW}>
                        Under Review
                      </option>
                      <option value={constants.SUBMISSION_PENDING}>
                        Pending
                      </option>
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <p className="text-center align-middle ml-4">From:</p>
                  <Col md={{ size: 5 }}>
                    <Input
                      name="start"
                      type="date"
                      bsSize="md"
                      placeholder="Start Date"
                      aria-label="start"
                      className={`time-picker`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.start}
                    />
                  </Col>
                  <p className="text-center align-middle">to</p>
                  <Col md="5">
                    <Input
                      name="end"
                      type="date"
                      bsSize="md"
                      placeholder="End Date"
                      aria-label="end"
                      className={`time-picker`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.end}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="row">
                <Col md={{ size: 5, offset: 1 }}>
                  <Button
                    className="btn btn-secondary btn-block"
                    color="secondary"
                    onClick={this.props.downloadModalHandler}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={{ size: 5 }}>
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    color="secondary"
                    onClick={this.props.downloadModalHandler}
                  >
                    Export
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        )}
      />
    );
  }
}
