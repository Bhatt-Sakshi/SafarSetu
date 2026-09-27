/**
 * SafarSetu — Core Data & Intelligence Engine
 * Modern Indian Travel & Tourism Booking Portal
 * Discover the Soul of India with Smart Trip Planning, Mountain Safety Intelligence,
 * Dynamic Off-Peak Stays, and Direct Indian Artisan Marketplace.
 */

const KNOWN_DESTINATIONS = {
  "manali": {
    name: "Manali",
    region: "Kullu Valley, Himachal Pradesh",
    lat: 32.2396,
    lng: 77.1887,
    altitude: "2,050m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "extreme",
    weather: {
      temp: "14°C",
      condition: "Mountain Mist & Showers",
      rainProb: 82,
      wind: "22 km/h",
      aqi: 18,
      advisory: "Monsoon active across Beas basin. Night transit restricted on high altitude passes."
    },
    crowdScore: 88,
    baseBudget: 2800,
    attractions: [
      { name: "Hadimba Devi Ancient Deodar Temple", lat: 32.2483, lng: 77.1706, type: "Heritage", crowd: "High (85%)" },
      { name: "Jogini Waterfall Pine Forest Trail", lat: 32.2694, lng: 77.1951, type: "Nature Trail", crowd: "Moderate (52%)" },
      { name: "Old Manali Wooden Bridge & Café Lane", lat: 32.2530, lng: 77.1750, type: "Cultural", crowd: "High (76%)" },
      { name: "Rohtang Mountain Pass (High Altitude Route)", lat: 32.3716, lng: 77.2466, type: "Alpine Pass", crowd: "Heavy (92%)" }
    ],
    hazardAlert: {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: ["Rohtang Pass NH-3", "Solang Valley Ridge Road", "Marhi Descent"],
      safeReroute: {
        id: "reroute-manali-sethan",
        name: "Valley Safe Route: Sethan Pine Sanctuary & Naggar Heritage Trail",
        description: "Avoid high-altitude active slip zones. Switch to stable mid-altitude pine forests of Sethan, visit the 500-year-old Naggar Castle and local Kullu shawl weavers cooperative.",
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "18.4 kg CO2"
      }
    },
    hiddenGem: {
      name: "Sethan Village & Naggar Cedar Woods",
      description: "A tranquil hamlet nestled 12km from Manali at 2,600m. Peaceful apple orchards with zero commercial plastic waste.",
      bonusTokens: 80
    }
  },
  "shimla": {
    name: "Shimla",
    region: "Himachal Pradesh",
    lat: 31.1048,
    lng: 77.1734,
    altitude: "2,276m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "extreme",
    weather: {
      temp: "16°C",
      condition: "Misty Pine Breeze & Rain",
      rainProb: 78,
      wind: "18 km/h",
      aqi: 24,
      advisory: "Kalka-Shimla corridor experiencing light debris flows. Drive carefully near bypass roads."
    },
    crowdScore: 84,
    baseBudget: 3200,
    attractions: [
      { name: "The Ridge & Christ Church", lat: 31.1051, lng: 77.1740, type: "Heritage", crowd: "High (88%)" },
      { name: "Jakhoo Hill Hanuman Temple Sanctuary", lat: 31.1010, lng: 77.1850, type: "Spiritual", crowd: "High (80%)" },
      { name: "Viceregal Lodge Botanical Gardens", lat: 31.1030, lng: 77.1400, type: "Colonial Heritage", crowd: "Moderate (55%)" }
    ],
    hazardAlert: {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: ["NH-5 Kalka-Shimla Corridor", "Dhalli Tunnel Bypass", "Tara Devi Slopes"],
      safeReroute: {
        id: "reroute-shimla-mashobra",
        name: "Valley Safe Route: Mashobra Apple Valley & Craignano Pine Reserve",
        description: "Bypass vulnerable highway cuttings. Explore stable forested trails of Craignano, enjoy farm-fresh apple preserves, and learn Pahari wooden architecture.",
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "15.2 kg CO2"
      }
    },
    hiddenGem: {
      name: "Craignano Nature Sanctuary & Mashobra Orchards",
      description: "Untouched deodar canopy planted in 1890, offering peaceful walking trails away from city traffic.",
      bonusTokens: 75
    }
  },
  "varanasi": {
    name: "Varanasi",
    region: "Uttar Pradesh",
    lat: 25.3176,
    lng: 82.9739,
    altitude: "80m",
    terrain: "cultural",
    isMountain: false,
    landslideRisk: "safe",
    weather: {
      temp: "29°C",
      condition: "Clear & Golden Sunlight",
      rainProb: 15,
      wind: "10 km/h",
      aqi: 58,
      advisory: "Favorable conditions for morning solar boat rides and walking tours along the heritage ghats."
    },
    crowdScore: 90,
    baseBudget: 2200,
    attractions: [
      { name: "Dashashwamedh Ghat Evening Ganga Aarti", lat: 25.3075, lng: 83.0104, type: "Spiritual", crowd: "Very High (95%)" },
      { name: "Assi Ghat Dawn Yoga & Solar Boating", lat: 25.2890, lng: 83.0060, type: "Cultural Heritage", crowd: "Moderate (60%)" },
      { name: "Sarnath Deer Park & Ashokan Stupa", lat: 25.3811, lng: 83.0214, type: "Archaeological", crowd: "Moderate (50%)" },
      { name: "Varanasi Handloom Silk Weavers Colony", lat: 25.3200, lng: 82.9900, type: "Artisan Hub", crowd: "Low (38%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Chunar Sandstone Citadel & Clay Potter Village",
      description: "Historic Ganges cliff fortress 35km south; home to traditional pink sandstone carvers and red glazed clay artisans.",
      bonusTokens: 85
    }
  },
  "jaipur": {
    name: "Jaipur",
    region: "Rajasthan (The Pink City)",
    lat: 26.9124,
    lng: 75.7873,
    altitude: "431m",
    terrain: "heritage",
    isMountain: false,
    landslideRisk: "safe",
    weather: {
      temp: "28°C",
      condition: "Warm Sunny Breeze",
      rainProb: 10,
      wind: "12 km/h",
      aqi: 55,
      advisory: "Ideal weather for fort explorations, heritage walks, and night market shopping."
    },
    crowdScore: 82,
    baseBudget: 2800,
    attractions: [
      { name: "Amber Fort & Maota Lake", lat: 26.9855, lng: 75.8513, type: "Royal Fort", crowd: "High (86%)" },
      { name: "Hawa Mahal (Palace of Winds)", lat: 26.9239, lng: 75.8267, type: "Iconic Landmark", crowd: "High (88%)" },
      { name: "City Palace & Jantar Mantar", lat: 26.9258, lng: 75.8237, type: "Royal Heritage", crowd: "High (80%)" },
      { name: "Nahargarh Fort Sunset Point", lat: 26.9370, lng: 75.8150, type: "Scenic Lookout", crowd: "Moderate (62%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Bagru Natural Hand-Block Printing Hamlet",
      description: "A 300-year-old artisan village producing authentic vegetable-dyed Dabu prints with community masterclasses.",
      bonusTokens: 80
    }
  },
  "udaipur": {
    name: "Udaipur",
    region: "Mewar, Rajasthan",
    lat: 24.5854,
    lng: 73.7125,
    altitude: "598m",
    terrain: "heritage",
    isMountain: false,
    landslideRisk: "safe",
    weather: {
      temp: "26°C",
      condition: "Pleasant Lake Breeze",
      rainProb: 12,
      wind: "10 km/h",
      aqi: 42,
      advisory: "Excellent conditions for evening boat cruises on Lake Pichola and palace visits."
    },
    crowdScore: 78,
    baseBudget: 3400,
    attractions: [
      { name: "City Palace & Lake Pichola", lat: 24.5764, lng: 73.6835, type: "Palace", crowd: "High (84%)" },
      { name: "Jag Mandir Island Garden", lat: 24.5680, lng: 73.6780, type: "Island Heritage", crowd: "Moderate (58%)" },
      { name: "Saheliyon-ki-Bari Royal Fountains", lat: 24.6060, lng: 73.6840, type: "Historic Gardens", crowd: "Moderate (50%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Delwara Jain Stepwells & Rural Heritage Trail",
      description: "Quiet 14th-century temple village with restored stepwells and women's craft cooperatives 25km north.",
      bonusTokens: 85
    }
  },
  "munnar": {
    name: "Munnar",
    region: "Idukki District, Kerala",
    lat: 10.0889,
    lng: 77.0595,
    altitude: "1,600m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "extreme",
    weather: {
      temp: "17°C",
      condition: "Western Ghats Mist & Rain",
      rainProb: 86,
      wind: "20 km/h",
      aqi: 15,
      advisory: "Soil moisture high along Gap Road. Road clearance teams on alert during rain hours."
    },
    crowdScore: 80,
    baseBudget: 2900,
    attractions: [
      { name: "Tata Tea Museum & Heritage Factory", lat: 10.0890, lng: 77.0600, type: "Agro-Heritage", crowd: "High (82%)" },
      { name: "Eravikulam National Park (Nilgiri Tahr)", lat: 10.1500, lng: 77.0667, type: "Wildlife", crowd: "High (86%)" },
      { name: "Top Station Viewpoint (Ridge Pass)", lat: 10.1250, lng: 77.2400, type: "Viewpoint", crowd: "Moderate (65%)" }
    ],
    hazardAlert: {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: ["Munnar-Gap Road NH-85", "Mattupetty Dam Descent", "Devikulam Cutting"],
      safeReroute: {
        id: "reroute-munnar-marayoor",
        name: "Valley Safe Route: Marayoor Sandalwood Forest & Dolmens Valley",
        description: "Descend into the rain-shadow eastern slopes of Marayoor. Discover natural sandalwood forests, prehistoric dolmens, and traditional jaggery boil houses.",
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "16.8 kg CO2"
      }
    },
    hiddenGem: {
      name: "Marayoor Organic Sugarcane & Sandalwood Valley",
      description: "Rain-shadow plateau with ancient stone-age dolmens and authentic GI-tagged Marayoor Jaggery boil houses.",
      bonusTokens: 85
    }
  },
  "goa": {
    name: "Goa",
    region: "Konkan Coast",
    lat: 15.2993,
    lng: 74.1240,
    altitude: "10m",
    terrain: "coastal",
    isMountain: false,
    landslideRisk: "safe",
    weather: {
      temp: "29°C",
      condition: "Sunny Coastal Breeze",
      rainProb: 20,
      wind: "14 km/h",
      aqi: 32,
      advisory: "Pleasant seaside conditions. Great weather for ferry rides, heritage walks, and spice plantation visits."
    },
    crowdScore: 84,
    baseBudget: 3500,
    attractions: [
      { name: "Fontainhas Latin Heritage Quarter (Panaji)", lat: 15.4989, lng: 73.8311, type: "Heritage", crowd: "Moderate (62%)" },
      { name: "Salim Ali Bird Sanctuary (Chorão Island)", lat: 15.5250, lng: 73.8650, type: "Eco-Mangrove", crowd: "Low (28%)" },
      { name: "Cabo de Rama Historic Cliff Fort", lat: 15.0880, lng: 73.9180, type: "Coastal Fort", crowd: "Moderate (48%)" },
      { name: "Calangute & Baga Coast", lat: 15.5550, lng: 73.7510, type: "Beach", crowd: "High (92%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Divar Island Cycling & Mangrove Trail",
      description: "Car-free scenic island reached by river ferry, lined with vintage Portuguese homes and quiet backwaters.",
      bonusTokens: 75
    }
  },
  "rishikesh": {
    name: "Rishikesh",
    region: "Uttarakhand (Yoga Capital)",
    lat: 30.0869,
    lng: 78.2676,
    altitude: "340m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "caution",
    weather: {
      temp: "23°C",
      condition: "Clear Foothill Breeze",
      rainProb: 35,
      wind: "12 km/h",
      aqi: 28,
      advisory: "River rafting operating smoothly. Foothill trails stable with light morning mist."
    },
    crowdScore: 78,
    baseBudget: 2400,
    attractions: [
      { name: "Triveni Ghat Evening Maha Aarti", lat: 30.1040, lng: 78.2930, type: "Spiritual", crowd: "High (82%)" },
      { name: "Beatles Ashram & Rajaji Biosphere", lat: 30.1130, lng: 78.3120, type: "Heritage Nature", crowd: "Moderate (55%)" },
      { name: "Neelkanth Mahadev Temple Route", lat: 30.1340, lng: 78.3360, type: "Pilgrimage", crowd: "High (74%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Phool Chatti Riverside Organic Hamlet",
      description: "Tranquil Himalayan river bend upstream from main bridges, surrounded by organic gardens and quiet yoga shalas.",
      bonusTokens: 75
    }
  },
  "darjeeling": {
    name: "Darjeeling",
    region: "West Bengal (Queen of Hills)",
    lat: 27.0410,
    lng: 88.2663,
    altitude: "2,042m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "extreme",
    weather: {
      temp: "15°C",
      condition: "Misty Mountain Showers",
      rainProb: 80,
      wind: "18 km/h",
      aqi: 16,
      advisory: "Hill cart road experiencing intermittent wet patches. Hill rail running on adjusted schedule."
    },
    crowdScore: 76,
    baseBudget: 3100,
    attractions: [
      { name: "Tiger Hill Sunrise & Kanchenjunga View", lat: 27.0000, lng: 88.2700, type: "Viewpoint", crowd: "High (89%)" },
      { name: "Happy Valley Historic Tea Estate", lat: 27.0500, lng: 88.2600, type: "Agro-Heritage", crowd: "Moderate (58%)" },
      { name: "Batasia Loop & Himalayan Toy Train", lat: 27.0200, lng: 88.2500, type: "Heritage Rail", crowd: "High (82%)" }
    ],
    hazardAlert: {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: ["Peshok Tea Garden Road", "Rohini Highway Descent", "Tindharia Hill Cutting"],
      safeReroute: {
        id: "reroute-darjeeling-mirik",
        name: "Valley Safe Route: Mirik Lake Pine Woods & Orange Orchard Walk",
        description: "Bypass steep fragile slopes of Peshok. Enjoy peaceful lakeside strolls in Mirik and organic cardamom farm homestays.",
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "17.0 kg CO2"
      }
    },
    hiddenGem: {
      name: "Tinchuley Organic Village & Tea Retreat",
      description: "A scenic model eco-village 32km from Darjeeling with panoramic snow-capped views and zero plastic litter.",
      bonusTokens: 80
    }
  },
  "srinagar": {
    name: "Srinagar",
    region: "Kashmir Valley",
    lat: 34.0837,
    lng: 74.7973,
    altitude: "1,585m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "caution",
    weather: {
      temp: "18°C",
      condition: "Crisp Chinar Breeze & Mild Sun",
      rainProb: 25,
      wind: "10 km/h",
      aqi: 22,
      advisory: "Favorable conditions for wooden Shikara rides on Dal Lake and Mughal garden walks."
    },
    crowdScore: 78,
    baseBudget: 3600,
    attractions: [
      { name: "Dal Lake Floating Market & Shikara Route", lat: 34.1000, lng: 74.8500, type: "Waterway", crowd: "High (82%)" },
      { name: "Shalimar Bagh & Nishat Mughal Terraces", lat: 34.1500, lng: 74.8800, type: "Royal Gardens", crowd: "High (76%)" },
      { name: "Old City Jamia Masjid & Woodcarver Guilds", lat: 34.0900, lng: 74.8100, type: "Cultural Heritage", crowd: "Moderate (50%)" }
    ],
    hazardAlert: null,
    hiddenGem: {
      name: "Doodhpathri Valley of Milk Meadows",
      description: "A pristine alpine meadow 42km south of Srinagar with untouched pine streams and pastoral shepherd hamlets.",
      bonusTokens: 85
    }
  },
  "ooty": {
    name: "Ooty (Udhagamandalam)",
    region: "Nilgiris, Tamil Nadu",
    lat: 11.4102,
    lng: 76.6950,
    altitude: "2,240m",
    terrain: "mountain",
    isMountain: true,
    landslideRisk: "extreme",
    weather: {
      temp: "15°C",
      condition: "Nilgiri Mist & Passing Showers",
      rainProb: 75,
      wind: "16 km/h",
      aqi: 19,
      advisory: "Mountain ghat road from Kallar experiencing wet turns. Drive cautiously."
    },
    crowdScore: 82,
    baseBudget: 3000,
    attractions: [
      { name: "Government Botanical Gardens", lat: 11.4200, lng: 76.7100, type: "Botanical", crowd: "High (88%)" },
      { name: "Nilgiri Mountain Railway (Toy Train)", lat: 11.4100, lng: 76.7000, type: "Heritage Rail", crowd: "High (90%)" },
      { name: "Doddabetta Peak & Telescope House", lat: 11.4000, lng: 76.7400, type: "Viewpoint", crowd: "High (84%)" }
    ],
    hazardAlert: {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: ["Coonoor Ghat Hairpin 14-22", "Kotagiri Descent Route", "Gudalur Valley Bypass"],
      safeReroute: {
        id: "reroute-ooty-kotagiri",
        name: "Valley Safe Route: Kotagiri Tea Ridge & Kodanad Vista Walk",
        description: "Bypass congested main ghats. Enjoy gentler gradients of Kotagiri and organic Nilgiri green tea estate trails.",
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "16.2 kg CO2"
      }
    },
    hiddenGem: {
      name: "Avalanche Lake & Shola Forest Reserve",
      description: "Pristine nature reserve 28km from Ooty with crystal clear waters and strictly regulated eco-shuttles.",
      bonusTokens: 80
    }
  }
};

/**
 * Universal Indian Destination Resolver
 * Seamlessly resolves any city/town typed by travelers
 */
function resolveDestination(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return KNOWN_DESTINATIONS["manali"];
  }

  const clean = rawInput.trim().toLowerCase();
  
  for (const key of Object.keys(KNOWN_DESTINATIONS)) {
    if (clean === key || clean.includes(key) || key.includes(clean)) {
      return JSON.parse(JSON.stringify(KNOWN_DESTINATIONS[key]));
    }
  }

  const mountainPatterns = /(manali|leh|ladakh|shimla|munnar|gangtok|uttarakhand|himachal|kedarnath|darjeeling|nainital|mussoorie|spiti|kasol|dharamshala|kullu|chamba|rishikesh|alps|himalaya|mountain|hill|pass|valley|peak|glacier|kashmir|srinagar|gulmarg|pahalgam|coorg|ooty|wayanad|kodaikanal|zermatt|kathmandu)/i;
  const isMountain = mountainPatterns.test(clean);

  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = ((Math.abs(hash) % 500) / 100) - 2.5;
  const lngOffset = ((Math.abs(hash * 3) % 500) / 100) - 2.5;

  let baseLat = 23.5 + latOffset;
  let baseLng = 77.5 + lngOffset;

  if (isMountain) {
    baseLat = 31.2 + (Math.abs(hash % 300) / 100);
    baseLng = 77.0 + (Math.abs(hash % 200) / 100);
  }

  const capName = rawInput.trim().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

  return {
    name: capName,
    region: isMountain ? "Himalayan Foothills & Mountain Region" : "Incredible India Heritage Destination",
    lat: parseFloat(baseLat.toFixed(4)),
    lng: parseFloat(baseLng.toFixed(4)),
    altitude: isMountain ? "2,100m" : "180m",
    terrain: isMountain ? "mountain" : "cultural",
    isMountain: isMountain,
    landslideRisk: isMountain ? "extreme" : "safe",
    weather: {
      temp: isMountain ? "15°C" : "27°C",
      condition: isMountain ? "Mountain Mist & Passing Rain" : "Sunny & Pleasant Weather",
      rainProb: isMountain ? 80 : 18,
      wind: isMountain ? "20 km/h" : "12 km/h",
      aqi: isMountain ? 22 : 45,
      advisory: isMountain 
        ? "Precipitation elevated along high hill passes. Safe valley routing recommended."
        : "Favorable conditions for city heritage exploration and local markets."
    },
    crowdScore: 76,
    baseBudget: isMountain ? 3000 : 2800,
    attractions: [
      { name: `${capName} Central Heritage Temple & Square`, lat: baseLat + 0.015, lng: baseLng + 0.012, type: "Heritage", crowd: "Moderate (74%)" },
      { name: `${capName} Botanical Gardens & Nature Walk`, lat: baseLat - 0.012, lng: baseLng + 0.018, type: "Nature", crowd: "Low (45%)" },
      { name: `${capName} Traditional Handicraft & Spice Bazaar`, lat: baseLat + 0.008, lng: baseLng - 0.014, type: "Bazaar", crowd: "Moderate (60%)" },
      { 
        name: isMountain ? `${capName} High Ridge Pass (Caution Zone)` : `${capName} Sunset Riverfront Promenade`, 
        lat: baseLat + 0.025, 
        lng: baseLng + 0.022, 
        type: isMountain ? "Mountain Pass" : "Scenic Viewpoint", 
        crowd: isMountain ? "Heavy (88%)" : "Moderate (55%)" 
      }
    ],
    hazardAlert: isMountain ? {
      active: true,
      severity: "critical",
      title: "HIGH LANDSLIDE RISK ALERT: Heavy rainfall detected along mountain passes. High risk of rockfalls and road closures.",
      subtitle: "Disaster Authority Advisory: Travel restricted during night hours.",
      impactedRoutes: [`${capName} Upper Pass Road`, `North Ridge Cutting`, `Hill Descent Sector 3`],
      safeReroute: {
        id: `reroute-${clean.replace(/[^a-z0-9]/g, '')}`,
        name: `Valley Safe Route: Lower ${capName} Forest Sanctuary & Village Trail`,
        description: `Bypass steep unstable hill cuttings. Tour the lower protected river basin, visit local craft guilds, and avoid high-altitude rockfall sectors.`,
        rewardTokens: 100,
        riskLevel: "safe",
        terrainBadge: "🟢 Safe Valley Route",
        carbonSaving: "16.5 kg CO2"
      }
    } : null,
    hiddenGem: {
      name: `${capName} Rural Organic Hamlet & Craft Studio`,
      description: `A pristine rural retreat located 10km from center with traditional home-cooked cuisine and authentic craftspeople.`,
      bonusTokens: 80
    }
  };
}

/**
 * Dynamic Multi-Day Itinerary Planner
 */
function generateDynamicItinerary(destination, days = 3, travelStyle = "eco") {
  const dest = typeof destination === 'string' ? resolveDestination(destination) : destination;
  const numDays = Math.min(Math.max(parseInt(days) || 3, 1), 14);

  const styleProfiles = {
    "eco": { name: "Eco-Explorer", carbonMult: 0.4, tokenBonus: 40, focus: "Solar transit, nature trails, organic farm meals" },
    "backpacker": { name: "Budget Backpacker", carbonMult: 0.6, tokenBonus: 25, focus: "Local trains, youth homestays, iconic street food" },
    "luxury": { name: "Heritage Luxury", carbonMult: 0.8, tokenBonus: 60, focus: "Palace havelis, licensed historians, royal feasts" },
    "family": { name: "Family Friendly", carbonMult: 0.7, tokenBonus: 35, focus: "Gentle walks, craft workshops, toy trains, lakeside gardens" },
    "culture": { name: "Cultural Immersion", carbonMult: 0.5, tokenBonus: 50, focus: "GI-tagged artisan masterclasses, dawn ghat rituals" }
  };

  const profile = styleProfiles[travelStyle] || styleProfiles["eco"];
  const itineraryDays = [];

  const activityTemplates = [
    {
      morning: { title: "Dawn Heritage Walk & Sacred Bells", desc: "Quiet morning exploration guided by a local historian before tourist rush.", ecoScore: 96, cost: 250 },
      afternoon: { title: "GI Tag Master Craftsperson Workshop", desc: "Hands-on experience with award-winning local artisans preserving handloom or pottery traditions.", ecoScore: 92, cost: 650 },
      evening: { title: "Sunset Riverbank / Viewpoint Tea Tasting", desc: "Enjoy fresh indigenous herbal brews or masala chai overlooking serene viewpoints.", ecoScore: 90, cost: 200 },
      night: { title: "Traditional Community Thali Feast", desc: "Home-style recipes cooked in earthenware with heirloom spices and local ingredients.", ecoScore: 94, cost: 450 }
    },
    {
      morning: { title: "Scenic Nature Trail & Birdwatching", desc: "Low-impact walk through protected pine, deodar or spice plantation canopies.", ecoScore: 98, cost: 350 },
      afternoon: { title: "Organic Farm & Orchard Visit", desc: "Sample fresh seasonal fruits, cold-pressed oils, and stone-ground grains.", ecoScore: 95, cost: 300 },
      evening: { title: "Folk Music & Cultural Storytelling", desc: "Traditional acoustic instruments and regional folklore with village community elders.", ecoScore: 96, cost: 200 },
      night: { title: "Courtyard Dining Under Starlight", desc: "Regional seasonal dinner served in open-air haveli courtyards or hillside balconies.", ecoScore: 92, cost: 500 }
    },
    {
      morning: { title: "Historic Fort / Temple Sunrise Trek", desc: "Gentle morning walk up ancient ramparts or river ghata for panoramic sunrise views.", ecoScore: 94, cost: 200 },
      afternoon: { title: "Spice Market & Artisan Guild Tour", desc: "Discover centuries-old trade lanes, authentic attar perfumers, and textile dyers.", ecoScore: 90, cost: 350 },
      evening: { title: "Boating / Lake Walk at Twilight", desc: "Peaceful paddle or electric boat ride admiring evening lamps lighting up the water.", ecoScore: 92, cost: 300 },
      night: { title: "Farewell Regional Gastronomy Dinner", desc: "Signature dishes prepared by master cooks celebrating the rich culinary diversity of India.", ecoScore: 93, cost: 550 }
    }
  ];

  let totalCost = 0;
  let totalCarbonSaved = 0;

  for (let d = 1; d <= numDays; d++) {
    const template = activityTemplates[(d - 1) % activityTemplates.length];
    const dayCost = template.morning.cost + template.afternoon.cost + template.evening.cost + template.night.cost + (dest.baseBudget * 0.4);
    const dayCarbon = (18.5 * (1 - profile.carbonMult) + 4.2).toFixed(1);

    totalCost += dayCost;
    totalCarbonSaved += parseFloat(dayCarbon);

    let specialAdvisory = null;
    let morningActivity = template.morning;

    if (dest.isMountain && d === 2) {
      specialAdvisory = "⚠️ High pass section restricted due to weather advisory. Replaced with valley pine trail.";
      morningActivity = {
        title: "Protected Valley Forest Walk & Stream Crossing",
        desc: "Safe mid-altitude route verified clear of scree slides by disaster management bulletin.",
        ecoScore: 98,
        cost: 200
      };
    }

    itineraryDays.push({
      day: d,
      theme: d === 1 ? "Arrival & Heritage Immersion" : (d === numDays ? "Culinary Secrets & Farewell" : `Deep Cultural Circuit - Day ${d}`),
      crowdForecast: Math.max(35, Math.min(85, dest.crowdScore - (d * 8))),
      specialAdvisory: specialAdvisory,
      schedule: {
        morning: morningActivity,
        afternoon: template.afternoon,
        evening: template.evening,
        night: template.night
      },
      dayEstimate: Math.round(dayCost),
      carbonSavedKg: dayCarbon
    });
  }

  return {
    destination: dest.name,
    region: dest.region,
    coordinates: { lat: dest.lat, lng: dest.lng },
    durationDays: numDays,
    style: profile.name,
    styleFocus: profile.focus,
    weatherBadge: dest.weather,
    terrainSafety: dest.isMountain ? "🔴 Extreme Landslide Hazard (Rerouting Available)" : "🟢 Safe Route",
    isMountain: dest.isMountain,
    hazardAlert: dest.hazardAlert,
    antiCrowdAlert: {
      location: dest.attractions[0]?.name || "Central Viewpoint",
      capacity: `${dest.crowdScore}% Capacity`,
      message: `Crowd spike detected at primary site! Divert to ${dest.hiddenGem.name} to avoid queues.`,
      reward: `+${dest.hiddenGem.bonusTokens} Eco-Tokens`,
      gem: dest.hiddenGem
    },
    days: itineraryDays,
    summary: {
      estimatedTotalCost: Math.round(totalCost),
      totalCarbonSavedKg: totalCarbonSaved.toFixed(1),
      potentialEcoTokens: (numDays * profile.tokenBonus) + (dest.isMountain ? 100 : 50)
    }
  };
}

/**
 * Multi-Modal Indian Transit Catalog
 * Vande Bharat Express, Premium AC Sleeper Buses, Low-Emission Flights
 */
const TRANSIT_CATALOG = [
  {
    id: "tr-01",
    type: "train",
    name: "Vande Bharat Express (Train #22436)",
    operator: "Indian Railways (100% Electric Grid)",
    badge: "⚡ Electric Express Train",
    isGreen: true,
    carbonKg: 8.4,
    carbonVsFlight: "-78% CO2",
    departure: "06:00 AM",
    arrival: "02:00 PM",
    duration: "8h 00m",
    price: 1750,
    ecoTokensReward: 90,
    features: ["160 km/h High-Speed", "Bio-vacuum toilets", "Ergonomic 180° swivel seats", "Regional hot meals included"]
  },
  {
    id: "tr-02",
    type: "bus",
    name: "Zingbus Green Electric Volvo AC Multi-Axle",
    operator: "Zingbus Climate Fleet",
    badge: "🌿 Zero-Emission EV Bus",
    isGreen: true,
    carbonKg: 10.8,
    carbonVsFlight: "-68% CO2",
    departure: "08:30 PM",
    arrival: "06:15 AM",
    duration: "9h 45m (Overnight)",
    price: 1180,
    ecoTokensReward: 70,
    features: ["Luxury individual berth sleeper", "USB fast charging", "Live GPS tracking", "Air suspension ride"]
  },
  {
    id: "tr-03",
    type: "train",
    name: "Vande Bharat Express (Train #20833)",
    operator: "Western Railway Eco-Corridor",
    badge: "⚡ Electric Express Train",
    isGreen: true,
    carbonKg: 9.1,
    carbonVsFlight: "-75% CO2",
    departure: "05:45 AM",
    arrival: "01:15 PM",
    duration: "7h 30m",
    price: 1620,
    ecoTokensReward: 85,
    features: ["Regenerative braking energy recovery", "Onboard Wi-Fi entertainment", "Scenic panoramic windows"]
  },
  {
    id: "tr-04",
    type: "bus",
    name: "IntrCity SmartBus Premium Lounge Sleeper",
    operator: "IntrCity Mobility",
    badge: "🚌 Certified Low-Emission",
    isGreen: true,
    carbonKg: 12.2,
    carbonVsFlight: "-62% CO2",
    departure: "09:15 PM",
    arrival: "07:00 AM",
    duration: "9h 45m",
    price: 1350,
    ecoTokensReward: 65,
    features: ["Private cabin curtain berths", "Onboard bus captain & clean washroom", "Complimentary mineral water"]
  },
  {
    id: "tr-05",
    type: "flight",
    name: "IndiGo GreenWave Direct Express",
    operator: "IndiGo EcoFleet (A321neo)",
    badge: "✈️ Fuel-Efficient neo Fleet",
    isGreen: false,
    carbonKg: 38.0,
    carbonVsFlight: "-20% vs older aircraft",
    departure: "10:15 AM",
    arrival: "12:10 PM",
    duration: "1h 55m",
    price: 4650,
    ecoTokensReward: 35,
    features: ["Direct nonstop flight", "Paperless digiyatra boarding", "Carbon offset trees planted"]
  },
  {
    id: "tr-06",
    type: "train",
    name: "Jan Shatabdi Express (Train #12055)",
    operator: "Northern Railway",
    badge: "⚡ Affordable Electric Rail",
    isGreen: true,
    carbonKg: 9.8,
    carbonVsFlight: "-72% CO2",
    departure: "03:20 PM",
    arrival: "09:10 PM",
    duration: "5h 50m",
    price: 780,
    ecoTokensReward: 60,
    features: ["Air-conditioned chair car", "Clean drinking water refill points", "Punctual express timings"]
  }
];

/**
 * Smart Stays Catalog (Heritage Havelis, Eco-Resorts, Homestays)
 */
const STAYS_CATALOG = [
  {
    id: "stay-01",
    name: "The Chinar Kath-Kuni Heritage Homestay",
    location: "Naggar, Kullu Valley, Himachal Pradesh",
    type: "heritage-homestay",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 284,
    basePrice: 3400,
    certifications: ["Traditional Earthquake-Resilient Wood", "Organic Apple Farm", "100% Solar Heated"],
    masterclass: "Free Himalayan Cider Pressing & Wood Carving Workshop",
    description: "Built in the timeless Kath-Kuni interlocking cedar timber style. Hosted by a local farming family serving authentic home-cooked meals."
  },
  {
    id: "stay-02",
    name: "Rawla Rawatsar Heritage Haveli & Courtyard",
    location: "Pink City Heritage Core, Jaipur, Rajasthan",
    type: "heritage-homestay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 310,
    basePrice: 4200,
    certifications: ["18th-Century Restored Haveli", "Rainwater Harvesting", "Zero Single-Use Plastic"],
    masterclass: "Free Royal Rajasthani Dal Baati Cooking Masterclass",
    description: "An authentic noble haveli featuring hand-painted floral frescoes, tranquil courtyards, fountain pools, and warm Rajput hospitality."
  },
  {
    id: "stay-03",
    name: "Malabar Spice & Backwater Plantation Villa",
    location: "Kumarakom / Alleppey, Kerala",
    type: "eco-resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    rating: 4.94,
    reviewsCount: 215,
    basePrice: 3800,
    certifications: ["Organic Spice Garden", "Solar Powered Boats", "Rainwater Lake Recharging"],
    masterclass: "Free Claypot Fish Curry & Coconut Grating Session",
    description: "Nestled along peaceful backwaters under swaying coconut palms. Serves farm-to-table Kerala cuisine on fresh banana leaves."
  },
  {
    id: "stay-04",
    name: "Nilgiri Shola Mist Eco-Resort & Tea Bungalow",
    location: "Munnar Tea Hills, Kerala",
    type: "eco-resort",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    reviewsCount: 178,
    basePrice: 4100,
    certifications: ["Restored Native Shola Forest", "Solar Water Heating", "Native Flora Conservation"],
    masterclass: "Free Orthodox Tea Tasting & Spice Blending Walk",
    description: "Surrounded by misty slopes of emerald tea plantations. Experience gentle morning walks with resident naturalists."
  },
  {
    id: "stay-05",
    name: "Ganga Kinare Riverside Sanctuary & Ashram Stay",
    location: "Rishikesh Foothills, Uttarakhand",
    type: "heritage-homestay",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    reviewsCount: 195,
    basePrice: 2800,
    certifications: ["Riverfront Ghat Access", "Sattvic Organic Kitchen", "Solar Energy System"],
    masterclass: "Free Sunset Meditation & Sound Healing Session",
    description: "Situated right on the serene banks of the Holy Ganges. Offers daily yoga sessions, vegetarian culinary workshops, and starlit evening aartis."
  },
  {
    id: "stay-06",
    name: "Wildflower Geodesic Glamping Sanctuary",
    location: "Sethan Valley, Himachal Pradesh",
    type: "glamping",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    reviewsCount: 164,
    basePrice: 4600,
    certifications: ["Zero Ground Disturbance", "Clear-Sky Insulated Domes", "Zero Waste Trail"],
    masterclass: "Free High-Altitude Astrophotography Session",
    description: "Panoramic geodesic dome overlooking snow-clad Pir Panjal peaks. Designed to leave zero footprint while offering cozy woodfire warmth."
  }
];

/**
 * Dynamic Stay Pricing Formula (Off-Peak Occupancy Yield)
 */
function calculateDynamicStayPrice(basePrice, occupancyRate = 50, isPro = false) {
  let discountPercent = 0;
  if (occupancyRate <= 30) {
    discountPercent = 35;
  } else if (occupancyRate <= 50) {
    discountPercent = 25;
  } else if (occupancyRate <= 70) {
    discountPercent = 12;
  } else {
    discountPercent = 0;
  }

  if (isPro) {
    discountPercent += 15;
  }

  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = basePrice - discountAmount;
  const unlocksMasterclass = occupancyRate <= 50;

  return {
    basePrice,
    occupancyRate,
    discountPercent,
    discountAmount,
    finalPrice,
    unlocksMasterclass
  };
}

/**
 * Hyper-Local Food, Restaurants & GI-Tagged Artisans
 */
const MARKET_CATALOG = [
  {
    id: "mkt-01",
    category: "food",
    name: "Authentic Kangra Dham Traditional Feasting Set",
    artisan: "Botu Master Chef Trilok Chand & Sons",
    artisanPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Dharamshala & Kangra Valley, Himachal",
    price: 450,
    tokensAwarded: 40,
    giTag: {
      registeredNumber: "Heritage Culinary Art - Himachali Dham",
      authority: "Himachal Tourism & Cultural Preservation",
      batchCode: "DHM-2026-T12",
      verificationUrl: "https://safarsetu.in/verify/kangra-dham",
      originProof: "Cooked slowly in heavy brass degh cauldrons using curd-infused Rajmah Madra and wood charcoal.",
      qrPayload: "SAFARSETU-DHM-KANGRA-ORGANIC-2026"
    },
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
    story: "Served traditionally on stitched sal-leaf pattals with zero oil frying and digestive Ayurvedic spices."
  },
  {
    id: "mkt-02",
    category: "handicraft",
    name: "Handwoven Kullu Pure Merino & Angora Shawl",
    artisan: "Smt. Kamala Devi & Bhutti Weavers Co-op",
    artisanPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    location: "Kullu Valley, Himachal Pradesh",
    price: 3200,
    tokensAwarded: 120,
    giTag: {
      registeredNumber: "GI Tag #46 - Kullu Shawl",
      authority: "Geographical Indications Registry, Government of India",
      batchCode: "KL-2026-B88",
      verificationUrl: "https://ipindia.gov.in/gi-registry/kullu-shawl-46",
      originProof: "Certified hand-spun local wool woven on wooden pit-looms with traditional geometric borders.",
      qrPayload: "GI-IN-46-KULLU-SHAWL-VERIFIED-AUTH"
    },
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
    story: "Woven over 30 hours by a women's cooperative preserving the sacred geometry of Western Himalayan folklore."
  },
  {
    id: "mkt-03",
    category: "food",
    name: "Banarasi Tamatar Chaat, Kashi Malaiyo & Lassi",
    artisan: "Keshav Chaat Bhandar (Established 1932)",
    artisanPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    location: "Dashashwamedh Lane, Varanasi",
    price: 280,
    tokensAwarded: 30,
    giTag: {
      registeredNumber: "Kashi Heritage Street Food Guild",
      authority: "Varanasi Heritage Culinary Board",
      batchCode: "VNS-CHAAT-1932",
      verificationUrl: "https://safarsetu.in/verify/kashi-chaat",
      originProof: "Prepared in pure desi ghee with slow-roasted tomatoes, cumin-infused sugar syrup, and roasted hing.",
      qrPayload: "SAFARSETU-VNS-KASHI-CHAAT-AUTH"
    },
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    story: "Served in earthen kulhads that naturally infuse a rich clay aroma into every bite."
  },
  {
    id: "mkt-04",
    category: "handicraft",
    name: "Jaipur Royal Blue Pottery Glazed Terracotta Vase",
    artisan: "Ustad Girraj Kripal & Artisan Guild",
    artisanPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    location: "Kot Jewar, Jaipur, Rajasthan",
    price: 1850,
    tokensAwarded: 80,
    giTag: {
      registeredNumber: "GI Tag #28 - Blue Pottery of Jaipur",
      authority: "Geographical Indications Registry, Government of India",
      batchCode: "JP-BP-2026-004",
      verificationUrl: "https://ipindia.gov.in/gi-registry/jaipur-blue-pottery-28",
      originProof: "Crafted without clay using quartz stone powder, Fuller's earth, and katira gum with cobalt oxide blue glazing.",
      qrPayload: "GI-IN-28-JAIPUR-BLUE-POTTERY-AUTH"
    },
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    story: "Fired in low-temperature wood kilns, creating an impermeable glass glaze that never chips or cracks."
  },
  {
    id: "mkt-05",
    category: "food",
    name: "Authentic Rajasthani Dal Baati Churma Platter",
    artisan: "Chokhi Dhani Heritage Master Chefs",
    artisanPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "Jaipur & Udaipur, Rajasthan",
    price: 520,
    tokensAwarded: 45,
    giTag: {
      registeredNumber: "Mewari Heritage Gastronomy Guild",
      authority: "Rajasthan Tourism Culinary Heritage",
      batchCode: "RAJ-DBC-2026",
      verificationUrl: "https://safarsetu.in/verify/dal-baati",
      originProof: "Clay-oven baked baatis steeped in pure cow ghee, served with panchmel dal, spicy garlic chutney, and jaggery churma.",
      qrPayload: "SAFARSETU-RAJ-DBC-MEWAR-AUTH"
    },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    story: "The iconic royal feast of Rajasthan celebrated since the 8th century by Mewari warriors."
  },
  {
    id: "mkt-06",
    category: "guide",
    name: "Certified Heritage Historian & Temple Walk (Full Day)",
    artisan: "Pandit Radheyshyam Tripathi (Certified Guide)",
    artisanPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    location: "Kashi Ghats & Old Alleyways, Varanasi",
    price: 1200,
    tokensAwarded: 90,
    giTag: {
      registeredNumber: "Ministry of Tourism Certified Heritage Guide #HG-9014",
      authority: "Incredible India Guide Registry",
      batchCode: "CERT-HG-2026",
      verificationUrl: "https://safarsetu.in/guide/radheyshyam-9014",
      originProof: "Bilingual Sanskrit & English scholar with 22 years of documenting oral histories along the ghats.",
      qrPayload: "CERT-SAFARSETU-GUIDE-RADHEY-9014"
    },
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
    story: "100% of booking fee goes directly to the guide without middleman commission."
  },
  {
    id: "mkt-07",
    category: "rickshaw",
    name: "SunRide Solar E-Rickshaw Heritage Tour (4 Hours)",
    artisan: "Sunil Kumar & Clean City Drivers Co-op",
    artisanPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    location: "Old City & Ghat Corridors",
    price: 650,
    tokensAwarded: 50,
    giTag: {
      registeredNumber: "Clean City Carbon-Free Mobility Syndicate",
      authority: "Urban Green Transport Council",
      batchCode: "EV-SUN-2026",
      verificationUrl: "https://safarsetu.in/ev/sunride-4h",
      originProof: "Rooftop mono-crystalline solar canopy generating 300W onboard charging during daytime circuits.",
      qrPayload: "EV-SAFARSETU-RICKSHAW-CLEAN"
    },
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    story: "Zero emissions, zero engine noise, comfortably seats 3 travelers with phone charging ports."
  },
  {
    id: "mkt-08",
    category: "handicraft",
    name: "Banaras Pure Katan Silk Handloom Brocade Saree",
    artisan: "Mohammed Shahid Ansari (5th Gen Master Weaver)",
    artisanPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Madanpura Weavers Colony, Varanasi",
    price: 4400,
    tokensAwarded: 150,
    giTag: {
      registeredNumber: "GI Tag #99 - Banaras Brocades and Sarees",
      authority: "Geographical Indications Registry, Government of India",
      batchCode: "VNS-KATAN-2026-99",
      verificationUrl: "https://ipindia.gov.in/gi-registry/banaras-sarees-99",
      originProof: "Certified hand-twisted Mulberry silk with pure zari kadhwa motifs and Silk Mark India tag.",
      qrPayload: "GI-IN-99-BANARAS-SILK-AUTH-2026"
    },
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
    story: "Takes 18 days of patient handloom weaving on traditional wooden pit looms."
  }
];

/**
 * Initial User Profile & Wallet Vault
 */
const DEFAULT_USER = {
  id: "usr-safarsetu",
  name: "Aarav Sharma",
  email: "aarav.sharma@safarsetu.in",
  role: "tourist",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  isPro: false,
  proPlanExpires: null,
  wallet: {
    ecoTokens: 500,
    totalTokensEarned: 1240,
    totalTokensRedeemed: 740,
    carbonSavedKg: 168.4,
    offbeatVisited: 8,
    sustainabilityTier: "Gold Eco-Explorer"
  },
  activeBookings: [
    {
      id: "BK-8821",
      itemType: "stay",
      title: "The Chinar Kath-Kuni Heritage Homestay",
      destination: "Naggar / Manali",
      dateRange: "Oct 12 - Oct 15, 2026",
      guests: 2,
      basePrice: 6800,
      discountSaved: 1700,
      tokensUsed: 100,
      totalPaid: 5355,
      tokensAwarded: 120,
      status: "Confirmed",
      isReroutedSafe: true,
      bookedAt: "2026-09-25T14:30:00.000Z"
    },
    {
      id: "BK-9014",
      itemType: "transit",
      title: "Vande Bharat Express (Train #22436)",
      destination: "New Delhi → Varanasi Junction",
      dateRange: "Oct 12, 2026",
      guests: 2,
      basePrice: 3500,
      discountSaved: 350,
      tokensUsed: 50,
      totalPaid: 3255,
      tokensAwarded: 90,
      status: "Confirmed Seat",
      isReroutedSafe: false,
      bookedAt: "2026-09-25T14:45:00.000Z"
    }
  ],
  savedItineraries: [
    {
      id: "itin-manali-3d",
      destination: "Manali",
      title: "3-Day Alpine Valley & Sethan Craft Trail",
      duration: "3 Days",
      style: "Eco-Explorer",
      carbonSaved: "52.8 kg CO2",
      savedAt: "2026-09-26T10:15:00.000Z"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KNOWN_DESTINATIONS,
    resolveDestination,
    generateDynamicItinerary,
    TRANSIT_CATALOG,
    STAYS_CATALOG,
    calculateDynamicStayPrice,
    MARKET_CATALOG,
    DEFAULT_USER
  };
}
