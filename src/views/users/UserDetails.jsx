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
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import axios from "axios";
import User from "../../state/User";

class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    if (!id) {
      id = User.getId();
    }
    axios
      .get(`/api/user/${id}`)
      .then(user => {
        this.setState({ user: user.data });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          User.logoutUser();
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }
  save() {
    axios
      .patch(`/api/user/${this.state.user.ID}`, this.state.user)
      .then(user => {
        this.setState({ user: user.data });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          User.logoutUser();
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }
  getUserRoleName() {
    return User.getRoleName(this.state.user.userType);
  }
  getLoggedInUserType() {
    return User.getType();
  }
  canEdit(user) {
    if (user.ID === User.getId() || User.getType() === 0) {
      return true;
    }
    return false;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const user = { ...this.state.user };
    user[name] = value;
    this.setState({
      user
    });
  }

  deleteUser() {
    // show confirmation?
    axios
      .delete(`/api/user/${this.state.user.ID}`)
      .then(user => {
        window.location.href = "/admin/index";
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          User.logoutUser();
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }
  render() {
    console.log(this.state.user)
    if (!this.state.user) {
      return "";
    }
    const user = this.state.user;
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>
                      {user.firstName} {user.lastName}
                      <span className="font-weight-light">
                        {this.getUserRoleName()}
                      </span>
                    </h3>
                    <div className="h5 mt-4">
                      <i className="ni ni-business_briefcase-24 mr-2" />
                      {user.title}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">User Information</h3>
                    </Col>
                    {this.getLoggedInUserType() === 0 ? (
                      <Col className="text-right" xs="4">
                        <Button
                          color="danger"
                          href="#"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          <i className="ni ni-fat-remove"></i> Delete User
                        </Button>
                      </Col>
                    ) : (
                        ""
                      )}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder="First name"
                              name="firstName"
                              type="text"
                              defaultValue={user.firstName}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(user)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              name="lastName"
                              type="text"
                              defaultValue={user.lastName}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(user)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              name="email"
                              placeholder="roger@labontefurnitureserv.com"
                              type="email"
                              defaultValue={user.email}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(user)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="(000) 657-5309"
                              type="phone"
                              name="phone"
                              defaultValue={user.phone}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(user)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-title"
                            >
                              Job Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-title"
                              placeholder=""
                              type="text"
                              name="title"
                              defaultValue={user.title}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(user)}
                            />
                          </FormGroup>
                        </Col>
                        {this.canEdit(user) ? (
                          <Col className="text-right" xs="12">
                            <Button
                              color="default"
                              href="#"
                              onClick={this.save}
                              size="sm"
                            >
                              <i className="ni ni-box-2"></i> Save
                            </Button>
                          </Col>
                        ) : (
                            ""
                          )}
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default UserDetails;
