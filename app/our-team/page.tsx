

import data from "@/app/data/tems.json"
import TeamSection from '../components/tems/TeamSection'
import InnerPageBanner from '../components/InnerPageBanner'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
  description: data.meta.blogDescription,
  openGraph: {
    title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
    description: data.meta.blogDescription,
  },
};

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