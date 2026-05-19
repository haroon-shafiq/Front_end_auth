import React from 'react'

const Notifications = ({ project }) => {

  const getAction = () => {

    switch (project.action) {
      case "Project Created":
        return (
          <p>
            Project <strong>{project.entityTitle}</strong> was created
          </p>
        );

      case "Invite sent to developer":
        return (
          <p>
            Invite sent to developer
            <strong> {project?.assignedToUser?.name} </strong>
            for project
            <strong> {project.entityTitle}</strong>
          </p>
        );

      case "Project Deleted":
        return (
          <p>
            Project <strong>{project.entityTitle}</strong> was deleted
          </p>
        );

      
      case "Bug Created":
        return (
          <p>
            Bug <strong>{project.entityTitle}</strong> was created
          </p>
        );

      case "Bug Assigned":
        return (
          <p>
            Bug <strong>{project.entityTitle}</strong> assigned to
            <strong> {project?.assignedToUser?.name}</strong>
          </p>
        );

      case "Bug Updated":
        return (
          <div className='space-y-2'> 
          <p>
            Bug <strong>{project.entityTitle}</strong> was updated
          </p>
          <p>Changed the fields <strong>{project.changedFields.join(", ") }</strong> </p>
          <p>new values are <strong>{project.newValues.join(", ")}</strong></p>
          </div> 
        );

      case "Bug Deleted":
        return (
          <p>
            Bug <strong>{project.entityTitle}</strong> was deleted.
          </p>
        );

      default:
        return (
          <p>{project.action}</p>
        );
        
    }
  };

  return (
    <div className="p-2 border ">
      {getAction()}
    </div>
  );
};

export default Notifications;