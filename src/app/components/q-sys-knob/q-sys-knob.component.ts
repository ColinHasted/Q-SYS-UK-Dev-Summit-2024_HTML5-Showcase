import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-q-sys-knob',
    templateUrl: './q-sys-knob.component.html',
    styleUrl: './q-sys-knob.component.scss'
})
export class QSysKnobComponent {

  /* Input properties */
  colour = input('blue');
  disabled = input(false);
  value = input(0.5); // Current position value (0-1)
  legend = input('0'); // Display text
  min = input(0);
  max = input(1);

  /* Output events */
  valueChange = output<number>();

  /* Internal dragging state */
  dragging = false;
  initialX = 0;
  initialY = 0;
  initialPosition = 0;

  /* Store bound functions as class properties */
  private boundMouseMove: (event: MouseEvent) => void;
  private boundMouseUp: () => void;
  private boundTouchMove: (event: TouchEvent) => void;
  private boundTouchEnd: () => void;

  /* Computed properties */
  position = computed(() => {
    const val = this.value();
    const minVal = this.min();
    const maxVal = this.max();

    // Normalize value to 0-1 range
    if (maxVal === minVal) return 0;
    return Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal)));
  });

  angle = computed(() => this.position() * 180 + 'deg');

  formattedLegend = computed(() => {
    const legendValue = this.legend();
    const numValue = parseFloat(legendValue);
    
    // If it's a valid number, format to 2 decimal places
    if (!isNaN(numValue)) {
      return numValue.toFixed(2);
    }
    
    // Otherwise return as-is
    return legendValue;
  });

  constructor() {
    // Bind the functions to 'this' and store them
    this.boundMouseMove = this.mouseMove.bind(this);
    this.boundMouseUp = this.mouseUp.bind(this);
    this.boundTouchMove = this.touchMove.bind(this);
    this.boundTouchEnd = this.touchEnd.bind(this);
  }  // Start dragging to change the value
  startDrag(event: MouseEvent | TouchEvent) {
    if (this.disabled()) return;

    this.dragging = true;
    if (event instanceof MouseEvent) {
      this.initialX = event.clientX;
      this.initialY = event.clientY;
    } else if (event instanceof TouchEvent) {
      this.initialX = event.touches[0].clientX;
      this.initialY = event.touches[0].clientY;
    }

    this.initialPosition = this.position();

    // Add global event listeners
    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('mouseup', this.boundMouseUp);
    window.addEventListener('touchmove', this.boundTouchMove);
    window.addEventListener('touchend', this.boundTouchEnd);
  }

  // Update the value while dragging (mouse)
  mouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.updateValue(event.clientX, event.clientY);
    }
  }

  // Update the value while dragging (touch)
  touchMove(event: TouchEvent) {
    if (this.dragging) {
      this.updateValue(event.touches[0].clientX, event.touches[0].clientY);
    }
  }

  // End dragging (mouse)
  mouseUp() {
    this.dragging = false;

    // Remove global event listeners
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('mouseup', this.boundMouseUp);
  }

  // End dragging (touch)
  touchEnd() {
    this.dragging = false;

    // Remove global event listeners
    window.removeEventListener('touchmove', this.boundTouchMove);
    window.removeEventListener('touchend', this.boundTouchEnd);
  }

  // Update the value based on the pointer position
  updateValue(clientX: number, clientY: number) {
    if (this.disabled()) return;

    const deltaX = clientX - this.initialX;
    const deltaY = this.initialY - clientY; // Invert Y to make up positive
    const deltaValue = (deltaX + deltaY) / 1000; // Adjust sensitivity as needed
    const newPosition = Math.max(0, Math.min(1, this.initialPosition + deltaValue));

    // Convert position back to actual value range
    const minVal = this.min();
    const maxVal = this.max();
    const newValue = minVal + newPosition * (maxVal - minVal);

    // Emit the new value
    this.valueChange.emit(newValue);
  }
}
