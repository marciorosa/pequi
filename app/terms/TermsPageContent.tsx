'use client';

import {
  LegalAcknowledgment,
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

const termsOfService = {
  title: 'Terms of Service',
  lastUpdated: 'November 15, 2023',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content:
        "By accessing or using AIForLawyers's website, services, and applications (collectively, the 'Services'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a binding legal agreement between you and AIForLawyers, Inc.",
      subsections: [
        {
          title: 'Eligibility',
          content:
            'You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet all eligibility requirements described in these Terms.',
        },
        {
          title: 'Changes to Terms',
          content:
            'We may modify these Terms at any time. By continuing to use our Services after we post modifications, you agree to be bound by the revised Terms.',
        },
      ],
    },
    {
      id: 'account',
      title: 'Your Account',
      content: 'To use certain features of our Services, you may need to create an account. Here are the terms that apply to your account:',
      subsections: [
        {
          title: 'Account Registration',
          content:
            'When you register for an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        },
        {
          title: 'Account Security',
          content:
            'You are responsible for maintaining the security of your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.',
        },
        {
          title: 'Account Termination',
          content:
            'We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we determine to be in violation of these Terms or otherwise harmful to other users, us, or third parties.',
        },
      ],
    },
    {
      id: 'services',
      title: 'Our Services',
      content:
        'AIForLawyers provides AI-powered legal tools and services designed to assist with legal research, document generation, contract analysis, and other legal tasks. Our Services are not a substitute for professional legal advice, and we do not provide legal advice or representation.',
      subsections: [
        {
          title: 'Service License',
          content:
            'Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use our Services for your legitimate business or personal purposes.',
        },
        {
          title: 'Service Limitations',
          content:
            'The information and documents provided through our Services are not intended to be a substitute for professional legal advice. You should always consult with a qualified attorney for specific advice tailored to your situation.',
        },
        {
          title: 'Service Modifications',
          content:
            'We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or without notice to you.',
        },
      ],
    },
    {
      id: 'fees',
      title: 'Fees and Payment',
      content: 'Certain features of our Services may require payment of fees. Here are the terms that apply to paid services:',
      subsections: [
        {
          title: 'Subscription Plans',
          content:
            'We offer various subscription plans with different features and pricing. We reserve the right to change our prices and subscription plans at any time.',
        },
        {
          title: 'Payment Processing',
          content:
            'You agree to pay all fees associated with your use of our Services in accordance with the pricing and payment terms presented to you. All payment obligations are non-cancelable, and fees paid are non-refundable, except as expressly provided in these Terms.',
        },
        {
          title: 'Subscription Renewal',
          content:
            'Subscriptions automatically renew at the end of each billing period unless you cancel your subscription before the renewal date.',
        },
      ],
    },
    {
      id: 'content',
      title: 'User Content',
      content:
        "Our Services may allow you to upload, submit, store, send, or receive content ('User Content'). Here are the applicable terms:",
      subsections: [
        {
          title: 'Content License',
          content:
            'You retain ownership of any intellectual property rights that you hold in your User Content. By uploading User Content, you grant us a worldwide, royalty-free license to use it for the limited purpose of operating and improving our Services.',
        },
        {
          title: 'Content Restrictions',
          content:
            'You may not upload User Content that violates any applicable law, infringes intellectual property rights, contains viruses or malware, is defamatory or obscene, or violates these Terms.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content:
        'Our Services and all content, features, and functionality thereof are owned by us, our licensors, or other providers and are protected by copyright, trademark, patent, and other intellectual property laws.',
      subsections: [
        {
          title: 'Restrictions',
          content:
            'You may not reproduce, distribute, modify, create derivative works of, or reverse engineer any part of our Services or Service Content without our express written consent.',
        },
      ],
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      content:
        "OUR SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE,' WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE EXPLICITLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS.",
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      content:
        'IN NO EVENT WILL WE OR OUR AFFILIATES BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. IN NO EVENT WILL OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO OUR SERVICES EXCEED THE GREATER OF $100 OR THE AMOUNT PAID BY YOU TO US IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.',
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Jurisdiction',
      content:
        'These Terms will be governed by the laws of the State of California without regard to its conflict of laws provisions. The exclusive jurisdiction and venue of any action will be the state and federal courts located in San Francisco County, California.',
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content:
        'If you have any questions about these Terms, please contact us at legal@AIForLawyers.com or write to us at: AIForLawyers, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, USA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
};

export default function TermsPageContent() {
  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Legal agreement" title={termsOfService.title} lastUpdated={termsOfService.lastUpdated} />
      <LegalTOC items={termsOfService.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {termsOfService.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {index < termsOfService.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>
      <LegalAcknowledgment ctaHref="/contact" ctaLabel="Contact us with questions">
        <h2 className="mb-4 text-[1.5rem] font-medium text-[#10101A] md:text-[1.75rem]">Acknowledgment</h2>
        <LegalParagraph className="max-w-2xl mx-auto">
          By using AIForLawyers&apos;s services, you acknowledge that you have read, understood, and agree to these Terms of Service.
        </LegalParagraph>
      </LegalAcknowledgment>
      <LegalLinkGrid
        title="Additional legal documents"
        items={[
          {
            href: '/privacy-policy',
            title: 'Privacy Policy',
            desc: 'Learn how we collect, use, and protect your personal information.',
            label: 'Read Privacy Policy',
          },
          {
            href: '/cookies',
            title: 'Cookie Policy',
            desc: 'Information about how we use cookies and similar technologies.',
            label: 'Read Cookie Policy',
          },
        ]}
      />
      <LegalFooterBar printLabel="Print these terms" emailLabel="legal@AIForLawyers.com" emailHref="mailto:legal@AIForLawyers.com" />
    </main>
  );
}
