Absolutely. Here is the **clean final Claude Code prompt**. I’ve removed the unnecessary Instagram-specific implementation details and kept the media carousel exactly as you described.

```text
You are a senior frontend developer and premium UI/UX designer.

Build the complete production-quality website for MAHUM Builders based on the project brief, company profile, and requirements provided in this project.

Before writing code, inspect the entire repository, existing files, assets, and project brief. Reuse useful existing work where appropriate.

Do not blindly generate the entire application before understanding the existing project.

==================================================
PROJECT
==================================================

Company:
MAHUM Builders

Business:
Construction + Real Estate Development

Website type:
Premium corporate website.

This is NOT an e-commerce website.

The website should communicate that MAHUM operates in two important areas:

1. MAHUM's own developments
2. Construction / turnkey projects executed for clients

This distinction should be clearly reflected throughout the website, especially in the Projects section.

==================================================
WEBSITE PAGES
==================================================

Build these 6 main pages:

1. Home
2. About Us
3. Services
4. Projects
5. Project Details
6. Contact Us

Project Details should be a reusable template for individual projects.

==================================================
DESIGN REFERENCE
==================================================

Primary reference:

https://monzainc.com/

Use Monza as inspiration for:

- Premium corporate feel
- Architectural presentation
- Editorial layouts
- Large project photography
- Typography
- Whitespace
- Project presentation
- Grid systems
- Section hierarchy
- Navigation quality

DO NOT CLONE MONZA.

Do not copy its exact:
- Layouts
- Branding
- Text
- Components
- Animations
- Visual identity

Use it only as a quality and design-direction reference.

The final website must have a unique MAHUM Builders identity.

==================================================
DESIGN PHILOSOPHY
==================================================

The website should feel:

- Premium
- Architectural
- Minimal
- Sophisticated
- Established
- Confident
- Elegant
- Modern
- Experienced
- Trustworthy

The main design principle is:

PREMIUM THROUGH RESTRAINT.

The website should look expensive because of:

- Typography
- Photography
- Layout
- Spacing
- Grid
- Proportion
- Visual hierarchy

NOT because of excessive animation or effects.

==================================================
TECH STACK
==================================================

Use:

- React.js
- Vite
- Tailwind CSS
- Custom CSS
- Framer Motion
- GSAP
- Lenis
- Lucide React

Use each technology purposefully.

==================================================
TAILWIND CSS
==================================================

Use Tailwind CSS primarily for:

- Layout
- Grid
- Flexbox
- Responsive design
- Spacing
- Sizing
- Positioning
- Common typography utilities
- Containers
- Basic borders

Do NOT rely entirely on Tailwind.

==================================================
CUSTOM CSS
==================================================

Use custom CSS where it provides better control for:

- Subtle hover effects
- Pseudo-elements
- Image treatments
- Fine typography
- Editorial details
- Custom transitions
- Borders
- Underlines
- Design-specific visual effects

The final website should not look like a collection of generic Tailwind utilities.

==================================================
FRAMER MOTION
==================================================

Use Framer Motion for subtle component-level interactions.

Good uses:

- Section reveal
- Fade-up transitions
- Button interactions
- Project card hover
- Image hover
- Navigation transitions
- Mobile menu
- Small UI transitions

Keep these animations subtle.

Typical section reveal:

opacity: 0 → 1
y: 20 → 0

Use smooth ease-out transitions.

==================================================
GSAP
==================================================

GSAP is available but should be used sparingly.

Use GSAP only for selected high-impact visual moments where it genuinely improves the experience.

Possible use:

- Hero image reveal
- Hero typography reveal
- One carefully designed editorial interaction

Do NOT use GSAP everywhere.

Do NOT animate every section.

Do NOT use GSAP simply because it is available.

Do not use Framer Motion and GSAP on the same element unless genuinely necessary.

==================================================
LENIS
==================================================

Use Lenis for smooth scrolling.

Scrolling should feel:

- Smooth
- Premium
- Controlled
- Responsive

Do not make scrolling excessively slow or floaty.

Respect prefers-reduced-motion.

==================================================
LUCIDE REACT
==================================================

Use Lucide React for minimal interface icons.

Examples:

- ArrowRight
- ArrowUpRight
- ChevronLeft
- ChevronRight
- Menu
- X

Do not overuse icons.

==================================================
ANIMATION DIRECTION
==================================================

This is extremely important.

The website should be:

SIMPLE + ATTRACTIVE + PREMIUM

It should NOT feel like an animation showcase.

Use animation only where it improves:

- Visual hierarchy
- User interaction
- Navigation
- Project presentation
- Overall polish

Avoid:

- Excessive parallax
- Scroll-jacking
- Huge page transitions
- Constant floating elements
- Bouncing elements
- Spinning elements
- Excessive stagger animations
- Large scaling effects
- Animated backgrounds
- Excessive blur
- Animation on every element

The website should look premium even when completely static.

==================================================
COLOR PALETTE
==================================================

Keep the palette restrained.

Use:

- Near black
- White
- Warm/light neutrals
- Subtle grey

Avoid:

- Bright blue
- Purple
- Orange
- Red
- Neon colors
- Colorful gradients

No flashy gradients.

==================================================
TYPOGRAPHY
==================================================

Use a refined serif/display font for major headings and a clean sans-serif for body text.

Typography should feel:

- Editorial
- Architectural
- Sophisticated
- Premium

Use:

- Strong hierarchy
- Generous whitespace
- Controlled paragraph widths
- Elegant headings
- Precise spacing

Do not make every heading unnecessarily huge.

==================================================
IMAGERY
==================================================

Photography is one of the most important parts of the website.

Prioritize:

- Architectural photography
- Residential projects
- Commercial projects
- Interiors
- Completed buildings
- Construction details
- Materials
- Structural details

Avoid generic stock imagery such as:

- Workers posing in helmets
- Handshakes
- Generic corporate meetings
- Random cranes
- Generic business stock photos

Project photography should be a major visual focus.

==================================================
HOMEPAGE
==================================================

Build the homepage with this structure:

1. Header
2. Hero
3. Company Statistics / At a Glance
4. About MAHUM
5. Our Developments vs Client Projects
6. Featured Projects
7. Services
8. Turnkey / Project Approach
9. Leadership
10. Media Slider / Carousel
11. Final CTA
12. Footer

Do not add unnecessary sections.

==================================================
HEADER
==================================================

Desktop:

Logo / wordmark on the left.

Navigation:

Home
About
Services
Projects
Contact

Include a subtle Contact CTA if appropriate.

Mobile:

Use a clean hamburger menu.

The mobile menu can have a subtle Framer Motion transition.

Do not create an unnecessarily complicated animated navigation.

==================================================
HERO
==================================================

Create a strong, minimal architectural hero.

Potential headline:

"Where Innovation Meets Legacy"

Use the supplied company information as the factual source.

Use a strong architectural/project image.

Include:

- Large headline
- Supporting text where appropriate
- Primary CTA
- Strong visual composition

Keep the hero uncluttered.

A subtle GSAP or Framer Motion reveal can be used.

==================================================
COMPANY STATISTICS
==================================================

Use only confirmed statistics from the company profile.

Known information includes:

1989 — Year of Incorporation
300+ — Projects Completed
350 — Allied Industries
PKR 5BN+ — only if the supplied company information confirms the correct context

Do NOT invent statistics.

Do NOT guess the meaning of ambiguous statistics.

Design this section with:

- Large typography
- Clean grid
- Minimal borders
- Strong whitespace

==================================================
ABOUT MAHUM
==================================================

Introduce MAHUM as an established company working across:

- Construction
- Real estate development
- Turnkey solutions
- Project management

Keep the homepage introduction concise.

Use strong imagery.

Include a CTA to the About page.

==================================================
OUR DEVELOPMENTS VS CLIENT PROJECTS
==================================================

This is a major section.

Clearly communicate:

OUR DEVELOPMENTS

MAHUM's own developments.

CLIENT PROJECTS

Construction / turnkey projects executed for clients.

Use large imagery and editorial layouts.

Avoid small generic cards.

This distinction should be immediately understandable to the visitor.

==================================================
FEATURED PROJECTS
==================================================

Use the project information supplied in the company profile.

Known projects include:

Casa Solara — 2025
House 87B — 2023
VSurfaces — 2023
House 82B — 2022
Stone Villa — 2023
FBR LTU Office — 2023
Marine Tower Offices — 2021
Box Home — 2016
MAHUM Offices — 2019
MAHUM Residency — 2020
Bahrban Hunza — 2026

Only use information that is actually supplied.

Do NOT invent:

- Locations
- Areas
- Architects
- Clients
- Scope
- Categories
- Completion details

==================================================
PROJECTS PAGE
==================================================

Create a premium architectural portfolio.

Project cards should prioritize:

- Large imagery
- Project name
- Year where available
- Category or role only when confirmed

Use subtle hover interactions.

Avoid generic card-heavy layouts.

==================================================
PROJECT DETAILS
==================================================

Create a reusable project-detail layout.

Structure:

- Large hero image
- Project title
- Project information
- Overview
- MAHUM's role
- Gallery
- Related projects
- CTA

Only show metadata that actually exists.

Clearly indicate whether the project is:

MAHUM DEVELOPMENT

or

CLIENT PROJECT

where the information supports this.

==================================================
SERVICES
==================================================

Use the supplied service information, including:

- Land Acquisition
- Design & Architecture
- Authority Approvals
- Construction Execution
- Project Management
- Utility Connections
- Interior Revamp Solutions

Present services as a refined editorial list.

Use:

- Large typography
- Numbering
- Thin dividers
- Optional imagery

Avoid generic colorful service cards.

==================================================
TURNKEY APPROACH
==================================================

Show the project process in a clean editorial format.

Potential stages:

01 — Land / Initial Planning
02 — Design & Architecture
03 — Approvals
04 — Construction
05 — Project Management
06 — MEP / Finishing
07 — Turnkey Handover

Only use stages supported by the supplied company information.

Keep the interaction subtle.

==================================================
LEADERSHIP
==================================================

Include:

Hasan Mustafa
Chief Executive Officer

Umair Hasan
Chief Operating Officer

Use only information supplied in the company profile.

Do not invent biographies.

Keep the design editorial and premium.

==================================================
MEDIA SLIDER / CAROUSEL
==================================================

Add a premium horizontal media slider/carousel near the lower part of the homepage.

The carousel should display selected:

- Images
- Videos

Requirements:

- Automatically slides horizontally
- Smooth movement
- Pauses when the mouse hovers over it
- Resumes when the mouse leaves
- Supports previous/next controls if appropriate
- Works responsively on mobile
- Supports touch/swipe on mobile
- Uses subtle transitions
- Multiple media items can be visible on desktop
- Appropriate sizing on mobile

The carousel should feel like a premium editorial media section.

Do not make it look like a generic plugin.

Keep the implementation simple and maintainable.

The actual media assets can be connected from the project's assets.

==================================================
FINAL CTA
==================================================

Create a strong but minimal closing CTA.

Possible heading:

"LET'S BUILD SOMETHING LASTING."

Keep the section focused on:

- New developments
- Construction projects
- Turnkey solutions
- Client enquiries

Primary CTA:

"Start a Conversation"

==================================================
FOOTER
==================================================

Include:

- MAHUM Builders branding
- Navigation
- Contact information
- Social links where supplied
- Copyright
- Location where confirmed

Keep it clean and minimal.

==================================================
ABOUT PAGE
==================================================

Suggested structure:

1. Hero
2. Company Introduction
3. History / Journey
4. Statistics
5. Leadership
6. Company Philosophy / Vision
7. Own Developments + Client Projects
8. CTA

Use only supplied company information.

Do not invent a company history.

==================================================
SERVICES PAGE
==================================================

Create a premium editorial presentation of the services.

Each service can include:

- Number
- Title
- Short description
- Optional image

Use strong typography and thin dividers.

==================================================
CONTACT PAGE
==================================================

Include:

- Phone
- Email
- Location
- Contact form
- Social links where supplied

Form fields:

Name
Email
Phone
Subject / Project Type
Message

Keep the form simple and premium.

==================================================
FOOTER
==================================================

Keep the footer visually clean.

Include relevant company and navigation information without unnecessary clutter.

==================================================
RESPONSIVE DESIGN
==================================================

The website MUST work correctly across:

- Large desktop
- Desktop
- Laptop
- Tablet
- Mobile

Do not simply shrink the desktop version.

Intentionally adapt:

- Typography
- Spacing
- Navigation
- Project grids
- Gallery
- Media carousel
- Forms
- Footer

There must be NO horizontal overflow.

==================================================
PERFORMANCE
==================================================

Prioritize:

- Optimized images
- Lazy loading
- Responsive images
- Efficient React components
- Minimal unnecessary dependencies
- Smooth animation performance

Use modern image formats where appropriate.

Do not load unnecessarily large assets.

==================================================
ACCESSIBILITY
==================================================

Use:

- Semantic HTML
- Proper heading hierarchy
- Accessible buttons
- Form labels
- Alt text
- Keyboard navigation
- Visible focus states
- Good contrast

Respect:

prefers-reduced-motion

==================================================
SEO
==================================================

Implement basic SEO:

- Page titles
- Meta descriptions
- Proper H1 hierarchy
- Semantic HTML
- Descriptive image alt text
- Clean URLs
- Open Graph metadata where appropriate

Do not keyword stuff.

==================================================
COMPONENT ARCHITECTURE
==================================================

Use reusable components.

Suggested structure:

src/
  components/
    Header/
    Footer/
    Button/
    SectionHeading/
    ProjectCard/
    ProjectGrid/
    ProjectMeta/
    MediaCarousel/
    ServiceItem/
    StatBlock/
    CTA/

  pages/
    Home/
    About/
    Services/
    Projects/
    ProjectDetails/
    Contact/

  data/
    projects.js
    services.js
    media.js

  assets/

  styles/

Keep content/data separate from presentation.

Do not put the entire website into one giant React component.

==================================================
PROJECT DATA
==================================================

Keep project information in a separate data structure.

Example:

{
  title: "",
  category: "",
  year: "",
  role: "",
  location: "",
  architect: "",
  client: "",
  area: "",
  scope: "",
  description: "",
  images: []
}

Only populate fields that are actually available.

Do not invent missing information.

==================================================
CONTENT RULE
==================================================

The supplied MAHUM Builders company profile is the factual source of truth.

Do NOT invent:

- Awards
- Testimonials
- Clients
- Certifications
- Statistics
- Project information
- Locations
- Architects
- Areas
- Company claims

If information is missing:

Omit it or use a clearly marked placeholder.

Never fabricate company information.

==================================================
DEVELOPMENT PROCESS
==================================================

PHASE 1 — INSPECT

Inspect:

- Repository
- Existing code
- Assets
- Dependencies
- Project brief
- Company content

PHASE 2 — FOUNDATION

Set up/refine:

- React
- Vite
- Tailwind
- Custom CSS
- Framer Motion
- GSAP
- Lenis
- Lucide React

Create a consistent design system for:

- Typography
- Colors
- Spacing
- Containers
- Borders
- Buttons
- Breakpoints

PHASE 3 — GLOBAL COMPONENTS

Build:

- Header
- Navigation
- Mobile menu
- Footer
- Buttons
- Section headings
- Project cards
- Service items
- Statistics
- CTA
- Media carousel

PHASE 4 — HOMEPAGE

Build the complete homepage.

Focus heavily on visual quality, spacing, typography and project imagery.

PHASE 5 — INTERNAL PAGES

Build:

- About
- Services
- Projects
- Project Details
- Contact

PHASE 6 — RESPONSIVE DESIGN

Test and refine desktop, tablet and mobile.

PHASE 7 — ANIMATION

Only after the visual layout is correct, add subtle Framer Motion and selected GSAP interactions.

PHASE 8 — PERFORMANCE

Optimize images, media and rendering.

PHASE 9 — QA

Check:

- Routes
- Navigation
- Buttons
- Forms
- Project links
- Project detail pages
- Media carousel
- Carousel pause-on-hover
- Mobile menu
- Responsive behavior
- Images
- Console errors
- Horizontal overflow
- Accessibility
- SEO

==================================================
IMPORTANT DESIGN RULES
==================================================

1. Do not over-design.
2. Do not over-animate.
3. Do not make every section a card.
4. Do not use excessive rounded corners.
5. Do not use colorful gradients.
6. Do not use generic construction imagery.
7. Do not copy Monza.
8. Do not invent company information.
9. Do not create fake testimonials.
10. Do not add unnecessary functionality.
11. Do not turn this into e-commerce.
12. Do not make it look like a SaaS website.
13. Do not make it look like a generic construction template.
14. Do not rely entirely on Tailwind.
15. Use custom CSS for refined visual details.
16. Keep Framer Motion and GSAP usage intentional.
17. Keep Lenis smooth but responsive.
18. Prioritize photography, typography, spacing and layout.
19. Keep the media carousel simple and premium.
20. Do not add unnecessary Instagram/feed functionality.

==================================================
FINAL QUALITY BAR
==================================================

The finished website should feel like a high-end architecture / construction / real-estate development company website.

It should communicate:

Experience.
Trust.
Quality.
Scale.
Premium execution.

It should NOT feel like:

- A basic six-page website
- A generic construction template
- A SaaS website
- An animation showcase
- A collection of UI components

The final design principle is:

PREMIUM THROUGH RESTRAINT.

Strong photography.
Excellent typography.
Precise spacing.
Large editorial layouts.
Minimal borders.
Subtle interactions.
Purposeful animation.
Clear content.
Clean code.

The technology should remain invisible to the user.

The user should experience:

SIMPLICITY.
CONFIDENCE.
QUALITY.

==================================================
FINAL INSTRUCTION
==================================================

Start by inspecting the repository and reading the complete project brief.

Do not immediately generate the entire application blindly.

After inspection:

1. Briefly summarize what currently exists.
2. Identify the available assets.
3. Identify missing assets/content.
4. Briefly explain your implementation plan.
5. Begin implementation.

Build the website section-by-section.

Verify that the project runs correctly after major changes.

Do not stop at a visual mockup.

Build the actual functional React website with:

- Working routes
- Reusable components
- Data-driven projects
- Working project detail pages
- Responsive layouts
- Functional media carousel
- Pause-on-hover carousel behavior
- Contact form structure
- Smooth scrolling
- Minimal purposeful animations
- Good accessibility
- Basic SEO

Do not introduce unnecessary complexity.

The final result should be polished enough to present directly to the client.
```
