# Specification

## Summary
**Goal:** Add a new React + TypeScript “User Details” form screen with required-field validation and a simple success state.

**Planned changes:**
- Create a new reachable frontend page/screen that renders a “User Details” form with labeled inputs for First name, Last name, and Email, plus a primary Submit button (English text).
- Implement client-side validation: required checks for all fields and basic email format validation, showing inline field-level error messages and preventing submission while errors exist.
- On valid submission, display a clear success message and log/print the collected form values (no backend persistence).
- Apply consistent styling using Tailwind and existing UI components (no edits to `frontend/src/components/ui`), including accessible labels, focus states, and distinct error styling.

**User-visible outcome:** Users can open a “User Details” form, enter first/last name and email, see inline validation errors when fields are missing/invalid, and successfully submit to get a confirmation message while the entered values are logged/printed.
