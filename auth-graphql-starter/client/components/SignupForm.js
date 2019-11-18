import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Signup";
import query from "../queries/CurrentUser";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }
  componentWillUpdate(nextProps) {
    //this.props; //the old props
    //nextProps; // the next set of props

    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard!!!
      hashHistory.push("/dashboard");
    }
  }
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }
  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
