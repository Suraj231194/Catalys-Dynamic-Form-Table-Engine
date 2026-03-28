# FormTablePro — Configuration-Driven React Application

A production-grade React application that renders **dynamic forms** and **dynamic data tables** entirely from JSON configuration. Built with **React 19**, **TypeScript (Strict Mode)**, and **Tailwind CSS v4**.

---

## 🌟 Executive Summary

This project demonstrates a robust "Headless UI" approach where the metadata (JSON schemas) controls the presentation layer. By decoupling the field definitions from the UI components, the application allows for rapid iteration and runtime UI changes without core code modifications.

### 🎯 Objective
> Build a configuration-driven React application that renders dynamic forms and dynamic data tables while demonstrating clean component architecture and strong React fundamentals.

---

## ✨ Features & Capabilities

### 📋 Dynamic Form Engine
- **Schema-Driven**: Render any supported field type via JSON.
- **Field Types**: Text, Number, Select (Custom), Checkbox (Switch), and Date.
- **Validation**: Strict required field checks and custom numeric boundaries (e.g., Age 0-100).
- **Conditional Visibility**: Logic-based rendering (e.g., show "Joining Date" only when "Active" is toggled).
- **Premium UI**: Custom-built Select components to bypass native browser styling limitations.

### 📊 Dynamic Table (TanStack Table v8)
- **Column-Aware**: Renders columns dynamically from metadata.
- **Advanced Controls**: Global real-time filtering, column-level sorting, and pagination.
- **Visibility Management**: Built-in column visibility toggle menu.
- **Type-Safe Rendering**: Custom cell formatters for Booleans (Status Badges) and Date objects.
- **Instant Sync**: Global state management ensures the table reflects form submissions immediately.

### 💎 UI/UX Design System
- **Dark Mode Aesthetic**: Sleek Obsidian-themed dark mode with **Glassmorphism** effects.
- **Visual Polish**: Gradient mesh backgrounds, backdrop blurs, and micro-animations.
- **Responsiveness**: Mobile-first architecture using a precision-tuned Tailwind grid.
- **Notifications**: Custom "Toast" system for non-intrusive user feedback.

---

## 🏗️ Technical Architecture

### Design Decisions & Rationale

| Feature | Design Choice | Rationale |
| :--- | :--- | :--- |
| **State Management** | **Context + useReducer** | Provides a centralized "Source of Truth" without the overhead of heavy libraries like Redux or Zustand. |
| **Form Logic** | **Custom `useForm` Hook** | Separates validation and state logic from JSX, making the `FormRenderer` completely generic. |
| **Table Engine** | **TanStack Table** | Leverages the most powerful headless table library for React, ensuring performance and flexibility. |
| **Styling** | **Tailwind CSS v4** | Utilizes the latest `@theme` tokens for a unified design language across all components. |
| **Type Safety** | **Strict TypeScript** | Eliminates runtime errors and provides excellent DX with discriminated unions and strict interfaces. |

### Project Structure
```text
src/
├── components/          # Presentation Layer
│   ├── Form/           # Field-level and Form-level components
│   ├── Table/          # DataTable wrapper and sub-components
│   ├── Layout/         # Header, Footer, and Shell
│   └── UI/             # Shared atom components (Cards, Toasts)
├── config/             # Metadata Layer (JSON Schemas)
├── context/            # Logic Layer (Global State)
├── hooks/              # Abstraction Layer (Form validation & state)
├── types/              # Definitions Layer (Interfaces)
└── index.css           # Design Tokens Layer
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Launch the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
Generate a production-ready bundle:
```bash
npm run build
```

---

## 🔌 Assignment Fulfillment Checklist

- [x] **React 18+** (Version 19 Used)
- [x] **TypeScript Strict Mode** (0 Any types)
- [x] **Tailwind CSS** (v4 Used)
- [x] **TanStack React Table** (v8 Used)
- [x] **Schema-driven Forms**
- [x] **Real-time Table Updates**
- [x] **Sorting, Filtering, Column Toggle**
- [x] **Conditional Field Logic**
- [x] **Standard Initial Dataset Handling**

---

## 📝 Design Decisions: Deep Dive

### 1. Custom Select vs Native Select
We implemented a **Custom Listbox** using pure Tailwind CSS. Native `<select>` elements vary significantly across browsers (Chrome/Safari/Firefox) and do not support premium styling (like custom focus rings or backdrop blurs on the options menu). Our implementation ensures a consistent, high-end experience everywhere.

### 2. Validation Strategy
Instead of external libraries, we built a lightweight, extensible validation engine inside the `useForm` hook. This allows it to handle complex cases like "Age between 0 and 100" or "Conditional Required" fields without bloating the bundle size.

---

## 📜 License
MIT © 2026 FormTablePro Team
