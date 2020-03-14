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
import Header from "components/Headers/Header.jsx";
import axios from "axios";
import User from "../../state/User";

class CompanyCreate extends React.Component {
  constructor() {
    super();
    this.state = { company: {
      name: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
      userId: "",
    }, users: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    this.setUsers();
  }

  setUsers() {
    axios
      .get(`/api/user`)
      .then(users => {
        this.setState({ users: users.data.resources });
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

  save() {
    axios
      .post(`/api/company`, this.state.company,
        {
          headers: {
            Authorization: `Bearer ${User.getJWT()}`
          }
        }
      )
      .then(company => {
        window.location.href = `/admin/company/${company.data.ID}`;
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const company = { ...this.state.company };
    company[name] = value;
    this.setState({
      company
    });
  }

  handleNumberChange(event) {
    const target = event.target;
    const value = parseInt(target.value, 10);
    const name = target.name;
    const company = { ...this.state.company };
    company[name] = value;
    this.setState({
      company
    });
  }

  render() {
    if (!this.state.company) {
      return "";
    }
    const company = this.state.company;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>{company.name}</h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                      <h3 className="mb-0">Create New Company</h3>
                    </Col>
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
                              Company Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-company-name"
                              placeholder="Company Name"
                              name="name"
                              type="text"
                              defaultValue={company.name}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Primary Contact
                            </label>
                            {this.state.users && this.state.users.length ? (
                              <Input
                                type="select"
                                className="form-control-alternative"
                                id="input-primary-contact"
                                name="userId"
                                defaultValue={company.userId}
                                onChange={this.handleNumberChange}
                              >
                                {this.state.users.map(user => {
                                  return (
                                    <option value={user.ID} key={user.ID}>
                                      {user.lastName}, {user.firstName}
                                    </option>
                                  );
                                })}
                              </Input>
                            ) : (
                                ""
                              )}
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              name="address"
                              placeholder="191 Peachtree St"
                              type="text"
                              defaultValue={company.address}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address2"
                            >
                              Address 2
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address2"
                              name="address2"
                              placeholder="Suite 300"
                              type="text"
                              defaultValue={company.address2}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="Atlanta"
                              type="text"
                              name="city"
                              defaultValue={company.city}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-state"
                            >
                              State
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-state"
                              placeholder="Georgia"
                              type="text"
                              name="state"
                              defaultValue={company.state}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-postal"
                            >
                              Postal Code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal"
                              placeholder="30303"
                              type="text"
                              name="postalCode"
                              defaultValue={company.postalCode}
                              onChange={this.handleChange}
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
                              name="phoneNumber"
                              defaultValue={company.phoneNumber}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="text-right" xs="12">
                          <Button
                            color="default"
                            href="#"
                            onClick={this.save}
                            size="sm"
                          >
                            <i className="ni ni-box-2"></i> Create
                          </Button>
                        </Col>
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

export default CompanyCreate;
