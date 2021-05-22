<template>
  <div id="app">
    <div id="page-top">
      <div id="wrapper">
        <Nav/>
        <div id="content-wrapper">
          <div id="content">
            <router-view/>
          </div>
          <Foot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import Nav from './components/partials/Nav.vue';
import Foot from './components/partials/Footer.vue';

export default {
    name: 'App',
    components: {
        Nav: Nav,
        Foot: Foot
    }
};
// Start of use strict

const sidebar = document.querySelector('.sidebar');
const sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop');

if (sidebar) {
    const collapseEl = sidebar.querySelector('.collapse');
    const collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'));
    const sidebarCollapseList = collapseElementList.map((collapseEl) => new bootstrap.Collapse(collapseEl, { toggle: false }));

    for (const toggle of sidebarToggles) {
        // Toggle the side navigation
        toggle.addEventListener('click', (e) => {
            document.body.classList.toggle('sidebar-toggled');
            sidebar.classList.toggle('toggled');

            if (sidebar.classList.contains('toggled')) {
                for (const bsCollapse of sidebarCollapseList) {
                    bsCollapse.hide();
                }
            }
        });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        if (vw < 768) {
            for (const bsCollapse of sidebarCollapseList) {
                bsCollapse.hide();
            }
        }
    });
}

// Prevent the content wrapper from scrolling when the fixed side navigation hovered over

const fixedNaigation = document.querySelector('body.fixed-nav .sidebar');

if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function (e) {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        if (vw > 768) {
            const e0 = e.originalEvent;
            const delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });
}

const scrollToTop = document.querySelector('.scroll-to-top');

if (scrollToTop) {
    // Scroll to top button appear
    window.addEventListener('scroll', () => {
        const scrollDistance = window.pageYOffset;

        // check if user is scrolling up
        if (scrollDistance > 100) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    });
}
// End of use strict

</script>

<style>
#wrapper #content-wrapper {
  background-color: #f8f9fc;
  width: 100%;
  overflow-x: hidden;
}

.flex-column {
  flex-direction: column !important;
}

.d-flex {
  display: flex !important;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-family: var(--bs-font-sans-serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #858796;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

</style>
