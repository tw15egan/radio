import React, { Component } from 'react';
import { Link } from 'react-router';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, {
      email: '',
      password: '',
    });
  }

  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleSubmit(email, password, e) {
    this.props.loginUser(email, password);
  }

  render() {
    return (
      <div className="add">
        <div className="input-field">
          <strong>email:</strong>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this, 'email')}
          />
        </div>

        <div className="input-field">
          <strong>password:</strong>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}
          />
        </div>

        <button className="btn" onClick={this.handleSubmit.bind(this, this.state.email, this.state.password)}>
          Login
        </button>

        <br />

        <div className="additional">
          <Link
            to="/register"
          >
            <p>Create account</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginPage;
