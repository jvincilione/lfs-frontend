import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from "reactstrap";
import UserRowCustomer from "./UserRowCustomer";
import { Link } from "react-router-dom";

class UserRow extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>
          <Link to={"/admin/user/" + user.ID}>
            {user.lastName}, {user.firstName}
          </Link>
        </td>
        <td>
          {user.companies && user.companies[0] ? (
            <UserRowCustomer user={user}></UserRowCustomer>
          ) : (
            "System Admin"
          )}
        </td>
        <td>
          {user.userType === 0 && (
            <Badge color="primary" className="mr-4" pill>
              Admin
            </Badge>
          )}
          {user.userType === 1 && (
            <Badge color="primary" className="mr-4" pill>
              Customer Admin
            </Badge>
          )}
          {user.userType === 2 && (
            <Badge color="primary" className="mr-4" pill>
              Staff
            </Badge>
          )}
          {user.userType === 3 && (
            <Badge color="primary" className="mr-4" pill>
              Guest
            </Badge>
          )}
        </td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={e => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Something else here
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    );
  }
}

export default UserRow;
