(function () {
    "use strict";

    /**
     * selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }


/**
  * Animation on scroll
  * if you want to see the contents this one is necessary
  * for running everything
  */
window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

/********************************************* */
 /**
   * Skills animation
   */
 let skilsContent = select('.skills-content');
 if (skilsContent) {
   new Waypoint({
     element: skilsContent,
     offset: '80%',
     handler: function(direction) {
       let progress = select('.progress .progress-bar', true);
       progress.forEach((el) => {
         el.style.width = el.getAttribute('aria-valuenow') + '%'
       });
     }
   })
 }

 /**
  * Porfolio isotope and filter
  */
 window.addEventListener('load', () => {
   let portfolioContainer = select('.portfolio-container');
   if (portfolioContainer) {
     let portfolioIsotope = new Isotope(portfolioContainer, {
       itemSelector: '.portfolio-item'
     });

     let portfolioFilters = select('#portfolio-flters li', true);

     on('click', '#portfolio-flters li', function(e) {
       e.preventDefault();
       portfolioFilters.forEach(function(el) {
         el.classList.remove('filter-active');
       });
       this.classList.add('filter-active');

       portfolioIsotope.arrange({
         filter: this.getAttribute('data-filter')
       });
       portfolioIsotope.on('arrangeComplete', function() {
         AOS.refresh()
       });
     }, true);
   }

 });

 /**
  * Initiate portfolio lightbox 
  */
 const portfolioLightbox = GLightbox({
   selector: '.portfolio-lightbox'
 });

 /**
  * Initiate portfolio details lightbox 
  */
 const portfolioDetailsLightbox = GLightbox({
   selector: '.portfolio-details-lightbox',
   width: '90%',
   height: '90vh'
 });

 /**
  * Portfolio details slider
  */
 new Swiper('.portfolio-details-slider', {
   speed: 400,
   loop: true,
   autoplay: {
     delay: 5000,
     disableOnInteraction: false
   },
   pagination: {
     el: '.swiper-pagination',
     type: 'bullets',
     clickable: true
   }
 });

 /**
  * Testimonials slider
  */
//  new Swiper('.testimonials-slider', {
//    speed: 600,
//    loop: true,
//    autoplay: {
//      delay: 5000,
//      disableOnInteraction: false
//    },
//    slidesPerView: 'auto',
//    pagination: {
//      el: '.swiper-pagination',
//      type: 'bullets',
//      clickable: true
//    }
//  });

 

 /**
  * Initiate Pure Counter 
  */
 //new PureCounter();

 // Going to google maps for location
//  let address = document.getElementById("checkLocation");
 
//  address.addEventListener("click", () => {
//     window.open("https://www.google.com/maps/place/Shahr-e+Jadid-e+Parand,+Tehran+Province/@35.4853229,50.9415489,13z/data=!4m6!3m5!1s0x3f92750b1a9cd79d:0x123b58807bd23a56!8m2!3d35.4718034!4d50.9600387!16zL20vMDRfbjdi?entry=ttu", "_blank");
//  });

 /*
 ** Tooltips Area
 */
 const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
 const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})();