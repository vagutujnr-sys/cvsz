import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/council-site";
import { pageHead } from "@/lib/council";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead(
      "Privacy Policy",
      "Privacy information for the Council of Veterinary Surgeons of Zimbabwe website.",
    ),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main>
      <PageBanner
        eyebrow="Website information"
        title="Privacy Policy"
        description="Privacy information for use of this website."
      />
      <section className="section-wrap">
        <p className="editorial-copy max-w-3xl">
          A website-specific privacy notice has not yet been published. For
          information about personal data held by the Council, contact the
          Registrar.
        </p>
        <p className="editorial-copy mt-5 max-w-3xl">
          Online verification and enquiry forms on this website are not
          connected to a submission service. Details entered into them are not
          sent or saved. Please do not enter sensitive personal information.
        </p>
        <p className="editorial-copy mt-5 max-w-3xl">
          This website also loads a third-party live-chat widget from Tawk.to.
          Information you choose to send through the chat is sent to that
          service. The WhatsApp link opens WhatsApp, where messages are handled
          under its privacy terms. Please do not share sensitive or confidential
          details through either service.
        </p>
        <Link to="/contact" className="text-link mt-6">
          Contact the Council
        </Link>
      </section>
    </main>
  );
}
