import React, { Component } from 'react';

const withInputState = Comp => {
  return class WithState extends Component {
    state = { inputState: '' };

    render() {
      const { inputState } = this.state;
      const data = this.props.navigation.state.params || {
        oldPassword: '',
        newPassword: '',
      };
      return (
        <Comp
          {...this.props}
          inputState={inputState}
          setInputState={text => this.setState({ inputState: text })}
          navigateData={data}
        />
      );
    }
  };
};

export { withInputState };
