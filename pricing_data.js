
// --- GLOBAL PRICING DATA (Source of Truth) ---
const SKI_PRICING = {
    accommodation: {
        'dorm': { name: 'Dormitory', type: 'Dormitory', hotels: ['Dormitory'], pricePerPax: 1600, instructorTier: 'low' },
        '2star': { name: '2 Star', type: '2 Star', hotels: ['Hotel Lala', 'Hotel ZamZam'], prices: { 1: 3500, 2: 4500, 3: 6500 }, instructorTier: 'low' },
        '3star_low': { name: '3 Star (Standard)', type: '3 Star', hotels: ['Mama Palace', 'Gulmarg Inn', 'Hotel Welcome'], prices: { 1: 4000, 2: 5500, 3: 7500 }, instructorTier: 'high' },
        '3star_high': { name: '3 Star (Premium)', type: '3 Star', hotels: ['Hotel Royal Park', 'Zahgeer', 'Khaleel Palace'], prices: { 1: 5000, 2: 7000, 3: 8500 }, instructorTier: 'high' },
        '4star_low': { name: '4 Star (Standard)', type: '4 Star', hotels: ['Grand Mumtaz', 'Himalayan Pearl'], prices: { 1: 9000, 2: 12000, 3: 14500 }, instructorTier: 'high' },
        '4star_high': { name: '4 Star (Premium)', type: '4 Star', hotels: ['Hotel Hilltop', 'Green Resort'], prices: { 1: 10500, 2: 13500, 3: 16500 }, instructorTier: 'high' },
        '5star': { name: '5 Star', type: '5 Star', hotels: ['The Khyber Resort'], instructorTier: 'high', isCustom: true }
    },
    instructor: {
        'low': {
            ski: { '1:1': 3500, '2:1': 5000, '3:1': 6000, 'extra': 1000 },
            board: { '1:1': 5800, '2:1': 8700, '3:1': 10500, 'extra': 1500 }
        },
        'high': {
            ski: { '1:1': 4000, '2:1': 5500, '3:1': 7000, 'extra': 1000 },
            board: { '1:1': 8300, '2:1': 12500, '3:1': 15000, 'extra': 2000 }
        }
    },
    addons: {
        gondola: 900,
        gondolaPhase2: 2000,
        snowmobile: 2200,
        atv: 2200,
        sledging: 1500,
        heliJoint: 9000,
        heliKongdoori: 12000,
        heliSunshine: 15000
    },
    transfers: {
        roundTrip: 6000
    }
};

// Pricing Helper Function
// defaults: 5 days, shared occupancy (2 pax), shared instructor (2:1 ratio estimated)
function calculatePackagePrice(tierKey, sport, days = 5) {
    const tier = SKI_PRICING.accommodation[tierKey];
    if (!tier || tier.isCustom) return 0; // On Request

    // 1. Accommodation Usage (Half of a double room)
    // If Dorm, use pricePerPax
    let accomCost = 0;
    if (tierKey === 'dorm') {
        accomCost = tier.pricePerPax;
    } else {
        // Price for 2 people / 2
        accomCost = tier.prices[2] / 2;
    }

    // 2. Instructor Usage
    // Packages assume "Shared Instructor" or similar value.
    // Using 2:1 ratio as a balanced "Package Standard" for pricing display
    const instrTier = SKI_PRICING.instructor[tier.instructorTier][sport];
    const instrCost = instrTier['2:1'] / 2;

    const totalDaily = accomCost + instrCost;
    return totalDaily * days;
}
