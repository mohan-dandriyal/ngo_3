import React from 'react'

import data from '@/app/data/contact.json'
import ContactSection from '../components/contact/ContactSection'
import InnerPageBanner from '../components/InnerPageBanner'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
  description: data.meta.blogDescription,
  openGraph: {
    title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
    description: data.meta.blogDescription,
  },
};

function ContactUs() {
  return (
    <div>
        <div>
          {/* <ContactHero data={data.contactHero} /> */}
           <InnerPageBanner data={data.contactHero} />
        </div>

        <div>
          <ContactSection
            data={data.contactSection as React.ComponentProps<typeof ContactSection>['data']}
          />
        </div>
    </div>
  )
}

export default ContactUs
