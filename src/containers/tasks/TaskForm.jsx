import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, FieldArray, Field } from 'formik';
import AsyncSelect from 'react-select/lib/Async';
import { Alert, Form, Input, Button, FormGroup, Col, Row, Label, FormText } from 'reactstrap';
import moment from 'moment';
import 'react-rrule-generator/build/styles.css';
import RRuleGenerator from 'react-rrule-generator';
import { Redirect, Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import Loading from '../../components/global/Loading';
import MisconfiguredFormMessage from '../../components/forms/MisconfiguredFormMessage';
import * as clientActions from '../../store/clients/actions';
import * as locationActions from '../../store/locations/actions';
import * as formActions from '../../store/forms/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as contentTypeActions from '../../store/contentTypes/actions';
import * as clientSelectors from '../../store/clients/reducer';
import * as locationSelectors from '../../store/locations/reducer';
import * as formSelectors from '../../store/forms/reducer';
import * as contentTypeSelectors from '../../store/contentTypes/reducer';

import {
  INACTIVE_XFORM_VALIDATION_MESSAGE,
  API_ENDPOINT,
  ASYNC_SEARCH_TIMEOUT,
  XFORM_CORRECTLY_CONFIGURED,
  ONA_LOGIN,
  TASK_LOCATION_START,
  TASK_LOCATION_END,
  TASK_LOCATION_TIMING_RULE
} from '../../constants';

import './TaskForm.css';

function transformMyApiErrors(array) {
  const errors = {};
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const msg = element.detail;
    const field = element.source.pointer.split('/').pop();

    if (field === 'target_id' || field === 'target_content_type') {
      errors.form = 'Please select a valid form.';
    }

    if (field === 'locations_input') {
      errors.taskLocations = msg;
    }

    errors[field] = msg;
  }

  return errors;
}

function validate(formsById) {
  return values => {
    const errors = {};
    if (values.form && values.form.value) {
      const theForm = formsById[values.form.value];

      if (theForm) {
        if (theForm.attributes.metadata.downloadable === false) {
          errors.form = INACTIVE_XFORM_VALIDATION_MESSAGE;
        }
        if (theForm.attributes.metadata.configuration_status !== XFORM_CORRECTLY_CONFIGURED) {
          errors.form = <MisconfiguredFormMessage />;
        }
      }
    }

    return errors;
  };
}

export class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.targetId = props.targetId || null;

    this.getClientOptions.bind(this);
    this.loadClientOptions.bind(this);
    this.getFormOptions.bind(this);
    this.loadFormOptions.bind(this);
    this.getLocationOptions.bind(this);
    this.loadLocationOptions.bind(this);
  }

  componentDidMount() {
    const {
      fetchForm,
      fetchForms,
      fetchClients,
      fetchLocations,
      fetchContentTypes,
      initialData
    } = this.props;

    if (initialData.form) {
      if (initialData.form.value) {
        fetchForm(initialData.form.value);
      }
    }

    fetchForms();
    fetchClients();
    fetchLocations();
    fetchContentTypes();
  }

  getClientOptions() {
    const { clientOptions } = this.props;
    return clientOptions.asMutable();
  }

  getFormOptions() {
    const { formOptions } = this.props;
    return formOptions.asMutable();
  }

  getLocationOptions() {
    const { locationOptions } = this.props;
    return locationOptions.asMutable();
  }

  loadFormOptions = (inputValue, callback) => {
    const { fetchForms } = this.props;
    fetchForms(`${API_ENDPOINT}/forms/?search=${inputValue}&has_task=false`);
    setTimeout(() => {
      callback(this.getFormOptions());
    }, ASYNC_SEARCH_TIMEOUT);
  };

  loadClientOptions = (inputValue, callback) => {
    const { fetchClients } = this.props;
    fetchClients(`${API_ENDPOINT}/clients/?search=${inputValue}`);
    setTimeout(() => {
      callback(this.getClientOptions());
    }, ASYNC_SEARCH_TIMEOUT);
  };

  loadLocationOptions = (inputValue, callback) => {
    const { fetchLocations } = this.props;
    fetchLocations(`${API_ENDPOINT}/locations/?search=${inputValue}`);
    setTimeout(() => {
      callback(this.getLocationOptions());
    }, ASYNC_SEARCH_TIMEOUT);
  };

  render() {
    const {
      locationsById,
      clientsById,
      initialData,
      formsById,
      formActionDispatch,
      formContentTypeId,
      formOptions,
      locationOptions,
      clientOptions,
      redirectAfterAction
    } = this.props;

    if (
      Object.keys(locationsById).length === 0 &&
      locationsById.constructor === Object &&
      Object.keys(clientsById).length === 0 &&
      clientsById.constructor === Object
    )
      return <Loading />;

    return (
      <Formik
        initialValues={initialData}
        validate={validate(formsById)}
        onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
          const locationsInput = values.taskLocations.map(d => ({
            location: d.location ? { type: 'Location', id: d.location.value } : undefined,
            timing_rule: d.timing_rule,
            start: d.start,
            end: d.end
          }));

          const payload = {
            data: {
              type: 'Task',
              id: this.targetId !== null ? this.targetId : null,
              attributes: {
                name: values.name,
                estimated_time: values.estimated_time * 60,
                required_expertise: values.required_expertise,
                description: values.description,
                start: `${moment(values.start).format('YYYY-MM-DD')}T12:00`,
                end: `${moment(values.end).format('YYYY-MM-DD')}T12:00`,
                timing_rule: undefined,
                total_submission_target: undefined,
                user_submission_target:
                  values.user_submission_target !== null && values.user_submission_target !== ''
                    ? values.user_submission_target
                    : undefined,
                status: values.status !== initialData.status ? values.status : initialData.status,
                target_id: values.form ? values.form.value : undefined,
                target_content_type: formContentTypeId,
                amount: values.amount != null && values.amount !== '' ? values.amount : undefined,
                client: values.client ? { type: 'Client', id: values.client.value } : undefined,
                locations_input: locationsInput
              }
            }
          };

          try {
            await formActionDispatch(payload, this.targetId).then(() => {
              setSubmitting(false);
              const { errorMessage } = this.props;
              const { hasError } = this.props;
              if (hasError) {
                setErrors(transformMyApiErrors(errorMessage));
              } else {
                setStatus('done');
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
            {errors.data && <Alert color="danger">{errors.data}</Alert>}
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
                    className={errors.name ? 'is-invalid' : ''}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="status">Status</Label>
                </Col>
                <Col md={{ size: 8 }}>
                  <Input
                    name="status"
                    type="select"
                    bsSize="lg"
                    placeholder="Status"
                    aria-label="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    className={errors.status ? 'is-invalid' : ''}
                    disabled={this.targetId == null}
                  >
                    <option>----</option>
                    <option value="d">Draft</option>
                    <option value="a">Active</option>
                  </Input>
                  {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="description">Description</Label>
                </Col>
                <Col md={{ size: 8 }}>
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
                    className={errors.description ? 'is-invalid' : ''}
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
                <Col md={{ size: 8 }}>
                  <Input
                    name="amount"
                    type="number"
                    bsSize="lg"
                    placeholder="Reward"
                    aria-label="reward"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    className={errors.amount ? 'is-invalid' : ''}
                  />
                  <FormText color="muted">The reward paid for successful submissions.</FormText>
                  {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="form">Form</Label>
                </Col>
                <Col
                  md={{ size: 6 }}
                  className={
                    errors.form
                      ? 'is-invalid is-invalid async-select-container'
                      : 'async-select-container'
                  }
                >
                  <AsyncSelect
                    name="form"
                    bsSize="lg"
                    placeholder="Select Form"
                    aria-label="Select Form"
                    value={values.form}
                    onChange={value => setFieldValue('form', value)}
                    onBlur={handleBlur}
                    defaultOptions={formOptions.asMutable()}
                    loadOptions={this.loadFormOptions}
                    isClearable
                    cacheOptions
                    className={errors.form ? 'is-invalid async-select' : 'async-select'}
                    classNamePrefix={errors.form ? 'is-invalid async-select' : 'async-select'}
                  />
                  {errors.form && <div className="invalid-feedback">{errors.form}</div>}
                </Col>
                <Col md="3ss">
                  <Button
                    className="btn btn-light btn-sm white my-1"
                    color="secondary"
                    aria-label="GO TO ONA FORM"
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={ONA_LOGIN}
                      className="kaznet-action-links"
                    >
                      <FontAwesomeIcon icon="external-link-alt" />
                      &nbsp; GO TO ONA FORM
                    </a>
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="start">Active dates</Label>
                </Col>
                <Col md={{ size: 8 }}>
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
                        className={`time-picker ${errors.start ? 'is-invalid' : ''}`}
                      />
                      {touched.start &&
                        errors.start && <div className="invalid-feedback">{errors.start}</div>}
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
                        className={`time-picker ${errors.end ? 'is-invalid' : ''}`}
                      />
                      {errors.end && <div className="invalid-feedback">{errors.end}</div>}
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="estimated_time">Estimated time to complete task</Label>
                </Col>
                <Col md={{ size: 8 }}>
                  <Input
                    name="estimated_time"
                    type="number"
                    bsSize="lg"
                    placeholder="Estimated Time"
                    aria-label="estimated time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.estimated_time}
                    className={errors.estimated_time ? 'is-invalid' : ''}
                  />
                  <FormText color="muted">
                    The esitmated time that a contributor would take to complete the task, in
                    minutes.
                  </FormText>
                  {errors.estimated_time && (
                    <div className="invalid-feedback">{errors.estimated_time}</div>
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
                      values.taskLocations.map((taskLocationObj, index) => (
                        <div
                          className="tasklocation-item position-relative"
                          key={`${taskLocationObj.location.value}${taskLocationObj.start}${
                            taskLocationObj.end
                          }`}
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
                              <Label for={`taskLocations[${index}]location`}>Location</Label>
                            </Col>
                            <Col md={{ size: 8 }}>
                              <Row
                                key={`${taskLocationObj.location.value}${taskLocationObj.start}${
                                  taskLocationObj.end
                                }`}
                              >
                                <Col
                                  md={{ size: 12 }}
                                  className={
                                    errors.taskLocations && errors.taskLocations.location
                                      ? 'is-invalid async-select-container'
                                      : 'async-select async-select-container'
                                  }
                                >
                                  <AsyncSelect
                                    name={`taskLocations[${index}]location`}
                                    bsSize="lg"
                                    placeholder="Select Location"
                                    aria-label="Select Location"
                                    defaultOptions={locationOptions.asMutable()}
                                    loadOptions={this.loadLocationOptions}
                                    onChange={value =>
                                      setFieldValue(`taskLocations.${index}.location`, value || '')
                                    }
                                    isClearable
                                    cacheOptions
                                    className={
                                      errors.taskLocations && errors.taskLocations.location
                                        ? 'is-invalid async-select'
                                        : 'async-select'
                                    }
                                    classNamePrefix={
                                      errors.taskLocations && errors.taskLocations.location
                                        ? 'is-invalid async-select'
                                        : 'async-select'
                                    }
                                    required
                                    value={
                                      values.taskLocations[index]
                                        ? values.taskLocations[index].location
                                        : ''
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
                            </Col>
                            <Col md={{ size: 1 }}>
                              <Link to="/locations/new">
                                <Button
                                  type="button"
                                  className="btn my-1 btn-sm btn-primary"
                                  aria-label="+"
                                >
                                  +
                                </Button>
                              </Link>
                            </Col>
                          </FormGroup>

                          <FormGroup className="row">
                            <Col sm={{ size: 3 }}>
                              <Label for={`taskLocations[${index}]start`}>Hours</Label>
                            </Col>
                            <Col md="8">
                              <Row>
                                <Col md="5">
                                  <Field
                                    name={`taskLocations[${index}]start`}
                                    type="time"
                                    placeholder="Start"
                                    aria-label="Start"
                                    className={
                                      errors.taskLocations && errors.taskLocations.start
                                        ? 'is-invalid time-picker form-control form-control-lg'
                                        : 'time-picker form-control form-control-lg'
                                    }
                                    required
                                    value={
                                      values.taskLocations[index]
                                        ? values.taskLocations[index].start
                                        : ''
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
                                      errors.taskLocations && errors.taskLocations.end
                                        ? 'is-invalid time-picker form-control form-control-lg'
                                        : 'time-picker form-control form-control-lg'
                                    }
                                    required
                                    value={
                                      values.taskLocations[index]
                                        ? values.taskLocations[index].end
                                        : ''
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
                              <Label for={`taskLocations[${index}]timing_rule`}>Timing Rule</Label>
                            </Col>
                            <Col md="8">
                              <Field
                                name={`taskLocations[${index}]timing_rule`}
                                type="hidden"
                                placeholder="Timing Rule"
                                aria-label="timing rule"
                                className={
                                  errors.taskLocations && errors.taskLocations.timing_rule
                                    ? 'is-invalid form-control form-control-lg'
                                    : 'form-control form-control-lg'
                                }
                                value={
                                  values.taskLocations[index]
                                    ? values.taskLocations[index].timing_rule
                                    : ''
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
                                  setFieldValue(`taskLocations.${index}.timing_rule`, rrule)
                                }
                                value={
                                  values.taskLocations[index]
                                    ? values.taskLocations[index].timing_rule
                                    : ''
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
                          aria-label="Add Locations"
                          onClick={() =>
                            arrayHelpers.push({
                              start: TASK_LOCATION_START,
                              end: TASK_LOCATION_END,
                              timing_rule: TASK_LOCATION_TIMING_RULE,
                              location: ''
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
                  md={{ size: 8 }}
                  className={
                    errors.client ? 'is-invalid async-select-container' : 'async-select-container'
                  }
                >
                  <AsyncSelect
                    name="client"
                    bsSize="lg"
                    placeholder="Select Client"
                    aria-label="Select Client"
                    value={values.client}
                    onChange={value => setFieldValue('client', value)}
                    onBlur={handleBlur}
                    defaultOptions={clientOptions.asMutable()}
                    loadOptions={this.loadClientOptions}
                    isClearable
                    cacheOptions
                    className={errors.client ? 'is-invalid async-select' : 'async-select'}
                    classNamePrefix={errors.client ? 'is-invalid async-select' : 'async-select'}
                  />
                  {errors.client && <div className="invalid-feedback">{errors.client}</div>}
                </Col>

                <Col md="1">
                  <Link to="/clients/new">
                    <Button type="button" className="btn my-1 btn-sm btn-primary" aria-label="+">
                      +
                    </Button>
                  </Link>
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="user_submission_target">Submission limit (per contributor)</Label>
                </Col>
                <Col md={{ size: 8 }}>
                  <Input
                    name="user_submission_target"
                    type="number"
                    bsSize="lg"
                    placeholder="Contributor Submission Target"
                    aria-label="contributor submission target"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user_submission_target}
                    className={errors.user_submission_target ? 'is-invalid' : ''}
                  />
                  {errors.user_submission_target && (
                    <div className="invalid-feedback">{errors.user_submission_target}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Col sm={{ size: 3 }}>
                  <Label for="required_expertise">Minimum contributor level</Label>
                </Col>
                <Col md={{ size: 8 }}>
                  <Input
                    name="required_expertise"
                    type="select"
                    bsSize="lg"
                    placeholder="Required Expertise"
                    aria-label="required expertise"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.required_expertise}
                    className={errors.required_expertise ? 'is-invalid' : ''}
                  >
                    <option value="">----</option>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                    <option value="4">Expert</option>
                  </Input>
                  {errors.required_expertise && (
                    <div className="invalid-feedback">{errors.required_expertise}</div>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="row mt-5">
                <Col md={{ size: 5, offset: 1 }}>
                  <Button
                    className="btn btn-secondary btn-block"
                    aria-label="Cancel"
                    onClick={() => {
                      setStatus('done');
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={{ size: 5 }}>
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    aria-label="Submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            {status === 'done' && <Redirect to={redirectAfterAction} />}
          </div>
        )}
      />
    );
  }
}

TaskForm.propTypes = {
  clientsById: PropTypes.objectOf(PropTypes.object).isRequired,
  locationsById: PropTypes.objectOf(PropTypes.object).isRequired,
  formsById: PropTypes.objectOf(PropTypes.object).isRequired,
  formContentTypeId: PropTypes.number,
  targetId: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(PropTypes.object)
  ]),
  clientOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  formOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  locationOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialData: PropTypes.objectOf(PropTypes.any).isRequired,
  redirectAfterAction: PropTypes.string,
  // functions
  formActionDispatch: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  fetchForms: PropTypes.func.isRequired,
  fetchForm: PropTypes.func.isRequired,
  fetchContentTypes: PropTypes.func.isRequired
};

TaskForm.defaultProps = {
  targetId: null,
  formContentTypeId: null,
  hasError: false,
  errorMessage: [],
  redirectAfterAction: '/'
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    clientsById: clientSelectors.getClientsById(state),
    locationsById: locationSelectors.getLocationsById(state),
    formsById: formSelectors.getFormsById(state),
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
      fetchForm: formActions.fetchForm,
      fetchContentTypes: contentTypeActions.fetchContentTypes
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
