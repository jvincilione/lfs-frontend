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

// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress
} from "reactstrap";
import User from '../../state/User';
import axios from 'axios';

const hasNumber = value => {
  return new RegExp(/[0-9]/).test(value);
}

const hasMixed = value => {
  return new RegExp(/[a-z]/).test(value) &&
    new RegExp(/[A-Z]/).test(value);
}

const hasSpecial = value => {
  return new RegExp(/[!#@$%^&*)(+=._-\s]/).test(value);
}

const strengthClasses = count => {
  switch (count) {
    case 0:
    case 1:
    case 2:
    case 3:
      return "danger";
    case 4:
    case 5:
    case 6:
    case 7:
      return "warning";
    default:
      return "success";
  }
}

const strengthIndicator = value => {
  let strengths = 0;
  if (value.length > 7)
    strengths++;
  if (value.length > 10)
    strengths += 2;
  if (value.length > 12)
    strengths += 4;
  if (hasNumber(value))
    strengths++;
  if (hasSpecial(value))
    strengths++;
  if (hasMixed(value))
    strengths++;
  return strengths;
}

class Register extends React.Component {
  companyId = null;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        userType: 2,
        companyId: null
      },
      passwordStrength: null,
      companies: null
    }
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    if (this.isAdmin()) {
      this.setCompanies();
    }
  }

  componentDidMount() {
    this.companyId = User.getCompanyId();
  }

  createUser() {
    const user = Object.assign({}, this.state.user);
    if (!user.companyId) {
      user.companyId = this.companyId;
    }
    axios
      .post(
        `/api/user`,
        user,
        {
          headers: {
            Authorization: `Bearer ${User.getJWT()}`
          }
        }
      )
      .then(user => {
        window.location.href = `/admin/user/${user.data.ID}`;
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          this.setState({
            errorMessage: "Required permissions missing to perform this action."
          });
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }

  setCompanies() {
    axios.get("/api/company").then((companies => {
      this.setState({ companies: companies.data.resources });
    }))
  }

  isAdmin() {
    return User.getType() === 0;
  }

  handleChange(event) {
    const target = event.target;
    const isNum = target.value % 1 === 0;
    const value = isNum ? parseInt(target.value, 10) : target.value;
    const name = target.name;
    const user = { ...this.state.user };
    user[name] = value;
    this.setState({
      user
    });
  }

  handlePasswordChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const user = { ...this.state.user };
    user[name] = value;
    const passwordStrength = name === "password" ? strengthIndicator(value) : this.state.passwordStrength;
    this.setState({
      user,
      passwordStrength: passwordStrength || null
    });
  }

  passwordsMatch(user) {
    return user.password === user.passwordConfirm;
  }

  render() {
    const user = this.state.user;
    return (
      <>
        <Col xs="12">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >First Name</label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        required="required"
                        defaultValue={user.firstName}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >Last Name</label>
                      <Input
                        className="form-control-alternative"
                        id="input-last-name"
                        placeholder="First Name"
                        name="lastName"
                        type="text"
                        required="required"
                        defaultValue={user.lastName}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >Email Address</label>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        placeholder="john@labontefurnitureserv.com"
                        name="email"
                        type="email"
                        required="required"
                        defaultValue={user.email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >Passphrase</label>
                      <Input
                        className="form-control-alternative"
                        id="input-password"
                        placeholder="passphrase"
                        name="password"
                        type="password"
                        required="required"
                        defaultValue={user.password}
                        onChange={this.handlePasswordChange}
                      />
                      <div className="text-muted font-italic">
                        <small>
                          passphrase strength:{" "}
                          <Progress value={this.state.passwordStrength * 10} color={strengthClasses(this.state.passwordStrength)} />
                        </small>
                      </div>
                    </FormGroup>
                  </Col>

                  <Col xs="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >Confirm Passphrase</label>
                      <Input
                        className="form-control-alternative"
                        id="input-password"
                        placeholder="confirm"
                        name="passwordConfirm"
                        type="password"
                        required="required"
                        defaultValue={user.passwordConfirm}
                        onChange={this.handlePasswordChange}
                      />
                      {user.password && user.passwordConfirm && (
                        <div className="text-muted font-italic">
                          <small>
                            <span className={"text-" + (this.passwordsMatch(user) ? "success" : "danger") + " font-weight-700"}>passwords{this.passwordsMatch(user) ? "" : " do not"} match</span>
                          </small>
                        </div>)}
                    </FormGroup>
                  </Col>
                </Row>
                {this.isAdmin() && (
                  <Row>
                    <Col xs="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-company"
                        >Company</label>
                        {this.state.companies && this.state.companies.length ? (
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="input-company"
                            name="companyId"
                            required="required"
                            defaultValue={user.companyId}
                            onChange={this.handleChange}
                          >
                            {this.state.companies.map(company => {
                              return (
                                <option value={company.ID} key={company.ID}>
                                  {company.name}
                                </option>
                              );
                            })}
                          </Input>
                        ) : (
                            ""
                          )}
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-role"
                        >User Role</label>
                        <Input
                          type="select"
                          className="form-control-alternative"
                          id="input-role"
                          name="userType"
                          required="required"
                          defaultValue={user.userType}
                          onChange={this.handleChange}
                        >
                          <option value="0" >Admin</option>
                          <option value="1" >Company Admin</option>
                          <option value="2" >Company Staff</option>
                          {/* <option value="3" >Guest</option> */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.createUser}>
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
