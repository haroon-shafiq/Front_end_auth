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
  {id:5, label: "Email"},
  {id:6, label: "Action"}
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
  {id: 6, label: "Actions"}
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
    { id: 1, label: "Project" },
    { id: 2, label: "Description" },
    { id: 3, label: "Manager " },
    { id: 4, label: "Bug Title" },
    {id: 5, label: "Status"},
    {id: 6, label: "deadline"},
    {id: 7, label: "Action"}
]
const ManagerInfoTable = [
      { id: 1, label: "Project Name" },
      {id: 2, label: "Manager Name"},
      { id: 3, label: "Description" },
      { id: 4, label: "Deadline" },
]
export { managerTableHead, bugTableHead, BugType, BugStatus, DeveloperTable, ManagerInfoTable };
