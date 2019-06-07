import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchStreams } from '../actions';
import Spinner from '../components/Spinner';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui green button">Edit</button>
          <button className="ui negative button">Delete</button>
        </div>
      );
    }
  };

  renderList = () => {
    if (this.props.streams.length) {
      return this.props.streams.map(stream => (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <h4>{stream.title}</h4>
            <div className="description">
              <p>{stream.description}</p>
            </div>
          </div>
        </div>
      ));
    } else {
      return <Spinner loadingMessage="Loading Stream List..." />;
    }
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
