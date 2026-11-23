## Application architecture
- Use TanStack file-based routes with route-specific metadata for every public Council page, so direct links and browser navigation remain reliable.
- Keep shared Council navigation, footer and transient form dialogs in CouncilSite, so all pages use a consistent accessible experience without persistence.
- Keep verification validation and informational article data in a browser-safe Council module, so honesty safeguards can be tested without a backend.
- Define the institutional visual system in src/styles.css and use semantic Button variants, so styling remains consistent across pages.
