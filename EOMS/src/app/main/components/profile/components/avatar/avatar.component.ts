import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AvatarComponent)
    }
  ]
})
export class AvatarComponent implements OnInit, ControlValueAccessor {

  avatarFile!: any;
  avatarUrls: any;
  fileName!: string;

  @Input()
  avatarUrl!: string;

  constructor() { }

  onChange: any = ( file: any) => {};

  onTouched: any = () => {};

  writeValue(avatarUrl: string) {
    if (avatarUrl) {
      this.avatarUrl = avatarUrl;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // not needed for this example
  }

  ngOnInit(): void {}

  onFileChange(files: any){
    const filedata = files.target.files[0];
    this.fileName = filedata.name;

    const filesz = files.target.files as FileList;
    if (filesz.length > 0) {
      this.avatarFile = filesz.item(0);
      const reader = new FileReader();
      reader.readAsDataURL(this.avatarFile);
      reader.onload = () => {
        const _file = URL.createObjectURL(filesz[0]);
        this.avatarUrls = _file;
        this.avatarUrl = reader.result as string;
        this.onChange(this.avatarFile);
      };
    }
  }

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }

  // file: string = '';
  // fileurl!: string;
  // filename!: string;


  // ngOnInit(): void {}

  // writeValue(filename: string): void {
  //   this.file = filename;
  // }
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // onChange = (fileUrl: string, file: string) => {};

  // onTouched = () => {};

  // disabled: boolean = false;

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const filedata = event.target.files[0];
  //     this.filename = filedata.name;
  //     this.file = filedata;
  //     console.log(this.file);

  //     const files = event.target.files as FileList;
  //     if (files.length > 0) {
  //       const _file = URL.createObjectURL(files[0]);
  //       this.fileurl = _file;
  //       this.resetInput();
  //       this.onChange(this.fileurl, this.file );
  //     }
  //   }
  // }

  // resetInput(){
  //   const input = document.getElementById('avatar-input-file') as HTMLInputElement;
  //   if(input){
  //     input.value = "";
  //   }
  // }
}
