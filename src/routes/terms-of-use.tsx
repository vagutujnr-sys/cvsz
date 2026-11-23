import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/council-site";
import { pageHead } from "@/lib/council";

export const Route = createFileRoute("/terms-of-use")({
  head: () =>
    pageHead(
      "Terms of Use",
      "Terms of use information for the Council of Veterinary Surgeons of Zimbabwe website.",
    ),
  component: TermsOfUse,
});

function TermsOfUse() {
  return (
    <main>
      <PageBanner
        eyebrow="Website information"
        title="Terms of Use"
        description="Important information about using this website."
      />
      <section className="section-wrap">
        <p className="editorial-copy max-w-3xl">
          Website-specific terms of use have not yet been published. Content on
          this website is provided for general information and should not be
          treated as a substitute for current official guidance from the
          Council.
        </p>
        <p className="editorial-copy mt-5 max-w-3xl">
          Confirm registration, professional requirements, and other official
          matters directly with the Council.
        </p>
        <Link to="/contact" className="text-link mt-6">
          Contact the Council
        </Link>
      </section>
    </main>
  );
}
