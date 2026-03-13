## M Talha Manzoor — Portfolio

World-class, dark premium portfolio built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Aceternity UI** components.

## Getting Started

Install deps and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

- **Data**: `lib/content.js` (projects, experience, skills, links)
- **Homepage sections**: `components/sections/*`
- **Project pages**: `app/projects/[slug]/page.js`

## CV

Place your PDF at:

- `public/resume/M_Talha_Manzoor_CV.pdf`

The navbar “Download CV” button links to that path.

## Notes on ReactBits

The site requested ReactBits components. **The `reactbits` package name is not published on npm**, so the project includes custom equivalents (cursor, split text, magnetic buttons) implemented with **Framer Motion**.

## Build

```bash
npm run build
npm start
```

