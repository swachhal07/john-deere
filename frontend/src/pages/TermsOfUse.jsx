import LegalPage from '../components/LegalPage'

// Content sourced from mvdugar.com/terms-of-use, adapted for the
// MV Dugar · John Deere Nepal site.
const sections = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'By visiting or using MV Dugar’s website, you agree to comply with these Terms & Conditions and all applicable laws and regulations. If you do not agree, you must not use our website.',
    ],
  },
  {
    heading: 'About MV Dugar',
    body: [
      'MV Dugar (“we,” “our,” or “us”) is a leading business conglomerate in Nepal, with diversified interests across energy, trading, manufacturing, and other sectors, and is the authorized distributor of John Deere in Nepal. MV Dugar is committed to powering Nepal’s growth through innovation, sustainability, and excellence.',
      'All content provided on our website is for informational purposes only. Always verify details with our team before making any business decisions based on information found on this site.',
    ],
  },
  {
    heading: 'Use of Website',
    body: [
      'You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the site. Prohibited activities include:',
      [
        'Uploading harmful or malicious code.',
        'Misrepresenting your identity.',
        'Using the site for fraudulent or illegal purposes.',
      ],
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on this website — including text, images, descriptions, logos, and designs — is owned by or licensed to MV Dugar and is protected by copyright, trademark, and other intellectual property laws. You may not use, copy, or reproduce any content without our prior written consent.',
    ],
  },
  {
    heading: 'Services and Information',
    body: [
      'We aim to keep all information on our website accurate and up to date, but errors may occur. Information about our services, operations, and offerings is subject to change without notice. We reserve the right to modify or discontinue any service at any time.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, MV Dugar will not be liable for any direct, indirect, incidental, or consequential damages arising from:',
      [
        'Use or inability to use our website or products.',
        'Reliance on any content provided on our site.',
        'Delays, interruptions, or errors in site performance.',
      ],
    ],
  },
  {
    heading: 'External Links',
    body: [
      'Our website may contain links to third-party websites for convenience. We are not responsible for the content, security, or privacy practices of these external sites.',
    ],
  },
  {
    heading: 'User-Generated Content',
    body: [
      'If you submit inquiries, feedback, or other content to our site, you grant MV Dugar a non-exclusive, royalty-free license to use, display, and distribute that content for promotional purposes.',
    ],
  },
  {
    heading: 'Indemnification',
    body: [
      'You agree to indemnify and hold MV Dugar, its affiliates, and employees harmless from any claims, damages, or expenses resulting from your violation of these Terms & Conditions.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these Terms & Conditions at any time without prior notice. The updated version will be posted on this page with the “Last Updated” date revised.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These Terms & Conditions are governed by the laws of Nepal, without regard to conflict of law principles. Any disputes will be subject to the exclusive jurisdiction of the courts in Kathmandu, Nepal.',
    ],
  },
]

export default function TermsOfUse() {
  return (
    <LegalPage
      label="MV Dugar · Legal"
      title="Terms &"
      accent="conditions."
      updated="July 5, 2026"
      intro="Welcome to MV Dugar’s website. By accessing or using our site, you agree to be bound by the following Terms & Conditions. Please read them carefully before using our website or services."
      sections={sections}
    />
  )
}
