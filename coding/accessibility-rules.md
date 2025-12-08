# Accessibility Rules

Universal rules for AI agents to create accessible software for all users, including those with disabilities.

## Core Principles (WCAG)

### POUR Principles
1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: User interface components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough for various user agents and assistive technologies

## Web Accessibility

### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use semantic elements -->
<nav>Navigation links</nav>
<main>Main content</main>
<article>Article content</article>
<aside>Sidebar content</aside>
<footer>Footer content</footer>

<!-- Use lists for lists -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### ARIA Attributes
```html
<!-- Label form controls -->
<label for="email">Email Address</label>
<input id="email" type="email" aria-required="true">

<!-- Describe buttons -->
<button aria-label="Close dialog">X</button>

<!-- Announce dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Loading complete
</div>

<!-- Mark current page in navigation -->
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

<!-- Hide decorative elements -->
<img src="decoration.png" alt="" aria-hidden="true">
```

### Keyboard Navigation
```javascript
// Ensure all interactive elements are keyboard accessible
<button>Accessible Button</button>
<a href="/page">Accessible Link</a>

// Add keyboard handlers when needed
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleAction();
  }
});

// Manage focus
const modal = document.querySelector('[role="dialog"]');
const firstFocusable = modal.querySelector('button');
firstFocusable.focus();

// Focus trap in modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

### Images and Media
```html
<!-- Meaningful images need alt text -->
<img src="chart.png" alt="Sales increased 25% in Q4">

<!-- Decorative images use empty alt -->
<img src="decoration.png" alt="">

<!-- Complex images need detailed descriptions -->
<img src="infographic.png" alt="Climate change statistics" 
     aria-describedby="infographic-description">
<div id="infographic-description">
  Detailed description of the infographic...
</div>

<!-- Video captions and transcripts -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>
```

### Forms
```html
<!-- Associate labels with inputs -->
<label for="username">Username</label>
<input id="username" type="text" required>

<!-- Group related inputs -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input id="street" type="text">
</fieldset>

<!-- Provide error messages -->
<input id="email" type="email" aria-invalid="true" 
       aria-describedby="email-error">
<span id="email-error" role="alert">
  Please enter a valid email address
</span>

<!-- Use autocomplete attributes -->
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
```

### Color and Contrast
```css
/* Ensure sufficient contrast ratios */
/* Normal text: 4.5:1 minimum */
/* Large text (18pt+): 3:1 minimum */

.text {
  color: #333333; /* Dark gray */
  background-color: #ffffff; /* White */
}

/* Don't rely on color alone */
/* Bad */
.error { color: red; }

/* Good */
.error {
  color: red;
  font-weight: bold;
}
.error::before {
  content: "⚠ ";
}
```

### Focus Indicators
```css
/* Never remove focus outlines without replacement */
/* Bad */
:focus {
  outline: none;
}

/* Good - provide visible focus indicator */
:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Custom focus styles */
button:focus {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5);
}
```

## Mobile Accessibility

### Touch Targets
```css
/* Minimum touch target size: 44x44 CSS pixels */
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Space between touch targets */
.button-group button {
  margin: 8px;
}
```

### Screen Readers
```html
<!-- Use proper heading structure -->
<h1>Main Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

<!-- Provide skip links -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- Announce page changes -->
<div role="status" aria-live="polite">
  Page 2 of 10 loaded
</div>
```

## Application Accessibility

### Desktop Applications
```
- Support keyboard shortcuts
- Provide alternative text for icons
- Use system fonts and colors
- Support high contrast mode
- Implement screen reader support
- Allow font size customization
```

### Command Line Tools
```bash
# Provide help text
myapp --help

# Use standard conventions
myapp -v  # verbose
myapp -q  # quiet

# Provide progress indicators
Processing files... [=====>    ] 50%

# Use clear error messages
Error: Config file not found at /path/to/config
Suggestion: Run 'myapp init' to create a config file
```

## Testing Accessibility

### Automated Testing
```javascript
// Use accessibility testing libraries
import { axe } from 'jest-axe';

test('page should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing
```
1. Keyboard navigation: Tab through all interactive elements
2. Screen reader: Test with NVDA, JAWS, VoiceOver
3. Zoom: Test at 200% zoom level
4. Color blindness: Use color blind simulators
5. Focus indicators: Verify visible focus states
6. Form validation: Check error messages are clear
7. Media: Verify captions and transcripts
```

### Testing Tools
```
- axe DevTools: Browser extension for accessibility testing
- WAVE: Web accessibility evaluation tool
- Lighthouse: Automated audits in Chrome DevTools
- NVDA: Free screen reader for Windows
- VoiceOver: Built-in screen reader on macOS/iOS
- Color contrast analyzers: Check contrast ratios
```

## Document Accessibility

### PDF Documents
```
- Use tagged PDFs
- Provide alternative text for images
- Use proper heading structure
- Ensure reading order is correct
- Add form field labels
- Provide document language
```

### Office Documents
```
Microsoft Word/PowerPoint/Excel:
- Use built-in styles (Heading 1, Heading 2)
- Add alt text to images
- Use simple tables with header rows
- Check with accessibility checker
- Provide meaningful link text
```

## Video and Audio

### Captions and Subtitles
```
- Provide closed captions for all video content
- Include speaker identification
- Describe sound effects and music
- Ensure captions are synchronized
- Support multiple languages
```

### Audio Descriptions
```
- Provide descriptions of visual content
- Describe actions, settings, scene changes
- Insert during natural pauses
- Available as separate track or integrated
```

### Transcripts
```
- Provide full text transcripts for audio/video
- Include all spoken content
- Describe non-speech audio
- Make transcripts easily discoverable
```

## Internationalization (i18n)

### Language Support
```html
<!-- Declare document language -->
<html lang="en">

<!-- Mark language changes -->
<p>The French word <span lang="fr">bonjour</span> means hello.</p>

<!-- Support right-to-left languages -->
<html dir="rtl" lang="ar">
```

### Content
```
- Use Unicode for text encoding
- Support text expansion (translations can be longer)
- Don't embed text in images
- Use locale-aware date/time/number formatting
- Provide translations for all user-facing text
```

## Error Handling and Messaging

### Clear Error Messages
```html
<!-- Bad -->
<div class="error">Invalid input</div>

<!-- Good -->
<div role="alert" class="error">
  Email address is invalid. 
  Please enter a valid email like user@example.com
</div>

<!-- Provide recovery suggestions -->
<div role="alert">
  <strong>Error:</strong> File upload failed.
  <br>
  Please ensure your file is under 10MB and try again.
</div>
```

## Responsive Design

### Flexible Layouts
```css
/* Use relative units */
font-size: 1rem; /* Instead of 16px */
width: 100%;
max-width: 60ch;

/* Support text resize */
html {
  font-size: 100%;
}

/* Media queries for different devices */
@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
  }
}
```

## Motion and Animation

### Respect User Preferences
```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Provide controls for auto-playing content */
<video controls autoplay muted>
  <source src="video.mp4" type="video/mp4">
</video>
```

## Best Practices Summary

1. **Use semantic HTML**: Proper elements convey meaning
2. **Provide text alternatives**: For non-text content
3. **Ensure keyboard access**: All functionality via keyboard
4. **Maintain focus order**: Logical tab sequence
5. **Use sufficient contrast**: Text readable against background
6. **Provide clear labels**: Forms and interactive elements
7. **Test with real users**: Include people with disabilities
8. **Follow WCAG guidelines**: Aim for AA compliance minimum
9. **Use ARIA appropriately**: When HTML isn't enough
10. **Design for flexibility**: Support user customization

## Accessibility Checklist

- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] All functionality available via keyboard
- [ ] Focus indicators are visible
- [ ] Forms have associated labels
- [ ] Error messages are clear and helpful
- [ ] Headings are in logical order
- [ ] Videos have captions
- [ ] Page has skip navigation link
- [ ] ARIA attributes used correctly
- [ ] Tested with screen reader
- [ ] Tested at 200% zoom
- [ ] Touch targets are at least 44x44 pixels
- [ ] No automatic timeouts without warning
- [ ] Content reflows at different viewport sizes
