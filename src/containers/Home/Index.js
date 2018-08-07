import React from 'react';
import PropTypes from 'prop-types';

export class Index extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div>Home</div>;
  }
}

export default Index;
