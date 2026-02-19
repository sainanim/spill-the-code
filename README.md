# Spill The Code – Website Documentation

This is the official source code for the **Spill The Code** website built using **Next.js (App Router)** and **Tailwind CSS**. This guide is written for future developers or the client to help modify or maintain the project with clarity...

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Structure**: Component-based architecture

---

## 🗂️ Project Structure Overview

```bash
├── public/              # Static assets (logos, images, SVGs)
├── src/
│   ├── app/             # Pages and API routes (App Router)
│   ├── components/      # Reusable UI components and sections
│   └── lib/             # Utility functions
├── components.json      # (Optional) Registry for component data
├── next.config.ts       # Next.js config
├── package.json         # Dependencies and scripts
├── postcss.config.mjs   # Tailwind/PostCSS setup
├── tsconfig.json        # TypeScript settings
└── README.md            # This documentation file
```


---

## 🏠 Home Page (Main Landing)

File: `src/app/page.tsx`

Sections used (in order):

- `HeroSection` – Landing hero with CTA
- `AboutUsSection` – Overview of the company (has `id="about-us"`)
- `DescriptionSection` – Describes the offering or mission
- `WhatMakesUsUniqueSection` – Unique selling points
- `OurMotto` – Company's tagline or belief
- `ContactUsSection` – Contact form and contact details (`id="contact-us"`)

### Commented Out (Can be re-enabled as needed):

- `TestimonialsSection`
- `MeetOurTeamSection`
- `ExperienceSection`

> 💡 You can edit the order or remove sections by updating the JSX in `src/app/page.tsx`.

---

## 📄 Other Pages

- `/courses` → `src/app/courses/page.tsx`
- `/team` → `src/app/team/page.tsx`
- `/test` → `src/app/test/page.tsx`

---

## 📦 Components Breakdown

### 🏠 Home Page Components (`src/components/home/`)

- `HeroSection.tsx` – Visual header with primary message
- `DescriptionSection.tsx` – Text-based summary
- `WhatMakesUsUniqueSection.tsx` – Key feature highlights
- `TestimonialsSection.tsx` – User reviews/testimonials (optional)
- `ContactUsSection.tsx` – Form and contact methods
- `OurMotto.tsx` – Belief or vision statement
- `ExperienceSection.tsx` – Timeline or achievements (optional)

### 👥 Team Section (`src/components/team/`)

- `MeetOurTeamSection.tsx` – Team introductions (optional)
- `TeamCertificatesSection.tsx` – Certificates or recognition (not currently used)

### 🧱 UI Components (`src/components/ui/`)

- `badge.tsx` – Reusable badge UI element
- `card.tsx` – Custom card-style container

### 🌐 Global Components

- `Header.tsx` – Top navigation bar
- `Footer.tsx` – Bottom footer
- `CourseModal.tsx` – Modal popup (used with course info)

---

## 🎨 Styling

- **Global CSS**: `src/app/globals.css`
- Uses **Tailwind CSS** utility-first classes

---

## 📁 Public Assets

Assets like images and SVGs are stored in `/public/`:

- `/spill_the_code_logo.png` – Brand logo
- `/globe.svg`, `/window.svg`, etc. – Icons and illustrations

> Use them like: `<img src="/spill_the_code_logo.png" alt="Logo" />`

---

## 🔧 API

### Enquiry Form API

- File: `src/app/api/send-enquiry/`
- This handles contact form submissions
- You can modify logic here to forward data to email, database, or webhook

---

## ⚙️ Util Functions

- `src/lib/utils.ts` – Add helper functions here (e.g. formatters, validators)

---

## ✏️ Making Changes (Common Edits)

| To Change...                  | Edit This File                                |
|------------------------------|-----------------------------------------------|
| Hero text/banner             | `components/home/HeroSection.tsx`             |
| About Us content             | `components/home/AboutUsSection.tsx`          |
| Company motto                | `components/home/OurMotto.tsx`                |
| Unique offerings/features    | `components/home/WhatMakesUsUniqueSection.tsx`|
| Footer info                  | `components/Footer.tsx`                        |
| Navigation links             | `components/Header.tsx`                        |
| Contact form logic           | `api/send-enquiry/route.ts` (or similar file) |

---

## 🧠 Developer Notes

- Built using **Next.js App Router** (no pages directory)
- Uses **TypeScript** for type safety
- Fully modular – Each section/component is isolated
- Follows best practices for scalability and readability

---

# 💻 Running the Project Locally

Follow these steps to get the project running locally:

1. **Ensure Node.js and npm are installed**
   Download from: [https://nodejs.org](https://nodejs.org) (Recommended Node.js ≥ 18)

2. **Clone the repository**

```bash
git clone https://github.com/Mihit10/spill-the-code.git   
cd spill-the-code
```

3. **Install dependencies**

```bash
npm install --force
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open in browser**

Visit: [http://localhost:3000](http://localhost:3000)

✅ You're all set to explore, modify, and build on *Spill The Code*!

