import React from 'react'

import data from '@/app/data/contact.json'
import ContactHero from '../components/contact/ContactHero'
import ContactSection from '../components/contact/ContactSection'

function ContactUs() {
  return (
    <div>
        <div>
          <ContactHero data={data.contactHero} />
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
