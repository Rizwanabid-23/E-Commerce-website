import { Component, HostListener, OnInit,ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})


export class MainPageComponent implements OnInit {

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;

  prevSlide() {
    this.carousel.prev();
    this,this.carousel.play();
  }

  nextSlide() {
    this.carousel.next();
    this.carousel.play();
  }

  stopSlider() {
    this.carousel.pause();
  }

  constructor() { 

  }

  ngOnInit(): void {
    
    
  }
  // slideIndex = 1;


  // plusDivs(n: any): void {
  //   this.showDivs(this.slideIndex += n);
  //   console.log("plusdiv");
  // }
  
  // currentDiv(n: any) {
  //   this.showDivs(this.slideIndex = n);
  // }
  
  // showDivs(n:any) {
  //   var i;
  //   var x = document.getElementsByClassName("mySlides");
  //   var dots = document.getElementsByClassName("demo");
  //   if (n > x.length) { this.slideIndex = 1 }
  //   if (n < 1) { this.slideIndex = x.length }
  //   for (i = 0; i < x.length; i++) {
  //     // x[i].style.display = "none";
  //     x[i].setAttribute("style","display:none");
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" w3-white", "");
  //   }
  //   // x[this.slideIndex - 1].style.display = "block";
  //   x[this.slideIndex - 1].setAttribute("style","display:block");
    
  //   dots[this.slideIndex - 1].className += " w3-white";
  // }
  
  







  slideIndex = 1;
  // showSlides(this.slideIndex);
  
  // Next/previous controls
  plusSlides(n:any) {
    this.showSlides(this.slideIndex += n);
  }
  
  // Thumbnail image controls
  currentSlide(n:any) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n:any) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style","display:none");
      // slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    // slides[this.slideIndex-1].style.display = "block";
    slides[this.slideIndex-1].setAttribute("style","display:block");
    dots[this.slideIndex-1].className += " active";
  }



  
  
  
  myFunctiondrop(@Inject(DOCUMENT) document: Document) {
    document.getElementById("myDropdown")?.classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  myFunctiondrop1() {
    document.getElementById("myDropdown1")?.classList.toggle("show");
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      if (!(event.target == document.getElementById("electric-button")) || (event.target == document.getElementById("cloth-button"))) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  
  
  
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  myFunctiondrop2() {
    document.getElementById("myDropdown2")?.classList.toggle("show");
  }
  
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  // myFunctiondrop3() {
  //   document.getElementById("myDropdown3").classList.toggle("show");
  // }
  
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  // myFunctiondrop4() {
  //   document.getElementById("myDropdown4").classList.toggle("show");
  // }
  
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  // myFunctiondrop5() {
  //   document.getElementById("myDropdown5").classList.toggle("show");
  // }
  
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //               openDropdown.classList.remove('show');
  //           }
  //       }
  //   }
  // }
  
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x?.className=="topnav") {
        x.className += "responsive";
    } else {
        null;
    }
  }
  

}
