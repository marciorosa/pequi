import Link from 'next/link';

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 bg-[#F5F5F4]">
      <p className="text-[#868589] text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-3">Case studies</p>
      <h1 className="text-[#111827] text-[1.75rem] md:text-[2rem] font-medium text-center">Case study not found</h1>
      <p className="text-[#636977] text-[1rem] mt-3 text-center max-w-md">
        This story may have moved. Browse all client success stories on the hub.
      </p>
      <Link
        href="/case-studies"
        className="mt-8 inline-flex rounded-[0.875rem] bg-[#111827] text-white px-6 py-3.5 text-[0.9375rem] font-medium hover:bg-[#0f172a] transition-colors"
      >
        Back to case studies
      </Link>
    </div>
  );
}
