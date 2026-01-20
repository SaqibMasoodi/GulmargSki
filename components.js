const HEADER_HTML = `
    <nav class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 md:px-6 md:py-4 flex justify-between items-center shadow-2xl transition-all duration-300 font-sans"
        id="main-nav">

        <a href="index.html"
            class="flex items-center gap-2 text-lg md:text-xl font-black tracking-tighter text-alpine-deep mr-4 shrink-0 z-50 relative">
            <img src="images/logo.webp" alt="Wolf Adventures"
                class="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-slate-200">
            <span class="hidden sm:inline">WOLF<span class="text-alpine-blue">.ADV</span></span>
        </a>

        <div class="hidden lg:flex space-x-8 text-sm font-semibold text-slate-500">
            <a href="index.html" class="hover:text-alpine-blue transition-colors">Home</a>
            <a href="stays.html" class="hover:text-alpine-blue transition-colors">Accommodations</a>
            <a href="packages.html" class="hover:text-alpine-blue transition-colors">Packages</a>
            <a href="gallery.html" class="hover:text-alpine-blue transition-colors">Gallery</a>
            <a href="policies.html" class="hover:text-alpine-blue transition-colors">Policies</a>
        </div>

        <div class="flex items-center gap-3 z-50 relative">
            <a href="booking.html"
                class="bg-alpine-deep text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-alpine-blue transition-transform hover:scale-105 shadow-lg shadow-alpine-deep/20 hidden sm:block">Book
                Now</a>

            <button onclick="toggleMobileMenu()"
                class="lg:hidden p-1.5 md:p-2 text-slate-900 rounded-full hover:bg-slate-100 transition-colors focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </nav>

    <div id="mobile-menu-overlay"
        class="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl opacity-0 pointer-events-none transition-opacity duration-300 flex flex-col items-center justify-center font-sans">
        <ul class="text-center space-y-8">
            <li><a href="index.html" onclick="toggleMobileMenu()"
                    class="text-2xl font-black text-slate-900 hover:text-alpine-blue transition-colors">Home</a>
            </li>
            <li><a href="stays.html" onclick="toggleMobileMenu()"
                    class="text-2xl font-black text-slate-900 hover:text-alpine-blue transition-colors">Accommodations</a>
            </li>
            <li><a href="packages.html" onclick="toggleMobileMenu()"
                    class="text-2xl font-black text-slate-900 hover:text-alpine-blue transition-colors">Packages</a>
            </li>
            <li><a href="policies.html" onclick="toggleMobileMenu()"
                    class="text-2xl font-black text-slate-900 hover:text-alpine-blue transition-colors">Policies</a>
            </li>
            <li><a href="gallery.html" onclick="toggleMobileMenu()"
                    class="text-2xl font-black text-slate-900 hover:text-alpine-blue transition-colors">Gallery</a>
            </li>
            <li>
                <a href="booking.html"
                    class="inline-block mt-4 px-8 py-3 rounded-full bg-alpine-deep text-white font-bold shadow-xl">Book
                    Your Trip</a>
            </li>
        </ul>
    </div>
`;

const FOOTER_HTML = `
    <footer id="contact" class="bg-slate-900 text-white pt-24 pb-12 px-6 mt-12 font-sans">
        <div class="w-[95%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

            <div class="col-span-1 md:col-span-2 pr-8">
                <h2 class="text-3xl font-black tracking-tighter mb-6">WOLF<span class="text-alpine-blue">.ADV</span>
                </h2>
                <p class="max-w-sm text-slate-400 mb-8 leading-relaxed text-sm">
                    Experience the raw beauty of the Himalayas with certified instructors, premium logistics, and local
                    expertise.
                </p>
                <a href="booking.html"
                    class="inline-block px-8 py-3 rounded-md bg-white text-slate-900 font-bold text-sm hover:bg-alpine-blue hover:text-white transition-colors">
                    Start Your Booking
                </a>
            </div>

            <div>
                <h4 class="font-bold mb-6 text-lg">Explore</h4>
                <ul class="space-y-4 text-slate-400 text-sm font-medium">
                    <li><a href="packages.html" class="hover:text-white transition-colors">Ski Packages</a></li>
                    <li><a href="stays.html" class="hover:text-white transition-colors">Accommodations</a></li>
                    <li><a href="index.html#attractions" class="hover:text-white transition-colors">Local
                            Attractions</a></li>
                    <li><a href="index.html#guides" class="hover:text-white transition-colors">Our Instructors</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold mb-6 text-lg">Visit Us</h4>
                <ul class="space-y-4 text-slate-400 text-sm font-medium">
                    <li>Main Market, Gulmarg<br>193403</li>
                    <li>+91 60058 06856</li>
                    <li>wolfadventureskashmir@gmail.com</li>
                    <li class="pt-2"><a href="#"
                            class="text-white font-bold hover:text-alpine-blue transition-colors">Get Directions</a>
                    </li>
                </ul>

                <h4 class="font-bold my-6 text-lg">Follow Us</h4>
                <div class="flex gap-4">
                    <a href="https://www.instagram.com/wolf_adventures_kashmir/" target="_blank"
                        class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                        <span class="sr-only">Instagram</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61585233676306&ref=pl_edit_xav_ig_profile_page_web"
                        target="_blank"
                        class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                        <span class="sr-only">Facebook</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/@mubashirkashmirii" target="_blank"
                        class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                        <span class="sr-only">YouTube</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div
            class="w-[95%] max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <p>© 2025 Wolf Adventure Gulmarg.</p>
            <div class="flex gap-6 mt-4 md:mt-0">
                <a href="policies.html#privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                <a href="policies.html#refunds" class="hover:text-white transition-colors">Cancellation Policy</a>
                <a href="policies.html#legal" class="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </footer>
`;

const FAB_HTML = `
    <div id="contact-fab-container"
        class="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2 group pointer-events-none font-sans">
        <div id="fab-options"
            class="flex flex-col gap-2 transition-all duration-300 opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
            <a href="https://wa.me/916005806856" target="_blank"
                class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-green-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">WhatsApp</span>
                <span class="material-symbols-rounded text-green-600">forum</span>
            </a>
            <a href="tel:+916005806856"
                class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-blue-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">Call Us</span>
                <span class="material-symbols-rounded text-blue-500">call</span>
            </a>
            <a href="mailto:wolfadventureskashmir@gmail.com"
                class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-slate-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">Email</span>
                <span class="material-symbols-rounded text-slate-500">mail</span>
            </a>
        </div>
        <button
            class="w-14 h-14 bg-alpine-blue hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 focus:outline-none relative overflow-hidden pointer-events-auto">
            <span
                class="material-symbols-rounded text-2xl absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 rotate-0 group-hover:rotate-90">support_agent</span>
            <span
                class="material-symbols-rounded text-2xl absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 -rotate-90 group-hover:rotate-0">close</span>
        </button>
    </div>
`;

const SCROLLBAR_STYLE = `
/* Modern Global Scrollbar */
::-webkit-scrollbar {
    width: 14px;
    height: 14px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
    background: #0f172a;
    border-radius: 20px;
    border: 3px solid #f1f5f9;
}

::-webkit-scrollbar-thumb:hover {
    background: #1e293b;
}

::-webkit-scrollbar-button:single-button {
    background-color: transparent;
    display: block;
    background-size: 10px;
    background-repeat: no-repeat;
}

/* Up button */
::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: 16px;
    width: 14px;
    background-position: center bottom 2px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%230f172a'><polygon points='50,20 10,70 90,70'/></svg>");
}

/* Down button */
::-webkit-scrollbar-button:single-button:vertical:increment {
    height: 16px;
    width: 14px;
    background-position: center top 2px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%230f172a'><polygon points='50,80 10,30 90,30'/></svg>");
}

/* Scrollbar Hide Utilities */
.no-scrollbar::-webkit-scrollbar,
.scrollbar-hide::-webkit-scrollbar {
    display: none !important;
}

.no-scrollbar,
.scrollbar-hide {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
`;

function injectComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const fabPlaceholder = document.getElementById('fab-placeholder');

    // Inject Styles
    if (!document.getElementById('global-scrollbar-style')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'global-scrollbar-style';
        styleTag.innerHTML = SCROLLBAR_STYLE;
        document.head.appendChild(styleTag);
    }

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HEADER_HTML;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = FOOTER_HTML;
    }

    if (fabPlaceholder) {
        fabPlaceholder.innerHTML = FAB_HTML;
    }

    // Trigger any dependent script logic
    if (typeof highlightActiveLink === 'function') {
        highlightActiveLink();
    }
}

// Inject as soon as the script loads if the placeholders exist, 
// or on DOMContentLoaded as a fallback.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
} else {
    injectComponents();
}
