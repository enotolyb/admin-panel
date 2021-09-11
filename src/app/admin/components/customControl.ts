import { ControlValueAccessor } from '@angular/forms';

export class CustomControl<T> implements ControlValueAccessor {
  onChange: ((value: T) => void) | null = null;

  onTouch: () => void = () => {};

  writeValue(value: T): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  updateValue(value: T): void {}
}
