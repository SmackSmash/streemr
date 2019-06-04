import React, { Component } from 'react';

import { connect } from 'react-redux';

import { addToArray } from '../actions';

class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '561970001730-t6la7gu83lo2vnfq8g4kb61di7pd9653.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return (
        <button className="ui teal loading button">
          <i className="google icon" />
          Sign In
        </button>
      );
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui teal button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  addOne = () => {
    this.props.addToArray();
    console.log(this.props);
  };

  render() {
    return (
      <>
        <button onClick={this.addOne}>Add One</button>
        {this.renderAuthButton()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { numbers: state.array };
};

export default connect(
  mapStateToProps,
  { addToArray }
)(GoogleAuth);
