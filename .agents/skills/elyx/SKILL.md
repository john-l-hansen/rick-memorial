---
name: elyx
description: Design, validate, render, and compile Elyx design files (.elyx) in sync with Next.js web apps. Use whenever inspecting, editing, or rendering Elyx components, design tokens, or screens.
---

# Elyx Design System Skill

This skill guides design-to-code authoring and validation using the **Elyx** design engine.

## Core Workflows

### 1. Diagnostics & Validation
Always run diagnostics after authoring or modifying `.elyx` files:
```bash
elyx diagnostics "<path-or-workspace>"
```
Ensure 0 errors and 0 warnings before concluding changes.

### 2. High-Resolution Visual Rendering
Render any screen or component to a PNG for visual inspection:
```bash
elyx render -o "<output.png>" "<file.elyx>"
```

### 3. Syntax & Schema Lookups
Query official language documentation:
```bash
elyx man <topic>
# Examples: elyx man tokens, elyx man frame.layout, elyx man variants, elyx man border
```

### 4. Code Normalization & Formatting
```bash
elyx format "<file.elyx>"
elyx normalize "<file.elyx>"
```

## Language Rules

- **Tokens**: Must reside in named groups: `export colors = tokens { primary50: #FAF8F6, ... }`
- **Frames**: Prefer auto-layout `layout: { direction: .row | .column, item-gap: ... }` for responsive structures.
- **Variants**: Declare with bare `@variant` over a derived instance. Give board-level layers distinct `left:`/`top:` coordinates to prevent overlapping.
