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
  Card,
  CardHeader,
  // CardFooter,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  Table,
  Container,
  Row
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import axios from "axios";
import JobRow from "./JobRow.jsx";

class JobList extends React.Component {
  jobs = null;
  constructor(props) {
    super(props);
    this.jobs = props.jobs && props.jobs.length ? props.jobs : null;
    this.state = {
      jobs: this.jobs || []
    };

    if (!this.jobs || !this.jobs.length) {
      this.getJobs();
    }
  }

  getJobs() {
    axios
      .get("/api/job")
      .then(resp => {
        this.setState({
          jobs: resp.data.resources
        });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          // Cookies.remove("lfs-auth-token");
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }
  render() {
    let jobs = this.state.jobs.map((job, idx) => {
      return <JobRow job={job} key={idx}></JobRow>;
    });
    return (
      <>
        {!this.jobs && (
          <Header />
        )}
        {/* Page content */}
        <Container className={!this.jobs ? "mt--7" : "mt-2"} fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Jobs</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Job Customer Name</th>
                      <th scope="col">Scheduled Date</th>
                      <th scope="col">Company</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col" /> */}
                    </tr>
                  </thead>
                  <tbody>{jobs}</tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default JobList;
