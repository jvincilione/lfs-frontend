
const JobStatus = {
  PENDING: 0,
  ACCEPTED: 1,
  SCHEDULED: 2,
  AWAITING_PAYMENT: 3,
  CLOSED: 4,
  REJECTED: 5
};

export const JobStatusName = {
  0: "Pending",
  1: "Accepted",
  2: "Scheduled",
  3: "Awaiting Payment",
  4: "Closed / Paid",
  5: "Rejected"
};

export default JobStatus;
