# SquareCircleTriangle - One Pager Website

A clean, modern one-pager website showcasing the SquareCircleTriangle brand with responsive design and smooth animations.

## Project Structure

```
squarecircletriangle-presence/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css             # All styling and animations
├── js/
│   └── script.js              # Interactivity and scroll effects
├── assets/
│   ├── logo/                  # Brand logo files
│   │   ├── full-logo.svg      # Main logo
│   │   ├── square.svg         # Square element
│   │   ├── circle.svg         # Circle element
│   │   └── triangle.svg       # Triangle element
│   ├── apps/                  # Product/app logos
│   │   ├── deckcrm-logo.png
│   │   ├── kostly-logo.png
│   │   └── [other app logos]
│   └── team/                  # Team member photos
│       ├── member-1.jpg
│       ├── member-2.jpg
│       ├── member-3.jpg
│       └── [additional team photos]
└── README.md                  # This file

```

## Features

- **Hero Section**: Full-viewport hero with pulsing logo animation
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Fade-in effects and hover transitions
- **Three Elements**: Square, Circle, and Triangle showcasing sections
- **Product Grid**: Grid layout for app/tool logos with links
- **Team Profiles**: Circular profile pictures with hover effects
- **Grayscale Design**: Professional black and white aesthetic
- **Footer Navigation**: Sitemap and quick links

## Getting Started

1. **Add Assets**: Place your logo files and images in the respective `/assets/` folders:
   - Logo files in `/assets/logo/`
   - App logos in `/assets/apps/`
   - Team photos in `/assets/team/`

2. **Update Content**: Open `index.html` and update:
   - Section descriptions (currently Lorem Ipsum)
   - Team member names and titles
   - App links and additional apps
   - Footer links and meta tags

3. **Open in Browser**: Simply open `index.html` in any modern browser to view the site.

## Asset Guidelines

### Logo Files
- Format: SVG or high-resolution PNG
- Size: 200x200px for main logo, 80x80px for elements
- Color: Works with grayscale filter

### Team Photos
- Format: JPG or PNG
- Size: Minimum 200x200px
- Style: Headshots work best for circular display

### App Logos
- Format: PNG or SVG
- Size: Minimum 100x100px
- Color: Will be displayed in grayscale

## Customization

### Colors
The site uses a black and white color scheme. To modify:
- Edit background colors in `css/styles.css`
- Currently: Black (#000) background with white (#fff) text
- Accent colors: Various shades of gray (#111, #222, #333, #666, #ccc)

### Animations
- Logo pulse speed: Edit `3s` in `.logo` animation in `css/styles.css`
- Fade-in duration: Edit `0.8s` in `.element-box` animation
- Adjust delays by modifying `animation-delay` values

### Fonts
The site uses system fonts for optimal performance. To change:
- Edit `font-family` in `body` selector in `css/styles.css`

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: Under 480px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- No external dependencies or build tools required
- Pure HTML, CSS, and vanilla JavaScript
- Optimized for fast loading
- All animations use CSS for better performance

## Future Enhancements

- Add more apps under each shape
- Expand team section
- Add contact or email signup form
- Social media links
- Blog or news section

---

Created: February 2026
