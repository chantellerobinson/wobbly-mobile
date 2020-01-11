import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Formik } from "formik";

import ClientContext from "../../ClientContext";

import { WobblyClient } from "../../client";

class Landing extends Component {
  static contextType = ClientContext;
  componentDidMount() {
    const { setClient } = this.context;
    setClient(
      new WobblyClient(
        "wss://xmpp.wobbly.app:5443/ws",
        "xmpp.wobbly.app",
        "wobbly-1",
        "dev",
        "Cee9ech4Ia6wupho"
      )
    );
  }

  render() {
    const { state } = this.context;
    const start = state.client && state.client.start;
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text>Welcome to Wobbly!</Text>
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button onPress={start} title="Start" />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Landing;
