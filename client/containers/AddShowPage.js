import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

// add show name
// add show description
// add show time

// submit

class AddShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, {
      add: {
        name: 'name',
        desc: 'description',
        date: Date.now(),
      },
      startDate: moment(),
    });
  }

  componentDidMount() {
  }

  handleDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChange(field, e) {
    this.setState({
      add: {
        field: e.target.value,
      },
    });
  }

  handleSubmit(e) {
    console.log(e);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="add">
        <h1>Add show</h1>

        <div className="add-form">
          <div className="add-form__field input-field">
            <strong>Name:</strong>
            <input
              type="text"
              value={this.state.add.name}
              onChange={this.handleChange.bind(this, 'name')}
            />
          </div>
          <div className="add-form__field input-field">
            <strong>Description:</strong>
            <input
              type="text"
              value={this.state.add.desc}
              onChange={this.handleChange.bind(this, 'desc')}
            />
          </div>
          <div className="add-form__field input-field">
            <strong>Date:</strong>
            <Datetime />
          </div>

          <button
            onClick={this.handleSubmit}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
          </button>
        </div>

      </div>
    );
  }

}

export default connect()(AddShowPage);

