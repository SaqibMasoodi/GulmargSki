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

// Initialize Day 1 on Load
document.addEventListener('DOMContentLoaded', () => {
    switchDay(1);
});

// 2. ATTRACTIONS TABS
const activeClasses = ['bg-white', 'text-blue-600', 'shadow-sm', 'border-slate-200', 'border-l-blue-600'];
const inactiveClasses = ['text-slate-500', 'hover:bg-white', 'hover:text-slate-900', 'border-transparent', 'hover:border-slate-200', 'hover:border-l-slate-300', 'border-l-transparent'];

function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    const tabLinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabLinks.length; i++) {
        const btn = tabLinks[i];
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses);
        const icon = btn.querySelector("svg");
        if (icon) icon.classList.add("opacity-0");
    }

    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.style.display = "block";
        setTimeout(() => activeContent.classList.add("active"), 10);
    }

    const activeBtn = evt.currentTarget;
    activeBtn.classList.remove(...inactiveClasses);
    activeBtn.classList.add(...activeClasses);
    const activeIcon = activeBtn.querySelector("svg");
    if (activeIcon) activeIcon.classList.remove("opacity-0");
}

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
    if(event) event.stopPropagation();
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

// Configuration Constants
const RATES = {
    hotel: { none: 0, '3star': 3000, '4star': 6000, '5star': 15000 },
    transport: { innova: 3000, tempo: 5000 },
    gear: { none: 0, standard: 800, pro: 1500 },
    extra: { gondola: 1100, atv: 2500 }
};

const PACKAGES = {
    // UPDATED TO MATCH HTML PRICES (29 Dec 2025)
    basic: { name: 'Basic Package', price: 23999 },    // Was 22999
    silver: { name: 'Silver Package', price: 34999 },  // Was 26999 (Big difference!)
    gold: { name: 'Gold Package', price: 37999 },      // Was 34999
    diamond: { name: 'Diamond Package', price: 49999 },// Was 44999
    platinum: { name: 'Platinum Package', price: 95999 }// Was 64999
};

let currentMode = 'package'; // 'package' or 'custom'

// 1. Mode Toggling (Packages vs Custom)
function setMode(mode) {
    currentMode = mode;
    const inputMode = document.getElementById('input-mode');
    if (inputMode) inputMode.value = mode;

    // Visual Switcher Styling
    const highlighter = document.getElementById('switch-highlight');
    const btnPackage = document.getElementById('btn-package');
    const btnCustom = document.getElementById('btn-custom');

    if (mode === 'package') {
        highlighter.style.transform = 'translateX(0)';
        btnPackage.classList.replace('text-slate-500', 'text-slate-900');
        btnCustom.classList.replace('text-slate-900', 'text-slate-500');

        document.getElementById('section-package').classList.remove('hidden-section');
        document.getElementById('section-custom').classList.add('hidden-section');
    } else {
        highlighter.style.transform = 'translateX(100%)';
        highlighter.style.left = '6px';
        btnPackage.classList.replace('text-slate-900', 'text-slate-500');
        btnCustom.classList.replace('text-slate-500', 'text-slate-900');

        document.getElementById('section-package').classList.add('hidden-section');
        document.getElementById('section-custom').classList.remove('hidden-section');
    }
    updateCalculations();
}

// 2. Transport Toggle Logic
function toggleTransportOptions() {
    const isChecked = document.getElementById('transport-toggle').checked;
    const options = document.getElementById('transport-options');
    if (isChecked) {
        options.classList.replace('hidden', 'grid');
    } else {
        options.classList.replace('grid', 'hidden');
    }
    updateCalculations();
}

// 3. Dynamic Price Calculation
function updateCalculations() {
    // Only run if we are on the booking page
    if (!document.getElementById('bookingForm')) return;

    const guests = parseInt(document.querySelector('select[name="guest_count"]').value) || 1;
    const receiptDiv = document.getElementById('receipt-items');
    let total = 0;
    let html = '';

    if (currentMode === 'package') {
        const pkgKey = document.getElementById('package-select').value;
        const pkg = PACKAGES[pkgKey];
        total = pkg.price * guests;

        html += `<div class="flex justify-between text-slate-900 font-bold mb-2"><span>${pkg.name}</span><span>₹${pkg.price.toLocaleString()} x ${guests}</span></div>`;
        html += `<div class="text-xs text-slate-500 pl-2">Includes: Hotel, Gear, Guide, Meals</div>`;

    } else {
        // Custom Mode Logic

        // Hotel
        const hotelElement = document.querySelector('input[name="custom_hotel"]:checked');
        if (hotelElement) {
            const hotelType = hotelElement.value;
            const hotelPrice = RATES.hotel[hotelType] * 5; // Avg 5 nights
            if (hotelPrice > 0) {
                total += (hotelPrice * guests) / 2; // Double occupancy assumption
                html += `<div class="flex justify-between text-slate-600"><span>Accommodation (Est.)</span><span>₹${((hotelPrice * guests) / 2).toLocaleString()}</span></div>`;
            }
        }

        // Transport
        const transportCheck = document.getElementById('transport-toggle').checked;
        if (transportCheck) {
            const transElement = document.querySelector('input[name="custom_transport"]:checked');
            if (transElement) {
                const transType = transElement.value;
                const transPrice = RATES.transport[transType] * 2; // Round trip
                total += transPrice;
                html += `<div class="flex justify-between text-slate-600"><span>Transport (Round Trip)</span><span>₹${transPrice.toLocaleString()}</span></div>`;
            }
        }

        // Gear
        const gearElement = document.querySelector('input[name="custom_gear"]:checked');
        if (gearElement) {
            const gearType = gearElement.value;
            const gearPrice = RATES.gear[gearType] * 6; // 6 Days
            if (gearPrice > 0) {
                total += gearPrice * guests;
                html += `<div class="flex justify-between text-slate-600"><span>Gear Rental (${gearType})</span><span>₹${(gearPrice * guests).toLocaleString()}</span></div>`;
            }
        }

        // Extras
        if (document.querySelector('input[name="extra_gondola"]').checked) {
            total += RATES.extra.gondola * guests;
            html += `<div class="flex justify-between text-slate-600"><span>Gondola Tkts</span><span>₹${(RATES.extra.gondola * guests).toLocaleString()}</span></div>`;
        }
        if (document.querySelector('input[name="extra_atv"]').checked) {
            total += RATES.extra.atv * guests;
            html += `<div class="flex justify-between text-slate-600"><span>ATV Ride</span><span>₹${(RATES.extra.atv * guests).toLocaleString()}</span></div>`;
        }
    }

    receiptDiv.innerHTML = html;
    document.getElementById('total-price-display').innerText = '₹' + total.toLocaleString();
}

// 4. WhatsApp Form Submission
function handleHybridSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const name = document.getElementById('contact_name').value;
    if (!name) { alert("Please enter your name"); return; }

    // Build WhatsApp Message
    let msg = `*New Booking Request from Wolf Adventure*\n\n`;
    msg += `👤 Name: ${formData.get('name')}\n`;
    msg += `📅 Date: ${formData.get('arrival_date') || 'TBD'}\n`;
    msg += `👥 Guests: ${formData.get('guest_count')}\n\n`;

    if (currentMode === 'package') {
        const pkg = PACKAGES[formData.get('package_tier')];
        msg += `📦 *Selection: ${pkg.name}*\n`;
        msg += `💰 Est. Total: ${document.getElementById('total-price-display').innerText}\n`;
    } else {
        msg += `🛠 *Custom Build Selection:*\n`;
        msg += `- Hotel: ${formData.get('custom_hotel')}\n`;
        if (document.getElementById('transport-toggle').checked) {
            msg += `- Transport: ${formData.get('custom_transport')}\n`;
        }
        msg += `- Gear: ${formData.get('custom_gear')}\n`;
        if (formData.get('extra_gondola')) msg += `- Addon: Gondola\n`;
        if (formData.get('extra_atv')) msg += `- Addon: ATV\n`;
        msg += `\n💰 Est. Total: ${document.getElementById('total-price-display').innerText}\n`;
    }

    if (formData.get('notes')) {
        msg += `\n📝 Note: ${formData.get('notes')}`;
    }

    // Open WhatsApp
    const waUrl = `https://wa.me/916005806856?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
}

// Initialization Event
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('bookingForm')) {
        updateCalculations();
    }
});

// --- MOBILE MENU LOGIC ---
function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const body = document.body;

    // Check if menu is currently open
    const isOpen = overlay.classList.contains('opacity-100');

    if (!isOpen) {
        // OPEN MENU
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');

        // Switch Icon to X
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        // Prevent background scrolling
        body.style.overflow = 'hidden';
    } else {
        // CLOSE MENU
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');

        // Switch Icon back to Hamburger
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');

        // Restore scrolling
        body.style.overflow = 'auto';
    }
}


