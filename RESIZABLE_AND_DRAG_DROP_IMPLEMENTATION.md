# Resizable and Drag & Drop Implementation Guide

## Overview
This document details the implementation of resizable panels and drag-and-drop functionality for the appointments-today component in the dental clinic Angular application.

## 1. Resizable Panel Implementation

### Component Setup (appointments-today-standalone.component.ts)

```typescript
// Import required modules
import {Component, OnInit, OnDestroy, signal, inject, computed, HostListener} from '@angular/core';

// Component properties for resize
export class AppointmentsTodayStandaloneComponent implements OnInit, OnDestroy {
  // Resize properties
  panelWidth = signal(314); // Default width in pixels
  private isResizing = false;
  private startX = 0;
  private startWidth = 0;
  private readonly minPanelWidth = 300;
  private readonly maxPanelWidth = 600;

  ngOnInit(): void {
    // Load saved width from localStorage
    const savedWidth = localStorage.getItem('appointments-panel-width');
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= this.minPanelWidth && width <= this.maxPanelWidth) {
        this.panelWidth.set(width);
      }
    }
  }

  startResize(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isResizing = true;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.startWidth = this.panelWidth();
    
    // Add cursor style during resize
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent): void {
    if (!this.isResizing) return;
    
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    // In RTL layout, we need to invert the diff calculation
    const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    const diff = isRTL ? (this.startX - clientX) : (clientX - this.startX);
    const newWidth = this.startWidth + diff;
    
    // Apply constraints
    if (newWidth >= this.minPanelWidth && newWidth <= this.maxPanelWidth) {
      this.panelWidth.set(newWidth);
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Save the width to localStorage for persistence
      localStorage.setItem('appointments-panel-width', this.panelWidth().toString());
    }
  }
}
```

### Template (appointments-today.component.html)

```html
<div class="appointments-today">
  <div class="appointments-today__container">
    <section class="appointments-today__panel" [style.width.px]="panelWidth()">
      <app-appointments-panel
        (appointmentSelected)="onAppointmentSelected($event)"
        [selectedAppointmentId]="selectedAppointmentId()">
      </app-appointments-panel>
    </section>

    <div 
      class="appointments-today__resize-handle"
      (mousedown)="startResize($event)"
      (touchstart)="startResize($event)">
      <div class="resize-handle-inner"></div>
    </div>

    <section class="appointments-today__details">
      <!-- Details content -->
    </section>
  </div>
</div>
```

### Styles (appointments-today.component.scss)

```scss
.appointments-today {
  &__resize-handle {
    width: 8px;
    height: 100%;
    cursor: col-resize;
    position: relative;
    background-color: transparent;
    transition: background-color 0.2s;

    @media (max-width: 767px) {
      display: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);

      .resize-handle-inner {
        opacity: 1;
      }
    }

    .resize-handle-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 40px;
      background-color: var(--border-color);
      border-radius: 2px;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
  }
}
```

## 2. Drag & Drop Implementation (Alternative Approach)

### Full CDK Drag & Drop Setup

```typescript
// Import CDK modules
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  imports: [CommonModule, DragDropModule, /* other imports */],
})
export class AppointmentsTodayStandaloneComponent {
  sections = signal(['panel', 'details']);
  
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      const newSections = [...this.sections()];
      moveItemInArray(newSections, event.previousIndex, event.currentIndex);
      this.sections.set(newSections);
      
      // Update layout order based on new arrangement
      const newOrder = newSections[0] === 'panel' ? 'panel-first' : 'details-first';
      this.layoutOrder.set(newOrder);
      
      // Save to localStorage
      localStorage.setItem('appointments-layout-order', newOrder);
    }
  }
}
```

### Drag & Drop Template

```html
<div class="appointments-today__container" 
     cdkDropList 
     cdkDropListOrientation="horizontal"
     (cdkDropListDropped)="drop($event)">
  
  @for (section of sections(); track section) {
    @if (section === 'panel') {
      <section class="appointments-today__panel" 
               cdkDrag
               [cdkDragLockAxis]="'x'">
        <div class="appointments-today__drag-handle" cdkDragHandle>
          <mat-icon>drag_indicator</mat-icon>
        </div>
        <!-- Panel content -->
      </section>
    }
    
    @if (section === 'details') {
      <section class="appointments-today__details" 
               cdkDrag
               [cdkDragLockAxis]="'x'">
        <div class="appointments-today__drag-handle" cdkDragHandle>
          <mat-icon>drag_indicator</mat-icon>
        </div>
        <!-- Details content -->
      </section>
    }
  }
</div>
```

### Drag & Drop Styles

```scss
.appointments-today {
  &__drag-handle {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease;

    mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--text-light);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  &__panel:hover &__drag-handle,
  &__details:hover &__drag-handle {
    opacity: 1;
  }

  // CDK drag and drop styles
  .cdk-drop-list-dragging &__panel:not(.cdk-drag-placeholder),
  .cdk-drop-list-dragging &__details:not(.cdk-drag-placeholder) {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }

  .cdk-drag-placeholder {
    opacity: 0.2;
    background-color: var(--bg-light-green);
    border: 2px dashed var(--border-color);
    border-radius: 8px;
  }

  &__panel,
  &__details {
    &.cdk-drag-preview {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      opacity: 0.9;
    }

    &.cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  }
}
```

## 3. Simpler Toggle Approach (Currently Implemented)

### Component

```typescript
export class AppointmentsTodayStandaloneComponent {
  layoutOrder = signal<'panel-first' | 'details-first'>('panel-first');

  ngOnInit(): void {
    // Load saved layout order
    const savedOrder = localStorage.getItem('appointments-layout-order') as 'panel-first' | 'details-first';
    if (savedOrder) {
      this.layoutOrder.set(savedOrder);
    }
  }

  toggleLayout(): void {
    const newOrder = this.layoutOrder() === 'panel-first' ? 'details-first' : 'panel-first';
    this.layoutOrder.set(newOrder);
    
    // Save to localStorage
    localStorage.setItem('appointments-layout-order', newOrder);
  }
}
```

### Template

```html
<div class="appointments-today">
  <div class="appointments-today__toggle-layout">
    <button mat-icon-button 
            (click)="toggleLayout()"
            [matTooltip]="layoutOrder() === 'panel-first' ? 'تبديل إلى التفاصيل أولاً' : 'تبديل إلى المواعيد أولاً'">
      <mat-icon>swap_horiz</mat-icon>
    </button>
  </div>
  
  <div class="appointments-today__container" 
       [class.appointments-today__container--reversed]="layoutOrder() === 'details-first'">
    <!-- Panel and details sections -->
  </div>
</div>
```

### Styles

```scss
.appointments-today {
  &__toggle-layout {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 100;

    button {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }

  &__container {
    display: flex;
    gap: 0.1rem;
    height: 100%;
    transition: all 0.3s ease;

    &--reversed {
      flex-direction: row-reverse;
    }
  }
}
```

## Key Features

1. **Resizable Panels**:
   - Mouse and touch support
   - RTL-aware (inverts drag direction for RTL)
   - Min/max width constraints
   - Persists width to localStorage
   - Visual feedback during resize

2. **Drag & Drop (Full Implementation)**:
   - Uses Angular CDK drag-drop module
   - Horizontal axis lock
   - Visual drag handles that appear on hover
   - Smooth animations
   - Reorder persistence

3. **Toggle Layout (Simple Alternative)**:
   - Single button to swap layout
   - Smooth CSS transitions
   - Persists preference
   - Arabic tooltips for UX

## RTL Considerations

Both implementations handle RTL layouts:
- Resize: Inverts mouse movement calculation
- Toggle: CSS flex-direction handles RTL automatically
- Drag & Drop: CDK handles RTL automatically

## Performance Notes

- Use signals for reactive state management
- Minimize DOM manipulations
- Use CSS transitions for smooth animations
- Persist user preferences to localStorage