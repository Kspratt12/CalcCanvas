import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CalcCanvas",
  description: "CalcCanvas terms of service. Rules for using our free online calculators and tools.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: March 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          By using CalcCanvas (&quot;the Site&quot;), you agree to the following
          terms. If you do not agree, please do not use the Site.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Use of the Site
        </h2>
        <p>
          CalcCanvas provides free online calculators and utility tools for
          informational and educational purposes only. You may use the tools for
          personal or commercial purposes, but you may not redistribute,
          resell, or claim ownership of the tools or their source code.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Accuracy Disclaimer
        </h2>
        <p>
          While we strive to provide accurate calculations, CalcCanvas tools are
          provided &quot;as is&quot; without warranty of any kind. Results should
          be used as estimates only. For critical financial, medical, or legal
          decisions, consult a qualified professional.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Limitation of Liability
        </h2>
        <p>
          CalcCanvas and its operators shall not be liable for any damages
          arising from the use of, or inability to use, the tools on this site.
          This includes but is not limited to direct, indirect, incidental,
          punitive, and consequential damages.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Intellectual Property
        </h2>
        <p>
          All content on CalcCanvas, including text, graphics, logos, and
          software, is the property of CalcCanvas or its content creators and is
          protected by applicable intellectual property laws.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Third-Party Services
        </h2>
        <p>
          The Site may include advertisements and links to third-party websites.
          We are not responsible for the content or practices of these
          third-party services.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Changes to Terms
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued use
          of the Site after changes constitutes acceptance of the new Terms.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Contact
        </h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <strong>legal@calccanvas.com</strong>.
        </p>
      </div>
    </div>
  );
}
