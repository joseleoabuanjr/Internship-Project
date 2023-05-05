import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent{

  @ViewChild('print', {static:true}) el!: ElementRef<HTMLImageElement>
  filterValue!: string;
  dataSource: any;

  makePdf(){
    html2canvas(this.el.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF( 'p', 'mm', 'a4')

      pdf.setFontSize(20)

      const imageProps = pdf.getImageProperties(imgData)

      pdf.addImage(imgData, 'PNG/JPG', 0, 0, 0 , 0 )

      pdf.save('sample.pdf')
    })
  }

  report: any[] = [
    {
      "title": "Invocation",
      'name': 'Audio Visual Presentation'
    },
    {
      "title": "National Anthem",
      'name': 'Audio Visual Presentation'
    },
    {
      "title": "BulSU Hymn",
      'name': 'Audio Visual Presentation'
    },
    {
      "title": "Opening Remarks",
      'name': 'Ms. Lourdes M. Tiongson'
    },
    {
      "title": "Recognition of Attendees",
      'name': 'Moderator'
    },
    {
      "title": "Introduction Speaker",
      'name': 'Desserie Rose Jingco'
    }
  ];
  
  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
