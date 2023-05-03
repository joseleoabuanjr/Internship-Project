import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BannerComponent
    }
  ]
})
export class BannerComponent implements OnInit, ControlValueAccessor {
  banner: string = '';

  ngOnInit(): void {}

  writeValue(_file: string): void {
    this.banner = _file;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (fileUrl: string) => {};

  onTouched = () => {};

  disabled: boolean = false;

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.banner = _file;
      this.resetInput();
      this.onChange(this.banner);
    }

  }

  resetInput(){
    const input = document.getElementById('banner-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
}
