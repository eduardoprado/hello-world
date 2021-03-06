/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginPage from '../components/Login/LoginPage';
import UserListPage from '../components/User/UserList/UserListPage';
import AddUserPage from '../components/User/AddUser/AddUserPage';
import { AUTH_KEY } from "../components/constants";
import FlatListItem from '../components/User/UserList/FlatListItem';
import UserDetailsPage from '../components/User/UserDetails/UserDetailsPage';


const httpLink = new HttpLink({
  uri: "https://tq-template-server-sample.herokuapp.com/graphql"
});
const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem(AUTH_KEY);

  return token ? { headers: { Authorization: token } } : {};
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const AppStackNavegator = createStackNavigator({
  LoginPage: { screen: LoginPage },
  UserListPage: { screen: UserListPage },
  AddUserPage: {screen: AddUserPage},
  FlatListItem: {screen: FlatListItem},
  UserDetailsPage: {screen: UserDetailsPage}
});

const AppContainer = createAppContainer(AppStackNavegator)


export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

