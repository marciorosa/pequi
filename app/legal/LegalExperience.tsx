'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthHero } from '@/app/components/auth/AuthPageChrome';
import { sectionHeadingClass, sectionSubTextClass } from '@/app/components/landingpage/sectionStyles';

const legalDocuments = {
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'November 15, 2023',
    sections: [
      {
        heading: '1. Introduction',
        content:
          "These Terms of Service ('Terms') govern your access to and use of AiForLawyers's website, services, and applications (collectively, the 'Services'). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.",
      },
      {
        heading: '2. Using our Services',
        content:
          'You may use our Services only as permitted by these Terms and any applicable laws. Our Services evolve constantly, and we may change, suspend, or discontinue any aspect of our Services at any time, including the availability of any feature or content.',
      },
      {
        heading: '3. Your AiForLawyers Account',
        content:
          'To use certain features of our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      },
      {
        heading: '4. Privacy',
        content:
          'Our Privacy Policy explains how we collect, use, and protect your information when you use our Services. By using our Services, you agree to the terms of our Privacy Policy.',
      },
      {
        heading: '5. Intellectual Property',
        content:
          'Our Services, including all text, graphics, images, logos, software, and other content, are owned by or licensed to AiForLawyers and are protected by copyright, trademark, and other intellectual property laws.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'November 10, 2023',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'We collect information that you provide directly to us, such as when you create an account, use our Services, or communicate with us. This information may include your name, email address, and any other information you choose to provide.',
      },
      {
        heading: '2. How We Use Your Information',
        content:
          'We use the information we collect to provide, maintain, and improve our Services; to communicate with you; to protect our Services and users; and to comply with legal obligations.',
      },
      {
        heading: '3. Data Security',
        content:
          'We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.',
      },
      {
        heading: '4. Your Rights',
        content:
          'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict our use of your information. Contact us at privacy@AiForLawyers.com.',
      },
      {
        heading: '5. Changes to This Privacy Policy',
        content:
          'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    lastUpdated: 'October 25, 2023',
    sections: [
      {
        heading: '1. What Are Cookies',
        content:
          'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.',
      },
      {
        heading: '2. How We Use Cookies',
        content:
          'We use cookies to understand how you interact with our Services, remember your preferences, and improve your experience. This includes essential cookies, performance cookies, and targeting cookies.',
      },
      {
        heading: '3. Your Cookie Choices',
        content:
          'You can manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete cookies, or be notified when a cookie is being sent.',
      },
      {
        heading: '4. Third-Party Cookies',
        content:
          'Our Services may use third-party services that set their own cookies. We do not have control over these cookies. Please refer to the respective privacy policies of these third parties.',
      },
      {
        heading: '5. Changes to This Cookie Policy',
        content:
          'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.',
      },
    ],
  },
  compliance: {
    title: 'Compliance Information',
    lastUpdated: 'November 5, 2023',
    sections: [
      {
        heading: '1. General Data Protection Regulation (GDPR)',
        content:
          'We are committed to complying with the GDPR. We process personal data lawfully, transparently, and for specific purposes. We implement appropriate technical and organizational measures to ensure data security.',
      },
      {
        heading: '2. California Consumer Privacy Act (CCPA)',
        content:
          'In accordance with the CCPA, California residents have the right to know what personal information we collect, request deletion of their personal information, and opt-out of the sale of their personal information.',
      },
      {
        heading: '3. HIPAA',
        content:
          'For certain legal services related to healthcare, we may be subject to HIPAA requirements. We implement appropriate safeguards to protect the privacy and security of protected health information (PHI).',
      },
      {
        heading: '4. Security Measures',
        content:
          'We implement industry-standard security measures to protect your data, including encryption, access controls, regular security assessments, and employee training.',
      },
      {
        heading: '5. Reporting Security Concerns',
        content:
          'If you believe you have discovered a security vulnerability in our Services, please report it to security@AiForLawyers.com. We appreciate your help in making our Services more secure.',
      },
    ],
  },
};

const tabs = [
  { key: 'terms', label: 'Terms of Service' },
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'cookies', label: 'Cookie Policy' },
  { key: 'compliance', label: 'Compliance' },
] as const;

const certifications = ['SOC 2 Type II', 'GDPR Compliant', 'HIPAA Compliant', 'ISO 27001'];

const faqs = [
  {
    question: 'How does AiForLawyers handle data security?',
    answer:
      'We implement industry-standard security measures including encryption, access controls, and regular security assessments. All data is encrypted both in transit and at rest, and we maintain SOC 2 Type II certification.',
  },
  {
    question: 'Is AiForLawyers GDPR compliant?',
    answer:
      'Yes, we are fully GDPR compliant. We process personal data lawfully, transparently, and for specific purposes. We implement appropriate technical and organizational measures to ensure data security.',
  },
  {
    question: 'How do I request a copy of my data?',
    answer:
      'You can request a copy of your data by contacting our Data Protection Officer at privacy@AiForLawyers.com. We will process your request within 30 days in accordance with applicable data protection laws.',
  },
  {
    question: 'Does AiForLawyers share my data with third parties?',
    answer:
      'We only share your data with third parties as described in our Privacy Policy. This may include service providers who help us deliver our services, with appropriate data protection agreements in place.',
  },
];

export default function LegalExperience() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('terms');
  const activeDoc = legalDocuments[activeTab];

  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Transparency"
        title="Legal information"
        subtitle="Our commitment to clear policies, compliance, and security standards."
      />

      <section className="bg-[#F5F5F4] py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-full text-[0.875rem] font-medium transition-all border ${
                  activeTab === tab.key
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#636977] border-gray-200 hover:border-gray-300 hover:text-[#111827]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-[48rem] mx-auto rounded-[1.875rem] border border-gray-200 bg-white p-8 md:p-10 shadow-[0_20px_40px_rgba(17,24,39,0.06)]">
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-[#111827] text-[1.75rem] font-medium mb-2">{activeDoc.title}</h2>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#868589]">
                Last updated: {activeDoc.lastUpdated}
              </p>
            </div>
            <div className="space-y-8">
              {activeDoc.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-[#111827] text-[1.125rem] font-medium mb-2">{section.heading}</h3>
                  <p className="text-[#636977] text-[0.9375rem] leading-[175%]">{section.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-7 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[#636977] text-[0.9375rem]">
                Questions about these documents?{' '}
                <Link href="/contact" className="text-[#111827] font-medium hover:underline">
                  Contact us
                </Link>
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-[#868589] hover:text-[#111827] transition-colors text-[0.875rem] font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print document
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h2 className={sectionHeadingClass}>Our certifications</h2>
          <p className={`${sectionSubTextClass} mt-3 mb-10`}>Validated standards that support enterprise legal workflows.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-[1.25rem] border border-gray-200 bg-[#F5F5F4]/40 p-6 text-center hover:border-gray-300 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-[#111827] text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
                  {cert.split(' ')[0]}
                </div>
                <h3 className="text-[#111827] text-[0.9375rem] font-medium">{cert}</h3>
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#868589] mt-1">Certified</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F4] py-12 md:py-16">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h2 className={sectionHeadingClass}>Frequently asked questions</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.25rem] border border-gray-200 bg-white p-6">
                <h3 className="text-[#111827] text-[1rem] font-medium mb-3">{faq.question}</h3>
                <p className="text-[#636977] text-[0.9375rem] leading-[170%]">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[1.875rem] border border-gray-200 bg-[#111827] text-white p-8 md:p-10 text-center">
            <h3 className="text-[1.5rem] md:text-[1.75rem] font-medium mb-3">Still have questions?</h3>
            <p className="text-white/75 text-[1rem] max-w-2xl mx-auto mb-8">
              Our legal team can help with questions about terms, privacy, or compliance.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-[0.875rem] bg-white text-[#111827] px-8 py-3.5 text-[0.9375rem] font-medium hover:bg-[#f3f4f6] transition-colors"
            >
              Contact legal team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
