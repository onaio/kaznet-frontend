import React, { Component } from "react";
import { Col, Input, FormGroup, Form, Button } from "reactstrap";
import { Formik, Field } from "formik";
import moment from "moment";
import * as constants from "../constants";
import "./ExportForm.css";

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
              <FormGroup row>
                <Col md={{ size: 1 }}>
                  <p className="text-center align-middle">Status:</p>
                </Col>
                <Col md={{ size: 10 }}>
                  <Field
                    name="status"
                    component="select"
                    className="form-control ml-4"
                  >
                    <option value={constants.SUBMISSION_APPROVED}>
                      Approved
                    </option>
                    <option value={constants.SUBMISSION_REJECTED}>
                      Rejected
                    </option>
                    <option value={constants.SUBMISSION_PENDING}>
                      Pending
                    </option>
                  </Field>
                </Col>
              </FormGroup>
              <FormGroup row>
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
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 5, offset: 1 }}>
                  <Button
                    className="btn btn-secondary btn-block"
                    color="secondary"
                    onClick={this.props.downloadModalHandler}
                    aria-label="Cancel"
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
                    aria-label="Export"
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
