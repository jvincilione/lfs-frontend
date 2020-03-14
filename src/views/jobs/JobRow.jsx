import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

const JobStatus = {
  0: "Pending",
  1: "Accepted",
  2: "Scheduled",
  3: "Awaiting Payment",
  4: "Closed",
  5: "Rejected"
}

class JobRow extends React.Component {
  render() {
    const job = this.props.job;
    return (
      <tr>
        <td>
          <Link to={"/admin/job/" + job.ID}>{job.fullName}</Link>
        </td>
        <td>{job.scheduledDate ? moment(job.scheduledDate).format("MMM D YYYY, h:mm a") : "not scheduled"}</td>
        <td>
          <Link to={"/admin/company/" + job.company.ID}>{job.company.name}</Link>
        </td>
        <td>{JobStatus[job.status]}</td>
      </tr>
    );
  }
}

export default JobRow;
