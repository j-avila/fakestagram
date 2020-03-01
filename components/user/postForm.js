import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

const submit = values => console.log(values)

const RenderInput = props => {
  // console.log(props)
  return (
    <View>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={props.input.onChange}
        onBlur={props.input.onBlur}
        placeholder={props.ph}
        keyboardType={
          props.input.name === 'email' ? 'email-address' : 'default'
        }
        secureTextEntry={
          props.input.name === 'password' || props.input.name === 'confirm'
            ? true
            : false
        }
      />
      {props.meta.touched && props.meta.error && (
        <Text style={styles.errorTxt}>{props.meta.error}</Text>
      )}
    </View>
  )
}

const validate = values => {
  const errors = []

  if (!values.description) {
    errors.description = 'La desrequerido'
  } else if (values.description.length < 6) {
    errors.description = 'La descripcion debe tener mas de 4 caracteres'
  } else if (values.description.length > 1000) {
    errors.description = 'la descripcion es muy larga'
  }

  return errors
}

class PostForm extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { handleSubmit, image, post, uid } = this.props
    return (
      <View style={styles.form}>
        <Text> Description of the photo: </Text>
        <Field
          name="description"
          component={RenderInput}
          ph="what do you feel whan take it?"
          multiline
        />
        <Button title="Post" onPress={() => handleSubmit(post, image, uid)} />
      </View>
    )
  }
}

export default reduxForm({
  form: 'createPost',
  validate
})(PostForm)

const styles = StyleSheet.create({
  form: {
    flex: 2,
    marginTop: 45,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  input: {
    borderColor: 'black',
    padding: 8,
    borderWidth: 1,
    width: 250,
    marginBottom: 18
  },
  touchTxt: {
    textAlign: 'center',
    paddingVertical: 10
  },
  errorTxt: {
    color: 'tomato',
    marginVertical: 4
  }
})
