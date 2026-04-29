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

  {
    id: 3,
    label: "Type",
  },
  {id: 4, label: "Status" },
  {id: 5, label: "Assigned Developer" },
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
const DeveloperTable = [
    { id: 1, label: "Project Name" },
    { id: 2, label: "Description" },
    { id: 3, label: "Manager Assigned" },
    { id: 4, label: "QA Bugs" },
    {id: 5, label: "Bug Status"},
    {id: 6, label: "Bug deadline"}
]
export { managerTableHead, bugTableHead, BugType, BugStatus, DeveloperTable };
