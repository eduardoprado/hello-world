import React from 'react';
import { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { LoadView } from '../UXcomponents/style';

export default class LoginLoadingPage extends Component {
  render() {
    return (
      <LoadView>
        <ActivityIndicator size="large"/>
      </LoadView>
    )
  }
}



