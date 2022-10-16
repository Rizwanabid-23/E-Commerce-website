/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunctiondrop() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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

function myFunctiondrop1() {
    document.getElementById("myDropdown1").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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

function myFunctiondrop2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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

function myFunctiondrop3() {
    document.getElementById("myDropdown3").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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

function myFunctiondrop4() {
    document.getElementById("myDropdown4").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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

function myFunctiondrop5() {
    document.getElementById("myDropdown5").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
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


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-white";
}


(function ($) {
    "use strict";
    $.fn.sliderResponsive = function (settings) {

        var set = $.extend(
            {
                slidePause: 5000,
                fadeSpeed: 800,
                autoPlay: "on",
                showArrows: "off",
                hideDots: "off",
                hoverZoom: "on",
                titleBarTop: "off"
            },
            settings
        );

        var $slider = $(this);
        var size = $slider.find("> div").length; //number of slides
        var position = 0; // current position of carousal
        var sliderIntervalID; // used to clear autoplay

        // Add a Dot for each slide
        $slider.append("<ul></ul>");
        $slider.find("> div").each(function () {
            $slider.find("> ul").append('<li></li>');
        });

        // Put .show on the first Slide
        $slider.find("div:first-of-type").addClass("show");

        // Put .showLi on the first dot
        $slider.find("li:first-of-type").addClass("showli")

        //fadeout all items except .show
        $slider.find("> div").not(".show").fadeOut();

        // If Autoplay is set to 'on' than start it
        if (set.autoPlay === "on") {
            startSlider();
        }

        // If showarrows is set to 'on' then don't hide them
        if (set.showArrows === "on") {
            $slider.addClass('showArrows');
        }

        // If hideDots is set to 'on' then hide them
        if (set.hideDots === "on") {
            $slider.addClass('hideDots');
        }

        // If hoverZoom is set to 'off' then stop it
        if (set.hoverZoom === "off") {
            $slider.addClass('hoverZoomOff');
        }

        // If titleBarTop is set to 'on' then move it up
        if (set.titleBarTop === "on") {
            $slider.addClass('titleBarTop');
        }

        // function to start auto play
        function startSlider() {
            sliderIntervalID = setInterval(function () {
                nextSlide();
            }, set.slidePause);
        }

        // on mouseover stop the autoplay
        $slider.mouseover(function () {
            if (set.autoPlay === "on") {
                clearInterval(sliderIntervalID);
            }
        });

        // on mouseout starts the autoplay
        $slider.mouseout(function () {
            if (set.autoPlay === "on") {
                startSlider();
            }
        });

        //on right arrow click
        $slider.find("> .right").click(nextSlide)

        //on left arrow click
        $slider.find("> .left").click(prevSlide);

        // Go to next slide
        function nextSlide() {
            position = $slider.find(".show").index() + 1;
            if (position > size - 1) position = 0;
            changeCarousel(position);
        }

        // Go to previous slide
        function prevSlide() {
            position = $slider.find(".show").index() - 1;
            if (position < 0) position = size - 1; changeCarousel(position);
        } //when user clicks slider button 
        $slider.find("> ul > li").click(function() {
        position = $(this).index();
        changeCarousel($(this).index());
    }) ;

    //this changes the image and button selection
    function changeCarousel() {
        $slider.find(".show").removeClass("show").fadeOut();
        $slider
            .find("> div")
            .eq(position)
            .fadeIn(set.fadeSpeed)
            .addClass("show");
        // The Dots
        $slider.find("> ul").find(".showli").removeClass("showli");
        $slider.find("> ul > li").eq(position).addClass("showli");
    }

    return $slider;
};
}) (jQuery);



//////////////////////////////////////////////
// Activate each slider - change options
//////////////////////////////////////////////
$(document).ready(function () {

    $("#slider1").sliderResponsive({
        // Using default everything
        // slidePause: 5000,
        // fadeSpeed: 800,
        // autoPlay: "on",
        // showArrows: "off",
        // hideDots: "off",
        // hoverZoom: "on",
        // titleBarTop: "off"
    });

    $("#slider2").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
    });

    $("#slider3").sliderResponsive({
        hoverZoom: "off",
        hideDots: "on"
    });

});