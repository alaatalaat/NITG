import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  @Input() correctAnswer:boolean = false ;
  constructor(private elRef : ElementRef , private render:Renderer2) { }
  @HostListener('click') onAnswered(){
    if(this.correctAnswer){
      this.render.setStyle(this.elRef.nativeElement,'backgroundColor','#0ead69');
      this.render.setStyle(this.elRef.nativeElement,'color','#fff');
    }
    else
      this.render.setStyle(this.elRef.nativeElement,'backgroundColor','#db504a');
      this.render.setStyle(this.elRef.nativeElement,'color','#fff');
  }

}
