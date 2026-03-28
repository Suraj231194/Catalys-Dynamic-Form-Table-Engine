# FormTablePro — Configuration-Driven Engine

A production-grade, configuration-driven React application that renders **dynamic forms** and **interactive data tables** entirely from JSON schemas. Built for performance, type safety, and a premium user experience.

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:5173`.*

---

## ✨ Key Features & Assignment Fulfillment

- [x] **Dynamic Form Engine**: Supports Text, Number, Select, Checkbox, and Date fields with real-time validation.
- [x] **Advanced Table Logic**: Powered by **TanStack Table v8**. Includes sorting, search, pagination, and column visibility.
- [x] **Strict Validation**: Age field strictly limited to **0-100** with preventative input logic.
- [x] **Conditional Fields**: "Joining Date" renders dynamically based on the "Active" toggle status.
- [x] **Theme System**: Full **Light & Dark mode** support with custom SVG icons and glassmorphism.
- [x] **Context State**: Global state management via React Context API for instant cross-component updates.

---

## 🏗️ Technical Design Decisions (Brief)

| Feature | Choice | Rationale |
| :--- | :--- | :--- |
| **Architecture** | **Schema-Driven** | Allows UI changes via JSON without modifying core component logic (Headless UI). |
| **Logic** | **Custom Hooks** | `useForm` encapsulates all validation and state, keeping UI components "dumb" and reusable. |
| **Styling** | **Tailwind CSS v4** | Modern utility-first CSS for rapid development and zero runtime CSS overhead. |
| **Tables** | **TanStack Table** | Leverages a headless engine for flexible, high-performance data management. |
| **Type Safety** | **Strict TypeScript** | Ensures 100% type coverage, eliminating common runtime errors. |

---

## 🛠️ Project Structure
- `src/components`: UI components (Form, Table, Layout).
- `src/config`: JSON Schemas (Field definitions, table config).
- `src/context`: Global State (AppState, ThemeState).
- `src/hooks`: Application Logic (Form handling, validation).
- `src/types`: TypeScript interfaces for type safety.

---

## 📜 License
MIT © 2026 FormTablePro
