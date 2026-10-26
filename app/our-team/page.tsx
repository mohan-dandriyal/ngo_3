
import React from 'react'
import TeamHero from '../components/tems/TemsHero'

import data from "@/app/data/tems.json"
import TeamSection from '../components/tems/TeamSection'

function OurTeam() {
  return (
    <div>
      <div>
        <TeamHero data={data.teamHero}  />
      </div>

      <div>
        <TeamSection data={data.teamSection} />
      </div>
    </div>
  )
}

export default OurTeam