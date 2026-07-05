import LegalPage from '../components/LegalPage'

// Content sourced from mvdugar.com/privacy-policy, adapted for the
// MV Dugar · John Deere Nepal site.
const sections = [
  {
    heading: 'Information We Collect',
    body: [
      'When you use our website or get in touch with us, we may collect the following information:',
      [
        'Contact details you provide through our enquiry form — your name, farm or company name, phone number, email address, and the contents of your message.',
        'Technical information about your visit, such as your browser type, device, and the pages you view, collected through cookies and similar technologies.',
      ],
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'We use the information collected for purposes such as:',
      [
        'Responding to inquiries and providing customer support.',
        'Processing bookings or requests for service inquiries.',
        'Sending updates, promotional materials, and newsletters (if you’ve opted in).',
        'Improving our website, products, and customer experience.',
        'Complying with legal obligations.',
      ],
    ],
  },
  {
    heading: 'How We Share Your Information',
    body: [
      'We do not sell your personal information. We may share your information only in the following circumstances:',
      [
        'With service providers who help us operate our website, marketing, or customer support.',
        'With our affiliated centers to arrange your bookings or provide local assistance.',
        'When required by law or to protect the rights, safety, and property of MV Dugar or others.',
      ],
    ],
  },
  {
    heading: 'Cookies and Tracking Technologies',
    body: [
      'We use cookies to:',
      [
        'Remember your preferences and settings.',
        'Understand how visitors interact with our site.',
        'Improve website performance and content.',
      ],
      'You can disable cookies in your browser settings, but some features of our site may not function properly.',
    ],
  },
  {
    heading: 'Your Privacy Rights',
    body: [
      'Depending on your location, you may have the right to:',
      [
        'Access, correct, or delete your personal information.',
        'Withdraw consent for marketing communications at any time.',
        'Request a copy of the data we hold about you.',
      ],
    ],
  },
  {
    heading: 'Data Security',
    body: [
      'We use appropriate technical and organizational measures to protect your information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the Internet is 100% secure.',
    ],
  },
  {
    heading: 'Data Retention',
    body: [
      'We will retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.',
    ],
  },
  {
    heading: 'Links to Other Websites',
    body: [
      'Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.',
    ],
  },
  {
    heading: 'Children’s Privacy',
    body: [
      'Our website and products are not directed toward individuals under the age of 18. We do not knowingly collect personal information from children.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy at any time without prior notice. The updated version will be posted on this page with the “Last Updated” date revised.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPage
      label="MV Dugar · Legal"
      title="Privacy"
      accent="policy."
      updated="July 5, 2026"
      intro="Welcome to MV Dugar’s website. By accessing or using our site, you agree to be bound by the following Privacy Policy. Please read it carefully before using our website or services."
      sections={sections}
    />
  )
}
