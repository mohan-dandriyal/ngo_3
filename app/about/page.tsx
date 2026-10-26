import React from 'react'
import AboutHero from '../components/aboutCom/AboutHero'
import about from '@/app/data/about.json'
import OurMission from '../components/aboutCom/OurMission'
import OurVision from '../components/aboutCom/OurVision'
import JoinMission from '../components/aboutCom/JoinMission'

function About() {
  return (
    <div>
      <AboutHero data={about.aboutHero} />

      <div>
        <OurMission missionPoints ={about.mission} />
      </div>

      <div>
        <OurVision data={about.vision} />
      </div>

      {/* <div>
        <OurImpact data={about.impact} />
      </div> */}

      <div>
        <JoinMission data={about.joinMission} />
      </div>
    </div>
  )
}

export default About