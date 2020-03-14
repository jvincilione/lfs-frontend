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
import JobList from '../jobs/JobList';

class CompanyDetails extends React.Component {
  constructor() {
    super();
    this.state = { company: null, users: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setCompanyJobs(id);
    this.setUsers(id);
    axios
      .get(`/api/company/${id}`)
      .then(company => {
        this.setState({ company: company.data });
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

  setUsers(companyId) {
    axios
      .get(`/api/company/${companyId}/user`)
      .then(users => {
        this.setState({ users: users.data.resources });
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

  setCompanyJobs(companyId) {
    axios
      .get(`/api/company/${companyId}/job`)
      .then(jobs => {
        this.setState({ jobs: jobs.data.resources });
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
      .patch(`/api/company/${this.state.company.ID}`, this.state.company)
      .then(company => {
        this.setState({ company: company.data });
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
    return User.getRoleName(this.state.company.companyType);
  }

  getLoggedInUserType() {
    return User.getType();
  }

  canEdit(company) {
    return User.hasCompanyEditPrivs(company.ID) || this.isAdmin();
  }

  isAdmin() {
    return User.getType() === 0;
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

  deleteCompany(id) {
    // show confirmation?
    axios
      .delete(`/api/company/${id}`)
      .then(() => {
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

  createJob(companyId) {
    const job = {
      fullName: "Temp",
      address: "Temp",
      postalCode: "00000",
      phoneNumber: "0000000000",
      companyId: companyId,
      status: 0
    };
    axios
      .post(
        `/api/job`,
        job,
        {
          headers: {
            Authorization: `Bearer ${User.getJWT()}`
          }
        }
      )
      .then(job => {
        window.location.href = `/admin/job/${job.data.ID}`;
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

  render() {
    if (!this.state.company) {
      return "";
    }
    const company = this.state.company;
    const deleteCompany = () => {
      this.deleteCompany(company.ID);
    };
    const createJob = () => {
      this.createJob(company.ID);
    };
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
                      <h3 className="mb-0">Company Information</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                      {this.canEdit(company) ? (
                        <Button
                          color="primary"
                          href="#"
                          onClick={createJob}
                          size="sm"
                        >
                          <i className="ni ni-delivery-fast"></i> Create Job
                          Request
                        </Button>
                      ) : (
                          ""
                        )}
                      {this.isAdmin() ? (
                        <Button
                          color="danger"
                          href="#"
                          onClick={deleteCompany}
                          size="sm"
                        >
                          <i className="ni ni-fat-remove"></i> Delete Company
                        </Button>
                      ) : (
                          ""
                        )}
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
                              disabled={!this.canEdit(company)}
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
                                name="userID"
                                defaultValue={company.userID}
                                onChange={this.handleNumberChange}
                                disabled={!this.isAdmin()}
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
                              disabled={!this.canEdit(company)}
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
                              disabled={!this.canEdit(company)}
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
                              disabled={!this.canEdit(company)}
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
                              disabled={!this.canEdit(company)}
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
                              disabled={!this.canEdit(company)}
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
                              disabled={!this.canEdit(company)}
                            />
                          </FormGroup>
                        </Col>
                        {this.canEdit(company) ? (
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
        {this.state.jobs && this.state.jobs.length && (
          <JobList jobs={this.state.jobs}></JobList>
        )}
      </>
    );
  }
}

export default CompanyDetails;
