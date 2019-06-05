import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../components/Header';
import StreamCreate from '../pages/StreamCreate';
import StreamDelete from '../pages/StreamDelete';
import StreamEdit from '../pages/StreamEdit';
import StreamList from '../pages/StreamList';
import StreamShow from '../pages/StreamShow';

const App = props => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={StreamList} />
        <Route path="/streams/new" component={StreamCreate} />
        <Route path="/streams/delete" component={StreamDelete} />
        <Route path="/streams/edit" component={StreamEdit} />
        <Route path="/streams/show" component={StreamShow} />
      </BrowserRouter>
    </div>
  );
};

export default App;
