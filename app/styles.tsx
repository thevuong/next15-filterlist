const combinedStyles = `
  /* Global styles */
  @tailwind base; @tailwind components; @tailwind utilities;
  textarea, input { margin: 0; border: 1px solid #e4e4e7; background-color: white; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; }
  textarea:focus, input:focus { outline: 2px solid #3b82f6; outline-offset: -1px; }
  textarea:disabled, input:disabled { background-color: #f3f4f6; }
  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  table { width: 100%; border-collapse: collapse; border-spacing: 0; border: 1px solid #e4e4e7; }
  tr { width: 100%; border-bottom: 1px solid #e4e4e7; }
  th { white-space: nowrap; border-bottom: 1px solid #e4e4e7; background-color: #f9fafb; padding: 0.5rem 1rem; text-align: left; font-weight: 500; text-transform: uppercase; }
  th:not(:first-child):not(:last-child) { border-left: 1px solid #e4e4e7; }
  td { padding: 1rem; text-align: left; }
  .skeleton-animation { background: rgba(130, 130, 130, 0.2); background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%); background-size: 800px 100px; animation: wave-lines 2s infinite ease-out; }

  /* ProjectInfo styles */
  .w-fit { width: fit-content; }
  .bg-black { background-color: black; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .uppercase { text-transform: uppercase; }
  .text-white { color: white; }
  .flex { display: flex; }
  .gap-2 { gap: 0.5rem; }
  .gap-16 { gap: 4rem; }
  .font-bold { font-weight: bold; }
  .hidden { display: none; }
  .sm\\:flex { display: flex; }
  .md\\:flex { display: flex; }

  /* Layout styles */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .gap-10 { gap: 2.5rem; }
  .gap-6 { gap: 1.5rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .sm\\:px-16 { padding-left: 4rem; padding-right: 4rem; }
  .xl\\:px-48 { padding-left: 12rem; padding-right: 12rem; }
  .2xl\\:px-96 { padding-left: 24rem; padding-right: 24rem; }
  .h-\\[1px\\] { height: 1px; }
  .bg-primary { background-color: var(--color-primary); }
`.replace(/\s+/g, ' ');

const styles = JSON.parse(
  '"/*\\n! tailwindcss v3.4.5 | MIT License | https://tailwindcss.com\\n*/' + combinedStyles + '"',
);

export function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: styles,
      }}
    />
  );
}
