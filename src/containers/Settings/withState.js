import React, { Component } from 'react';
import { getItem } from '../../helpers/Localstorage/Localstorage';

const withState = Comp => {
  return class WithState extends Component {
    state = { isLogic: false };

    async componentDidMount() {
      const tokenKey = await getItem('tokenKey');
      if (!tokenKey) this.setState({ isLogic: true });
    }

    render() {
      const { isLogic } = this.state;
      return (
        <Comp
          isLogic={isLogic}
          setLogic={logic => this.setState({ isLogic: logic })}
          {...this.props}
        />
      );
    }
  };
};

export { withState };
