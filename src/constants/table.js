const MANAGER_TABLE_HEADER = [
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
  { id: 5, label: "Email" },
  {id:6, label: "Status of Invitation"},
  { id: 7, label: "Action" },
];
const BUG_TABLE_HEADER = [
  { id: 1, label: "Name" },
  { id: 2, label: "deadline" },

  {
    id: 3,
    label: "Type",
  },
  { id: 4, label: "Status" },
  { id: 5, label: "Assigned Developer" },
  { id: 6, label: "Actions" },
];
const BUG_TYPE = [
  { id: 1, label: "FEATURE" },
  { id: 2, label: "BUG" },
];
const BUG_STATUS = [
  { id: 1, label: "NEW" },
  { id: 2, label: "STARTED" },
  { id: 3, label: "RESOLVED" },
  { id: 4, label: "COMPLETED" },
];
const DEVELOPER_TABLE_HEADER = [
  { id: 1, label: "Project" },
  { id: 2, label: "Description" },
  { id: 3, label: "Manager " },
  { id: 4, label: "Bug Title" },
  { id: 5, label: "Status" },
  { id: 6, label: "deadline" },
  { id: 7, label: "Action" },
];
const MANAGER_INFO_TABLE = [
  { id: 1, label: "Project Name" },
  { id: 2, label: "Manager Name" },
  { id: 3, label: "Description" },
  { id: 4, label: "Deadline" },
];
const STATUSES = [
  { value: "NEW",      },
  { value: "STARTED",  },
  { value: "RESOLVED", },
  { value: "COMPLETED",},
];
const MANAGERTABLEFORBUGS = [
   { id: 1, label: "Title" },
   { id: 2, label: "Description" },
   {id: 3, label: "Status" },
   { id: 4, label: "Type" },
   { id: 5, label: "Deadline" },
   {id: 7, label: "Actions"}
]
const BUGSDETAIL_TABLE_HEADER = [
  {
    id: 1,
    label: "Bug Title",
    key: "title",
  },
  {
    id:2,
    label: "Description",
    key: "description",
  },
  {
    id:3,
    label: "Status",
    key: "status",
  },
  {
    id:4,
    label: "Type",
    key: "type",
  },
  {
    id:5,
    label: "Deadline",
    key: "deadline",
    format: (value) =>
      value ? new Date(value).toLocaleDateString() : "N/A",
  },
];
export {
  MANAGER_TABLE_HEADER,
  BUG_TABLE_HEADER,
  BUG_TYPE,
  BUG_STATUS,
  DEVELOPER_TABLE_HEADER,
  MANAGER_INFO_TABLE,
  STATUSES,
  MANAGERTABLEFORBUGS,
  BUGSDETAIL_TABLE_HEADER
};
