import React, { Component } from 'react';

import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

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
          this.auth.isSignedIn.get() ? this.props.signIn() : this.props.signOut();
          this.auth.isSignedIn.listen(this.onAuthChange);
          console.log(this.props.signInStatus);
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

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = state => {
  return { signInStatus: state.signInStatus };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
