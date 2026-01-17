document.addEventListener('DOMContentLoaded', () => {

    // --- 1. RESORT MAP LOGIC ---
    if (document.getElementById('gulmarg-map')) {
        var map = L.map('gulmarg-map', {
            scrollWheelZoom: false,
            zoomControl: false,
            attributionControl: false
        }).setView([34.055, 74.38], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19
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

    // --- 4. SCHEDULE LOGIC (Init) ---
    // Delay slightly to ensure DOM is fully painted
    setTimeout(() => {
        if (typeof render === 'function') render(2026);
    }, 100);

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
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Takes you to a bowl-shaped valley. Features restaurants, snow parks, and the main beginner slopes.</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors relative overflow-hidden group">
                        <div class="flex justify-between items-center mb-4 relative z-10">
                            <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase">Phase 2</h4>
                            <span class="text-[10px] bg-blue-600 text-white font-bold px-2 py-1 rounded">14,000 ft</span>
                        </div>
                        <p class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-bold uppercase tracking-wider relative z-10">To Apharwat Peak</p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">The main event. Breathtaking views of Nanga Parbat. <br><span class="text-red-500 font-bold text-xs mt-2 block">*Sightseeing or Experts Only.</span></p>
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
                        <img src="images/home/attractions/gondola.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Snowmobile">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">Snowmobiles</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">High-speed motorized sleds. Zoom across vast frozen snowfields.</p>
                        </div>
                    </div>
                    <div class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                        <img src="images/home/attractions/snowmobile.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="ATV">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">ATV (Quad Bikes)</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">4x4 beasts with tire chains. Explore Tangmarg to Drung.</p>
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
                            <img src="images/home/attractions/waterfall.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Waterfall">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Drung Waterfall</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Famous frozen waterfall (Jan/Feb).</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="images/home/attractions/church.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Church">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">St. Mary’s Church</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">100+ year old Victorian church.</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="images/home/attractions/temple.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Temple">
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
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Commodore<br>Ride</h4>
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
    const currency = selector.value;
    const priceElements = document.querySelectorAll('.price-display');
    const rates = { 'INR': 1, 'USD': 85, 'EUR': 90 }; const symbols = { 'INR': '₹', 'USD': '$', 'EUR': '€' };

    priceElements.forEach(el => {
        const basePrice = parseFloat(el.getAttribute('data-inr'));
        let convertedPrice = (currency === 'INR') ? basePrice : basePrice / rates[currency];
        el.textContent = `${symbols[currency]}${Math.round(convertedPrice).toLocaleString()}`;
    });
}

// 4. WEATHER WIDGET
const weatherData = {
    gulmarg: { base: "-5°C", summit: "-12°C", baseLabel: "Base (2,650m)", summitLabel: "Summit (3,980m)" },
    pahalgam: { base: "-2°C", summit: "-8°C", baseLabel: "Base (2,130m)", summitLabel: "Summit (3,400m)" },
    sonamarg: { base: "-8°C", summit: "-15°C", baseLabel: "Base (2,800m)", summitLabel: "Summit (4,100m)" }
};

// -- Custom Dropdown Logic --
function toggleWeatherDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('weather-dropdown-menu');
    const arrow = document.getElementById('weather-arrow');

    if (menu.classList.contains('hidden')) {
        // Open
        menu.classList.remove('hidden');
        setTimeout(() => {
            menu.classList.remove('opacity-0', 'scale-y-95');
            menu.classList.add('opacity-100', 'scale-y-100');
        }, 10);
        arrow.classList.add('rotate-180');
    } else {
        // Close
        menu.classList.remove('opacity-100', 'scale-y-100');
        menu.classList.add('opacity-0', 'scale-y-95');
        setTimeout(() => menu.classList.add('hidden'), 200);
        arrow.classList.remove('rotate-180');
    }
}

function selectWeather(location, label) {
    // 1. Update UI Text
    document.getElementById('selected-weather').textContent = label;

    // 2. Update Weather Data
    const data = weatherData[location];
    if (data) {
        document.getElementById('base-temp').textContent = data.base;
        document.getElementById('summit-temp').textContent = data.summit;
        document.getElementById('base-label').textContent = data.baseLabel;
        document.getElementById('summit-label').textContent = data.summitLabel;
    }

    // 3. Close Dropdown
    toggleWeatherDropdown();
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    const menu = document.getElementById('weather-dropdown-menu');
    const btn = document.getElementById('weather-dropdown-btn');

    if (menu && !menu.classList.contains('hidden') && !btn.contains(e.target) && !menu.contains(e.target)) {
        toggleWeatherDropdown();
    }
});

// Remove old updateWeather function as it's replaced by selectWeather
// function updateWeather() { ... }

// 5. SCHEDULE LOGIC
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const createBatches = (year, count) => {
    return months.map((m, i) => ({
        short: m,
        long: fullMonths[i],
        batches: Array.from({ length: count }, (_, b) => {
            const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
            const level = levels[b % 3];
            const spots = Math.floor(Math.random() * 6);
            return {
                id: `SKI-${year.toString().slice(2)}${(i + 1).toString().padStart(2, '0')}-${b + 1}`,
                date: `${(b * 4) + 2}-${(b * 4) + 6} ${m}`,
                level: level,
                price: level === 'BEGINNER' ? '₹15k' : (level === 'INTERMEDIATE' ? '₹18k' : '₹22k'),
                spots: spots,
                status: spots === 0 ? 'SOLD OUT' : 'OPEN'
            };
        })
    }));
};

const db = { 2026: createBatches(2026, 8), 2025: createBatches(2025, 8) };
let currentYear = 2026;
let observer;

function render(year) {
    const data = db[year];
    document.getElementById('total-count').innerText = `${data.reduce((acc, curr) => acc + curr.batches.length, 0)} BATCHES`;

    document.getElementById('cards-container').innerHTML = data.map((d, i) => `
        <article id="card-${i}" class="snap-item shrink-0 w-[88vw] md:w-[400px] h-full bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col relative group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div class="p-6 border-b border-slate-100"><h2 class="text-4xl font-black text-slate-900 tracking-tighter">${d.long}</h2></div>
            <div class="flex-1 overflow-y-auto no-scrollbar bg-white p-6 pt-4 space-y-4">
                ${d.batches.map(batch => `
                    <div class="flex flex-col gap-1 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${batch.id}</span>
                        <span class="text-xl font-bold text-slate-900">${batch.date}</span>
                    </div>
                `).join('')}
            </div>
        </article>
    `).join('');

    const gridContainer = document.getElementById('grid-container');
    gridContainer.className = "grid grid-cols-3 gap-2 p-4";
    gridContainer.innerHTML = data.map((d, i) => `
        <button onclick="scrollToIndex(${i})" id="btn-${i}" class="h-10 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center uppercase tracking-widest bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100">${d.short}</button>
    `).join('');

    setupObserver();
}

function toggleDropdown() {
    const menu = document.getElementById('year-dropdown');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); menu.classList.add('closed');
        setTimeout(() => menu.classList.add('hidden'), 150);
    } else {
        menu.classList.remove('hidden');
        setTimeout(() => { menu.classList.remove('closed'); menu.classList.add('open'); }, 10);
    }
}

function selectYear(year) {
    currentYear = year;
    document.getElementById('current-year-display').innerText = `${year} Season`;
    toggleDropdown();
    render(year);
}

function scrollToIndex(index) {
    const card = document.getElementById(`card-${index}`);
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

function updateActiveButton(index) {
    document.querySelectorAll('#grid-container button').forEach(btn => {
        btn.className = "h-10 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center uppercase tracking-widest bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100";
    });
    const btn = document.getElementById(`btn-${index}`);
    if (btn) btn.className = "h-10 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center uppercase tracking-widest bg-slate-900 text-white shadow-md scale-105";
}

function setupObserver() {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id.split('-')[1];
                updateActiveButton(id);
            }
        });
    }, { root: document.getElementById('cards-container'), threshold: 0.6 });
    document.querySelectorAll('.snap-item').forEach(card => observer.observe(card));
}
// --- BOOKING PAGE LOGIC ---
const PACKAGE_ACCOMMODATIONS = {
    'basic': 'Dormitory / Hostel Bed',
    'silver': '3-Star Hotel / Lodge (Poshwan)',
    'gold': '4-Star Hotel (Grand Mumtaz)',
    'diamond': '5-Star Luxury (Khyber)',
    'platinum': 'Premium Suite + Private Butler'
};

function updateCalculations() {
    const pkgSelect = document.getElementById('package-select');
    const guestSelect = document.getElementById('guest-count');
    const accSelect = document.getElementById('accommodation-select');

    // Update Accommodation based on Package (Smart Default)
    if (pkgSelect && accSelect) {
        accSelect.value = pkgSelect.value;
    }

    // Price Calculation
    if (pkgSelect && guestSelect) {
        const option = pkgSelect.options[pkgSelect.selectedIndex];
        const price = parseInt(option.getAttribute('data-price')) || 0;
        const guests = parseInt(guestSelect.value) || 1;

        let total = price * guests;
        let discount = 0;
        let discountText = '';

        // Discount Logic
        if (guests === 2) {
            discount = total * 0.05; // 5% for couples
            discountText = '5% (Couple)';
        } else if (guests >= 3 && guests <= 4) {
            discount = total * 0.10; // 10% for small groups
            discountText = '10% (Small Group)';
        } else if (guests >= 5) {
            discount = total * 0.15; // 15% for large groups
            discountText = '15% (Big Squad)';
        }

        const finalTotal = total - discount;

        // Update UI
        document.getElementById('summary-base-price').innerText = '₹' + price.toLocaleString();
        document.getElementById('summary-guests').innerText = 'x ' + guests;

        // Handle Discount UI
        const discountRow = document.getElementById('discount-row');
        const discountSpan = document.getElementById('summary-discount');

        if (discount > 0) {
            discountRow.classList.remove('hidden');
            discountSpan.innerText = `-₹${Math.round(discount).toLocaleString()} (${discountText})`;
        } else {
            discountRow.classList.add('hidden');
        }

        document.getElementById('summary-total').innerText = '₹' + Math.round(finalTotal).toLocaleString();
    }
}

function updateIDLabel() {
    const type = document.getElementById('id-type').value;
    const input = document.querySelector('input[name="id_number"]');
    const label = document.getElementById('id-number-label');

    if (type === 'Aadhaar') {
        label.innerText = 'Aadhaar Number';
        input.placeholder = 'XXXX XXXX XXXX';
    } else if (type === 'PAN') {
        label.innerText = 'PAN Number';
        input.placeholder = 'ABCDE1234F';
    } else if (type === 'Passport') {
        label.innerText = 'Passport Number';
        input.placeholder = 'A1234567';
    } else if (type === 'License') {
        label.innerText = 'License Number';
        input.placeholder = 'DL-1420110012345';
    } else {
        label.innerText = 'ID Number';
        input.placeholder = 'Enter ID Number';
    }
}

function submitBooking(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const googleFormData = new URLSearchParams();

    // --- GOOGLE FORM MAPPING (CORRECTED) ---

    // 1. Customer Details
    googleFormData.append('entry.907087383', formData.get('name'));         // Full Name
    googleFormData.append('entry.769361365', formData.get('email'));        // Email
    googleFormData.append('entry.409862271', formData.get('phone'));        // Phone
    googleFormData.append('entry.1792314048', formData.get('age'));         // Age
    googleFormData.append('entry.164837835', formData.get('addr_line1'));   // Address Line 1
    googleFormData.append('entry.1053105882', formData.get('addr_line2') || ''); // Address Line 2
    googleFormData.append('entry.1023735076', formData.get('city'));        // City
    googleFormData.append('entry.686629071', formData.get('state'));        // State
    googleFormData.append('entry.765320628', formData.get('country'));      // Country
    googleFormData.append('entry.100638151', formData.get('zip'));          // ZIP

    // 2. Identity (Corrected IDs)
    // ID Type: Value needs to map to specific options: "Aadhaar Card", "PAN Card", "Passport (International Guests)", "Other"
    const idTypeMap = {
        'Aadhaar': 'Aadhaar Card',
        'PAN': 'PAN Card',
        'Passport': 'Passport (International Guests)',
        'License': 'Other', // Form doesn't have License, map to Other
        'Other': 'Other'
    };
    googleFormData.append('entry.828150114', idTypeMap[formData.get('id_type')] || 'Other');

    // Identity Number (Found correct ID from analysis: 21627150)
    googleFormData.append('entry.21627150', formData.get('id_number'));

    // 3. Package (Corrected Logic)
    // Form Options: "Silver Package (₹26,999)", "Gold Package", "Platinum Package"
    // HTML has prices in text. we need to match exactly.
    const pkgSelect = document.getElementById('package-select');
    const pkgText = pkgSelect.options[pkgSelect.selectedIndex].text;

    // Map HTML text to Form text if needed, or send as is if it matches
    // HTML: "Silver Package (₹26,999)" -> Form: "Silver Package (₹26,999)" (Match)
    // HTML: "Gold Package (₹34,999)" -> Form: "Gold Package" (Mismatch - strip price)
    // HTML: "Platinum Package (₹64,999)" -> Form: "Platinum Package" (Mismatch)
    let pkgValue = pkgText;
    if (pkgValue.includes('Gold')) pkgValue = 'Gold Package';
    if (pkgValue.includes('Platinum')) pkgValue = 'Platinum Package';
    // Diamond/Basic not in form, fallback to nearest or ignore? 
    // Assuming UI keeps user within compatible choices, or map Diamond -> Platinum?
    if (pkgValue.includes('Diamond')) pkgValue = 'Platinum Package';
    if (pkgValue.includes('Basic')) pkgValue = 'Silver Package (₹26,999)'; // Fallback

    googleFormData.append('entry.2001348355', pkgValue);

    // 4. Participants
    // Form Options: "1 Person", "2 People", "3 People", "4+ People custom number"
    const guests = formData.get('guests');
    let guestStr = guests === '1' ? '1 Person' : `${guests} People`;
    if (parseInt(guests) >= 4) guestStr = '4+ People custom number';
    googleFormData.append('entry.81046661', guestStr);

    // 5. Accommodation
    // Form Options: "3-Star Hotel / Lodge", "4-Star Hotel", "5-Star Hotel"
    const accSelect = document.getElementById('accommodation-select');
    let accText = accSelect.options[accSelect.selectedIndex].text;
    // Map HTML to Form
    if (accText.includes('5-Star')) accText = '5-Star Hotel';
    if (accText.includes('Dormitory')) accText = '3-Star Hotel / Lodge'; // Fallback
    googleFormData.append('entry.2085276688', accText);

    // 6. Date
    const dateVal = formData.get('date'); // YYYY-MM-DD
    if (dateVal) {
        const [year, month, day] = dateVal.split('-');
        googleFormData.append('entry.74114105_year', year);
        googleFormData.append('entry.74114105_month', month);
        googleFormData.append('entry.74114105_day', day);
    }

    // 7. Safety & Emergency (Corrected IDs)
    googleFormData.append('entry.1931752260', formData.get('medical') || '');
    // Emergency Name (Correct ID: 310389481)
    googleFormData.append('entry.310389481', formData.get('emergency_name'));
    // Emergency Phone (Correct ID: 987056831)
    googleFormData.append('entry.987056831', formData.get('emergency_phone'));

    // 8. Skill Level
    // Form Options: "Beginner (First time)", "Intermediate", "Advanced"
    const skillSelect = form.querySelector('select[name="skill"]');
    let skillText = skillSelect.options[skillSelect.selectedIndex].text;
    // HTML: "Intermediate (Can turn & stop)" -> Form: "Intermediate"
    // HTML: "Advanced (Black runs / Off-piste)" -> Form: "Advanced"
    if (skillText.startsWith('Intermediate')) skillText = 'Intermediate';
    if (skillText.startsWith('Advanced')) skillText = 'Advanced';
    googleFormData.append('entry.1187223216', skillText);

    // 9. Notes & Terms
    // Notes (Correct ID: 643087917)
    googleFormData.append('entry.643087917', formData.get('notes') || '');

    // Terms Checkbox (Correct ID: 937062308) - Required Value match
    googleFormData.append('entry.937062308', 'I agree to the Terms & Conditions and understand that skiing involves inherent risks.');


    // --- WHATSAPP MESSAGE GENERATION ---
    let msg = `*New Booking Request from Wolf Adventure*\n\n`;

    // 1. Customer
    msg += `👤 *Customer Details*\n`;
    msg += `Name: ${formData.get('name')}\n`;
    msg += `Email: ${formData.get('email')}\n`;
    msg += `Phone: ${formData.get('phone')}\n`;
    msg += `Address: ${formData.get('city')}, ${formData.get('country')}\n\n`;

    // 2. Package
    const guestsNum = parseInt(guests);
    let discountInfo = '';
    if (guestsNum === 2) discountInfo = ' (5% Off)';
    else if (guestsNum >= 3 && guestsNum <= 4) discountInfo = ' (10% Off)';
    else if (guestsNum >= 5) discountInfo = ' (15% Off)';

    msg += `📦 *Package & Price*\n`;
    msg += `Tier: ${pkgText}\n`;
    msg += `Guests: ${guestsNum}${discountInfo}\n`;
    msg += `Total Est: ${document.getElementById('summary-total').innerText}\n\n`;

    msg += `📅 *Start Date*: ${dateVal}\n`;
    msg += `🏠 *Accommodation*: ${accText}\n`;

    // --- SUBMISSION LOGIC ---

    const submitBtn = e.target;
    // Change button text to indicate processing
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;

    // Google Form URL
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeLj8F2h25_-BjeAPrAZFQDugmUgOT1lRlb1v4juNB3wjZnPA/formResponse';

    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: googleFormData
    }).then(() => {
        // --- SUCCESS HANDLER ---

        // 1. Hide Form
        const formContainer = document.querySelector('.lg\\:col-span-2'); // The form column
        // Actually, let's hide the specific form element or its container to be safe. 
        // The HTML structure has a form with id="bookingForm".
        if (form) form.style.display = 'none';

        // 2. Show Confirmation
        const confirmMsg = document.getElementById('confirmation-msg');
        if (confirmMsg) {
            confirmMsg.classList.remove('hidden');
            // Move it out of the sidebar if needed, or if it's already in the sidebar, user might want it more visible?
            // The request says "show the confirmation message section". Existing HTML has it in the sidebar. 
            // Ideally we might want to scroll to it or make it more prominent, but strictly following instructions: "show the confirmation message section".
        }

        // 3. Open WhatsApp
        const waUrl = `https://wa.me/916005806856?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        // Restore button state (though form is hidden now)
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

    }).catch((err) => {
        console.error('Submission Error:', err);
        alert('There was an error submitting the form. Proceeding to WhatsApp.');

        // Fallback: Open WhatsApp anyway
        const waUrl = `https://wa.me/916005806856?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const pkgSelect = document.getElementById('package-select');
    if (pkgSelect) {
        updateCalculations();
    }
});


