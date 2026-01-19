// --- MOBILE MENU LOGIC ---
function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (overlay.style.opacity === '1') {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. RESORT MAP LOGIC ---
    if (document.getElementById('gulmarg-map')) {
        var map = L.map('gulmarg-map', {
            scrollWheelZoom: false,
            zoomControl: false,
            attributionControl: true
        }).setView([34.040, 74.382], 13);

        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(map);

        L.control.zoom({ position: 'topright' }).addTo(map);
    }

    // --- 2. SLIDER LOGIC ---
    const sliders = document.querySelectorAll('.auto-slider');
    sliders.forEach((slider) => {
        const track = slider.querySelector('.slider-track');
        if (track) {
            const slides = track.children;
            const slideCount = slides.length;
            let currentIndex = 0;
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 3000);
        }
    });

    // --- 3. ATTRACTIONS TAB LOGIC (Init) ---
    const defaultOpen = document.getElementById("defaultOpen");
    if (defaultOpen) defaultOpen.click();


    // Close dropdown on outside click
    window.addEventListener('click', (e) => {
        const d = document.getElementById('year-dropdown');
        const t = document.getElementById('year-trigger');
        if (t && d && !t.contains(e.target) && !d.contains(e.target) && d.classList.contains('open')) toggleDropdown();
    });

    // --- POLICIES PAGE: TABLE OF CONTENTS ---
    const policyNavLinks = document.querySelectorAll('.nav-link');

    if (policyNavLinks.length > 0) {
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    policyNavLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
    // --- AUTO-HIGHLIGHT ACTIVE NAV LINK ---
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#main-nav a'); // targets links in your specific nav

        navLinks.forEach(link => {
            // 1. Get the 'href' of the link (e.g., "packages.html")
            const linkPath = link.getAttribute('href');

            // 2. Check if the current browser URL contains this link
            // (We use 'includes' because your path might be /wolf-adventure/packages.html)
            if (currentPath.includes(linkPath) && linkPath !== 'index.html' && linkPath !== '#') {

                // Add your "Active" styles (Blue Text)
                link.classList.add('text-alpine-blue', 'font-bold');
                link.classList.remove('text-slate-500');

            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                // Special case for Homepage to avoid highlighting everything
                if (linkPath === 'index.html') {
                    // You might not want to highlight 'Home' if you use a logo, 
                    // but if you had a text link, this is where you'd do it.
                }
            }
        });
    }

    // Run on load
    highlightActiveLink();
});

// --- GLOBAL FUNCTIONS (Must be outside DOMContentLoaded to be accessible by onclick) ---

// 1. CURRICULUM SWITCHER
// 1. CURRICULUM SWITCHER
// --- NEW CURRICULUM LOGIC (Master the Mountain) ---

function switchDay(dayNum) {
    // 1. Reset ALL buttons to "Inactive" state
    const allBtns = document.querySelectorAll('.nav-btn');
    allBtns.forEach(btn => {
        const number = btn.querySelector('.nav-number');
        const title = btn.querySelector('.nav-title');
        const subtitle = btn.querySelector('.nav-subtitle');
        const arrow = btn.querySelector('.nav-arrow');

        // Reset Container (Glassy Inactive)
        btn.className = "nav-btn group w-full flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer border border-white/40 hover:border-sky-300/50 bg-white/60 backdrop-blur-md hover:bg-white hover:shadow-lg hover:shadow-sky-900/5 relative overflow-hidden";

        // Reset Number (Slate/Invisible bg)
        number.className = "nav-number w-12 h-12 rounded-full bg-white/50 flex items-center justify-center font-black text-slate-400 text-lg group-hover:scale-110 group-hover:bg-sky-50 group-hover:text-sky-600 transition-all duration-500";

        // Reset Text
        title.className = "nav-title font-bold text-slate-800 text-lg leading-tight group-hover:text-sky-900";
        subtitle.className = "nav-subtitle text-xs font-bold text-slate-500 tracking-wide uppercase mt-0.5 group-hover:text-sky-500/80";

        // Reset Arrow (Hidden)
        arrow.className = "nav-arrow opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-sky-500";
    });

    // 2. Set ACTIVE button style
    const activeBtn = document.getElementById(`nav-btn-${dayNum}`);
    if (activeBtn) {
        const number = activeBtn.querySelector('.nav-number');
        const title = activeBtn.querySelector('.nav-title');
        const subtitle = activeBtn.querySelector('.nav-subtitle');
        const arrow = activeBtn.querySelector('.nav-arrow');

        // Active Container (Solid Blue)
        activeBtn.className = "nav-btn group w-full flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer border border-blue-500/0 hover:border-sky-200/50 bg-blue-600 shadow-xl shadow-blue-900/20 relative overflow-hidden";

        // Active Number (White text)
        number.className = "nav-number w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-lg transition-all duration-500";

        // Active Text (White)
        title.className = "nav-title font-bold text-white text-lg leading-tight";
        subtitle.className = "nav-subtitle text-xs font-bold text-blue-100 tracking-wide uppercase mt-0.5";

        // Active Arrow (Visible White)
        arrow.className = "nav-arrow opacity-100 translate-x-0 transition-all duration-500 text-white";
    }

    // 3. Switch Content Panel (Fade Effect)
    const allContent = document.querySelectorAll('.day-content');
    allContent.forEach(content => {
        content.classList.remove('opacity-100', 'relative', 'z-10');
        content.classList.add('opacity-0', 'absolute', 'z-0', 'pointer-events-none');
    });

    const activeContent = document.getElementById(`day-${dayNum}`);
    if (activeContent) {
        activeContent.classList.remove('opacity-0', 'absolute', 'z-0', 'pointer-events-none');
        activeContent.classList.add('opacity-100', 'relative', 'z-10');
    }
}

// Initialize Day 1 and Attractions on Load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof switchDay === 'function') switchDay(1); // Legacy Curriculum
    if (typeof setAttraction === 'function') setAttraction('gondola'); // New Attractions
});

// 2. ATTRACTIONS LOGIC (Sidebar Layout)
const attractionsData = [
    {
        id: 'gondola',
        title: 'Gondola Cable Car',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">World's 2nd Highest Cable Car</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed max-w-2xl">The highlight of any trip. Rise from the pine forests to the naked peaks in minutes.</p>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase">Phase 1</h4>
                            <span class="text-[10px] bg-slate-900 text-white font-bold px-2 py-1 rounded">8,500 ft</span>
                        </div>
                        <p class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-bold uppercase tracking-wider">Gulmarg to Kongdoori</p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Takes you to a bowl-shaped valley. Features restaurants, snow parks, and the main beginner slopes. <br><span class="font-bold text-slate-900 dark:text-white">Price: ₹900</span></p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors relative overflow-hidden group">
                        <div class="flex justify-between items-center mb-4 relative z-10">
                            <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase">Phase 2</h4>
                            <span class="text-[10px] bg-blue-600 text-white font-bold px-2 py-1 rounded">14,000 ft</span>
                        </div>
                        <p class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-bold uppercase tracking-wider relative z-10">To Apharwat Peak</p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">The main event. Breathtaking views of Nanga Parbat. <br><span class="text-red-500 font-bold text-xs mt-2 block">*Sightseeing or Experts Only.</span><span class="font-bold text-slate-900 dark:text-white block mt-1">Price: ₹1,100</span></p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'thrill',
        title: 'Snowmobile & ATV',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>', // Changed icon to lightning/bolt for thrill
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Adrenaline Without Skis</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                        <img src="images/home/attractions/gondola.webp" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Snowmobile">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">Snowmobiles</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">High-speed motorized sleds. Zoom across vast frozen snowfields. <br><span class="text-white font-bold">Price: ₹2,200</span></p>
                        </div>
                    </div>
                    <div class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                        <img src="https://images.unsplash.com/photo-1625902047808-72b157b88950?q=80&w=2670&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="ATV">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">ATV (Quad Bikes)</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">4x4 beasts with tire chains. Explore Tangmarg to Drung. <br><span class="text-white font-bold">Price: ₹2,200</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'sightseeing',
        title: 'Sightseeing',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>', // Home/Landmark icon
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Iconic Spots</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium">The "Must-Visit" locations for every traveler.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="images/home/attractions/waterfall.webp" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Waterfall">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Drung Waterfall</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Famous frozen waterfall (Jan/Feb).</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1548625361-288295b927a4?q=80&w=2669&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Church">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">St. Mary’s Church</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">100+ year old Victorian church.</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1570176461466-4c7b80a568a0?q=80&w=2670&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Temple">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Maharani Temple</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Red-roofed Shiva temple on a hill.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'explore',
        title: 'Beyond Gulmarg',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>', // Map pin
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Complete Your Itinerary</h3>
                <div class="space-y-8">
                    <div class="flex gap-6 group">
                        <div class="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-blue-600 transition-colors">DL</div>
                        <div>
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white">Srinagar (Dal Lake)</h4>
                            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">2 hours away. The classic experience is a Shikara ride on the frozen lake and a Houseboat stay.</p>
                        </div>
                    </div>
                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700 ml-8"></div>
                    <div class="flex gap-6 group">
                        <div class="w-16 h-16 rounded-full bg-white border-2 border-slate-200 dark:border-slate-700 text-slate-900 flex items-center justify-center font-bold text-xl shrink-0 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">PH</div>
                        <div>
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white">Pahalgam</h4>
                            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">"Valley of Shepherds." Famous for scenic rivers and pine forests.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'heli',
        title: 'Helicopter Rides',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Sky-High Adventure</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto no-scrollbar pr-2 pb-2">
                    
                    <!-- Joint Ride -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group flex flex-col h-full">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Joint<br>Ride</h4>
                            </div>
                            <p class="text-xs text-blue-600 dark:text-blue-400 mb-4 font-bold uppercase tracking-wider">Aerial Sightseeing</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>No landing included</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Panoramic aerial views</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹9,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                    <!-- Commodore Ride -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group relative overflow-hidden flex flex-col h-full">
                        <div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Bestseller</div>
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Kongdoori<br>Ride</h4>
                            </div>
                            <p class="text-xs text-blue-600 dark:text-blue-400 mb-4 font-bold uppercase tracking-wider">Landing Experience</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Landing included</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Explore on foot</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹12,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                    <!-- Sunshine Peak -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-colors group border-b-4 border-b-amber-400 md:border-b-0 md:border-l-4 md:border-l-amber-400 flex flex-col h-full">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Sunshine<br>Peak</h4>
                            </div>
                            <p class="text-xs text-amber-500 mb-4 font-bold uppercase tracking-wider">Premium Route</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Mountain landing</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Extended flight time</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹15,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                </div>
            </div>
        `
    },
    {
        id: 'sledging',
        title: 'Sledging',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Classic Snow Fun</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed max-w-2xl">Experience the timeless joy of sledging down Gulmarg's snowy slopes.</p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-2 uppercase">Traditional Sledge</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-4">Wooden sleds pulled or pushed by local guides on gentle slopes. Perfect for families and beginners.</p>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span class="block text-xl font-black text-slate-900 dark:text-white">₹1,000 - ₹5,000</span>
                            <span class="text-xs text-slate-500 font-bold uppercase">per ride (Est. ₹1,500)</span>
                        </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-2 uppercase">Tube Sledging</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-4">Inflatable tube rides for a faster, more thrilling descent. Available at Phase 1 Gondola area.</p>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span class="block text-xl font-black text-slate-900 dark:text-white">₹300 - ₹500</span>
                            <span class="text-xs text-slate-500 font-bold uppercase">per ride</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];

let activeAttractionId = 'gondola';

function renderAttractionsList() {
    const listContainer = document.getElementById('attractions-list');
    if (!listContainer) return;

    listContainer.innerHTML = attractionsData.map(item => {
        const isActive = item.id === activeAttractionId;
        const baseClasses = "w-full text-left px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-between group border-2";
        const activeClasses = isActive
            ? "bg-slate-900 text-white border-slate-900 shadow-md"
            : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200";

        return `
            <button onclick="setAttraction('${item.id}')" class="${baseClasses} ${activeClasses}">
                <span class="tracking-wide">${item.title}</span>
                <svg class="w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${item.icon}
                </svg>
            </button>
        `;
    }).join('');
}

function renderAttractionDetail() {
    const detailContainer = document.getElementById('attraction-detail');
    if (!detailContainer) return;

    const attraction = attractionsData.find(a => a.id === activeAttractionId);
    if (!attraction) return;

    // Fade out effect could be added here similar to curriculum
    detailContainer.innerHTML = attraction.content;
}

function setAttraction(id) {
    activeAttractionId = id;
    renderAttractionsList();
    renderAttractionDetail();
}

// 3. CURRENCY CONVERTER

// 3. CURRENCY CONVERTER
function updateCurrency() {
    const selector = document.getElementById('currency-selector');
    let currency = 'INR';

    if (selector) {
        currency = selector.value;
        localStorage.setItem('preferredCurrency', currency);
    } else {
        currency = localStorage.getItem('preferredCurrency') || 'INR';
    }

    const priceElements = document.querySelectorAll('.price-display');
    const rates = { 'INR': 1, 'USD': 85, 'EUR': 90 };
    const symbols = { 'INR': '₹', 'USD': '$', 'EUR': '€' };

    priceElements.forEach(el => {
        let basePrice = el.getAttribute('data-inr');
        if (!basePrice) {
            // If data-inr is missing, try to read it from text content if it's INR
            const text = el.textContent.replace(/[^0-9.]/g, '');
            if (text) basePrice = text;
            el.setAttribute('data-inr', basePrice);
        }
        basePrice = parseFloat(basePrice);

        if (isNaN(basePrice)) return;

        let convertedPrice = (currency === 'INR') ? basePrice : basePrice / rates[currency];

        if (basePrice > 100000 && currency === 'INR') {
            el.textContent = `₹${(basePrice / 100000).toFixed(1)}L`;
        } else {
            el.textContent = `${symbols[currency]}${Math.round(convertedPrice).toLocaleString()}`;
        }
    });
}
// Initialize currency on load
document.addEventListener('DOMContentLoaded', () => {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    const selector = document.getElementById('currency-selector');
    if (savedCurrency && selector) {
        selector.value = savedCurrency;
        updateCurrency();
    } else if (savedCurrency) {
        updateCurrency(); // Update prices even if selector is missing (other pages)
    }
});

// 4. WEATHER WIDGET (Live Data Integration)
const weatherLocations = {
    gulmarg: { lat: 34.0484, lon: 74.3805, baseAlt: 2650, summitAlt: 3980, baseLabel: "Base (2,650m)", summitLabel: "Summit (3,980m)" },
    pahalgam: { lat: 34.0167, lon: 75.3167, baseAlt: 2130, summitAlt: 3400, baseLabel: "Base (2,130m)", summitLabel: "Summit (3,400m)" },
    sonamarg: { lat: 34.3000, lon: 75.2500, baseAlt: 2800, summitAlt: 4100, baseLabel: "Base (2,800m)", summitLabel: "Summit (4,100m)" }
};

let weatherData = {
    gulmarg: { base: "--°C", summit: "--°C", baseLabel: "Base (2,650m)", summitLabel: "Summit (3,980m)" },
    pahalgam: { base: "--°C", summit: "--°C", baseLabel: "Base (2,130m)", summitLabel: "Summit (3,400m)" },
    sonamarg: { base: "--°C", summit: "--°C", baseLabel: "Base (2,800m)", summitLabel: "Summit (4,100m)" }
};

async function fetchLiveWeather() {
    for (const [key, loc] of Object.entries(weatherLocations)) {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m&timezone=auto`);
            if (!res.ok) throw new Error('Weather API Error');
            const data = await res.json();
            const baseTemp = data.current.temperature_2m;

            // Lapse rate estimation: 6.5°C per 1000m
            const eleDiff = loc.summitAlt - loc.baseAlt;
            const summitTemp = (baseTemp - (eleDiff / 1000 * 6.5)).toFixed(1);

            weatherData[key] = {
                base: `${baseTemp}°C`,
                summit: `${summitTemp}°C`,
                baseLabel: loc.baseLabel,
                summitLabel: loc.summitLabel
            };

            // Update UI if this location is currently selected
            const selectedText = document.getElementById('selected-weather');
            if (selectedText && selectedText.textContent.toLowerCase().includes(key)) {
                updateWeatherUI(key);
            }
        } catch (err) {
            console.error(`Weather fetch error for ${key}:`, err);
        }
    }
}

function updateWeatherUI(location) {
    const data = weatherData[location];
    if (data && document.getElementById('base-temp')) {
        document.getElementById('base-temp').textContent = data.base;
        document.getElementById('summit-temp').textContent = data.summit;
        document.getElementById('base-label').textContent = data.baseLabel;
        document.getElementById('summit-label').textContent = data.summitLabel;
    }
}

// -- Custom Dropdown Logic --
function toggleWeatherDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('weather-dropdown-menu');
    const arrow = document.getElementById('weather-arrow');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        setTimeout(() => {
            menu.classList.remove('opacity-0', 'scale-y-95');
            menu.classList.add('opacity-100', 'scale-y-100');
        }, 10);
        arrow.classList.add('rotate-180');
    } else {
        menu.classList.remove('opacity-100', 'scale-y-100');
        menu.classList.add('opacity-0', 'scale-y-95');
        setTimeout(() => menu.classList.add('hidden'), 200);
        arrow.classList.remove('rotate-180');
    }
}

function selectWeather(location, label) {
    const el = document.getElementById('selected-weather');
    if (el) el.textContent = label;
    updateWeatherUI(location);
    toggleWeatherDropdown();
}

// Invoke on load
fetchLiveWeather();

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    const menu = document.getElementById('weather-dropdown-menu');
    const btn = document.getElementById('weather-dropdown-btn');

    if (menu && !menu.classList.contains('hidden') && !btn.contains(e.target) && !menu.contains(e.target)) {
        toggleWeatherDropdown();
    }
});

// --- BOOKING PAGE LOGIC ---

// Helper to access Alpine Data
function getAlpineData() {
    const el = document.querySelector('[x-data]');
    return el && el._x_dataStack ? el._x_dataStack[0] : null;
}

function submitBooking(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    // Ensure validity of standard inputs
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const alpineData = getAlpineData();

    if (!alpineData) {
        alert("System Error: Could not retrieve calculator data. Please refresh and try again.");
        return;
    }

    // 2. Package / Tier Map
    const tierMap = {
        'dorm': 'Dormitory',
        '2star': '2 Star',
        '3star_low': '3 Star (Standard)',
        '3star_high': '3 Star (Premium)',
        '4star_low': '4 Star (Standard)',
        '4star_high': '4 Star (Premium)',
        '5star': '5 Star'
    };
    const tierName = tierMap[alpineData.selectedTier] || alpineData.selectedTier;
    const hotel = formData.get('hotel') || 'Not Selected';
    const dateVal = formData.get('date'); // YYYY-MM-DD

    // --- WHATSAPP MESSAGE ---
    let msg = `*New Booking Request from Skigulmarg.com*\n\n`;

    msg += `👤 *Customer*\n`;
    msg += `Name: ${formData.get('name')}\n`;
    msg += `Phone: ${formData.get('phone')}\n`;
    msg += `Loc: ${formData.get('city')}, ${formData.get('country')}\n\n`;

    msg += `⛷ *Sport & Trip*\n`;
    msg += `Sport: ${alpineData.sport === 'ski' ? 'Skiing' : 'Snowboarding'}\n`;
    msg += `Pack: ${tierName}\n`;
    msg += `People: ${alpineData.people}\n`;
    msg += `Duration: ${alpineData.days} Days\n`;
    msg += `Start: ${dateVal}\n\n`;

    msg += `🏨 *Stay*\n`;
    msg += `Hotel: ${hotel}\n`;
    msg += `Rooms: ${alpineData.rooms.triple}T + ${alpineData.rooms.double}D + ${alpineData.rooms.single}S\n\n`;

    msg += `⛷ *Instructor*\n`;
    const instrMode = formData.get('instructorMode') === 'dedicated' ? 'Dedicated (1:1)' : 'Shared Group';
    const instrTier = alpineData.tripType === 'ski_only' ? (alpineData.selectedInstructionTier === 'low' ? 'Standard' : 'Premium') : 'Linked to Stay';
    msg += `Mode: ${instrMode}\n`;
    if (alpineData.tripType === 'ski_only') msg += `Tier: ${instrTier}\n\n`;
    else msg += `Tier: Included with Stay\n\n`;

    // Get total from UI or calculate
    const totalEl = document.getElementById('summary-total');
    msg += `💰 *Total Estimate*: ${totalEl ? totalEl.innerText : 'Pending'}\n`;

    // Encode and redirect
    const waNumber = "916005806856"; // Replace with actual number if different
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

    // Show confirmation UI
    const summaryCard = document.querySelector('.shadow-floating');
    if (summaryCard) {
        summaryCard.innerHTML = `
            <div class="text-center py-10">
                 <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Redirecting to WhatsApp...</h3>
                <p class="text-slate-500">Please send the pre-filled message to confirm your booking.</p>
                <a href="${url}" class="inline-block mt-4 text-alpine-blue font-bold hover:underline">Click here if not redirected</a>
            </div>
        `;
    }

    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}

// --- HOTELS DATA & RENDERING ---
// Added at the end of the file

const hotelsData = [
    // Dormitory
    {
        category: "Dormitory",
        tier: "Standard",
        name: "Dormitory Stay",
        price_private: 1600,
        price_shared: null,
        features: ["Dormitory Style", "Budget Friendly", "Basic Amenities"],
        description: "Affordable dormitory stay. Perfect for solo travelers on a budget.",
        image: "images/stays/silver-room.webp",
        groupKey: "Dormitory",
        website: null
    },
    // 2-Star
    {
        category: "2-Star",
        tier: "Standard",
        name: "Hotel Lala",
        price_private: 3500,
        price_shared: 4500,
        features: ["Private Rooms", "Shared Options", "Heated Rooms"],
        description: "Comfortable budget stay with private and shared room options.",
        image: "images/stays/silver-room.webp",
        groupKey: "2-Star",
        website: null
    },
    {
        category: "2-Star",
        tier: "Standard",
        name: "Hotel ZamZam",
        price_private: 3500,
        price_shared: 4500,
        features: ["Private Rooms", "Shared Options", "Heated Rooms"],
        description: "Comfortable budget stay with private and shared room options.",
        image: "images/stays/silver-room.webp",
        groupKey: "2-Star",
        website: null
    },
    // 3-Star Standard
    {
        category: "3-Star",
        tier: "Standard",
        name: "Mama Palace",
        price_private: 4000,
        price_shared: 5500,
        features: ["High Tier Comfort", "Ensuite Bathroom", "Restaurant"],
        description: "Quality mid-range accommodation with excellent hospitality.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Standard)",
        website: null
    },
    {
        category: "3-Star",
        tier: "Standard",
        name: "Gulmarg Inn",
        price_private: 4000,
        price_shared: 5500,
        features: ["High Tier Comfort", "Ensuite Bathroom", "Restaurant"],
        description: "Quality mid-range accommodation with excellent hospitality.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Standard)",
        website: null
    },
    {
        category: "3-Star",
        tier: "Standard",
        name: "Hotel Welcome",
        price_private: 4000,
        price_shared: 5500,
        features: ["High Tier Comfort", "Ensuite Bathroom", "Restaurant"],
        description: "Quality mid-range accommodation with excellent hospitality.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Standard)",
        website: "https://www.welcomehotelsgr.com/gulmarg"
    },
    // 3-Star Premium
    {
        category: "3-Star",
        tier: "Premium",
        name: "Hotel Royal Park",
        price_private: 5000,
        price_shared: 7000,
        features: ["Premium Rooms", "Mountain View", "Central Heating"],
        description: "Premium 3-star experience with upgraded amenities and views.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Premium)",
        website: "https://hotelroyalpark.net/"
    },
    {
        category: "3-Star",
        tier: "Premium",
        name: "Hotel Zahgeer",
        price_private: 5000,
        price_shared: 7000,
        features: ["Premium Rooms", "Mountain View", "Central Heating"],
        description: "Premium 3-star experience with upgraded amenities and views.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Premium)",
        website: "https://hotelzahgeergulmarg.com/"
    },
    {
        category: "3-Star",
        tier: "Premium",
        name: "Khaleel Palace",
        price_private: 5000,
        price_shared: 7000,
        features: ["Premium Rooms", "Mountain View", "Central Heating"],
        description: "Premium 3-star experience with upgraded amenities and views.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Premium)",
        website: "https://hotelkhaleelpalace.in/"
    },
    {
        category: "3-Star",
        tier: "Premium",
        name: "Alpine Ridge",
        price_private: 5000,
        price_shared: 7000,
        features: ["Premium Rooms", "Mountain View", "Central Heating"],
        description: "Premium 3-star experience with upgraded amenities and views.",
        image: "images/stays/gold-room.webp",
        groupKey: "3-Star (Premium)",
        website: "https://hotelalpineridge.com/"
    },
    // 4-Star Standard
    {
        category: "4-Star",
        tier: "Standard",
        name: "Hotel Grand Mumtaz",
        price_private: 9000,
        price_shared: 12000,
        features: ["Luxury Interiors", "Room Service", "Concierge"],
        description: "Low-tier luxury with spacious rooms and exceptional service.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Standard)",
        website: "https://grandmumtazgulmarg.com/"
    },
    {
        category: "4-Star",
        tier: "Standard",
        name: "The Himalayan Pearl",
        price_private: 9000,
        price_shared: 12000,
        features: ["Luxury Interiors", "Room Service", "Concierge"],
        description: "Low-tier luxury with spacious rooms and exceptional service.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Standard)",
        website: "https://www.thehimalayanpearl.com/"
    },
    {
        category: "4-Star",
        tier: "Standard",
        name: "Royal Castle",
        price_private: 9000,
        price_shared: 12000,
        features: ["Luxury Interiors", "Room Service", "Concierge"],
        description: "Low-tier luxury with spacious rooms and exceptional service.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Standard)",
        website: "https://hotelroyalcastle.net/"
    },
    // 4-Star Premium
    {
        category: "4-Star",
        tier: "Premium",
        name: "Hotel Hilltop",
        price_private: 10500,
        price_shared: 13500,
        features: ["Top Tier Luxury", "Spa Access", "Valet Parking"],
        description: "High-end 4-star resorts offering the best in class comfort.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Premium)",
        website: "https://hilltophotels.in/"
    },
    {
        category: "4-Star",
        tier: "Premium",
        name: "Green Resort",
        price_private: 10500,
        price_shared: 13500,
        features: ["Top Tier Luxury", "Spa Access", "Valet Parking"],
        description: "High-end 4-star resorts offering the best in class comfort.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Premium)",
        website: "https://greenroomsresortgulmarg.com/"
    },
    {
        category: "4-Star",
        tier: "Premium",
        name: "Pride Resort",
        price_private: 10500,
        price_shared: 13500,
        features: ["Top Tier Luxury", "Spa Access", "Valet Parking"],
        description: "High-end 4-star resorts offering the best in class comfort.",
        image: "images/stays/platinum-room.webp",
        groupKey: "4-Star (Premium)",
        website: "https://prideresort.in/"
    },
    // 5-Star Luxury
    {
        category: "5-Star",
        tier: "Luxury",
        name: "The Khyber Resort and Spa",
        price_private: "Variable (3.0L - 5.0L)",
        price_shared: "On Request",
        features: ["World Class Spa", "Panoramic Views", "5-Star Dining"],
        description: "The ultimate luxury experience in Gulmarg.",
        image: "images/stays/platinum-room.webp",
        groupKey: "5-Star Luxury",
        website: "https://www.khyberhotels.com/"
    }
];

function renderHotelCards() {
    const container = document.getElementById('hotels-container');
    if (!container) return;

    // Get Active Filters
    const checkedBoxes = Array.from(document.querySelectorAll('#rating-filters input:checked')).map(cb => cb.value);

    // Clear Button Visibility
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        if (checkedBoxes.length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    // Filter Data
    let filteredHotels = hotelsData;
    if (checkedBoxes.length > 0) {
        filteredHotels = hotelsData.filter(h => {
            // Construct key to match checkbox values: "1-Star", "3-Star Standard", etc.
            let key = h.category;
            if (h.category.includes('3-Star') || h.category.includes('4-Star')) {
                key = `${h.category} ${h.tier}`;
            }
            return checkedBoxes.includes(key);
        });
    }

    // Group by category/tier for header display
    // We want a specific order: Dormitory, 2-Star, 3-Star Std, 3-Star Prm, 4-Star Std, 4-Star Prm, 5-Star
    const sortOrder = [
        "Dormitory",
        "2-Star",
        "3-Star (Standard)",
        "3-Star (Premium)",
        "4-Star (Standard)",
        "4-Star (Premium)",
        "5-Star Luxury"
    ];

    // Create Groups
    const groups = {};
    filteredHotels.forEach(h => {
        if (!groups[h.groupKey]) groups[h.groupKey] = [];
        groups[h.groupKey].push(h);
    });

    // Render Groups in Order
    let html = '';

    sortOrder.forEach(key => {
        if (groups[key] && groups[key].length > 0) {

            // Section Header
            html += `
            <div class="w-full pt-8 pb-4 border-b border-slate-100 mb-6 flex items-center gap-4">
                <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tight">${key} Stays</h3>
                <div class="h-px bg-slate-200 flex-1"></div>
                <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">${groups[key].length} Found</span>
            </div>
            `;

            // Render Cards in this group
            html += groups[key].map(hotel => {

                // Construct Tag
                let tag = hotel.groupKey;

                const priceDisplay = isNaN(hotel.price_private) ? hotel.price_private : `\u20B9${hotel.price_private.toLocaleString()} / night`;

                return `
                <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group mb-8">
                    <!-- Image Section (35%) -->
                    <div class="md:w-[35%] relative h-64 md:h-auto overflow-hidden">
                        <img src="${hotel.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${hotel.name}">
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 rounded bg-slate-900/90 text-white text-xs font-bold backdrop-blur-md border border-white/10 uppercase tracking-wide">
                                ${tag}
                            </span>
                        </div>
                    </div>

                    <!-- Content Section (65%) -->
                    <div class="md:w-[65%] p-6 flex flex-col">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-2xl font-black text-slate-900 leading-tight">${hotel.name}</h3>
                        </div>
                        
                        <div class="mb-4">
                            <span class="block text-2xl font-bold text-alpine-blue">${priceDisplay}</span>
                            <span class="text-xs text-slate-400 font-bold uppercase tracking-wide">Private Room Rate</span>
                        </div>

                        <p class="text-slate-600 text-sm font-medium mb-6 leading-relaxed line-clamp-2">
                            ${hotel.description}
                        </p>

                        <!-- Features Grid (Box Style) -->
                        <div class="grid grid-cols-2 gap-3 mb-8">
                             <!-- Feature 1 -->
                             <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </div>
                                <span class="text-xs font-bold text-slate-700">Private Room</span>
                            </div>
                             <!-- Feature 2 -->
                            <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <span class="text-xs font-bold text-slate-700">Shared Options</span>
                            </div>
                             <!-- Feature 3 -->
                            <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                                </div>
                                <span class="text-xs font-bold text-slate-700">Central Heating</span>
                            </div>
                             <!-- Feature 4 -->
                            <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                                </div>
                                <span class="text-xs font-bold text-slate-700">High-Speed Wifi</span>
                            </div>
                        </div>

                        <div class="mt-auto self-end w-full md:w-auto flex flex-col md:flex-row gap-3">
                            ${hotel.website ? `
                            <a href="${hotel.website}" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center w-full md:w-auto px-6 py-3 rounded-lg border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-900 hover:text-slate-900 transition-all">
                                Official Website <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                            ` : `
                            <button disabled class="inline-flex justify-center items-center w-full md:w-auto px-6 py-3 rounded-lg border-2 border-slate-100 text-slate-300 font-bold cursor-not-allowed">
                                Website Not Available
                            </button>
                            `}
                            <a href="booking.html?hotel=${encodeURIComponent(hotel.name)}&tier=${encodeURIComponent(hotel.groupKey)}" class="inline-flex justify-center items-center w-full md:w-auto px-8 py-3 rounded-lg bg-alpine-blue hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/30">
                                Book This Stay
                            </a>
                        </div>
                    </div>
                </article>
                `;
            }).join('');
        }
    });

    // Empty State
    if (html === '') {
        container.innerHTML = `
            <div class="text-center py-20">
                <p class="text-slate-400 font-medium">No hotels found for selected filters.</p>
            </div>
        `;
    } else {
        container.innerHTML = html;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderHotelCards();

    // Filter Change Listener
    const checkboxes = document.querySelectorAll('#rating-filters input');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            renderHotelCards();
            // Scroll to top of hotel list
            const container = document.getElementById('hotels-container');
            if (container) {
                // Determine offset for sticky header/sidebar if needed, or standard scroll
                const y = container.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for header
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // Clear Filter Listener
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('#rating-filters input');
            inputs.forEach(i => i.checked = false);
            renderHotelCards();
        });
    }

    // FAB Toggle
    const fabToggle = document.getElementById('fab-toggle');
    const fabMenu = document.getElementById('fab-menu');
    const fabIconOpen = document.getElementById('fab-icon-open');
    const fabIconClose = document.getElementById('fab-icon-close');

    if (fabToggle && fabMenu) {
        fabToggle.addEventListener('click', () => {
            const isClosed = fabMenu.classList.contains('opacity-0');
            if (isClosed) {
                // Open
                fabMenu.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none', 'scale-90');
                fabIconOpen.classList.add('opacity-0', 'rotate-90');
                fabIconClose.classList.remove('opacity-0', 'rotate-90');
            } else {
                // Close
                fabMenu.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none', 'scale-90');
                fabIconOpen.classList.remove('opacity-0', 'rotate-90');
                fabIconClose.classList.add('opacity-0', 'rotate-90');
            }
        });
    }
});


// --- 11. GLOBAL CONTACT BUBBLE ---
function injectContactFAB() {
    if (document.getElementById('contact-fab-container')) return;

    // Exclude booking.html from FAB injection
    if (window.location.pathname.includes('booking.html')) return;

    // Inject Font if missing
    if (!document.querySelector('link[href*="Material+Symbols+Rounded"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';
        document.head.appendChild(link);
    }

    const fabHTML = `
    <div id="contact-fab-container" class="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2 group pointer-events-none">
        <!-- Floating Options (Hidden by default) -->
        <div id="fab-options" class="flex flex-col gap-2 transition-all duration-300 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto pb-2">
             <a href="https://wa.me/916005806856" target="_blank" class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-green-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">WhatsApp</span>
                <span class="material-symbols-rounded text-green-600">forum</span>
            </a>
            <a href="tel:+916005806856" class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-blue-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">Call Us</span>
                <span class="material-symbols-rounded text-blue-500">call</span>
            </a>
             <a href="mailto:wolfadventureskashmir@gmail.com" class="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-lg hover:bg-slate-50 transition-colors pointer-events-auto">
                <span class="font-bold text-sm">Email</span>
                <span class="material-symbols-rounded text-slate-500">mail</span>
            </a>
        </div>

        <!-- Main FAB Button -->
        <button class="w-16 h-16 bg-alpine-blue hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 focus:outline-none relative overflow-hidden pointer-events-auto">
            <span class="material-symbols-rounded text-3xl absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 rotate-0 group-hover:rotate-90">support_agent</span>
            <span class="material-symbols-rounded text-3xl absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 -rotate-90 group-hover:rotate-0">close</span>
        </button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', fabHTML);
}

// Inject FAB on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectContactFAB);
} else {
    injectContactFAB();
}
