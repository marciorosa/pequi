'use client';

import { useState } from 'react';
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

const cookiePolicy = {
  title: 'Cookie Policy',
  lastUpdated: 'October 25, 2023',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content:
        "This Cookie Policy explains how AIForLawyers, Inc. ('AIForLawyers,' 'we,' 'us,' or 'our') uses cookies and similar technologies on our website and applications. This Cookie Policy should be read together with our Privacy Policy and Terms of Service. By using our services, you consent to our use of cookies as described in this policy.",
    },
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies',
      content:
        'Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies enhance your browsing experience by allowing websites to remember your preferences, understand how you use the website, and tailor content to your interests.',
    },
    {
      id: 'cookie-types',
      title: 'Types of Cookies We Use',
      content: 'We use different types of cookies for various purposes:',
      subsections: [
        {
          title: 'Essential Cookies',
          content:
            'These cookies are necessary for the operation of our website and services. They enable core functionality such as security, network management, and account access. You may disable these via browser settings, but this may affect functionality.',
        },
        {
          title: 'Performance Cookies',
          content:
            'These cookies collect information about how visitors use our website, such as which pages are visited most often. All information these cookies collect is aggregated and anonymous.',
        },
        {
          title: 'Functionality Cookies',
          content:
            'These cookies allow our website to remember choices you make (username, language, region) and provide enhanced, more personal features.',
        },
        {
          title: 'Targeting/Advertising Cookies',
          content:
            'These cookies are used to deliver advertisements more relevant to you and your interests, and to limit the number of times you see an advertisement.',
        },
        {
          title: 'Third-Party Cookies',
          content:
            'In addition to our own cookies, we may use various third-party cookies to report usage statistics, deliver advertisements, and provide other services.',
        },
      ],
    },
    {
      id: 'specific-cookies',
      title: 'Specific Cookies We Use',
      content: 'Here is a list of the main cookies we use:',
      cookieTable: [
        { name: 'auth_session', purpose: 'Maintains your authentication session', duration: 'Session', type: 'Essential' },
        { name: 'preferences', purpose: 'Stores your preferences and settings', duration: '1 year', type: 'Functionality' },
        { name: 'analytics_id', purpose: 'Collects anonymous data about site usage', duration: '2 years', type: 'Performance' },
        { name: 'marketing_id', purpose: 'Used for targeted advertising', duration: '90 days', type: 'Targeting' },
      ],
    },
    {
      id: 'third-party',
      title: 'Third-Party Cookies',
      content:
        'Our website uses services from the following third parties, which may place cookies on your device:',
      thirdParties: [
        { name: 'Google Analytics', purpose: 'Website analytics service that tracks and reports website traffic', privacyPolicy: 'https://policies.google.com/privacy' },
        { name: 'Stripe', purpose: 'Payment processing services', privacyPolicy: 'https://stripe.com/privacy' },
        { name: 'Intercom', purpose: 'Customer messaging platform', privacyPolicy: 'https://www.intercom.com/legal/privacy' },
        { name: 'LinkedIn', purpose: 'Social media tracking and advertising', privacyPolicy: 'https://www.linkedin.com/legal/privacy-policy' },
      ],
    },
    {
      id: 'managing-cookies',
      title: 'Managing Cookies',
      content:
        'Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. If you disable cookies, some features of our services may not function properly.',
      subsections: [
        {
          title: 'Browser Settings',
          content:
            'You can manage cookies through your browser settings. Instructions are available for Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge in their respective help sections.',
        },
        {
          title: 'Cookie Preference Tool',
          content:
            "You can also manage your preferences for certain types of cookies using our Cookie Preference Tool, accessible by clicking 'Cookie Settings' below.",
        },
        {
          title: 'Do Not Track',
          content:
            "Some browsers have a 'Do Not Track' feature. At this time, our system does not respond to browser 'Do Not Track' signals.",
        },
      ],
    },
    {
      id: 'policy-changes',
      title: 'Changes to This Cookie Policy',
      content:
        "We may update this Cookie Policy from time to time. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the 'Last Updated' date.",
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content:
        'If you have any questions about our use of cookies, please contact us at privacy@AIForLawyers.com or write to us at: AIForLawyers, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, USA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  cookieTable?: { name: string; purpose: string; duration: string; type: string }[];
  thirdParties?: { name: string; purpose: string; privacyPolicy: string }[];
};

export default function CookiesPageContent() {
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Transparency" title={cookiePolicy.title} lastUpdated={cookiePolicy.lastUpdated} />
      <LegalTOC items={cookiePolicy.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {cookiePolicy.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {section.cookieTable && (
              <div className="mb-8 ml-0 overflow-x-auto rounded-2xl border border-[#eceae7] bg-white shadow-[0_12px_28px_rgba(16,16,26,0.04)] sm:ml-12">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#eceae7] bg-[#f8f7f6]">
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#525252]">Cookie name</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#525252]">Purpose</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#525252]">Duration</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#525252]">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceae7]">
                    {section.cookieTable.map((cookie) => (
                      <tr key={cookie.name} className="transition-colors hover:bg-[#f8f7f6]/80">
                        <td className="px-5 py-4 font-medium text-[#10101A]">{cookie.name}</td>
                        <td className="px-5 py-4 text-[#525252]">{cookie.purpose}</td>
                        <td className="px-5 py-4 text-[#525252]">{cookie.duration}</td>
                        <td className="px-5 py-4">
                          <span className="inline-block rounded-full border border-[#e7e5e1] bg-[#f1f0ee] px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#525252]">
                            {cookie.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.thirdParties && (
              <div className="mb-8 ml-0 grid gap-4 sm:ml-12 sm:grid-cols-2">
                {section.thirdParties.map((party) => (
                  <div
                    key={party.name}
                    className="rounded-2xl border border-[#eceae7] bg-[#f8f7f6] p-6 transition-all duration-300 hover:border-[#d4d2ce] hover:shadow-[0_12px_28px_rgba(16,16,26,0.06)]"
                  >
                    <h3 className="mb-2 text-[1.0625rem] font-medium text-[#10101A]">{party.name}</h3>
                    <p className="mb-3 text-[0.9375rem] leading-[160%] text-[#525252]">{party.purpose}</p>
                    <a
                      href={party.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#10101A] hover:underline"
                    >
                      Privacy policy
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {index < cookiePolicy.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>

      {showCookieSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10101A]/25 p-4 backdrop-blur-sm md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
        >
          <div className="w-full max-w-2xl rounded-[2rem] border border-[#eceae7] bg-white p-8 shadow-[0_24px_64px_rgba(16,16,26,0.12)] md:p-10">
            <h2 id="cookie-prefs-title" className="mb-8 text-[1.5rem] font-medium text-[#10101A]">
              Cookie preferences
            </h2>
            <div className="mb-10 space-y-2">
              {[
                { label: 'Essential Cookies', desc: 'Required for basic website functionality', locked: true, defaultOn: true },
                { label: 'Performance Cookies', desc: 'Help us improve our website by collecting anonymous data', locked: false, defaultOn: true },
                { label: 'Functionality Cookies', desc: 'Allow personalization of your experience', locked: false, defaultOn: true },
                { label: 'Targeting/Advertising Cookies', desc: 'Used to deliver relevant ads based on your interests', locked: false, defaultOn: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 border-b border-[#eceae7] py-4 last:border-0">
                  <div>
                    <h3 className="mb-1 text-[1rem] font-medium text-[#10101A]">{item.label}</h3>
                    <p className="text-[0.9375rem] leading-[150%] text-[#525252]">{item.desc}</p>
                  </div>
                  <div
                    className={`relative inline-flex h-6 w-12 shrink-0 rounded-full transition-colors ${item.defaultOn ? 'bg-[#10101A]' : 'bg-[#e7e5e1]'} ${item.locked ? 'opacity-60' : ''}`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm ${item.defaultOn ? 'right-1' : 'left-1'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-[0.875rem] border border-[#e7e5e1] bg-[#f1f0ee] px-6 py-3 text-[0.9375rem] font-medium text-[#10101A] transition-colors hover:bg-[#eceae7]"
                onClick={() => setShowCookieSettings(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
                onClick={() => setShowCookieSettings(false)}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      <LegalLinkGrid
        title="Additional resources"
        items={[
          {
            href: '/privacy-policy',
            title: 'Privacy Policy',
            desc: 'Learn how we collect, use, and protect your personal information.',
            label: 'Read Privacy Policy',
          },
          {
            href: '/terms',
            title: 'Terms of Service',
            desc: 'Read the terms that govern your use of our platform.',
            label: 'Read Terms',
          },
        ]}
      />
      <LegalFooterBar
        printLabel="Print this policy"
        emailLabel="privacy@AIForLawyers.com"
        emailHref="mailto:privacy@AIForLawyers.com"
        extra={
          <button
            type="button"
            onClick={() => setShowCookieSettings(true)}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[#525252] transition-colors hover:text-[#10101A]"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cookie settings
          </button>
        }
      />
    </main>
  );
}
