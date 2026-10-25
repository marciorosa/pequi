'use client';

import {
  LegalDivider,
  LegalFooterBar,
  LegalHero,
  LegalLinkGrid,
  LegalMain,
  LegalParagraph,
  LegalSectionTitle,
  LegalSubsection,
  LegalTOC,
} from '@/app/components/legal/LegalDocChrome';

const privacyPolicy = {
  title: 'Privacy Policy',
  lastUpdated: 'November 10, 2023',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content:
        'At AIForLawyers, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.',
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      content: 'We collect information in several ways when you use our services:',
      subsections: [
        {
          title: 'Personal Information You Provide',
          content:
            'We collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and services, participate in activities on our services, or otherwise contact us. This may include names, email addresses, billing information, and other information you choose to provide.',
        },
        {
          title: 'Information Automatically Collected',
          content:
            'When you use our services, we automatically collect certain information about your device and how you interact with our services. This includes device data (IP address, browser type, operating system) and usage data (pages visited, time spent, referring website addresses).',
        },
        {
          title: 'Legal Documents and Content',
          content:
            'When you upload or create legal documents and content using our services, we collect and store that information. This may include sensitive legal information related to your cases, contracts, and other legal matters.',
        },
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      content: 'We may use the information we collect for various purposes, including to:',
      bulletPoints: [
        'Provide, operate, and maintain our services',
        'Improve, personalize, and expand our services',
        'Understand and analyze how you use our services',
        'Develop new products, services, features, and functionality',
        'Communicate with you directly or through our partners',
        'Process your transactions and manage your account',
        'Send you emails and updates about our services',
        'Find and prevent fraud or other harmful activities',
      ],
    },
    {
      id: 'sharing-information',
      title: 'Sharing Your Information',
      content: 'We may share your information in the following situations:',
      subsections: [
        {
          title: 'With Service Providers',
          content:
            'We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.',
        },
        {
          title: 'Business Transfers',
          content:
            'We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
        },
        {
          title: 'Legal Requirements',
          content:
            'We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes.',
        },
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content:
        'We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. Please remember that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content:
        'We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. When we no longer need to use your data, we will either securely delete or anonymize it.',
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      content: 'Depending on your location, you may have certain rights regarding your personal information, such as:',
      bulletPoints: [
        'Right to access – Request copies of your personal information.',
        'Right to rectification – Request correction of inaccurate or incomplete information.',
        'Right to erasure – Request that we erase your personal information.',
        'Right to restrict processing – Request that we restrict processing of your information.',
        'Right to data portability – Request transfer of your personal information.',
        'Right to object – Object to our processing of your personal information.',
      ],
      additionalContent:
        'To exercise any of these rights, please contact us at privacy@AIForLawyers.com. We will respond to your request within 30 days.',
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      content:
        'Our services are operated in the United States. If you are located in the European Economic Area, United Kingdom, or other regions with laws governing data collection, please note that we may transfer information to a country without the same data protection laws as your jurisdiction. We will take all steps reasonably necessary to ensure your data is treated securely.',
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content:
        "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we might have any information from or about a child under 18, please contact us at privacy@AIForLawyers.com.",
    },
    {
      id: 'changes-to-policy',
      title: 'Changes to This Privacy Policy',
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content:
        'If you have any questions about this Privacy Policy, please contact us at privacy@AIForLawyers.com or write to us at: AIForLawyers, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, USA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  bulletPoints?: string[];
  additionalContent?: string;
};

export default function PrivacyPageContent() {
  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Data protection" title={privacyPolicy.title} lastUpdated={privacyPolicy.lastUpdated} />
      <LegalTOC items={privacyPolicy.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {privacyPolicy.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {section.bulletPoints && (
              <ul className="mb-6 list-none space-y-2.5 pl-0 sm:pl-12">
                {section.bulletPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9375rem] leading-[175%] text-[#525252] md:text-[1rem]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10101A]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {section.additionalContent && (
              <LegalParagraph className="mt-4 pl-0 sm:pl-12">{section.additionalContent}</LegalParagraph>
            )}
            {index < privacyPolicy.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>
      <LegalLinkGrid
        title="Additional resources"
        items={[
          {
            href: '/terms',
            title: 'Terms of Service',
            desc: 'Read our Terms of Service that govern your use of our platform.',
            label: 'Read Terms',
          },
          {
            href: '/cookies',
            title: 'Cookie Policy',
            desc: 'Learn about how we use cookies and similar technologies.',
            label: 'Read Cookie Policy',
          },
          {
            href: '/security',
            title: 'Security practices',
            desc: 'Discover how we protect your data and maintain security.',
            label: 'Learn about security',
          },
          {
            href: '/contact',
            title: 'Data request',
            desc: 'Request a copy of your data or exercise your privacy rights.',
            label: 'Contact privacy team',
          },
        ]}
      />
      <LegalFooterBar printLabel="Print this policy" emailLabel="privacy@AIForLawyers.com" emailHref="mailto:privacy@AIForLawyers.com" />
    </main>
  );
}
