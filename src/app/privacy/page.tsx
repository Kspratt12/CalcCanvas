import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CalcCanvas",
  description: "CalcCanvas privacy policy. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: March 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          CalcCanvas (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and safeguard information when you visit
          calccanvas.com.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Information We Collect
        </h2>
        <p>
          CalcCanvas tools run entirely in your browser. We do not collect,
          store, or transmit any data you enter into our calculators or tools.
          Your inputs never leave your device.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Analytics
        </h2>
        <p>
          We may use third-party analytics services (such as Google Analytics)
          to understand how visitors use our site. These services may collect
          anonymized data such as pages visited, time on site, and general
          location. No personally identifiable information is collected through
          analytics.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Advertising
        </h2>
        <p>
          We may display advertisements through third-party ad networks (such as
          Google AdSense). These networks may use cookies to serve ads based on
          your prior visits to this or other websites. You can opt out of
          personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-[#2563eb] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ad Settings
          </a>
          .
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Cookies
        </h2>
        <p>
          CalcCanvas itself does not set cookies. However, third-party services
          we use (analytics, advertising) may set cookies in your browser. You
          can manage or disable cookies through your browser settings.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Third-Party Links
        </h2>
        <p>
          Our site may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites. We encourage you
          to review their privacy policies.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Children&apos;s Privacy
        </h2>
        <p>
          CalcCanvas is not directed at children under 13. We do not knowingly
          collect personal information from children.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated date.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Contact
        </h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <strong>privacy@calccanvas.com</strong>.
        </p>
      </div>
    </div>
  );
}
