import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCreateUser } from '../actions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, {
      email: '',
      password: '',
    });
  }

  handleSubmit(email, password, e) {
    this.props.postCreateUser(email, password);
  }


  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <p>Register account</p>

        <form ref="create">

          <div className="input-field">
            <strong>email:</strong>
            <input
              type="email"
              value={this.state.email}
              name="email"
              ref="email"
              onChange={this.handleChange.bind(this, 'email')}
            />
          </div>

          <div className="input-field">
            <strong>password:</strong>
            <input
              type="password"
              value={this.state.password}
              ref="password"
              onChange={this.handleChange.bind(this, 'password')}
            />
          </div>
        </form>

        <button className="btn" onClick={this.handleSubmit.bind(this, this.state.email, this.state.password)}>
          Create
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  postCreateUser,
})(RegisterPage);
