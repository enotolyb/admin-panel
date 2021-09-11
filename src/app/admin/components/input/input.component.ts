import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from '../customControl';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class InputComponent extends CustomControl<string> implements OnInit, OnDestroy {
  @Input() placeholder = '';

  private destroy = new Subject();

  inputControl = new FormControl();

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
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
