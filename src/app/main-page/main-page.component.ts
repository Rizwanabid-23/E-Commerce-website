import { Component, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  slideIndex = 1;


  plusDivs(n: any): void {
    this.showDivs(this.slideIndex += n);
    console.log("plusdiv");
  }
  
  currentDiv(n: any) {
    this.showDivs(this.slideIndex = n);
  }
  
  showDivs(n:any) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
      // x[i].style.display = "none";
      x[i].setAttribute("style","display:none");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    // x[this.slideIndex - 1].style.display = "block";
    x[this.slideIndex - 1].setAttribute("style","display:block");
    
    dots[this.slideIndex - 1].className += " w3-white";
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
