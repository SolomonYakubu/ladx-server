import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from "dotenv";
import type { Content } from "@google/generative-ai";

dotenv.config();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string = process.env.GOOGLE_API_KEY!;

export default async function runChat(message: string, history: Content[]) {
  try {
    
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `\n\nYour name is City Explorer. Greet the user and introduce yourself, ask how you can be of help to them. \n\nBased on the users question, you are to recommend to them what they want based on the list of \n\nrestaurants in Abuja strictly from the json data below by their location, menu, type of cuisine, price rates and open hours and days. Use the following JSON data to make decisions and stay within context. For a particular question, give atleast 3 recommendations if possible \n\n [
  {
    "Restaurants": "LOMO Coffee and Restaurant",
    "Address": "Lomo coffee and restaurant - 107 Ebitu Ukiwe St, Jabi, Abuja 240102, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating/Cozy",
    "Price range": "Mid range-Upscale",
    "Cuisine": "Italian/FRench/Mexican",
    "Contact": "0708 322 2212"
  },
  {
    "Restaurants": "Mai’s Food and Grills",
    "Address": "Mia’s food and grill - 5A Igbeti Rock St, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "African/Mexican/Asian",
    "Price range": "Upscale",
    "Contact": "0803 984 3550"
  },
  {
    "Restaurants": "Mambaah Café | Creative Hub Maitama",
    "Address": "Mamabah cafe -  Maitama Amusement Park, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Cafe/bistro",
    "Cuisine": "Nigerian",
    "Price range": "Mid range",
    "Contact": "0704 446 4466"
  },
  {
    "Restaurants": "Mandi Place & restaurant",
    "Address": "Mandi place -  3FFG+F6F, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Indian/Nigerian",
    "Price range": "Mid-range",
    "Contact": "0905 555 0887"
  },
  {
    "Restaurants": "Mao Street Chinese Restaurant",
    "Address": "93 Aminu Kano Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid-range",
    "Contact": "0811 280 5805"
  },
  {
    "Restaurants": "Marcoriano Chinese Restaurant",
    "Address": "Macariano restaurant. -  33 Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Chinese/Mexican/Nigerian",
    "Price range": "Mid-range",
    "Contact": "0816 144 4002"
  },
  {
    "Restaurants": "Masala Wahala",
    "Address": "Masala wahala - First Floor, Ceddi Plaza, Central Business Dis, Abuja 905102, Federal Capital Territory",
    "Dining Experience": "Outdor Seating",
    "Price range": "Mid-range",
    "Contact": "0904 939 6826",
    "Cuisine": "African/Indian/Sea food"
  },
  {
    "Restaurants": "MAUBBYS EXPRESS MAITAMA",
    "Address": "Maubby’s restaurant - 5a Bangui St, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Salads",
    "Price range": "Mid-range",
    "Contact": "0809 999 6230"
  },
  {
    "Restaurants": "Meraki Restaurant and Lounge",
    "Address": "Meraki restaurant - 3349 Lualaba Close, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dinning",
    "Cuisine": "Mexican/Italian/Asian",
    "Price range": "Mid range-Upscale",
    "Contact": "0818 033 3300"
  },
  {
    "Restaurants": "Metrocafe & Grill",
    "Address": "Metro cafe and grill - 43 Libreville Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "African/Chinese/Indian",
    "Price range": "Mid-range",
    "Contact": "0810 155 1166"
  },
  {
    "Restaurants": "Miso Japanese and Thai Restaurant",
    "Address": "Miso Japanese Thai restaurant - Summerset Continental Hotel, Rooftop, 34 Usuma St, Maitama, Abuja 900001, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Ethnic DininglRooftop",
    "Cuisine": "Thai/Japanese/Asian",
    "Price range": "Mid range",
    "Contact": "0702 523 6666"
  },
  {
    "Restaurants": "MU ZI EXPRESS/CUISINE",
    "Address": "Mu Zi express - DRIP MALL, Aminu Kano Cres, opposite Beer Barn, Municipal, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0808 888 8063"
  },
  {
    "Restaurants": "Nengi’s Place",
    "Address": "Nengi’s place - 794 N Okonjo-Iweala Wy, Utako, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid range",
    "Contact": "0908 799 9975/081522 22942"
  },
  {
    "Restaurants": "New Emperor Chinese Cuisine",
    "Address": "New emperor - 5A Parakou crescent, Off Aminu Kano Cres, Wuse 2, Abuja, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0803 701 1097"
  },
  {
    "Restaurants": "New Yorker Wuse",
    "Address": "Na Yorker - 2787 Shehu Shagari Wy, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor Seating",
    "Cuisine": "Mexican/Italian/Asian",
    "Price range": "Mid range-Upscale",
    "Contact": "0704 662 0000"
  },
  {
    "Restaurants": "Newton's Restaurant and Bar",
    "Address": "Newton restaurant - 27a Pope John Paul Street, off Gana St, Maitama, Abuja",
    "Dining Experience": "Fine-Casual Dining",
    "Cuisine": "African/Italian/Nigerian",
    "Price range": "Mid range-Upscale",
    "Contact": "0815 555 5786"
  },
  {
    "Restaurants": "Niger Delta",
    "Address": "Ann’s restaurant - 36 Gana St, Maitama, Abuja 900001, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local\nDining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range",
    "Contact": "8140950141"
  },
  {
    "Restaurants": "Nkoyo",
    "Address": "City Park, 131A Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital TerritoryNkoyo - Ceddi Plaza, 264 Tafawa Balewa Rd, Central Area, Abuja 900211, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Nigerian/Chinses/Indian",
    "Price range": "Mid range-Upscale",
    "Contact": "09 291 4918"
  },
  {
    "Restaurants": "Apple Boulevard",
    "Address": "Apple boulevard - 130 Aminu Kano Cres, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "Italian/Nigerian",
    "Price range": "Mid-range"
  },
  {
    "Restaurants": "Argungu",
    "Address": "Argungu restaurant - Jabi Waterfront, Jabi Lake Mall, Bala Sokoto Wy, Abuja",
    "Dining Experience": "Casual Dinning /Ouddor SEating/Cozy Spot/Wterfont VIEW",
    "Cuisine": "African/NIgerian/Seafoood",
    "Price range": "Mid-range",
    "Contact": "0811 055 1795"
  },
  {
    "Restaurants": "Arirang Chinese Restaurant",
    "Address": "Arirang restaurant - 4 Sankuru Cl, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid range",
    "Contact": "0703 065 4261"
  },
  {
    "Restaurants": "Assorted Foods",
    "Address": "Assorted foods - Plot 136 Aminu Kano Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range"
  },
  {
    "Restaurants": "Atrium Restaurant",
    "Address": "Atrium restaurant - Nigeria, Abuja, No 32Alibro Atrium PlazaA, A.E. Ekukinam St, Abuja",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Mexican/Italian/Asian",
    "Price range": "Mid range-Upscale",
    "Contact": "0817 228 8888"
  },
  {
    "Restaurants": "Aura abuja",
    "Address": "Aura restaurant - The lakesqure plaza, plot 466 Alex Ekwueme Way, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "Italian/American/Mexican",
    "Price range": "Upscale",
    "Contact": "0810 931 9393"
  },
  {
    "Restaurants": "B2B Restaurant",
    "Address": "B2B restaurant - 4 Cape Town, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "North African/Mediterranean",
    "Price range": "Mid range-Upscale"
  },
  {
    "Restaurants": "Bariga Restaurant/Amala Joint",
    "Address": "Bariga restaurant - Airport junction, 3 ICS Dr, magajipe village, Abuja 900211, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0803 786 6389"
  },
  {
    "Restaurants": "Basilico restaurant",
    "Address": "Basilica restaurant - 109 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "European/Continental",
    "Price range": "Upscale",
    "Contact": "0903 012 4031"
  },
  {
    "Restaurants": "BBQ Corner",
    "Address": "BBQ corner - 31b Limpopo St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Barbecue/Grll",
    "Price range": "Mid-range",
    "Contact": "0809 877 8899"
  },
  {
    "Restaurants": "Belleti's Cuisine",
    "Address": "Belleti’s cuisine - 28 Agadez Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Mid-range",
    "Contact": "08032116846"
  },
  {
    "Restaurants": "Bijou Cafe, Restaurant & Spa",
    "Address": "Bijou Café and spa - No 40 Agadez Crescent, Off Aminu Kano Cres, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Italian/Nigerian/Asian",
    "Price range": "Mid-range",
    "Contact": "0805 234 5832"
  },
  {
    "Restaurants": "Biobak Kitchen, Wuse",
    "Address": "Bibak restaurant - Gudu, Abuja 900110, Federal Capital Territory",
    "Dining Experience": "Casual Dining/family Friendly",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0813 708 9132"
  },
  {
    "Restaurants": "Blu cabana",
    "Address": "Blue cabana - 1322 Shehu Yar'adua Wy, Mabushi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Oudoor Seating/Lounge",
    "Cuisine": "Mexican/Italian/Nigerian",
    "Price range": "Mid range-Upscale",
    "Contact": "0810 090 0000"
  },
  {
    "Restaurants": "Bocados Quick Eats Abuja",
    "Address": "Bocados quick eats - 41 Kumasi Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0708 476 8369"
  },
  {
    "Restaurants": "Breeze Restaurant",
    "Address": "Breeze restaurant - 3 Eldoret Street, off Aminu Kano Crescent, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating/Family friendly",
    "Cuisine": "Nigerian/Continental",
    "Price range": "Mid-range",
    "Contact": "0704 704 4915"
  },
  {
    "Restaurants": "BrookLounge Restaurant",
    "Address": "Brooklounge restaurant - Business District, Tropic Galleria, Plot 269 Mohammadu Buhari Way, beside GrandSquare, opposite Fraser suites, AMAC, Central 900101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "Italian/American/Nigerian",
    "Price range": "Upscale",
    "Contact": "0813 841 6949"
  },
  {
    "Restaurants": "Bukkateen Restaurant",
    "Address": "Bukateen restaurant - Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Price range": "Mid-range"
  },
  {
    "Restaurants": "Butter Restaurant & Lounge",
    "Address": "Butter restaurant and lounge - 4 Kampala St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0817 206 3356"
  },
  {
    "Restaurants": "Caesars Restaurant",
    "Address": "Ceaser restaurant - No 28 Agadez Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Continenetal",
    "Price range": "Mid-range",
    "Contact": "0901 211 9592"
  },
  {
    "Restaurants": "Café de vie",
    "Address": "Café de vie - 12 Amazon St, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Cafe/Bistro"
  },
  {
    "Restaurants": "CALABAR AROMA RESTAURANT",
    "Address": "Calabar Aroma restaurant - 6 Fez St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dinning /Ethnic Dining/Local food",
    "Cuisine": "Nigerian",
    "Price range": "Mid range-Upscale",
    "Contact": "0909 720 3202"
  },
  {
    "Restaurants": "Cantina Restaurant",
    "Address": "Cantina restaurant - 30 Yedseram St, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Casual Dinning/Oudoor seating",
    "Cuisine": "Italian/French/American",
    "Price range": "Mid range-Upscale",
    "Contact": "0706 400 0970"
  },
  {
    "Restaurants": "Carrots Food and Bites",
    "Address": "Carrots food and bites  -  51 Agadez Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "Fast food/Nigerian",
    "Price range": "Mid-range",
    "Contact": "0901 644 9819"
  },
  {
    "Restaurants": "Casa Mexicana The Restaurant",
    "Address": "Casa mexicana - 264 Tafawa Balewa Rd, Central Business District, Abuja 901002, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Mexican",
    "Price range": "Mid range-Upscale",
    "Contact": "0817 633 3111"
  },
  {
    "Restaurants": "Cave Restaurant",
    "Address": "Cave restaurant - Number 2 Kinda street, Wuse 2 900288, Abuja, Abuja 900288",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "African/Turkish/Middle Eastern",
    "Price range": "Upscale",
    "Contact": "0816 716 3006"
  },
  {
    "Restaurants": "Charcoal grill",
    "Address": "Charcoal grill - Penthouse (KFC Building, 112 Aminu Kano Cres, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining/Outdoor Sittting",
    "Cuisine": "French/Italian/Mexican",
    "Price range": "Mid-range",
    "Contact": "0811 131 1177"
  },
  {
    "Restaurants": "Chi Thai Revolution Restaurant",
    "Address": "Chi Thai revolution restaurant - 15 Rhine St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dinning",
    "Cuisine": "Chinese/Indonesian/Thai",
    "Price range": "Mid range",
    "Contact": "0811 828 8865"
  },
  {
    "Restaurants": "CHICKEN CAPITOL",
    "Address": "Chicken capitol - 4 Lingu Cres, off Aminu Kano Crescent, behind Hyde filling station, Wuse II, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Fast food",
    "Cuisine": "Nigerian",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0816 222 3000"
  },
  {
    "Restaurants": "Chikenza",
    "Address": "Chickenza - 12 Sakono St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "Italian/Nigerian/Mediterranea n",
    "Price range": "Mid-range",
    "Contact": "0915 587 8891"
  },
  {
    "Restaurants": "Chopped bistro Restaurant",
    "Address": "Chopped bistro - 170 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating/Cozy atmosphere",
    "Cuisine": "Nigerian/Intercontinental",
    "Price range": "Mid-range",
    "Contact": "0905 437 4363"
  },
  {
    "Restaurants": "Chopsticks & Caesar's",
    "Address": "Chopsticks and ceasers - 52 Mississippi St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Romantic Dining/Casual Dining",
    "Cuisine": "Chinese/Mexican/Italian",
    "Price range": "Mid-range",
    "Contact": "0806 577 7770"
  },
  {
    "Restaurants": "Ciao Italia Restaurant",
    "Address": "Ciao Italia - Central Park, Wuse, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining",
    "Cuisine": "Italian",
    "Price range": "Mid range-Upscale",
    "Contact": "0704 700 2426"
  },
  {
    "Restaurants": "Cilantro Abuja",
    "Address": "Cilantro - Ibrahim Babangida Blvd, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/Outdoor seating",
    "Cuisine": "Indian/Mexican/Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0818 234 5670"
  },
  {
    "Restaurants": "Citro Abuja",
    "Address": "Citro - 4 Durban St, Wuse 2, Abuja 900001, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "African/Italian/American",
    "Price range": "Mid range-Upscale",
    "Contact": "0916 155 5561"
  },
  {
    "Restaurants": "City view",
    "Address": "City view - 7 Cape Town, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Oudoor Seating/Lounge",
    "Cuisine": "Lebanese/Middle eastern/European",
    "Price range": "Mid-range",
    "Contact": "0803 373 5383"
  },
  {
    "Restaurants": "Clubhouse Restaurant & Gym",
    "Address": "Clubhouse restaurant and gym - Tak Continental Estate, 11 Aliyu Mohammed Rd, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating/Family friendly",
    "Cuisine": "African/Indian/European",
    "Price range": "Mid range-Upscale",
    "Contact": "0807 704 0404"
  },
  {
    "Restaurants": "COCO LOCO RESTAURANT ABUJA",
    "Address": "Coco loco Restaurant - Lifecamp, Abubakar Koko Ave, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African/Mexican/Asian",
    "Price range": "Mid-range",
    "Contact": "0816 716 3006"
  },
  {
    "Restaurants": "Country place restaurant & lounge",
    "Address": "Country place restaurant - 23 Colorado St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African",
    "Price range": "Mid-range",
    "Contact": "0816 246 9332"
  },
  {
    "Restaurants": "Crossover",
    "Address": "Cross over - 3 Cairo Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Mexican/Italian",
    "Price range": "Mid range"
  },
  {
    "Restaurants": "Cupid Eateries Plus",
    "Address": "Cupid eateries - Suite A9 Maitama Shopping Complex, Off Limpopo St, Abuja",
    "Contact": "09 670 8172"
  },
  {
    "Restaurants": "Curry Leaves Restaurant",
    "Address": "Curry leaves - Bangui Street, 1 Kindia Close, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Indian/Asian/Fusion",
    "Price range": "Mid-range",
    "Contact": "0809 555 5620"
  },
  {
    "Restaurants": "D' La Paz",
    "Address": "D la Paz - 114 Aminu Kano Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "American/Italian/Continental",
    "Price range": "Mid-range",
    "Contact": "0915 333 3312"
  },
  {
    "Restaurants": "De Village Restaurant",
    "Address": "De village restaurant - SOHO 24 Sports Park, Ahmadu Bello Wy, Kado, Ndawuse 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/NIgerian/Seafoood",
    "Price range": "Mid-range",
    "Contact": "0706 069 5941"
  },
  {
    "Restaurants": "District Restaurant and Lounge",
    "Address": "District restaurant - 38a Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Continenetal",
    "Price range": "Mid-range",
    "Contact": "0703 985 0834"
  },
  {
    "Restaurants": "Dolphin Restaurant & Catering Services",
    "Address": "Downtown restaurant - 38 Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African",
    "Price range": "Mid-range",
    "Contact": "0909 999 9959"
  },
  {
    "Restaurants": "Dreams Chicken and Fries",
    "Address": "Dreams chicken and fries - Plot No, 1247 Aminu Kano Cres, Wuse II, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0706 852 7242"
  },
  {
    "Restaurants": "Drumsticks",
    "Address": "Drumsticks - 11.2 km · Lagos street, off Samuel Ladoke Akintola Boulevard",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Budget friendly-Mid range"
  },
  {
    "Restaurants": "Dundu Nation Abuja",
    "Address": "Dundu nation - 4F3P+XG3 Omega Events Arena & The Porch, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "7016615476"
  },
  {
    "Restaurants": "Dunes Continental",
    "Address": "Dunes continental - 5th floor, Dunes Center, Abuja",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "African/Middle Eastern/European/Mediterranean",
    "Price range": "Upscale",
    "Contact": "0805 545 4545"
  },
  {
    "Restaurants": "Duo restaurant",
    "Address": "Duo restaurant - 98 Aminu Kano Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Nigerian/Continental",
    "Price range": "Mid range",
    "Contact": "0817 554 4444"
  },
  {
    "Restaurants": "Dupsyglo Restaurant",
    "Address": "Dupsylgo restaurant - 13 Amazon St, Maitama, Abuja 900001, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0810 771 3619"
  },
  {
    "Restaurants": "eetsumore restaurant & bakery",
    "Address": "Estumore restaurant - Suite 037 & 038 Plot 307 The Kings Plaza, Ahmadu Bello Wy, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/fast nigerian food",
    "Price range": "Mid-range",
    "Contact": "0703 115 1055"
  },
  {
    "Restaurants": "EjaNla Abuja",
    "Address": "Eja Nla restaurant - 45b, Suez Crescent, Abacha Estate Wuse Zone 4. By Sheraton back-gate, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/Fish  Restarant",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0705 416 8090"
  },
  {
    "Restaurants": "El’s Kitchen & Restaurant",
    "Address": "El’s kitchen - 24 Bujumbura St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Continenetal/Pan Asian/Italian",
    "Price range": "Mid-range",
    "Contact": "0907 155 5777"
  },
  {
    "Restaurants": "Food & Forest Restaurant",
    "Address": "Food and forest restaurant - Holborn House, Plot 648 Franca Afegbua Cresent Apo Abuja, Federal Capital Territory",
    "Dining Experience": "Casual/Cosy Atmosphere/Outdoor Seating",
    "Cuisine": "Nigerian/Continental/Chinese",
    "Price range": "Mid-range",
    "Contact": "0817 118 9999"
  },
  {
    "Restaurants": "Food Avenue",
    "Address": "Food avenue - 3 Bangui St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "09 292 2001"
  },
  {
    "Restaurants": "Food Central",
    "Address": "Food central - 135 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Indian/Italian",
    "Price range": "Mid-range",
    "Contact": "0908 777 7780"
  },
  {
    "Restaurants": "Food Club House",
    "Address": "Food club house - 15 Oyi River Street, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Contact": "0705 297 0855"
  },
  {
    "Restaurants": "Food Empire",
    "Address": "Food empire - plot 1009 morija close, off Adetokunbo Ademola Cres, Wuse 2, Abuja",
    "Dining Experience": "Fine-Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0817 298 9539"
  },
  {
    "Restaurants": "Fuschia Restaurant Abuja",
    "Address": "Fuschia restaurant - 7 Bangui St, Wuse 2, AMAC 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dinning /Ethnic Dining/Local food",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0902 000 0021"
  },
  {
    "Restaurants": "Fuschia Restaurant Abuja"
  },
  {
    "Restaurants": "Galaxy Pizza",
    "Address": "Galaxy pizza - 2 atkampe street, off Adetokunbo Ademola Cres, Wuse 2, Abuja, Federal Capital Territory",
    "Dining Experience": "Fast Food",
    "Cuisine": "Mexican/Italian/Asian/Mediterranean",
    "Price range": "Mid-range",
    "Contact": "0811 276 0422"
  },
  {
    "Restaurants": "Gamji Restaurant"
  },
  {
    "Restaurants": "Gardenia Resto by Munchkins",
    "Address": "Gardenia restaurant - Amusement Park, IBB Boulevard, Maitama, AMAC 900271, Federal Capital Territory",
    "Dining Experience": "Cozy spot/Outddoor seating",
    "Cuisine": "Indian/Italian",
    "Price range": "Mid-range",
    "Contact": "0808 844 4444"
  },
  {
    "Restaurants": "Genesis restaurant",
    "Address": "Genesis restaurant - 26 Buchanan Cres, Aminu Kano Cres, Wuse 2, Abuja 904101",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range"
  },
  {
    "Restaurants": "Glamsfresh Restaurant & Grills"
  },
  {
    "Restaurants": "Godiya Restaurant"
  },
  {
    "Restaurants": "GoldenNursh Restaurant",
    "Address": "Golden nursh restaurant - B2 Multipurpose Shopping Complex, Road 21, Kado Estate",
    "Dining Experience": "Casual Dining/Family friendly",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0803 588 3492"
  },
  {
    "Restaurants": "GOPRO RESTAURANT",
    "Address": "Go pro restaurant - 3 Lingu Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Budget Friendly",
    "Contact": "0907 171 3187"
  },
  {
    "Restaurants": "Green Chilies Restaurants",
    "Address": "Green chillies - Tatti plaza, Jabi, Gwarinpa 900108, Federal Capital Territory",
    "Contact": "0902 656 2227"
  },
  {
    "Restaurants": "Grillzhut by Derda Garden",
    "Address": "Grillzhut by derda restaurant - Zone 5, 10-12 Senanga St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African",
    "Price range": "Budget friendly-Mid range"
  },
  {
    "Restaurants": "Gusto Abuja",
    "Address": "Gusto - 42 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Nigerian/Japanese",
    "Price range": "Upscale",
    "Contact": "0809 666 6344"
  },
  {
    "Restaurants": "H&H Continental Restaurant",
    "Address": "H&h continental restaurants  - 18 Blantyre Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Continenetal",
    "Price range": "Mid range-Upscale",
    "Contact": "0818 855 6026"
  },
  {
    "Restaurants": "Haraya Restaurant and Cafe",
    "Address": "Haraya - Block 5, 2 Bria St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining",
    "Cuisine": "Continenetal",
    "Price range": "Upscale",
    "Contact": "0706 083 4326"
  },
  {
    "Restaurants": "Home Cooking Restaurant",
    "Address": "Home cooking restaurant - 57 Parakou St, off Aminu Kano Crescent, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Contact": "0802 944 8040"
  },
  {
    "Restaurants": "Home-Made Food & Restaurant",
    "Address": "Home-made restaurant - 169B Aminu Kano Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid range"
  },
  {
    "Restaurants": "HONEY",
    "Address": "Honey - 2 Atakpame street, off Adetokunbo Ademola Cres, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Asian/Western Fusion",
    "Price range": "Mid-range",
    "Contact": "0818 120 5307"
  },
  {
    "Restaurants": "HONEY"
  },
  {
    "Restaurants": "Hootas Place Abuja",
    "Address": "Hootas place - 16 Bangui St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Chinese/Continental/Indian/local",
    "Price range": "Mid-range",
    "Contact": "0812 919 9000"
  },
  {
    "Restaurants": "House Forty Three",
    "Address": "House fourty three - 43 Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "French/American/British",
    "Price range": "Mid-range",
    "Contact": "0803 364 7709"
  },
  {
    "Restaurants": "Indigo Restaurant & Lounge, Abuja",
    "Address": "Indigo restaurant - 31 Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining/Outdoor Seating",
    "Cuisine": "Nigerian/Chinses/Indian",
    "Price range": "Mid range-Upscale",
    "Contact": "0811 047 9376"
  },
  {
    "Restaurants": "Iya Oyo Amala",
    "Address": "Iya oyo Amala - 112 Idris Gidado St, Wuye, Ankuru 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dinning /Ethnic Dining/Local food",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly"
  },
  {
    "Restaurants": "Jamal Restaurant",
    "Address": "Jamal’s restaurant - 38 Lingu Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian fast food",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0701 279 1002"
  },
  {
    "Restaurants": "Jevinik Restaurant",
    "Address": "Jevinik Restaurant 7.5 km · 494 Bangui St",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Ngerian/Seafood",
    "Price range": "Mid range"
  },
  {
    "Restaurants": "Jevinik Restaurant Garki 2",
    "Address": "Jevinik Restaurant 494 Bangui St",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Ngerian/Seafood",
    "Price range": "Mid range"
  },
  {
    "Restaurants": "Johnny Rockets",
    "Address": "Johnny rockets - 215 Konoko Cres, Wuse, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Mid-range",
    "Contact": "0708 155 5555"
  },
  {
    "Restaurants": "K&Q (Kings And Queens) Food Palace",
    "Address": "King and Queen - 19 Libreville Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range",
    "Contact": "0812 643 4123"
  },
  {
    "Restaurants": "KAMPE Restaurant",
    "Address": "Kampe restaurant - 29 Gana St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Family friendly/Cozy Spot",
    "Cuisine": "African/Nigerian",
    "Price range": "Mid range-Upscale",
    "Contact": "0802 883 9510"
  },
  {
    "Restaurants": "Kapadoccia Abuja",
    "Address": "Kappadocia restaurant - 2 Kinda street, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "African/Turkish/MiddleEaste rn",
    "Price range": "Upscale",
    "Contact": "0802 061 5379"
  },
  {
    "Restaurants": "Kayz Royal Fiesta Restaurant",
    "Address": "Kayz royal fiesta restaurant - 215 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range",
    "Contact": "0703 323 3252"
  },
  {
    "Restaurants": "Kebabs & Kurries Restaurant",
    "Address": "Kebabs and kurries - 22,Ajesa street, off Monrovia St, Wuse, Abuja, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/Indian/Chinese/Continental",
    "Price range": "Mid-range",
    "Contact": "0909 099 9993"
  },
  {
    "Restaurants": "Keje Grill",
    "Address": "Keje grill - City Park, Ahmadu Bello Wy, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining /Outdoor Seating",
    "Cuisine": "Local cuisine",
    "Price range": "Mid-range",
    "Contact": "0812 290 0044"
  },
  {
    "Restaurants": "Kilimanjaro Restaurant",
    "Address": "Kilimanjaro Restaurant Fast food restaurant 6.1 km · Lugbe",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian fast food",
    "Price range": "Budget Friendly"
  },
  {
    "Restaurants": "KITCH AFRIK",
    "Address": "Kitch afrik - 132 Adetokunbo Ademola Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly",
    "Contact": "0907 345 5888"
  },
  {
    "Restaurants": "Kooks Bistro",
    "Address": "Kooks bistro - Dreams Recreational Park, Aminu Kano Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Cafe/bistro",
    "Cuisine": "Nigerian fast food/Dessert",
    "Price range": "Mid-range",
    "Contact": "0906 000 3343"
  },
  {
    "Restaurants": "Kosh n Dosh Restaurant",
    "Address": "Kosh n dosh -  154 Aminu Kano Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Contact": "09 291 6473"
  },
  {
    "Restaurants": "KUK's Delight Wuse II",
    "Address": "Kuks delight - 10 Lingu Cres, Wuse II, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Mid range"
  },
  {
    "Restaurants": "L & N Kitchen",
    "Address": "L and N kitchen - 49 Kumasi Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Northern Nigerian",
    "Price range": "Mid-range",
    "Contact": "0704 485 4619"
  },
  {
    "Restaurants": "La Taverna",
    "Address": "La traverna - 5th Floor, Statement Hotel, First Ave, Wuse, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining/Outdoor Seating",
    "Cuisine": "Mexican/Italian/Spanish",
    "Price range": "Mid range-Upscale",
    "Contact": "0908 513 0280"
  },
  {
    "Restaurants": "La Taverna"
  },
  {
    "Restaurants": "La vida local",
    "Address": "La vida loca - Spar Road, behind NNPC Petrol station Life Camp, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0818 880 0922"
  },
  {
    "Restaurants": "Lagos bistro",
    "Address": "Lagos bistro - 7 Humbori Street, Adetokunbo Ademola Cres, Wuse 2, Abuja, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African/Mediterranean",
    "Price range": "Mid range-Upscale",
    "Contact": "0704 380 0000"
  },
  {
    "Restaurants": "Le Chak Restaurant, Bar & Grill",
    "Address": "La chark restaurant - 16b Libreville Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Price range": "Mid-range",
    "Contact": "0916 216 1902"
  },
  {
    "Restaurants": "Legend Zone: Food City",
    "Address": "Legend zone - 6A Bangui St, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Price range": "Mid-range",
    "Contact": "0700 6953 4363"
  },
  {
    "Restaurants": "Le-Jumeau Restaurant",
    "Address": "Le jumeau -  Maitama Shopping Complex, Chalaza Cres, off Limpopo Street, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Contact": "0803 334 6700"
  },
  {
    "Restaurants": "Levels Bukka",
    "Address": "Levels Bukka - 3FGR+3GM, Luanda Crescent, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget friendly-Mid range",
    "Contact": "0809 173 1679"
  },
  {
    "Restaurants": "lobic Restaurant",
    "Address": "Lobic restaurant - Plot 1176 Cadastral Zone B06, Mabuchi life camp exp way,, Mabuchi, Abuja 900108",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0703 625 6650"
  },
  {
    "Restaurants": "Nuit De Paris",
    "Address": "Nuit de Paris  - Fandriana Cl, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "7082461893"
  },
  {
    "Restaurants": "Oceans 11 Seafood",
    "Address": "Ocean 11 seafood - 40 Lingu Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/Mediterranean Inspired",
    "Price range": "Mid-range",
    "Contact": "0705 772 5555"
  },
  {
    "Restaurants": "Ojuelegba Amala Point Maitama",
    "Address": "Ojuelegba Amala point - Idu Junction, Jabi Airport road, Abuja, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining/ Local Dining",
    "Cuisine": "Local cuisine",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0903 022 6735"
  },
  {
    "Restaurants": "OKONKWO BY PAPIEESABUJA",
    "Address": "OKONKWO BY PAPPIEESABUJA - PLOT 103 Ahmadu Bello Way, opposite SHASHILGA COURT - JAHI, Kado, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/African/Continental",
    "Price range": "Mid range",
    "Contact": "0916 955 3276"
  },
  {
    "Restaurants": "Outside Restaurant and Lounge Abuja",
    "Address": "Out side Restaurant and lounge Abuja 2nd Floor, Suncity Plaza, 141 Adetokunbo Ademola Cres, Abuja",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "African/Mediterranean",
    "Price range": "Mid-Upscale",
    "Contact": "0701 616 1618"
  },
  {
    "Restaurants": "Owende Restaurant",
    "Address": "Owende restaurant  - Zone-3, 42 Abijan St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid range",
    "Contact": "0701 279 1002"
  },
  {
    "Restaurants": "Palm Avenue Restaurant",
    "Address": "Palm avenue restaurant - Sani Abacha Wy, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Romantic dining / Fine dining",
    "Cuisine": "Fusion of Italian/Arabian/American/International",
    "Price range": "Mid range-Upscale",
    "Contact": "0706 994 7930"
  },
  {
    "Restaurants": "Palominos Restaurant",
    "Address": "Palominos restaurant - Plot 367 Aminu Kano Cres, opposite Dabras Hotel, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Cosy Atmosphere",
    "Cuisine": "Nigerian/Western Fast od",
    "Price range": "Mid-range",
    "Contact": "0913 600 0149"
  },
  {
    "Restaurants": "Panache",
    "Address": "Panache - 1061 Herbert Macaulay Wy, Central Business District, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Italian/Seafood",
    "Price range": "Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Papa’s Grill",
    "Address": "Papa’s Grill - 40 Durban St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "barbecue",
    "Price range": "Budget Friendly",
    "Contact": "0703 844 9550"
  },
  {
    "Restaurants": "Papiee’s Meatro Jahi",
    "Address": "Papi’s maetro - PLOT 103 Ahmadu Bello Wy, opposite SHASHILGA COURT - JAHI EXPRESS, Kado, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian/Western styled barbecue/Seafood",
    "Price range": "Mid-range",
    "Contact": "0903 794 7121"
  },
  {
    "Restaurants": "Papillion Restaurant",
    "Address": "Papillon restaurant - 3F7M+JQR, ladi Kwali St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "Mexican/American/Asian",
    "Price range": "Mid range",
    "Contact": "0704 920 9552"
  },
  {
    "Restaurants": "PHYNEX Restaurant",
    "Address": "1 Kudang Street, by Monrovia,opp Barnex Plaza, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "Nigerian",
    "Price range": "Mid range",
    "Contact": "0701 279 1002"
  },
  {
    "Restaurants": "Puzzo’s Restaurant",
    "Address": "Puzzo’s restaurant - 170 Adetokunbo Ademola Cres, opp. Peniel Apartment, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Family friendly/Oudoor Seating/Casual Dining",
    "Cuisine": "African/Mexican/Italian",
    "Price range": "mid-range",
    "Contact": "0811 223 3689"
  },
  {
    "Restaurants": "Relais Cafe",
    "Address": "Relai’s cafe. - 12 Charles De-Gaulle Cl, Asokoro, Abuja 900103, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0903 076 0724"
  },
  {
    "Restaurants": "Rice Bowl Bukka",
    "Address": "Rice bowl - 3FHJ+F4F, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid range",
    "Contact": "0703 257 7230"
  },
  {
    "Restaurants": "Sabroso Restaurant",
    "Address": "Sobroso restaurant - 18 Bobo St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Mexican",
    "Price range": "Mid range-Upscale",
    "Contact": "0913 212 9351"
  },
  {
    "Restaurants": "Sage Restaurant Abuja",
    "Address": "Sage restaurant - M.I Ahmad Plaza Rooftop, Adetokunbo Ademola Cres, Municipal, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Continental",
    "Price range": "Mid range",
    "Contact": "0808 558 3937"
  },
  {
    "Restaurants": "Santorini Abuja",
    "Address": "Santorini restaurant - 5 Kwaji Cl, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "Mediterranean/Italian/British",
    "Price range": "Mid range-Upscale",
    "Contact": "0706 709 1391"
  },
  {
    "Restaurants": "Scarlet Delights",
    "Address": "Scarlet delight - 57 Parakou Crescent, off Aminu Kano Cres, Wuse 2, Abuja 900288",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0909 964 5383"
  },
  {
    "Restaurants": "Searock Restaurant",
    "Address": "Searock restaurant - 5A Lingu Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Pan-Asian",
    "Price range": "Mid-range",
    "Contact": "0905 675 4948"
  },
  {
    "Restaurants": "Sekem Kitchen Abuja",
    "Address": "Sekem kitchen - 28 Ganges St, Maitama, Abuja 234054, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": null,
    "Contact": "0817 000 0243"
  },
  {
    "Restaurants": "Serendib restaurant and lounge",
    "Address": "Serendib restaurant - 29 Umaru Dikko St, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African/Indian/Sri Lankan",
    "Price range": "Mid range-Upscale",
    "Contact": "0703 777 3636"
  },
  {
    "Restaurants": "Shagalinku Restaurant Abuja",
    "Address": "Shagalinku - 559C Kapital Rd, Garki, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "northern Nigerian",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Shogan Restaurant Abuja",
    "Address": "Shogan restaurant - 55 Lake Chad Cres, Maitama, FCT 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining/Oudoor Seating",
    "Cuisine": "Japanese/Mexican/Asian",
    "Price range": "Upscale",
    "Contact": "0807 988 8886"
  },
  {
    "Restaurants": "Siam City Thai Restaurant",
    "Address": "Siam restaurant - Plot 2044, 54 Aguiyi Ironsi St, Wuse, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "African/Thai/Asian",
    "Price range": "Upscale",
    "Contact": "0818 888 0740"
  },
  {
    "Restaurants": "Sidewalk cafe",
    "Address": "Side walk restaurant - Maitama Neighborhood Park, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": null,
    "Price range": null,
    "Contact": "0805 555 9171"
  },
  {
    "Restaurants": "Silk Road Restaurant",
    "Address": "Silk Road - Plot 770, Sinoki house, off Samuel Ademulegun Ave, opposite Federal Ministry of Transport, Central Business District, Abuja",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0909 822 8888"
  },
  {
    "Restaurants": "Sinoni Chinese Restaurant",
    "Address": "Sinoni restaurant - Area 1 Shopping Centre, opp. Nipost, Garki, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Chinese/Thai/Japanese",
    "Price range": "Mid range-Upscale",
    "Contact": "0806 095 8818"
  },
  {
    "Restaurants": "Southern Fried Chicken",
    "Address": "Souther fried chicken - Southern Fried Chicken\nLibreville Cres, Wuse, Abuja 904101, Federal Capital",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Spice Platter",
    "Address": "Spice platter - 18 Libreville Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "African/Mexican/Indian",
    "Price range": "Mid-Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Suya & Co (suya and shisha)",
    "Address": null,
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": null
  },
  {
    "Restaurants": "Taj Bistro",
    "Address": "Taj bistro - 1 Atbara St, off Kampala Street, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Cafe/bistro",
    "Cuisine": "French /Asian/American",
    "Price range": "Mid range-Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Tar Tar",
    "Address": "Tar tar restaurant - 5 Sorotona Cl, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Outdoor Seating",
    "Cuisine": "African/Caribbean/Asian",
    "Price range": "Mid range-Upscale",
    "Contact": "0810 830 6948"
  },
  {
    "Restaurants": "Tastia Restaurant, Bakery and Cafe (Maitama)",
    "Address": "Tastia restaurant - Adetokunbo Ademola Cres, Wuse, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Tastiva Restaurant",
    "Address": "Tastiva restaurant - 4 Salt Lake St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid range",
    "Contact": "0816 597 3417"
  },
  {
    "Restaurants": "Tehrogo",
    "Address": "Tehrogo - 30B Danube St, Municipal, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Persian/Intercontinental",
    "Price range": "Mid range-Upscale",
    "Contact": "0703 105 9305"
  },
  {
    "Restaurants": "The Barlance",
    "Address": "The barlance - 2047 Shehu Shagari Wy, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Oudoor Seating/Bar/Lounge",
    "Cuisine": "Nigerian/Mexican/Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0810 559 9960"
  },
  {
    "Restaurants": "Santorini Abuja",
    "Address": "Santorini restaurant - 5 Kwaji Cl, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining /Romantic Dining",
    "Cuisine": "Mediterranean/Italian/British",
    "Price range": "Mid range-Upscale",
    "Contact": "0706 709 1391"
  },
  {
    "Restaurants": "Scarlet Delights",
    "Address": "Scarlet delight - 57 Parakou Crescent, off Aminu Kano Cres, Wuse 2, Abuja 900288",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0909 964 5383"
  },
  {
    "Restaurants": "Searock Restaurant",
    "Address": "Searock restaurant - 5A Lingu Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Pan-Asian",
    "Price range": "Mid-range",
    "Contact": "0905 675 4948"
  },
  {
    "Restaurants": "Sekem Kitchen Abuja",
    "Address": "Sekem kitchen - 28 Ganges St, Maitama, Abuja 234054, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": null,
    "Contact": "0817 000 0243"
  },
  {
    "Restaurants": "Serendib restaurant and lounge",
    "Address": "Serendib restaurant - 29 Umaru Dikko St, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor seating",
    "Cuisine": "African/Indian/Sri Lankan",
    "Price range": "Mid range-Upscale",
    "Contact": "0703 777 3636"
  },
  {
    "Restaurants": "Shagalinku Restaurant Abuja",
    "Address": "Shagalinku - 559C Kapital Rd, Garki, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "northern Nigerian",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Shogan Restaurant Abuja",
    "Address": "Shogan restaurant - 55 Lake Chad Cres, Maitama, FCT 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining/Oudoor Seating",
    "Cuisine": "Japanese/Mexican/Asian",
    "Price range": "Upscale",
    "Contact": "0807 988 8886"
  },
  {
    "Restaurants": "Siam City Thai Restaurant",
    "Address": "Siam restaurant - Plot 2044, 54 Aguiyi Ironsi St, Wuse, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "African/Thai/Asian",
    "Price range": "Upscale",
    "Contact": "0818 888 0740"
  },
  {
    "Restaurants": "Sidewalk cafe",
    "Address": "Side walk restaurant - Maitama Neighborhood Park, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": null,
    "Price range": null,
    "Contact": "0805 555 9171"
  },
  {
    "Restaurants": "Silk Road Restaurant",
    "Address": "Silk Road - Plot 770, Sinoki house, off Samuel Ademulegun Ave, opposite Federal Ministry of Transport, Central Business District, Abuja",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0909 822 8888"
  },
  {
    "Restaurants": "Sinoni Chinese Restaurant",
    "Address": "Sinoni restaurant - Area 1 Shopping Centre, opp. Nipost, Garki, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Fine Dining",
    "Cuisine": "Chinese/Thai/Japanese",
    "Price range": "Mid range-Upscale",
    "Contact": "0806 095 8818"
  },
  {
    "Restaurants": "Southern Fried Chicken",
    "Address": "Souther fried chicken - Southern Fried Chicken\nLibreville Cres, Wuse, Abuja 904101, Federal Capital",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Fast food",
    "Price range": "Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Spice Platter",
    "Address": "Spice platter - 18 Libreville Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "African/Mexican/Indian",
    "Price range": "Mid-Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Suya & Co (suya and shisha)",
    "Address": null,
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": null
  },
  {
    "Restaurants": "Taj Bistro",
    "Address": "Taj bistro - 1 Atbara St, off Kampala Street, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Cafe/bistro",
    "Cuisine": "French /Asian/American",
    "Price range": "Mid range-Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Tar Tar",
    "Address": "Tar tar restaurant - 5 Sorotona Cl, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Outdoor Seating",
    "Cuisine": "African/Caribbean/Asian",
    "Price range": "Mid range-Upscale",
    "Contact": "0810 830 6948"
  },
  {
    "Restaurants": "Tastia Restaurant, Bakery and Cafe (Maitama)",
    "Address": "Tastia restaurant - Adetokunbo Ademola Cres, Wuse, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "Tastiva Restaurant",
    "Address": "Tastiva restaurant - 4 Salt Lake St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid range",
    "Contact": "0816 597 3417"
  },
  {
    "Restaurants": "Tehrogo",
    "Address": "Tehrogo - 30B Danube St, Municipal, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Persian/Intercontinental",
    "Price range": "Mid range-Upscale",
    "Contact": "0703 105 9305"
  },
  {
    "Restaurants": "The Barlance",
    "Address": "The barlance - 2047 Shehu Shagari Wy, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Oudoor Seating/Bar/Lounge",
    "Cuisine": "Nigerian/Mexican/Chinese",
    "Price range": "Mid range-Upscale",
    "Contact": "0810 559 9960"
  },
  {
    "Restaurants": "The Boat Club",
    "Address": "The boat club - 3C97+VVV, Alex Ekwueme Way, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Continental",
    "Price range": "Mid-range",
    "Contact": "0808 089 9289"
  },
  {
    "Restaurants": "The Burgundy by chef stone",
    "Address": "990 Nal Blvd, behind Fraser Suite, Central Area, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining",
    "Cuisine": "Pan african",
    "Price range": "Upscale",
    "Contact": "0809 411 1112"
  },
  {
    "Restaurants": "The City Kitchen",
    "Address": "The city kitchen - Plot 843 Idris Ibrahim Cres, Jabi, AMAC 900211, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African",
    "Price range": "Mid-range",
    "Contact": "0816 116 8909"
  },
  {
    "Restaurants": "The Council Restaurant",
    "Address": "The council - 35 Ibrahim Babangida Wy, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "English/Nigerian/American/Italian",
    "Price range": "Mid-range",
    "Contact": "0805 555 3268"
  },
  {
    "Restaurants": "The Garden by L'Epicure",
    "Address": "The Garden by L'Epicure - 979 Ahmadu Bello Wy, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "Italian/Fast food",
    "Price range": "Mid range",
    "Contact": "0809 955 5225"
  },
  {
    "Restaurants": "The Gem House",
    "Address": "The gem house - 5b Parakou St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine-Casual",
    "Cuisine": "African/Intercontinental",
    "Price range": "Mid-Upscale",
    "Contact": "0810 551 7373"
  },
  {
    "Restaurants": "The Grill King",
    "Address": "The grill king - EXT 1, Area council, B91 Ushafa Village Expansion, Abuja 901101, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating/Family Friendly",
    "Cuisine": "African/Indian/Middle Eastern",
    "Price range": "Mid range",
    "Contact": "0912 923 0292"
  },
  {
    "Restaurants": "The Hydeout Restaurant & Grills",
    "Address": "The hydeout  - 3FHG+48H, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": null,
    "Price range": null,
    "Contact": "0705 577 8885"
  },
  {
    "Restaurants": "The Ivory Place",
    "Address": "The ivory - 42 Birao St, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining",
    "Cuisine": "African/Asian/Middle Eastern",
    "Price range": "Upscale",
    "Contact": "0808 558 6937"
  },
  {
    "Restaurants": "THE IVY LEAGUE RESTAURANT & LOUNGE",
    "Address": "The Ivy League restaurant - The penthouse at Cube Mall, 69 Adetokunbo Ademola Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dinning/Bar and lounge/Outdoor Seating",
    "Cuisine": "American",
    "Price range": "Mid range-Upscale",
    "Contact": "08101406540/814995 2573"
  },
  {
    "Restaurants": "The Lawn Restaurant",
    "Address": "The lawn restaurant - 9 Malcom Fraser St, Asokoro, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid-range",
    "Contact": "0708 476 8369"
  },
  {
    "Restaurants": "The Melting Pot",
    "Address": "The melting pot - 137 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "The Mustard Restaurant",
    "Address": "The mustard - Discovery Mail, Plot 215- Konoko Crescent, Along Ap Plaza, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/Intercontinental",
    "Price range": "Mid-range",
    "Contact": "0906 801 1767"
  },
  {
    "Restaurants": "The Pasha",
    "Address": "The pasha - 11 Cassandra Crescent, off Usuma St, Abuja",
    "Dining Experience": "Casual Dining/Romantic Dining",
    "Cuisine": "Indian/Middle Eastern/Mediterranean",
    "Price range": "Mid range-Upscale",
    "Contact": "0807 766 7766"
  },
  {
    "Restaurants": "The pier restaurant",
    "Address": "The pier - Plot 498 Ahmadu Bello Wy, Kado, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Romantic Dining",
    "Cuisine": "Fusion/Nigerian/International",
    "Price range": "Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "The Place Restaurants & Lounge",
    "Address": "The place restaurant - 138 Pa Michael Imoudu Ave, Gwarinpa, 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Ethnic Dining",
    "Cuisine": "Local cuisine",
    "Price range": "Mid range",
    "Contact": "09054005285/090717 13847"
  },
  {
    "Restaurants": "The Ruvuma Place",
    "Address": "The ruvuma place - 3 Ruvuma St, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": null
  },
  {
    "Restaurants": "The Sushi Box",
    "Address": "The sushi box - 15 Rhine St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Ethnic Dining",
    "Cuisine": "Thai Cuisine",
    "Price range": "Mid range-Upscale",
    "Contact": "0811 828 8865"
  },
  {
    "Restaurants": "The Traffic Bar & Restaurant",
    "Address": "The traffic bar and restaurant - 8 Missouri St, Maitama, Abuja 900271, Federal Capital Territory",
    "Dining Experience": "Outdoor Seating",
    "Cuisine": "Mexican/Italian/Seafood",
    "Price range": "Mid-Upscale",
    "Contact": "8162"
  },
  {
    "Restaurants": "The Vue",
    "Address": "The vue restaurant - 3F75+W86 Novare mall, Wuse, 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dinning",
    "Cuisine": "Indian/Seafood/Asian",
    "Price range": "Upscale",
    "Contact": "0817 888 8812"
  },
  {
    "Restaurants": "Timeout Restaurant",
    "Address": "Timeout restaurant - No 2 Lingu Cres, Wuse 2, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Barbecue/Seafood",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0906 160 0052"
  },
  {
    "Restaurants": "Today's Bukka",
    "Address": "Todays Bukka - 3FHJ+V82, Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Ethnic Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0814 265 1961"
  },
  {
    "Restaurants": "Tree House Grill",
    "Address": "Tree house restaurant - 66 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/International",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": "0909 159 1352"
  },
  {
    "Restaurants": "Tree House Grill",
    "Address": null,
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": null
  },
  {
    "Restaurants": "TRIBE AFRIK RESTAURANT",
    "Address": "Tribe afrik - 16 Cassandra St, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0816 246 9332"
  },
  {
    "Restaurants": "Tulip Bistro",
    "Address": "Tulip bistro - 141 Adetokunbo Ademola Cres, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Cafe/bistro",
    "Cuisine": "African/Middle Eastern/European",
    "Price range": "Mid range-Upscale",
    "Contact": null
  },
  {
    "Restaurants": "Uncle D's Restaurant",
    "Address": "Uncle d’s - 85 Aguiyi Ironsi St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Continental/Seafood/Italian",
    "Price range": "Mid range",
    "Contact": "0908 245 4163"
  },
  {
    "Restaurants": "Uncle T’s",
    "Address": "Uncle t’s restaurant - 51 Alex Ekwueme Way, opp. Jabi Lake, Jabi, Abuja 900108, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Outdoor Seating",
    "Cuisine": "Mediterranean/Italian/Asian/American",
    "Price range": "Mid range-Upscale",
    "Contact": "0915 555 9565"
  },
  {
    "Restaurants": "UrbanLoft Cafe",
    "Address": "Urban loft - 3 6th Ave, Gwarinpa, Abuja 900108, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0913 739 5348"
  },
  {
    "Restaurants": "Vanilla Restaurant & Lounge",
    "Address": "Vanilla restaurant - 11 Usuma Cl, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dining/Outdoor Seating",
    "Cuisine": "African/Italian/French",
    "Price range": "Mid range-Upscale",
    "Contact": "8104545070"
  },
  {
    "Restaurants": "Vanilla Restaurant & Lounge",
    "Address": null,
    "Dining Experience": "Fine Dining/Romantic Dining",
    "Cuisine": null,
    "Price range": null,
    "Contact": null
  },
  {
    "Restaurants": "Vibe by Ann’s",
    "Address": "Vibes by ann - 23 Atbara St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Fine Dinning",
    "Cuisine": "Italian/Nigerian",
    "Price range": "Mid range",
    "Contact": "0915 555 5908"
  },
  {
    "Restaurants": "Village Chief Restaurant & Bar",
    "Address": "Village chief - 2 Matambella Garden, Wuse 2",
    "Dining Experience": "Casual Dining/Outdoor Sittng",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range",
    "Contact": "0805 215 0719"
  },
  {
    "Restaurants": "VINGT QUATRE, Asokoro",
    "Address": "Vingt qautre - 7 Musa Traore, Asokoro, Abuja 900103, Federal Capital Territory",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0708 476 8369"
  },
  {
    "Restaurants": "Wakhomey’s restaurant",
    "Address": "Wakhomey’s restaurant - B 33 Discovery Mall, Adetokunbo Ademola Cres, street, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/Intercontinental",
    "Price range": "Mid-range",
    "Contact": "0906 336 9081"
  },
  {
    "Restaurants": "Wakkis Food",
    "Address": "Wakkis restaurant - 171 Aminu Kano Cres, Wuse 2, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Indian",
    "Price range": "Mid range",
    "Contact": "0805 899 9009"
  },
  {
    "Restaurants": "Wellness Spot",
    "Address": "Wellness spot  - Numberger Platz, 24 Adetokunbo Ademola Cres, beside Visa Phone, Wuse 2, Abuja",
    "Dining Experience": "Casual Dining",
    "Cuisine": "African/Continental",
    "Price range": "Mid range",
    "Contact": "0814 043 3904"
  },
  {
    "Restaurants": "White Fountain Restaurants Abuja",
    "Address": "White fountain - Plot 174 Kur Mohammed Avenue, River Plate Park, Abuja 900211",
    "Dining Experience": null,
    "Cuisine": null,
    "Price range": null,
    "Contact": "0809 272 2852"
  },
  {
    "Restaurants": "White Palace Restaurant Abuja",
    "Address": "White palace - Sabondale Complex along Obafemi Awolowo Way Jabi District, AMAC, Abuja AMAC, 100001",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian",
    "Price range": "Mid range",
    "Contact": "0805 594 4319"
  },
  {
    "Restaurants": "Wingist Restaurant & Sports Bar",
    "Address": "Wingsit restaurant - 7 Lingu Cres, Wuse, Abuja 900288, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "American/Asian",
    "Price range": "Mid range",
    "Contact": "0818 773 5698"
  },
  {
    "Restaurants": "Woks & Koi Chinese restaurant",
    "Address": "Woks and koi restaurant - 18 Durban St, Wuse, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining/Ethnic Dining",
    "Cuisine": "Chinese",
    "Price range": "Mid-range",
    "Contact": "0909 347 6816"
  },
  {
    "Restaurants": "Yahuza Suya Spot Nigeria Limited",
    "Address": "Yahuza suya - 466, 466 Ahmadu Bello Wy, Maitama, Abuja 900103, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian grill/ Nigerian barbecue",
    "Price range": "Budget Friendly/Mid-range",
    "Contact": null
  },
  {
    "Restaurants": "ZANZIBAR GRILL AND BAR",
    "Address": "Zanzibar restaurant - Maitama Neighborhood Park, Maitama, Abuja 904101, Federal Capital Territory",
    "Dining Experience": "Casual Dining",
    "Cuisine": "Nigerian/local",
    "Price range": "Mid-range",
    "Contact": "0809 843 4715"
  },
  {
    "Restaurants": "Zuma Grill",
    "Address": "Floor, 01, Transcorp Hilton Hotel, No.1, Aguiyi Ironsi Street, Maitama, Abuja, FCT",
    "Dining Experience": "Fine Dinning",
    "Cuisine": "Italian/French/Indonesian",
    "Price range": "Upscale",
    "Contact": "0803 901 3000"
  }
]`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello there! I'm City Explorer, your virtual guide to all things delicious in the city. What are you craving today? Tell me what you're in the mood for, and I'll recommend the perfect restaurant for you based on your preferences.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          { text: "I want amala and egusi soup, where can i get it please?" },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "If you're craving amala and egusi soup, the perfect place for you is **Amala Spot** in Gwarimpa. They specialize in traditional Nigerian dishes, and their menu features a wide variety of soups, including egusi, ogbono, and gbegiri, to pair with your amala. They're open every day of the week, so you can satisfy your cravings any time!",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what about ice cream? any idea?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "For delicious ice cream, you have two options:\n\n* **Pizza Hut:** They offer ice cream alongside their pizzas and other fast food options. They have locations in both Maitama and Garki, and they're open Monday to Friday.\n* **Dominos:** They also offer ice cream along with pizzas and other dishes. They have locations in Apo and Gwarimpa, but they're only open on weekends.\n\nSo, depending on the day and your location preference, you can choose either Pizza Hut or Dominos for your ice cream fix!",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Where can i get lunch and Mabushi, Remember to add Address, Contact, and other important info from the list i gave you earlier",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, Here is a suggestion: Restaurant: Blu cabana, Address: Blue cabana - 1322 Shehu Yar'adua Wy, Mabushi, Abuja 900108, Federal Capital Territory, Dining Experience: Fine Dining /Oudoor Seating/Lounge, Cuisine: Mexican/Italian/Nigerian, Price range: Mid range-Upscale, Contact: 0810 090 0000",
          },
        ],
      },...history
    ],
  });

  const result = await chat.sendMessage(message);

  const response = result.response;

  return response.text();
} catch (error: any) {
    console.log({ message: error.message });
    return error.message;
    
}
}
