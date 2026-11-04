

import data from "@/app/data/tems.json"
import TeamSection from '../components/tems/TeamSection'
import InnerPageBanner from '../components/InnerPageBanner'

function OurTeam() {
  return (
    <div>
      <div>
         <InnerPageBanner data={data.teamHero} />
      </div>

      <div>
        <TeamSection data={data.teamSection} />
      </div>
    </div>
  )
}

export default OurTeam