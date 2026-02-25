# Project Brief

## Core Requirements and Goals
This project builds a minimal web frontend for creating silent Zammad tickets via a 3-field form:

- Fields: Customer E-mail (select with search + options), Ticket Name (text), Initial Note (textarea).
- E-mail field supports:
  - “My internal e-mail” (constant from VITE_INTERNAL_EMAIL).
  - Pick an existing user e-mail fetched from GET /api/v1/users.
  - “Enter a new e-mail…” then show an input to type a custom e-mail.
- On submit, create a silent ticket with POST /api/v1/tickets using an internal note (article.type = "note", article.internal = true) and customer_id: "guess:<email>".
- Resolve owner_id from GET /api/v1/users/me at runtime.
- group, state_id, and tags are global settings from env vars.

Objectives:
- Provide a simple, validated form for internal ticket creation without public visibility.
- Ensure production-friendly code with TypeScript, clean API handling, and basic testing.
- Support local development with Vite and easy setup.

## Source of Truth
(This document defines the project's foundation and shapes all other memory bank files.)
