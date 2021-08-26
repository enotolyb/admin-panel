import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from '../customControl';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends CustomControl<string> implements OnInit {
  @Input() placeholder = '';

  inputControl = new FormControl();

  ngOnInit(): void {
    this.inputControl.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  clearInput(): void {
    this.updateValue('');
    if (this.onChange) {
      this.onChange('');
    }
  }

  updateValue(value: string): void {
    this.inputControl.setValue(value);
  }
}
