import React, { Component } from 'react';

import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '561970001730-t6la7gu83lo2vnfq8g4kb61di7pd9653.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <button className="ui loading button">
          <i className="google icon" />
          Sign In
        </button>
      );
    } else if (this.props.isSignedIn) {
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
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
