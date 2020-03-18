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
import JobStatusChange from "./JobStatusChange"
import JobSchedulModal from './JobScheduleModal';
import JobStatus, { JobStatusName } from './JobStatus.enum';
import moment from 'moment';

class JobDetails extends React.Component {
  constructor() {
    super();
    this.state = { job: null, showDateConfirmation: false };
    this.handleChange = this.handleChange.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.closeScheduler = this.closeScheduler.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.confirmStatusChange = this.confirmStatusChange.bind(this);
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
      .patch(`/api/job/${this.state.job.ID}`, this.state.job)
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

  updateStatus(status) {
    if (status === 2) {
      this.setState({ showDateConfirmation: true });
    } else {
      this.confirmStatusChange(status);
    }
  }

  closeScheduler() {
    this.setState({ showDateConfirmation: false });
  }

  saveSchedule(date) {
    const job = { ...this.state.job };
    job.scheduledDate = date;
    this.confirmStatusChange(JobStatus.SCHEDULED, job);
  }

  confirmStatusChange(status, job) {
    if (!job) {
      job = { ...this.state.job };
    }
    job.status = status;
    this.setState({
      job
    });
    setTimeout(() => {
      this.save();
      this.setState({ showDateConfirmation: false });
    });
  }

  handleChange(event, isNum) {
    const target = event.target;
    const value = isNum ? parseFloat(target.value) : target.value;
    const name = target.name;
    const job = { ...this.state.job };
    job[name] = value;
    this.setState({
      job
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

  formatScheduledDate(date) {
    if (date) {
      if (moment().diff(date) < 0) {
        return "Scheduled: " + moment(date).format("MMM d, YYYY h:mm a");
      } else {
        return "Schedule Past.";
      }
    }
    return "Not scheduled."
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
                    {this.getLoggedInUserType() === 0 && (
                      <div className="py-2">
                        <JobStatusChange update={this.updateStatus} status={job.status}></JobStatusChange>
                      </div>
                    )}
                    <Row className="py-2">
                      <Col xs="12">{this.formatScheduledDate(job.scheduledDate)}</Col>
                    </Row>
                    <Row className="py-2 border-top">
                      <Col xs="12" className="text-left">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-labor-cost"
                          >
                            Price
                            </label>
                          <Input
                            className="form-control-alternative"
                            id="input-labor-cost"
                            name="laborCost"
                            placeholder=""
                            type="number"
                            defaultValue={job.laborCost}
                            onChange={(e) => this.handleChange(e, true)}
                            disabled={!this.canEdit(job)}
                          />
                        </FormGroup>
                      </Col>
                      {this.getLoggedInUserType() === 0 && (
                        <Col xs="12" className="text-left">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-parts-cost"
                            >
                              Parts Cost
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-parts-cost"
                              name="partsCost"
                              placeholder=""
                              type="number"
                              defaultValue={job.partsCost}
                              onChange={(e) => this.handleChange(e, true)}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>)}
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="4">
                      <h3 className="mb-0">Job Information</h3>
                    </Col>
                    {this.canEdit(job) ? (
                      <Col className="text-right" xs="8">
                        <Button
                          color="black"
                          className="text-danger"
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
                            <label className="form-control-label" htmlFor="input-status">Status</label>
                            <div id="input-primary-contact">{JobStatusName[job.status]}</div>
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
                        <Col xs="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-order-number"
                            >
                              Company Order Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-order-number"
                              placeholder=""
                              type="text"
                              name="orderNumber"
                              defaultValue={job.orderNumber}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-instructions"
                            >
                              Job Details/Instructions
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-instructions"
                              placeholder=""
                              type="textarea"
                              name="instructions"
                              defaultValue={job.instructions}
                              onChange={this.handleChange}
                              disabled={!this.canEdit(job)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-notes"
                            >
                              Technician Notes
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-notes"
                              placeholder=""
                              type="textarea"
                              name="notes"
                              defaultValue={job.notes}
                              onChange={this.handleChange}
                              disabled={this.getLoggedInUserType() !== 0}
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
        {this.state.showDateConfirmation && (
          <JobSchedulModal cancel={this.closeScheduler} save={this.saveSchedule}></JobSchedulModal>
        )}
      </>
    );
  }
}

export default JobDetails;
