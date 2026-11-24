import { createFileRoute } from "@tanstack/react-router";
import crest from "@/assets/cvsz-logo.png";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/council";

export const Route = createFileRoute("/vet-account")({
  head: () =>
    pageHead(
      "Vet Account Access",
      "Sign-in page for the CVSZ Vet Account. Account access is not yet available.",
    ),
  component: VetAccount,
});

function VetAccount() {
  return (
    <main>
      <section className="vet-account-section">
        <div className="vet-account-card">
          <img
            src={crest}
            alt="Council of Veterinary Surgeons of Zimbabwe crest"
            width="72"
            height="72"
            className="vet-account-crest"
          />
          <h2 className="text-xl font-medium text-primary">Vet Account sign in</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Account access is not available yet. Details entered here are not sent or saved.
          </p>
          <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <div>
              <label className="form-label mt-0" htmlFor="vet-mobile-number">
                Mobile Number
              </label>
              <input
                id="vet-mobile-number"
                className="form-input"
                type="tel"
                autoComplete="tel"
                placeholder="+263 77 000 0000"
              />
            </div>
            <div>
              <label className="form-label mt-0" htmlFor="vet-pin">
                PIN
              </label>
              <input
                id="vet-pin"
                className="form-input"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter your PIN"
              />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled>
              Sign in — Coming Soon
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
