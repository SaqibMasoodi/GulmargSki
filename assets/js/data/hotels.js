/**
 * Hotels Data Source
 * Used in stays.html and booking.html
 */

export const hotelsData = [
    // Dormitory
    {
        category: "Dormitory",
        tier: "Standard",
        name: "Dormitory Stay",
        price_private: 1600,
        price_shared: null,
        features: ["Dormitory Style", "Budget Friendly", "Basic Amenities"],
        description: "Affordable dormitory stay. Perfect for solo travelers on a budget.",
        image: "assets/images/stays/silver-room.webp",
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
        image: "assets/images/stays/silver-room.webp",
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
        image: "assets/images/stays/silver-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/gold-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
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
        image: "assets/images/stays/platinum-room.webp",
        groupKey: "5-Star Luxury",
        website: "https://www.khyberhotels.com/"
    }
];
