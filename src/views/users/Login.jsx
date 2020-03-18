/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import User from "../../state/User";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "foo",
      password: "",
      errorMessage: "",
      emailValid: true,
      passwordValid: true,
      redirectUrl: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.setState({ redirect: User.isAuthenticated() });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  validateForm() {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        emailValid: !!email,
        passwordValid: !!password
      });
      return false;
    }
    if (email.indexOf("@") < 3) {
      this.setState({
        emailValid: false
      });
      return false;
    }
    const splitEmail = email.split("@");
    if (splitEmail[1].indexOf(".") < 3) {
      this.setState({
        emailValid: false
      });
      return false;
    }
    this.setState({
      emailValid: true,
      passwordValid: true
    });
    return true;
  }

  loginUser() {
    if (!this.validateForm()) {
      this.setState({
        errorMessage: "Please enter a valid email and password."
      });
      return;
    }
    axios
      .post("/api/user/authenticate", {
        email: this.state.email,
        password: this.state.password
      })
      .then(resp => {
        if (resp.data.token) {
          if (User.getType() !== 0) {
            this.setState({ redirectUrl: `/admin/company/${User.getCompanyId()}` });
          } else {
            this.setState({ redirectUrl: `/admin/index` })
          }
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({
            errorMessage: "Invalid credentials."
          });
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }
  render() {
    const { redirectUrl } = this.state;
    if (redirectUrl) {
      return <Redirect to={redirectUrl} />;
    }
    return (
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={(e) => e.preventDefault()}>
              <FormGroup className="mb-3">
                <InputGroup
                  className={
                    "input-group-alternative " +
                    (this.state.emailValid === false ? "has-danger" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    className={
                      this.state.emailValid === false ? "is-invalid" : ""
                    }
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup
                  className={
                    "input-group-alternative " +
                    (this.state.passwordValid === false ? "has-danger" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password..."
                    type="password"
                    name="password"
                    className={
                      this.state.passwordValid === false ? "is-invalid" : ""
                    }
                    onChange={this.handleChange}
                  />
                </InputGroup>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
              </FormGroup>
              <div className="text-center">
                <span className="text-muted">
                  By using this app, you agree with the{" "}
                  <a href="/auth/privacy">Privacy Policy</a>
                </span>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  onClick={this.loginUser}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Login;
