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

class JobDetails extends React.Component {
  constructor() {
    super();
    this.state = { job: null };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/job/${id}`)
      .then(job => {
        this.setState({ job: job.data });
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
      .patch(`/api/job/${this.state.job.ID}`, this.job.company)
      .then(job => {
        this.setState({ job: job.data });
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

  getLoggedInUserType() {
    return User.getType();
  }

  canEdit(job) {
    return User.hasCompanyEditPrivs(job.companyId) || User.getType() === 0;
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

  deleteJob(id) {
    // show confirmation?
    axios
      .delete(`/api/job/${id}`)
      .then(() => {
        window.location.href = "/admin/index";
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          // User.logoutUser();
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }

  render() {
    if (!this.state.job) {
      return "";
    }
    const job = this.state.job;
    const deleteJob = () => {
      this.deleteJob(job.ID);
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
                    <h3>{job.fullName} ({job.company.name})</h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                      <h3 className="mb-0">Job Information</h3>
                    </Col>
                    {this.getLoggedInUserType() === 0 ? (
                      <Col className="text-right" xs="3">
                        <Button
                          color="danger"
                          href="#"
                          onClick={deleteJob}
                          size="sm"
                        >
                          <i className="ni ni-fat-remove"></i> Delete Job
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
                              Job Customer Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-customer-name"
                              placeholder="Customer Name"
                              name="fullName"
                              type="text"
                              defaultValue={job.fullName}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <Input
                              type="select"
                              className="form-control-alternative"
                              id="input-primary-contact"
                              name="primaryContact"
                              defaultValue={job.status}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            >
                              <option value="0">Pending</option>
                              <option value="1">Scheduled</option>
                              <option value="2">Awaiting Payment</option>
                              <option value="3">Closed</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              name="address"
                              placeholder="191 Peachtree St"
                              type="text"
                              defaultValue={job.address}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Address 2
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address2"
                              name="address2"
                              placeholder="Suite 300"
                              type="text"
                              defaultValue={job.address2}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
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
                              name="text"
                              defaultValue={job.city}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
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
                              defaultValue={job.state}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
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
                              name="postal"
                              defaultValue={job.postalCode}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
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
                              defaultValue={job.phoneNumber}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>
                        {this.canEdit(job) ? (
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

export default JobDetails;
