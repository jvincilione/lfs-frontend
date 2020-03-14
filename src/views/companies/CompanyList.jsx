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
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
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
import Cookies from "js-cookie";
import CompanyRow from "./CompanyRow.jsx";
import User from '../../state/User.jsx';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      redirectUrl: null
    };
    this.createCompany = this.createCompany.bind(this);
  }

  componentDidMount() {
    if (User.getType() !== 0 && User.getType() !== 1) {
      if (User.getCompaniesCount() < 2) {
        this.setState({redirectUrl: `/admin/company/${User.getCompanyId()}`})
      } else {
        this.getCompanies(User.getId());
      }
    } else {
      this.getCompanies();
    }
  }

  getCompanies(userId) {
    let url = "/api/company";
    if (userId) {
      url = `/api/user/${userId}/company`;
    }
    axios
      .get(url)
      .then(resp => {
        this.setState({
          companies: resp.data.resources
        });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) {
          Cookies.remove("lfs-auth-token");
        } else {
          this.setState({
            errorMessage: "There was an error. Please try again later."
          });
        }
      });
  }

  createCompany() {
    this.setState({redirectUrl: "/admin/create-company"});
  }

  render() {
    const { redirectUrl } = this.state;
    if (redirectUrl) {
      return <Redirect to={redirectUrl} />;
    }
    let companies = this.state.companies.map((company, idx) => {
      return <CompanyRow company={company} key={idx}></CompanyRow>;
    });
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Companies</h3>
                  <Button
                    color="primary"
                    className="float-right"
                    href="#"
                    onClick={this.createCompany}
                    size="sm"
                  >
                    <i className="ni ni-building"></i> Create Company
                  </Button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Company Name</th>
                      <th scope="col">Open Jobs</th>
                    </tr>
                  </thead>
                  <tbody>{companies}</tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CompanyList;
