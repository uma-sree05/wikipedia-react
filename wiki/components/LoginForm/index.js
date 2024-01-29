// Write your JS code here
import React,{Component} from 'react'
import { Redirect } from 'react-router-dom';
import './index.css'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMessage: '',
    redirectToHome: false,
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderPasswordInputField = () => {
    const {passwordInput} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={passwordInput}
          onChange={this.onChangePasswordInput}
          placeholder="Password"
        />
      </div>
    )
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  renderUsernameInputField = () => {
    const {usernameInput} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={usernameInput}
          onChange={this.onChangeUsernameInput}
          placeholder="Username"
        />
      </div>
    )
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitError: true, errorMessage})
  }

  onSubmitSuccess = () => {
    this.setState({ redirectToHome: true }); 

  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const { showSubmitError, errorMessage, redirectToHome } = this.state;

    if (redirectToHome) {
      return <Redirect to="/" />;
    }



    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          {this.renderUsernameInputField()}
          {this.renderPasswordInputField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
