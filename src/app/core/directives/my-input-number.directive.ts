import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, LOCALE_ID, OnChanges, OnInit, Optional, Output, Renderer2, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, NgForm, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { validateNumber } from '../validators/number';

const DECIMAL_SEPARATOR = ',';
const GROUP_SEPARATOR = '.';
const REGEX_FLOAT = /[+-]([0-9]*[.])?[0-9]+/g;

export const MY_INPUT_NUMBER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyInputNumberDirective),
  multi: true
};

export function isBlankOrEmpty(obj: string | any[]): boolean {
  return obj === undefined || obj === null || ((typeof obj === "string" || Array.isArray(obj)) && obj.length === 0);
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isString(obj: any): boolean {
  return isNotBlank(obj) && typeof obj === "string";
}

export function isNotBlank(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export const noop = (a?: any) => null;

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

@Directive({
  selector: '[appInputNumber]',
  providers: [MY_INPUT_NUMBER_VALUE_ACCESSOR,
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MyInputNumberDirective),
      multi: true
    }
  ]
})
export class MyInputNumberDirective implements ControlValueAccessor, OnInit, OnChanges {

  validateFn: any;

  @Input()
  digits = '1.2-2';

  private _valueAsString: boolean;
  @Input()
  get valueAsString(): boolean {
    return this._valueAsString;
  }
  set valueAsString(v: boolean) {
    this._valueAsString = coerceBooleanProperty(v);
  }

  private _acceptNegative: boolean;
  @Input()
  get acceptNegative(): boolean {
    return this._acceptNegative;
  }
  set acceptNegative(v: boolean) {
    this._acceptNegative = coerceBooleanProperty(v);
  }


  private _onlyInteger: boolean;
  @Input()
  get onlyInteger(): boolean {
    return this._onlyInteger;
  }
  set onlyInteger(v: boolean) {
    this._onlyInteger = coerceBooleanProperty(v);
    if (this._onlyInteger) {
      this.digits = '1.0-0';
    }
  }


  private _greaterThan: number;
  @Input()
  get greaterThan(): number {
    return this._greaterThan;
  }
  set greaterThan(v: number) {
    if (isString(v)) {
      v = parseFloat(v.toString());
    }
    this._greaterThan = v;
  }

  private _lessThan: number;
  @Input()
  get lessThan(): number {
    return this._lessThan;
  }
  set lessThan(v: number) {
    if (isString(v)) {
      v = parseFloat(v.toString());
    }
    this._lessThan = v;
  }
  private _value: number | string;
  private _numberPipe: DecimalPipe;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Inject(LOCALE_ID) private _locale: string
  ) {
    this._numberPipe = new DecimalPipe(this._locale);
  }

  ngOnInit() {
    this._renderer.setProperty(this._elementRef.nativeElement, 'autocomplete', 'off');
    this.validateFn = validateNumber({
      acceptNegative: this._acceptNegative,
      onlyInteger: this._onlyInteger,
      greaterThan: this._greaterThan,
      lessThan: this._lessThan
    });
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['acceptNegative'] || changes['onlyInteger'] || changes['greaterThan']) {
      this.validateFn = validateNumber({
        acceptNegative: this._acceptNegative,
        onlyInteger: this._onlyInteger,
        greaterThan: this._greaterThan,
        lessThan: this._lessThan
      });
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }



  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: number | string) {
    if (isPresent(value)) {
      this._value = value;
    } else {
      this._value = null;
    }

    const normalizedValue = this._value == null ? '' : this._numberPipe.transform(this._value, this.digits);
    this._writeViewValue(normalizedValue);
  }

  private _writeViewValue(v: string) {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', v);
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKeyDown(evt: KeyboardEvent) {
    if (!(this._elementRef.nativeElement as HTMLInputElement).disabled
    && !(this._elementRef.nativeElement as HTMLInputElement).readOnly) {
      this._toValue();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyup(evt: KeyboardEvent) {
    if (!(this._elementRef.nativeElement as HTMLInputElement).disabled
      && !(this._elementRef.nativeElement as HTMLInputElement).readOnly) {

      const input = (this._elementRef.nativeElement as HTMLInputElement);
      const val = input.value;
      const keyCode = evt.which || evt.keyCode;
      // Transform typed character
      const mappedChar = keyCode === 110 || keyCode === 190 || keyCode === 229 ? ',' : keyCode;
      if (mappedChar !== keyCode) {
        const start = input.selectionStart;
        const end = input.selectionEnd;

        input.value = val.slice(0, start - 1) + mappedChar + val.slice(end);
        input.selectionStart = input.selectionEnd = start;
      }
      // this._toValue(false); >> Optei por disparar o event onchangeCallback somente após sair do campo.
    }


    // if (evt.keyCode === 13
    //   && !(this._elementRef.nativeElement as HTMLInputElement).disabled
    //   && !(this._elementRef.nativeElement as HTMLInputElement).readOnly) {

    //   this._toValue();
    //   this.enterPressed.emit(evt);
    // }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    if (!(this._elementRef.nativeElement as HTMLInputElement).disabled
      && !(this._elementRef.nativeElement as HTMLInputElement).readOnly) {
      this._toValue(true);
    }
    this._onTouchedCallback();
  }


  private _toValue(writeToViewValue: boolean = true) {
    let viewValue = (this._elementRef.nativeElement as HTMLInputElement).value;
    viewValue = viewValue || '';
    if (isBlankOrEmpty(viewValue)) {
      if (isPresent(this._value)) {
        this._value = null;
        this._onChangeCallback(null);
      }
      return;
    }

    let s = viewValue.split(GROUP_SEPARATOR).join('');
    const separated = s.split(DECIMAL_SEPARATOR);
    let v: any = NaN;
    if (separated.length < 3) {
      s = separated.join('.');

      if (/[\+]?([\-]?([0-9]{1,})?[\.]?[0-9]{1,})/.test(s)) {
        v = parseFloat(s);

        if (!isNaN(v)) {
          viewValue = this._numberPipe.transform(v, this.digits);
          if (writeToViewValue) this._writeViewValue(viewValue);
          // converter novamente para aplicar os aredondamentos do pipe...
          s = viewValue.split(GROUP_SEPARATOR).join('').split(DECIMAL_SEPARATOR).join('.');
          v = parseFloat(s);
        }
      }
    }

    if (this._valueAsString) {
      v = v.toString();
    }


    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }

  }


  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }



}
