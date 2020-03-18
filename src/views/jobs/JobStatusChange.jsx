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
} from "reactstrap";
import JobStatus from './JobStatus.enum';


class JobStatusChange extends React.Component {
  render() {
    const getStatusButtons = () => {
      const status = this.props.status;
      switch (status) {
        case 0:
          return (
            <>
              <Button
                color="danger"
                href="#"
                size="sm"
                onClick={() => this.props.update(JobStatus.REJECTED)}
              >
                <i className="ni ni-fat-delete"></i> Reject
              </Button>{" "}
              <Button
                color="success"
                href="#"
                size="sm"
                onClick={() => this.props.update(JobStatus.ACCEPTED)}
              >
                <i className="ni ni-check-bold"></i> Accept
              </Button>
            </>
          )
        case 1:
          return (
            <>
              <Button
                color="default"
                href="#"
                size="sm"
                onClick={() => this.props.update(JobStatus.SCHEDULED)}
              >
                <i className="ni ni-calendar-grid-58"></i> Schedule
              </Button>
            </>
          )
        case 2:
          return (
            <>
              <Button
                color="success"
                href="#"
                size="sm"
                onClick={() => this.props.update(JobStatus.AWAITING_PAYMENT)}
              >
                <i className="ni ni-like-2"></i> Complete
              </Button>
            </>
          )
        case 3:
          return (
            <>
              <Button
                color="default"
                href="#"
                size="sm"
                onClick={() => this.props.update(JobStatus.CLOSED)}
              >
                <i className="ni ni-money-coins"></i> Mark as Paid
                    </Button>
            </>
          )
        default:
          return "hmm";
      }
    }
    return (
      <>
        {getStatusButtons()}
      </>
    );
  }
}

export default JobStatusChange;
