import React from "react";

class UserRowCustomer extends React.Component {
  render() {
    const user = this.props.user;
    const firstCompany = user.companies[0];
    const numCompanies = user.companies.length;
    return (
      <>
        <strong>{firstCompany.name}</strong>{" "}
        <span>{numCompanies > 1 && " (" + numCompanies + " others)"}</span>
      </>
    );
  }
}

export default UserRowCustomer;
