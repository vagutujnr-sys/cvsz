import { createFileRoute } from "@tanstack/react-router";
import crest from "@/assets/cvsz-logo.png";
import { PageBanner } from "@/components/council-site";
import { pageHead } from "@/lib/council";

export const Route = createFileRoute("/vet-registration")({
  head: () =>
    pageHead(
      "Register as a Legal Vet",
      "Information about registering with the Council of Veterinary Surgeons of Zimbabwe.",
    ),
  component: VetRegistration,
});

function VetRegistration() {
  return (
    <main>
      <PageBanner
        eyebrow="Veterinary registration"
        title="Register As A Legal Vet"
        description="Registration information for veterinary professionals."
      />
      <section className="section-wrap">
        <div className="vet-account-card">
          <img
            src={crest}
            alt="Council of Veterinary Surgeons of Zimbabwe crest"
            width="72"
            height="72"
            className="vet-account-crest"
          />
          <h2 className="text-xl font-medium text-primary">Professional registration</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Online registration is not available yet. The future Vet Account portal will provide
            application access and guidance.
          </p>
          <p className="mt-5 border-l-2 border-accent bg-surface p-4 text-sm font-medium text-foreground">
            A Registration Fee Will Be Required.
          </p>
        </div>
      </section>
    </main>
  );
}
