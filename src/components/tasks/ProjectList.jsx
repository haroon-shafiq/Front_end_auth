// 'use client'
// import React, { useContext, useEffect, useState } from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { DeveloperTable } from '@/constants/table'
// import { AuthContext } from '@/contexts/AuthContext';
// import { getProjectsByDeveloper } from '@/services/projects';

// const ProjectList = () => {
//       const { user } = useContext(AuthContext);
//       const [projects, setProjects] = useState([]);
    
//       useEffect(() => {
//         if (!user?.id) return;
//         const fetchProjects = async () => {
//           try {
//             const data = await getProjectsByDeveloper();
//             setProjects(data || []);
//           } catch (error) {
//             console.error("Error fetching projects", error);
//           }
//         };
//         fetchProjects();
//       }, [user?.id]);


//   return (
//     <div className="w-full">
//       <div className="max-w-[1040px] mx-auto">
//         <div className="flex justify-between items-center mt-10">
//           <h1>Project List</h1>
//         </div>
//         <div className="mt-10 border rounded overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {DeveloperTable.map((col, index) => {
//                   if (index < 3) {
//                     return <TableHead key={index}>{col.label}</TableHead>;
//                   }
//                   return null;
//                 })}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {projects.map((project) => (
//                 <TableRow key={project.id}>
//                   <TableCell>{project.name}</TableCell>
//                   <TableCell>
//                     {project.description || "No description available"}
//                   </TableCell>
//                   <TableCell>
//                     {project.manager.name}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectList