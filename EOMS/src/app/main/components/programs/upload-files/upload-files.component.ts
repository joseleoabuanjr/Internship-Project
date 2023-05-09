import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UploadFilesComponent
    }
  ]
})
export class UploadFilesComponent implements OnInit, ControlValueAccessor {
  upload_files: string = '';

  ngOnInit(): void {}

  writeValue(_file: string): void {
    this.upload_files = _file;
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
      this.upload_files = _file;
      this.resetInput();
      this.onChange(this.upload_files);
    }

  }

  resetInput(){
    const input = document.getElementById('upload-files-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
}
