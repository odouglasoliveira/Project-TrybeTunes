import { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Redirect to="/" />
      </div>
    );
  }
}

export default NotFound;
