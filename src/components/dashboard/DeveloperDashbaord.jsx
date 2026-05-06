'use client'
import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext,useEffect, useState } from 'react'
import { getProjectsByDeveloper } from '@/services/projects';
import { getDevelopers } from '@/services/projects';
import { StatCard } from './StatCard';


const DeveloperDashbaord = () => {
  const { user } = useContext(AuthContext);

  const [bugsLength, setBugsLength] = useState(null);
  const [projectsLength, setProjectsLength] = useState(null);
  const [developersLength, setDevelopersLength] = useState(null);

  const getAssignBugsLength = async () => {
  try {
    const projects = await getProjectsByDeveloper();

    let count = 0;

    for (let i = 0; i < projects.length; i++) {
      if (projects[i]?.bugs) {
        count = count +  projects[i].bugs.length;
      }
    }

    console.log("Total Bugs:", count);
    setBugsLength(count);

  } catch (error) {
    console.error("Error:", error);
  }
};
  const getProjectsLength = async () => {

    try{
      const getProjects = await getProjectsByDeveloper();
      console.log("Length of Projects", getProjects.length)
      const lengthOfProjects = getProjects.length;
      setProjectsLength(lengthOfProjects);
    }

    catch(error){
      console.error("Error:", error)
      throw error;
    }

  }
  const getDevsLength = async () => {

    try{
      const getDevs = await getDevelopers();
      console.log("Length of Devs", getDevelopers.length)
      const lengthOfDevs = getDevs.length;
      setDevelopersLength(lengthOfDevs);
    }

    catch(error){
      console.error("Error:", error)
      throw error;
    }

  }

  useEffect(()=> {
    getAssignBugsLength();
    getProjectsLength();
    getDevsLength();
  },[])

  return (
    <section className='w-full px-3 sm:px-4 md:px-6'>
      <div className='max-w-[1040px] mx-auto mt-6 md:mt-10'>
        <h1>Welcome {user.name}</h1>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
             <StatCard title="Total Assigned Bugs" value={bugsLength} />
             <StatCard title="Total Projects" value={projectsLength} />
             <StatCard title="Total Developers" value={developersLength} />
        </div>

      </div>
    </section>
  )
}

export default DeveloperDashbaord