'use client'
import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext,useEffect, useState } from 'react'
import { getAllBugs } from '@/services/bugs';
import { getALLProjects } from '@/services/projects';
import { getDevelopers } from '@/services/projects';
import { StatCard } from './StatCard';



const QADashboard = () => {
  const { user } = useContext(AuthContext);
  const [bugsLength, setBugsLength] = useState(null);
  const [projectsLength, setProjectsLength] = useState(null);
  const [developersLength, setDevelopersLength] = useState(null);

  const getBugsLength = async () => {
    try{
      const getBugs = await getAllBugs();
      const lengthofBugs = getBugs.totalCount;
      setBugsLength(lengthofBugs);
    }
    catch(error){
      console.error("Error:", error)
      throw error;
    }
  }
  const getProjectsLength = async () => {

    try{
      const getProjects = await getALLProjects();
      console.log("Length of Projects", getProjects)
      const lengthOfProjects = getProjects.totalCount;
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
      console.log("Length of Devs", getDevs.length)
      let lengthOfDev = getDevs.length;
       setDevelopersLength(lengthOfDev);
    }

    catch(error){
      console.error("Error:", error)
      throw error;
    }

  }

  useEffect(()=> {
    getBugsLength();
    getProjectsLength();
    getDevsLength();
  },[])

  return (
    <section className='w-full px-3 sm:px-4 md:px-6'>
      <div className='max-w-[1040px] mx-auto mt-6 md:mt-10'>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
             <StatCard title="Total Bugs" value={bugsLength} />
             <StatCard title="Total Projects" value={projectsLength} />
             <StatCard title="Total Developers" value={developersLength} />
        </div>

      </div>
    </section>
  )
}

export default QADashboard