import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../actions';

class StreamCreate extends Component {
  state = {
    redirect: false
  };

  renderError({ invalid, touched, submitFailed, error }) {
    return (
      invalid &&
      touched &&
      submitFailed && (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    );
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.invalid && meta.touched && meta.submitFailed ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} id={input.name} type="text" autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button type="submit" className="ui teal button">
          Submit
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  !formValues.title && (errors.title = 'You must enter a title!');
  !formValues.description && (errors.description = 'You must enter a description!');
  return errors;
};

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped);
