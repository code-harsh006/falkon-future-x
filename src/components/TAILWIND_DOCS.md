# Tailwind CSS Components and Utilities Documentation

This document outlines the enhanced Tailwind CSS components and utilities created for the Falkon Future X website.

## Glassmorphism Effects

### Basic Glass Effects
- `.glass` - Light glass effect with white transparency
- `.glass-dark` - Dark glass effect with black transparency
- `.glass-strong` - Stronger glass effect with more transparency
- `.glass-strong-dark` - Stronger dark glass effect

### Glass Hover Effects
- `.glass-hover` - Adds hover effect to light glass elements
- `.glass-hover-dark` - Adds hover effect to dark glass elements

### Usage Example
```jsx
<div className="glass p-6 rounded-xl">
  <h3 className="text-xl font-bold">Card Title</h3>
  <p>Card content with glass effect</p>
</div>
```

## Animation Classes

### Fade Animations
- `.fade-in-up` - Element fades in while moving up
- `.fade-in` - Element simply fades in

### Slide Animations
- `.slide-in-left` - Element slides in from the left
- `.slide-in-right` - Element slides in from the right

### Usage Example
```jsx
<div className="fade-in-up">
  <h2 className="text-3xl font-bold">Animated Title</h2>
</div>
```

## Grid Layouts

### Responsive Grids
- `.grid-responsive` - Responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- `.grid-responsive-lg` - Larger responsive grid (1 column on mobile, 2 on tablet, 4 on desktop)

### Usage Example
```jsx
<div className="grid-responsive">
  <div className="glass p-4">Item 1</div>
  <div className="glass p-4">Item 2</div>
  <div className="glass p-4">Item 3</div>
</div>
```

## Card Effects

### Hover Effects
- `.card-hover` - Card lifts slightly and gains shadow on hover

### Usage Example
```jsx
<div className="glass card-hover p-6">
  <h3 className="text-xl font-bold">Interactive Card</h3>
</div>
```

## Button Styles

### Primary Buttons
- `.btn-primary` - Primary action button with green background
- `.btn-secondary` - Secondary action button with blue background
- `.btn-outline` - Outlined button with transparent background

### Usage Example
```jsx
<button className="btn-primary">
  Primary Action
</button>

<button className="btn-outline">
  Outline Button
</button>
```

## Utility Classes

### Section Padding
- `.section-py` - Consistent vertical padding for sections

### Text Effects
- `.text-gradient` - Gradient text from primary to secondary color

### Usage Example
```jsx
<section className="section-py">
  <h2 className="text-gradient text-4xl font-bold">
    Gradient Text
  </h2>
</section>
```

## Color Palette

The site uses a carefully chosen color palette:

- **Primary (Green)**: `hsl(160, 73%, 42%)` - Represents sustainability
- **Secondary (Blue)**: `hsl(217, 91%, 60%)` - Represents trust and clean future
- **Accent (Orange)**: Can be added as needed for call-to-action elements

## Responsive Design

All components are designed with mobile-first responsive principles:

- Mobile: Default styles
- Tablet (`md`): Medium breakpoint changes
- Desktop (`lg`): Large breakpoint changes
- Large Desktop (`xl`): Extra large breakpoint changes

## Best Practices

1. **Glassmorphism Usage**:
   - Use `.glass` for light backgrounds
   - Use `.glass-dark` for dark backgrounds
   - Combine with hover effects for interactive elements

2. **Animations**:
   - Use fade animations for content reveals
   - Use slide animations for directional content

3. **Grid Systems**:
   - Use responsive grids for card layouts
   - Maintain consistent spacing with gap utilities

4. **Buttons**:
   - Use primary buttons for main actions
   - Use outline buttons for secondary actions
   - Ensure proper contrast for accessibility

## Example Component Structure

```jsx
<section className="section-py bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gradient">
        Section Title
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Section description text
      </p>
    </div>
    
    <div className="grid-responsive">
      {[1, 2, 3].map((item) => (
        <div 
          key={item} 
          className="glass card-hover p-6"
        >
          <div className="text-3xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold mb-2">
            Feature {item}
          </h3>
          <p className="text-gray-600">
            Feature description text
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```