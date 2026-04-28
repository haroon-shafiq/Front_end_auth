const managerTableHead = [
  {
    id: 1,
    label: "Project Name",
  },
  { id: 2, label: "Description" },
  { id: 3, label: "Deadline" },
  {
    id: 4,
    label: "Assigned Developer",
  },
];
const bugTableHead = [
  { id: 1, label: "Name" },
  { id: 2, label: "deadline" },
  { id: 3, label: "description" },
  {
    id: 4,
    label: "Type",
  },
  {id: 5, label: "Status" },
  {id: 6, label: "Assigned Developer" },
];
const BugType = [
    { id: 1, label: "FEATURE" },
    { id: 2, label: "BUG" }
];
const BugStatus = [
    { id: 1, label: "NEW" },
    { id: 2, label: "STARTED" },
    { id: 3, label: "RESOLVED" },
    { id: 4, label: "COMPLETED" },
];
export { managerTableHead, bugTableHead, BugType, BugStatus };
