import { CropId, DiseaseProfile, ExpertCenter, FarmingTask, ScanRecord, WeatherAlert } from '../types/agri';
import heroFarmImg from '../assets/images/hero_indian_smart_farm_1791449788361.jpg';
import riceBlastImg from '../assets/images/sample_leaf_rice_blast_1791449808969.jpg';
import healthyWheatImg from '../assets/images/sample_leaf_healthy_wheat_1791449844187.jpg';

export const HERO_IMAGE_URL = heroFarmImg;

export interface CropMetadata {
  id: CropId;
  name: string;
  hindiName: string;
  tamilName: string;
  season: string;
  waterNeed: string;
  sampleImageUrl: string;
}

export const CROPS_LIST: CropMetadata[] = [
  {
    id: 'rice',
    name: 'Paddy (Rice)',
    hindiName: 'धान (Dhaan)',
    tamilName: 'நெல் (Nel)',
    season: 'Kharif / Samba',
    waterNeed: 'High (Submerged)',
    sampleImageUrl: riceBlastImg,
  },
  {
    id: 'wheat',
    name: 'Wheat',
    hindiName: 'गेहूँ (Gehun)',
    tamilName: 'கோதுமை (Kothumai)',
    season: 'Rabi Winter',
    waterNeed: 'Moderate (4–6 Irrigations)',
    sampleImageUrl: healthyWheatImg,
  },
  {
    id: 'tomato',
    name: 'Tomato',
    hindiName: 'टमाटर (Tamatar)',
    tamilName: 'தக்காளி (Thakkali)',
    season: 'Year-round / Rabi',
    waterNeed: 'Drip Irrigation Ideal',
    sampleImageUrl: riceBlastImg,
  },
  {
    id: 'potato',
    name: 'Potato',
    hindiName: 'आलू (Aaloo)',
    tamilName: 'உருளைக்கிழங்கு (Urulai)',
    season: 'Rabi Cool',
    waterNeed: 'Moderate Ridge Flow',
    sampleImageUrl: riceBlastImg,
  },
  {
    id: 'cotton',
    name: 'Cotton',
    hindiName: 'कपास (Kapas)',
    tamilName: 'பருத்தி (Paruthi)',
    season: 'Kharif Black Soil',
    waterNeed: 'Rainfed / Deficit Drip',
    sampleImageUrl: healthyWheatImg,
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    hindiName: 'गन्ना (Ganna)',
    tamilName: 'கரும்பு (Karumbu)',
    season: 'Annual Eksali',
    waterNeed: 'High Furrow / Drip',
    sampleImageUrl: healthyWheatImg,
  },
  {
    id: 'chilli',
    name: 'Guntur Chilli',
    hindiName: 'मिर्च (Mirch)',
    tamilName: 'மிளகாய் (Milagai)',
    season: 'Kharif & Rabi',
    waterNeed: 'Well-Drained Moderate',
    sampleImageUrl: riceBlastImg,
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    hindiName: 'मूंगफली (Moongphali)',
    tamilName: 'நிலக்கடலை (Nilakkadalai)',
    season: 'Kharif / Summer',
    waterNeed: 'Low-Moderate Sandy Loam',
    sampleImageUrl: healthyWheatImg,
  },
];

export const DISEASE_DATABASE: Record<CropId, DiseaseProfile[]> = {
  rice: [
    {
      id: 'rice-blast',
      cropId: 'rice',
      cropName: 'Paddy (Rice)',
      diseaseName: 'Rice Leaf Blast',
      scientificName: 'Magnaporthe oryzae',
      localNames: {
        hi: 'धान का झुलसा रोग (Blast)',
        ta: 'நெல் குலை நோய் (Kulai Noi)',
        te: 'వరి అగ్గి తెగులు (Aggi Tegulu)',
        kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Benki Roga)',
        ml: 'നെല്ലിലെ ബ്ലാസ്റ്റ് രോഗം',
        mr: 'भातावरील करपा रोग',
        bn: 'ধানের ব্লাস্ট রোগ',
      },
      confidence: 96.4,
      severity: 'High',
      affectedAreaPercent: 34,
      symptoms: [
        'Diamond or spindle-shaped lesions with pale grey or whitish centers on leaf blades.',
        'Dark reddish-brown necrotic border surrounding each lesion with yellow chlorotic halo.',
        'Lesions coalesce in humid morning conditions, causing complete drying of older leaves.',
        'Blackish-brown rot at the neck node below the panicle (Neck Blast stage risk).',
      ],
      recommendedActions: [
        'Immediately drain excess standing water for 3–4 days to reduce canopy micro-humidity.',
        'Pause top-dressing of Urea (Nitrogen fertilizer) immediately; excess nitrogen accelerates fungal spore penetration.',
        'Apply split dose of Muriate of Potash (MOP) at 15 kg/acre to strengthen epidermal cell walls.',
      ],
      organicRemedies: [
        'Foliar spray of Pseudomonas fluorescens talc formulation @ 10g per liter of water during late afternoon.',
        'Fermented sour buttermilk (1 liter diluted in 15 liters water) + Neem oil 3% emulsion spray.',
      ],
      chemicalControl: [
        'Spray Tricyclazole 75% WP @ 0.6g per liter of water (120g in 200L water per acre).',
        'Alternatively, apply Isoprothiolane 40% EC @ 1.5 ml per liter if neck panicle emergence has started.',
      ],
      preventionTips: [
        'Use blast-resistant ICAR varieties such as Pusa Basmati 1637, CO-51, or Swarna Sub-1.',
        'Treat seeds before nursery sowing with Trichoderma viride @ 4g/kg of seed.',
        'Maintain 20cm × 15cm spacing during transplantation to allow wind circulation across the paddy canopy.',
      ],
      spreadRisk: 'High airborne conidia spread within 48 hours when night humidity exceeds 88% and temperatures sit between 22°C–28°C.',
      estimatedYieldImpact: '25% – 40% grain filling loss if untreated before panicle initiation.',
    },
    {
      id: 'rice-blb',
      cropId: 'rice',
      cropName: 'Paddy (Rice)',
      diseaseName: 'Bacterial Leaf Blight (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      localNames: {
        hi: 'जीवाणु पत्ती झुलसा (BLB)',
        ta: 'பாக்டீரியா இலைக்கருகல் நோய்',
        te: 'బాక్టీరియా ఆకు ఎండు తెగులు',
      },
      confidence: 92.8,
      severity: 'Moderate',
      affectedAreaPercent: 21,
      symptoms: [
        'Water-soaked yellowish stripes starting near leaf tips and wavy margins.',
        'Milky or opaque amber bacterial ooze droplets visible on leaf surfaces in early morning dew.',
        'Leaves dry up prematurely turning straw-colored from tip downward (Kresek wilting in seedlings).',
      ],
      recommendedActions: [
        'Avoid field-to-field irrigation flow from infected plots to healthy plots.',
        'Withhold heavy nitrogen applications and avoid clipping seedling tips during transplanting.',
      ],
      organicRemedies: [
        'Spray fresh cow dung supernatant extract (20g dissolved & filtered per liter) to encourage antagonistic phylloplane microbes.',
        'Apply Neem seed kernel extract (NSKE 5%) with natural soap sticker.',
      ],
      chemicalControl: [
        'Foliar spray of Copper Hydroxide 77% WP @ 2.0g per liter of water.',
      ],
      preventionTips: [
        'Grow resistant cultivars like Improved Samba Mahsuri (RP Bio-226) or Ajay.',
        'Plough stubbles and infected straw deep into soil immediately after harvest.',
      ],
      spreadRisk: 'Spreads rapidly via rain splash, strong monsoon winds, and shared irrigation channels.',
      estimatedYieldImpact: '15% – 30% reduction in 1000-grain weight.',
    },
  ],
  tomato: [
    {
      id: 'tomato-early-blight',
      cropId: 'tomato',
      cropName: 'Tomato',
      diseaseName: 'Alternaria Early Blight',
      scientificName: 'Alternaria solani',
      localNames: {
        hi: 'टमाटर का अगेती झुलसा (Early Blight)',
        ta: 'தக்காளி முன்பருவ இலைக்கருகல் நோய்',
        te: 'టమాటా ఆకు మచ్చ తెగులు',
        kn: 'ಟೊಮೆಟೊ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ',
        mr: 'टोमॅटोवरील लवकर येणारा करपा',
      },
      confidence: 95.1,
      severity: 'Moderate',
      affectedAreaPercent: 28,
      symptoms: [
        'Concentric target-like dark brown rings ("bull’s-eye" pattern) appearing first on older lower leaves.',
        'Pronounced bright yellow chlorotic tissue surrounding dark necrotic spots.',
        'Sunken dark cankers on main stems and collar region near fruit calyx attachment.',
      ],
      recommendedActions: [
        'Prune and remove infected bottom leaves up to 20 cm above soil line; burn or bury outside the field.',
        'Switch from overhead sprinkler watering to root-zone drip irrigation to keep foliage dry.',
        'Stake plants vertically on bamboo/trellis wires to prevent soil splash onto lower canopy.',
      ],
      organicRemedies: [
        'Spray Trichoderma harzianum bio-fungicide @ 5g per liter every 10 days.',
        'Apply Panchagavya 3% foliar spray combined with garlic-chilli botanical extract.',
      ],
      chemicalControl: [
        'Spray Mancozeb 75% WP @ 2.5g per liter or Azoxystrobin 23% SC @ 1.0ml per liter of water.',
      ],
      preventionTips: [
        'Practice strict 2-year crop rotation with non-solanaceous crops (avoid planting after potato, brinjal, or chilli).',
        'Apply black silver plastic mulch or dry paddy straw mulch over raised beds to block soil-borne spores.',
      ],
      spreadRisk: 'Moderate to High during warm days (26°C–30°C) alternating with heavy morning dew.',
      estimatedYieldImpact: '20% – 35% fruit sunscald and premature fruit drop.',
    },
  ],
  wheat: [
    {
      id: 'wheat-healthy',
      cropId: 'wheat',
      cropName: 'Wheat',
      diseaseName: 'Healthy Vigorous Canopy (No Pathogen Detected)',
      scientificName: 'Triticum aestivum — Optimal Chlorophyll Index',
      localNames: {
        hi: 'स्वस्थ गेहूँ की फसल (रोग मुक्त)',
        ta: 'ஆரோக்கியமான கோதுமை பயிர்',
        te: 'ఆరోగ్యకరమైన గోధుม పంట',
        kn: 'ಆರೋಗ್ಯಕರ ಗೋಧಿ ಬೆಳೆ',
        mr: 'निरोगी गहू पीक',
        bn: 'সুস্থ গম ফসল',
      },
      confidence: 98.2,
      severity: 'Healthy',
      affectedAreaPercent: 0,
      symptoms: [
        'Uniform deep emerald-green leaf lamina with intact waxy cuticle.',
        'Zero urediniospore pustules (no Yellow Stripe Rust or Brown Leaf Rust observed).',
        'Active turgor pressure and clean parallel venation indicating balanced nitrogen-potassium uptake.',
      ],
      recommendedActions: [
        'Maintain scheduled Crown Root Initiation (CRI) or flowering stage irrigation without waterlogging.',
        'Continue weekly scout walks along field borders under morning sunlight to watch for aphid colonies.',
      ],
      organicRemedies: [
        'Optional foliar nutrition boost with Jeevamrutham (10% filtered solution) to sustain soil microbiome vitality.',
      ],
      chemicalControl: [
        'No fungicide or pesticide spray required. Saving input cost of ₹1,400/acre.',
      ],
      preventionTips: [
        'Avoid excessive late-season nitrogen fertilizer which makes flag leaves succulent to rust spores.',
        'Keep bunds clear of grassy weeds that act as alternate hosts for rust fungi.',
      ],
      spreadRisk: 'Minimal risk under current dry daytime breeze and cool night temperatures.',
      estimatedYieldImpact: 'Optimal projected harvest (18–22 quintals/acre potential).',
    },
    {
      id: 'wheat-yellow-rust',
      cropId: 'wheat',
      cropName: 'Wheat',
      diseaseName: 'Wheat Yellow Stripe Rust',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      localNames: {
        hi: 'गेहूँ का पीला रतुआ (Yellow Rust)',
        ta: 'கோதுமை மஞ்சள் துரு நோய்',
      },
      confidence: 94.6,
      severity: 'High',
      affectedAreaPercent: 39,
      symptoms: [
        'Parallel rows of bright yellow-to-orange pustules running lengthwise along leaf veins like sewing stitches.',
        'Yellow powdery spores rub off easily onto fingers or white cloth when touched.',
        'Upper flag leaf drying prematurely, halting grain starch accumulation.',
      ],
      recommendedActions: [
        'Isolate initial yellow patches immediately; scout downwind plots within 500 meters.',
        'Do not walk through infected wet patches and then into healthy plots as clothing carries spores.',
      ],
      organicRemedies: [
        'Sour buttermilk + copper vessel water spray (500ml buttermilk in 10L water) to slow initial spore germination.',
      ],
      chemicalControl: [
        'Spray Propiconazole 25% EC @ 1.0 ml per liter of water (200ml in 200L water per acre) immediately upon first appearance.',
      ],
      preventionTips: [
        'Sow rust-resistant varieties recommended by ICAR-IIWBR such as DBW 187 (Karan Vandana), DBW 303, or HD 3226.',
      ],
      spreadRisk: 'Extreme wind-borne long-distance transmission during cool (10°C–18°C), cloudy winter spells.',
      estimatedYieldImpact: '30% – 50% shriveled grain loss if flag leaf is compromised.',
    },
  ],
  potato: [
    {
      id: 'potato-late-blight',
      cropId: 'potato',
      cropName: 'Potato',
      diseaseName: 'Phytophthora Late Blight',
      scientificName: 'Phytophthora infestans',
      localNames: {
        hi: 'आलू का पछेती झुलसा (Late Blight)',
        ta: 'உருளைக்கிழங்கு பின்பருவ கருகல் நோய்',
        bn: 'আলুর নাবি ধসা রোগ (Late Blight)',
      },
      confidence: 97.1,
      severity: 'High',
      affectedAreaPercent: 42,
      symptoms: [
        'Irregular water-soaked dark green to black lesions at leaf tips and margins.',
        'White cottony fungal mycelial growth visible on the underside of leaves during cool, foggy mornings.',
        'Characteristic musty, decaying plant odor across the field plot.',
      ],
      recommendedActions: [
        'Stop light frequent irrigations during foggy/cloudy days immediately.',
        'Earth up soil ridges tightly around potato tubers so spores washed down from leaves cannot infect underground tubers.',
      ],
      organicRemedies: [
        'Preventive foliar application of Trichoderma viride @ 5g/L + Pseudomonas fluorescens @ 5g/L.',
      ],
      chemicalControl: [
        'Prophylactic spray of Mancozeb 75% WP @ 2.5g/L; for active lesions, apply Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L.',
      ],
      preventionTips: [
        'Plant certified disease-free seed tubers from cold storage; Kufri Jyoti or Kufri Himalini.',
        'Dehaulm (cut above-ground vines) 10–12 days before digging tubers so skin hardens.',
      ],
      spreadRisk: 'Critical outbreak speed — can defoliate an entire acre within 5–7 days of foggy weather.',
      estimatedYieldImpact: 'Up to 60% tuber rot in field and post-harvest storage.',
    },
  ],
  cotton: [
    {
      id: 'cotton-leaf-curl',
      cropId: 'cotton',
      cropName: 'Cotton',
      diseaseName: 'Cotton Leaf Curl Virus (CLCuD)',
      scientificName: 'Begomovirus (Whitefly Transmitted)',
      localNames: {
        hi: 'कपास का पत्ती मरोड़ रोग (Leaf Curl)',
        ta: 'பருத்தி இலை சுருட்டு வைரஸ்',
        te: 'పత్తి ఆకు ముడత వైరస్',
        mr: 'कापसावरील बोकड्या / पर्णगुच्छ रोग',
      },
      confidence: 93.5,
      severity: 'High',
      affectedAreaPercent: 31,
      symptoms: [
        'Upward or downward cupping and crinkling of young apical leaves.',
        'Dark green thickening of lower leaf veins with small leaf-like outgrowths (enations) underneath.',
        'Stunted internodes with twisted petioles and drastically reduced boll setting.',
      ],
      recommendedActions: [
        'Install 12–15 Yellow Sticky Traps per acre at 15 cm above crop canopy height to trap Bemisia tabaci whitefly vectors.',
        'Uproot and destroy severely stunted early-infected plants to remove virus reservoirs.',
      ],
      organicRemedies: [
        'Spray Neem Oil 1500 ppm @ 5 ml/liter + 1g Khadi soap emulsifier covering the underside of leaves.',
        'Foliar spray of Verticillium lecanii entomopathogenic fungus @ 5g/liter in evening hours.',
      ],
      chemicalControl: [
        'If whitefly count exceeds Economic Threshold Level (6 adults/leaf), apply Flonicamid 50% WG @ 0.4g/liter.',
      ],
      preventionTips: [
        'Eliminate weed hosts like Kanghi Buti (Abutilon) and Peeli Buti along irrigation channels before sowing.',
        'Grow barrier rows of 2 lines of Pearl Millet (Bajra) or Maize around the cotton field perimeter.',
      ],
      spreadRisk: 'Vector-driven transmission by Whitefly (Bemisia tabaci) during hot, dry spells.',
      estimatedYieldImpact: '25% – 45% reduction in harvestable lint bolls.',
    },
  ],
  sugarcane: [
    {
      id: 'sugarcane-red-rot',
      cropId: 'sugarcane',
      cropName: 'Sugarcane',
      diseaseName: 'Sugarcane Red Rot ("Cancer of Sugarcane")',
      scientificName: 'Colletotrichum falcatum',
      localNames: {
        hi: 'गन्ने का लाल सड़न रोग (Red Rot)',
        ta: 'கரும்பு செவ்வழுகல் நோய்',
        mr: 'उसावरील लाल कुजवा रोग',
      },
      confidence: 94.9,
      severity: 'High',
      affectedAreaPercent: 36,
      symptoms: [
        'Yellowing and drying of the 3rd and 4th crown leaves while central spindle initially stays green.',
        'Reddish blotches along the leaf midrib with dark perithecial dots.',
        'When cane stalk is split longitudinally, internal pith is dull red interrupted by transversely elongated white patches with a sour alcoholic smell.',
      ],
      recommendedActions: [
        'Dig out the entire affected clump along with roots immediately and burn outside the plot.',
        'Drench the vacated soil pit with Carbendazim 0.1% or Bleaching Powder solution (10g/L) before irrigation.',
      ],
      organicRemedies: [
        'Sett treatment prior to planting in Trichoderma viride suspension (10g/L) + Pseudomonas fluorescens for 30 minutes.',
      ],
      chemicalControl: [
        'Treat seed setts with Thiophanate Methyl 70% WP @ 1.5g/liter prior to trench planting (foliar sprays cannot cure internal stalk rot).',
      ],
      preventionTips: [
        'Discourage ratooning of any field where Red Rot incidence exceeded 5%.',
        'Adopt Moist Hot Air Treatment (MHAT) at 54°C for 2.5 hours for nursery seed cane.',
      ],
      spreadRisk: 'High spread through irrigation water carrying conidia from rotting stubbles.',
      estimatedYieldImpact: '35% – 70% cane weight loss and sucrose inversion.',
    },
  ],
  chilli: [
    {
      id: 'chilli-anthracnose',
      cropId: 'chilli',
      cropName: 'Guntur Chilli',
      diseaseName: 'Die-Back & Fruit Rot (Anthracnose)',
      scientificName: 'Colletotrichum capsici',
      localNames: {
        hi: 'मिर्च का श्यामवर्ण / फल सड़न रोग',
        ta: 'மிளகாய் பழ அழுகல் மற்றும் நுனி கருகல்',
        te: 'మిరప కాయ కుళ్ళు తెగులు (Die-back)',
      },
      confidence: 93.8,
      severity: 'Moderate',
      affectedAreaPercent: 24,
      symptoms: [
        'Necrosis and progressive drying of tender twigs from tip downward (Die-back).',
        'Circular sunken lesions on ripening red pods with concentric black dot rings (acervuli).',
        'Infected pods turn straw-white and drop prematurely, losing market grade.',
      ],
      recommendedActions: [
        'Prune dead apical branches 2 inches below the necrotic line and apply Bordeaux paste on cut ends.',
        'Harvest ripe pods promptly and sort out blemished fruits before sun-drying on tarpaulins.',
      ],
      organicRemedies: [
        'Foliar spray of Pseudomonas fluorescens @ 10g/L at flowering and fruit set stages.',
      ],
      chemicalControl: [
        'Spray Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.5g per liter of water.',
      ],
      preventionTips: [
        'Collect seeds only from spotless healthy mother pods and treat with Trichoderma viride.',
      ],
      spreadRisk: 'Moderate-High during post-monsoon dew and unseasonal rain showers.',
      estimatedYieldImpact: '20% – 35% market value reduction due to pod discoloration.',
    },
  ],
  groundnut: [
    {
      id: 'groundnut-tikka',
      cropId: 'groundnut',
      cropName: 'Groundnut',
      diseaseName: 'Tikka Leaf Spot (Early & Late)',
      scientificName: 'Cercospora arachidicola & Phaeoisariopsis personata',
      localNames: {
        hi: 'मूंगफली का टिक्का रोग (Tikka Disease)',
        ta: 'நிலக்கடலை இலைப்புள்ளி நோய் (Tikka)',
        te: 'వేరుశనగ తిక్కा ఆకుమచ్చ తెగులు',
        kn: 'ಶೇಂಗಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (Tikka)',
      },
      confidence: 95.7,
      severity: 'Moderate',
      affectedAreaPercent: 26,
      symptoms: [
        'Circular dark brown to black spots (1–6 mm) on both upper and lower leaflet surfaces.',
        'Early leaf spots feature a distinct bright yellow halo on upper leaf surface; late spots are velvety black underneath.',
        'Severe defoliation leaving bare stems before pod maturity.',
      ],
      recommendedActions: [
        'Apply Gypsum @ 200 kg/acre at pegging stage (40–45 DAS) to boost calcium shell strength and plant immunity.',
        'Remove volunteer groundnut plants and crop debris from field bunds.',
      ],
      organicRemedies: [
        'Spray Neem Oil 3% or Aqueous leaf extract of Prosopis juliflora (5%) at 30 and 45 days after sowing.',
      ],
      chemicalControl: [
        'Spray Hexaconazole 5% EC @ 2.0 ml per liter or Chlorothalonil 75% WP @ 2.0g per liter.',
      ],
      preventionTips: [
        'Intercrop Groundnut with Pigeonpea (Red Gram) or Pearl Millet in a 6:1 ratio to act as a wind barrier against spores.',
      ],
      spreadRisk: 'High at 35–60 days after sowing when relative humidity stays above 80%.',
      estimatedYieldImpact: '20% – 40% reduction in kernel shelling percentage.',
    },
  ],
};

export const INITIAL_SCAN_HISTORY: ScanRecord[] = [
  {
    id: 'SCAN-9042',
    timestamp: '2026-10-08 06:45 AM',
    cropId: 'rice',
    cropName: 'Paddy (Rice)',
    imageUrl: riceBlastImg,
    fieldPlot: 'Plot A1 — East Canal Paddy (Thanjavur)',
    prediction: DISEASE_DATABASE.rice[0],
    notes: 'Observed near the southern bund where shade from neem trees holds morning dew.',
  },
  {
    id: 'SCAN-9039',
    timestamp: '2026-10-06 05:15 PM',
    cropId: 'wheat',
    cropName: 'Wheat',
    imageUrl: healthyWheatImg,
    fieldPlot: 'Plot B2 — Tube-Well Upland (Karnal)',
    prediction: DISEASE_DATABASE.wheat[0],
    notes: '35 days after sowing. Canopy is uniform emerald green.',
  },
  {
    id: 'SCAN-9031',
    timestamp: '2026-10-03 08:20 AM',
    cropId: 'tomato',
    cropName: 'Tomato',
    imageUrl: riceBlastImg,
    fieldPlot: 'Plot C4 — Drip Polyhouse Block (Nashik)',
    prediction: DISEASE_DATABASE.tomato[0],
    notes: 'Lower leaves pruned and Trichoderma bio-spray completed.',
  },
];

export const INITIAL_FARMING_TASKS: FarmingTask[] = [
  {
    id: 'TASK-101',
    title: 'Drain excess standing water by 5cm & pause Urea top-dressing',
    crop: 'Paddy (Plot A1)',
    dueTime: 'Today · Before 11:00 AM',
    priority: 'Urgent',
    completed: false,
    plotName: 'Plot A1 — East Canal',
  },
  {
    id: 'TASK-102',
    title: 'Prepare Pseudomonas fluorescens bio-spray (10g/L) for evening application',
    crop: 'Paddy (Plot A1)',
    dueTime: 'Today · 04:30 PM',
    priority: 'Urgent',
    completed: false,
    plotName: 'Plot A1 — East Canal',
  },
  {
    id: 'TASK-103',
    title: 'Inspect 12 Yellow Sticky Traps along southern boundary for Whitefly count',
    crop: 'Cotton (Plot D1)',
    dueTime: 'Tomorrow · 07:30 AM',
    priority: 'Preventive',
    completed: true,
    plotName: 'Plot D1 — Black Soil Block',
  },
  {
    id: 'TASK-104',
    title: 'Prune lower 15cm senescent leaves to prevent soil splash on fruit clusters',
    crop: 'Tomato (Plot C4)',
    dueTime: 'Oct 10 · 08:00 AM',
    priority: 'Routine',
    completed: false,
    plotName: 'Plot C4 — Drip Block',
  },
];

export const WEATHER_ALERTS: WeatherAlert[] = [
  {
    id: 'W-ALERT-01',
    district: 'Thanjavur & Cauvery Delta',
    state: 'Tamil Nadu',
    title: 'High Nocturnal Humidity (91%) — Rice Blast Spore Germination Window',
    severity: 'High',
    validUntil: 'Oct 11, 2026 · 06:00 PM',
    description: 'Overcast skies with morning dew persistence until 09:30 AM and night temperatures of 24°C create peak conidia infection pressure for Magnaporthe oryzae.',
    cropImpact: 'Paddy at tillering to panicle initiation stages is highly vulnerable to leaf and neck blast.',
    actionRequired: 'Avoid foliar chemical sprays between 10:00 AM – 03:00 PM due to expected afternoon drizzle. Apply bio-control or systemic fungicide with sticker after 04:00 PM.',
  },
  {
    id: 'W-ALERT-02',
    district: 'Nashik & Pune Belt',
    state: 'Maharashtra',
    title: 'Unseasonal Afternoon Thundershowers & Soil Splash Risk',
    severity: 'Moderate',
    validUntil: 'Oct 10, 2026 · 08:00 PM',
    description: '18–25 mm localized rainfall forecast with gusty winds up to 28 km/h.',
    cropImpact: 'Tomato, Chilli, and Onion plots face Alternaria early blight and bacterial spot spread via rain-splash.',
    actionRequired: 'Ensure drainage channels between raised beds are cleared before evening to prevent collar rot waterlogging.',
  },
  {
    id: 'W-ALERT-03',
    district: 'Karnal, Ludhiana & Western UP',
    state: 'Haryana / Punjab / UP',
    title: 'Favorable Cool Dry Breeze — Optimal Spray & Sowing Window',
    severity: 'Advisory',
    validUntil: 'Oct 13, 2026 · 12:00 PM',
    description: 'Clear skies, daytime 29°C, night 17°C, relative humidity 54%, wind speed 9 km/h NW.',
    cropImpact: 'Ideal soil moisture and thermal window for Rabi field preparation, mustard sowing, and basal soil enrichment.',
    actionRequired: 'Incorporate Trichoderma-enriched farmyard manure (FYM) during final rotavator pass.',
  },
];

export const KVK_EXPERTS: ExpertCenter[] = [
  {
    id: 'EXP-01',
    name: 'Dr. S. Muthukumar, Ph.D.',
    role: 'Senior Scientist & Head (Plant Pathology)',
    institution: 'ICAR — Krishi Vigyan Kendra, Thanjavur (TNAU)',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    languages: ['Tamil', 'English'],
    specialization: 'Paddy Blast, Bacterial Blight & Integrated Bio-Control',
    phone: '1800-180-1551 (Ext 402)',
    availability: 'Available Today · 09:00 AM – 05:30 PM',
  },
  {
    id: 'EXP-02',
    name: 'Dr. Anjali Deshmukh',
    role: 'Subject Matter Specialist (Horticulture & Crop Protection)',
    institution: 'Krishi Vigyan Kendra, Baramati / Nashik Division (MPKV)',
    district: 'Nashik / Pune',
    state: 'Maharashtra',
    languages: ['Marathi', 'Hindi', 'English'],
    specialization: 'Tomato Early/Late Blight, Chilli Anthracnose & Drip Fertigation',
    phone: '1800-180-1551 (Ext 218)',
    availability: 'Available Today · 09:30 AM – 06:00 PM',
  },
  {
    id: 'EXP-03',
    name: 'Dr. Rajeev Sharma',
    role: 'Principal Agronomist (Cereals & Rust Surveillance)',
    institution: 'ICAR-IARI Regional KVK Outreach Center, Karnal',
    district: 'Karnal',
    state: 'Haryana / North India',
    languages: ['Hindi', 'Punjabi', 'English'],
    specialization: 'Wheat Rusts, Potato Late Blight & Soil Health Card Advisory',
    phone: '1800-180-1551 (Ext 109)',
    availability: 'Available Today · 08:30 AM – 05:00 PM',
  },
  {
    id: 'EXP-04',
    name: 'Dr. K. Venkata Rao',
    role: 'Entomology & Viral Vector Specialist',
    institution: 'ANGRAU Krishi Vigyan Kendra, Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh & Telangana',
    languages: ['Telugu', 'English', 'Kannada'],
    specialization: 'Cotton Whitefly Vector, Chilli Thrips & Viral Leaf Curl Management',
    phone: '1800-180-1551 (Ext 315)',
    availability: 'Available Today · 09:00 AM – 05:00 PM',
  },
];
