import about from '@/app/data/about.json'
import OurMission from '../components/aboutCom/OurMission'
import OurVision from '../components/aboutCom/OurVision'
import JoinMission from '../components/aboutCom/JoinMission'
import InnerPageBanner from '../components/InnerPageBanner'

export const metadata = {
  title: "About Us | Change starts with showing up.",
  description: "Learn about Educare Foundation's mission, story, leadership, and our journey from one classroom to 25+ centers.",
};

function About() {
  return (
    <div>
      {/* <AboutHero data={about.aboutHero} /> */}
      <div>
        <InnerPageBanner data={about.aboutHero} />
      </div>

      <div>
        <OurMission missionPoints ={about.mission} />
      </div>

      <div>
        <OurVision data={about.vision} />
      </div>

      {/* <div>
        <JoinMission data={about.joinMission} />
      </div> */}
    </div>
  )
}

export default About