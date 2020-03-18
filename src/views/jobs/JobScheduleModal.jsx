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
import "react-datepicker/dist/react-datepicker.css";
// reactstrap components
import {
  Button, Modal, ModalHeader, ModalFooter, ModalBody,
} from "reactstrap";
import DatePicker from 'react-datepicker';


class JobSchedulModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledDate: null,
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      scheduledDate: date
    });
  }
  render() {
    return (
      <>
        <Modal isOpen={true}>
          <ModalHeader>Set Job Scheduled Date</ModalHeader>
          <ModalBody>
            <DatePicker
              selected={this.state.scheduledDate}
              onChange={this.handleChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMM d, yyyy h:mm aa"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.save(this.state.scheduledDate)}>Schedule</Button>{' '}
            <Button color="secondary" onClick={this.props.cancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default JobSchedulModal;
