# Tailwind CSS Classes for Static Site Recreation

This document outlines the Tailwind CSS classes created to replicate the styling of the static site. These classes follow the same design principles and visual appearance as the original CSS.

## Color Palette

The site uses a carefully chosen color palette that matches the static site:

- **Primary (Green)**: `text-primary`, `bg-primary` - #10b981 (sustainable development)
- **Secondary (Blue)**: `text-secondary`, `bg-secondary` - #3b82f6 (trust, clean future)
- **Accent (Orange)**: `text-accent`, `bg-accent` - #f59e0b (call to action)
- **Text Colors**: `text-text-primary`, `text-text-secondary`, `text-text-light`
- **Background Colors**: `bg-bg-secondary`, `bg-bg-dark`

## Glassmorphism Effects

### Navigation Bar
```jsx
<nav className="glass-navbar fixed top-0 w-full z-1000">
  {/* Navigation content */}
</nav>
```

### Cards and Components
```jsx
// Standard glass card
<div className="glass-card p-6">
  {/* Card content */}
</div>

// Stronger glass effect
<div className="glass-card-strong p-8">
  {/* Card content */}
</div>

// Form glass effect
<form className="contact-form">
  {/* Form content */}
</form>

// Footer glass effect
<footer className="glass-footer">
  {/* Footer content */}
</footer>
```

### Hover Effects
```jsx
// Add to any glass component for hover effect
<div className="glass-card glass-hover">
  {/* Content */}
</div>
```

## Buttons

### Primary Button
```jsx
<button className="btn-primary">
  Get Started
</button>
```

### Secondary Button
```jsx
<button className="btn-secondary">
  Learn More
</button>
```

### Outline Button
```jsx
<button className="btn-outline">
  Contact Us
</button>
```

## Section Components

### Section Header
```jsx
<div className="section-header">
  <h2 className="section-title">Our Features</h2>
  <p className="section-subtitle">Discover what makes us different</p>
</div>
```

### Feature Cards
```jsx
<div className="feature-card">
  <div className="feature-icon">🌟</div>
  <h3>Feature Title</h3>
  <p>Feature description</p>
</div>
```

### Solution Items
```jsx
<div className="solution-item">
  <div className="solution-icon">📱</div>
  <div>
    <h3>Solution Title</h3>
    <p>Solution description</p>
  </div>
</div>
```

### Statistics Cards
```jsx
<div className="stat-card">
  <div className="stat-icon">📈</div>
  <div className="stat-content">
    <h3>15M+</h3>
    <p>Trees Preserved</p>
  </div>
</div>
```

### Team Members
```jsx
<div className="team-member">
  <div className="member-image">
    <img src="/team-member.jpg" alt="Team Member" />
  </div>
  <div className="member-info">
    <p className="member-role">CEO & Founder</p>
    <h3>John Doe</h3>
    <p>Environmental Scientist</p>
  </div>
</div>
```

## Hero Section

### Hero Statistics
```jsx
<div className="hero-stats">
  <div className="stat-item">
    <span className="stat-number">50K+</span>
    <span className="stat-label">Active Users</span>
  </div>
</div>
```

### Highlight Text
```jsx
<h1 className="text-4xl font-bold">
  Leading the <span className="highlight">Plastic Waste</span> Revolution
</h1>
```

## Layout Components

### Responsive Grids
```jsx
// 3-column grid on desktop, 2 on tablet, 1 on mobile
<div className="grid-responsive">
  {/* Grid items */}
</div>

// 4-column grid on desktop, 2 on tablet, 1 on mobile
<div className="grid-responsive-lg">
  {/* Grid items */}
</div>
```

### Section Padding
```jsx
<section className="section-py">
  {/* Section content */}
</section>
```

## Animations

### Fade Animations
```jsx
<div className="fade-in-up">
  {/* Content that fades in while moving up */}
</div>

<div className="fade-in">
  {/* Content that simply fades in */}
</div>
```

### Slide Animations
```jsx
<div className="slide-in-left">
  {/* Content that slides in from the left */}
</div>

<div className="slide-in-right">
  {/* Content that slides in from the right */}
</div>
```

## Text Effects

### Text Gradient
```jsx
<h2 className="text-gradient text-4xl font-bold">
  Gradient Text
</h2>
```

## Example Usage

### Complete Feature Section
```jsx
<section className="bg-bg-secondary py-25">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="section-header">
      <h2 className="section-title">Our Features</h2>
      <p className="section-subtitle">
        Discover the powerful features that make our solution unique
      </p>
    </div>
    
    <div className="grid-responsive">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="feature-card glass-hover">
          <div className="feature-icon">🌟</div>
          <h3 className="text-xl font-semibold mb-4">Feature {item}</h3>
          <p className="text-text-secondary">
            Description of feature {item} and how it benefits our users.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Complete Hero Section
```jsx
<section className="hero-gradient py-40 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="relative z-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Leading the <span className="highlight">Plastic Waste</span> Revolution
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl">
          Join our mission to create a sustainable future through innovative recycling technology and community engagement.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-outline">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="hero-stats">
          <div className="grid grid-cols-3 gap-5">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Items Recycled</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
    <div className="scroll-arrow"></div>
  </div>
</section>
```

These Tailwind CSS classes and components provide a complete toolkit for recreating the static site's design with modern React and Tailwind CSS practices.