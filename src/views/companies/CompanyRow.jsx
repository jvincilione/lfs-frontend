import React from "react";
import { Link } from "react-router-dom";

class CompanyRow extends React.Component {
  render() {
    const company = this.props.company;
    return (
      <tr>
        <td>
          <Link to={"/admin/company/" + company.ID}>{company.name}</Link>
        </td>
        <td>{company.jobCount || 0}</td>
      </tr>
    );
  }
}

export default CompanyRow;
