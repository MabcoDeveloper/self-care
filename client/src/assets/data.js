// data.js
export const DummyProducts = [
  // ---------- HAIR CARE (original items, fixed duplicate id) ----------
  {
    _id: "1",
    title: "Argan Hair Oil",
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description: "Rich argan oil for nourishing and moisturizing dry hair.",
    category: "Hair Care",
    type: "oil",
    size: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
    image: ["/HereCare3.png", "/herecareone.png", "/HereCareOne2.png"],
  },
  {
    _id: "2",
    title: "Herbal Shampoo",
    price: { "250ml": 18, "500ml": 30 },
    description:
      "Natural herbal shampoo that strengthens and revitalizes hair.",
    category: "Hair Care",
    type: "shampoo",
    size: ["250ml", "500ml"],
    date: 1716634345449,
    popular: false,
    inStock: true,
    image: ["/hereCareTow2.png", "/hereCareTow.png", "/hereCareTow3.png"],
  },
  {
    _id: "3",
    title: "Keratin Hair Mask",
    price: { "200ml": 22, "400ml": 38 },
    description: "Deep conditioning mask infused with keratin for smooth hair.",
    category: "Hair Care",
    type: "mask",
    size: ["200ml", "400ml"],
    date: 1716634345450,
    popular: true,
    inStock: true,
    image: ["/HereCareThree.png", "/hereCareThree2.png"],
  },
  {
    _id: "4",
    title: "Coconut Hair Oil",
    price: { "50ml": 12, "100ml": 20, "200ml": 32 },
    description: "Pure coconut oil for repairing damaged hair and scalp care.",
    category: "Hair Care",
    type: "oil",
    size: ["50ml", "100ml", "200ml"],
    date: 1716634345451,
    popular: true,
    inStock: true,
    image: ["/hereCareFour.png", "/hereCareFour3.png"],
  },
  {
    _id: "5",
    title: "Vitamin E Hair Serum",
    price: { "30ml": 28, "60ml": 45 },
    description: "Lightweight serum with Vitamin E for shiny, frizz-free hair.",
    category: "Hair Care",
    type: "serum",
    size: ["30ml", "60ml"],
    date: 1716634345452,
    popular: false,
    inStock: true,
    image: ["/hereCareFive.png", "/hereCarefive2.png", "/hereCareFive3.png"],
  },
  {
    _id: "6",
    title: "Aloe Vera Conditioner",
    price: { "250ml": 16, "500ml": 27 },
    description: "Hydrating conditioner enriched with aloe vera for soft hair.",
    category: "Hair Care",
    type: "conditioner",
    size: ["250ml", "500ml"],
    date: 1716634345453,
    popular: false,
    inStock: true,
    image: ["/hereCareSix.png", "/hereCarefive2.png", "/hereCareFive3.png"],
  },
  {
    _id: "7",
    title: "Protein Repair Cream",
    price: { "150ml": 24, "300ml": 42 },
    description: "Cream treatment with proteins to repair split ends.",
    category: "Hair Care",
    type: "cream",
    size: ["150ml", "300ml"],
    date: 1716634345454,
    popular: false,
    inStock: true,
    image: ["/h5.png"],
  },
  {
    _id: "8", // fixed duplicate id (was 7 twice in original)
    title: "Leave-In Heat Protect Spray",
    price: { "150ml": 20, "300ml": 35 },
    description:
      "Protects hair from heat styling while adding shine and softness.",
    category: "Hair Care",
    type: "spray",
    size: ["150ml", "300ml"],
    date: 1716634345455,
    popular: false,
    inStock: true,
    image: ["/h2.png"],
  },

  // ---------- BODY CARE (7 items) ----------
  {
    _id: "9",
    title: "Citrus Body Wash",
    price: { "200ml": 10, "500ml": 18 },
    description:
      "Refreshing citrus body wash that cleanses and energizes the skin.",
    category: "Body Care",
    type: "wash",
    size: ["200ml", "500ml"],
    date: 1716634345456,
    popular: false,
    inStock: false,
    image: ["/bodyCareOne.png", "/bodyCarOne2.png", "/bodyCareOne3.png"],
  },
  {
    _id: "10",
    title: "Shea Body Butter",
    price: { "200ml": 22, "400ml": 38 },
    description: "Ultra moisturizing shea butter cream for dry skin.",
    category: "Body Care",
    type: "cream",
    size: ["200ml", "400ml"],
    date: 1716634345457,
    popular: false,
    inStock: true,
    image: ["/bodyCareTow2.png", "/bodyCareTow.png"],
  },
  {
    _id: "11",
    title: "Exfoliating Salt Scrub",
    price: { "150g": 14, "350g": 26 },
    description:
      "Natural sea salt scrub to remove dead skin and boost circulation.",
    category: "Body Care",
    type: "scrub",
    size: ["150g", "350g"],
    date: 1716634345458,
    popular: true,
    inStock: true,
    image: ["/bodyCareThree2.png", "/bodyCareThree.png", "/bodyCareThree3.png"],
  },
  {
    _id: "12",
    title: "Lavender Body Oil",
    price: { "100ml": 18, "200ml": 30 },
    description: "Calming lavender oil for massage and skin nourishment.",
    category: "Body Care",
    type: "oil",
    size: ["100ml", "200ml"],
    date: 1716634345459,
    popular: false,
    inStock: true,
    image: ["/bodyCareFour.png", "/bodyCareFour2.png", "/bodyCareFour3.png"],
  },
  {
    _id: "13",
    title: "Energizing Body Mist",
    price: { "120ml": 12 },
    description:
      "Light mist to refresh skin and provide a subtle scent during the day.",
    category: "Body Care",
    type: "mist",
    size: ["120ml"],
    date: 1716634345460,
    popular: false,
    inStock: true,
    image: ["/bodyCareFive.png", "/bodyCareFive2.png", "/bodyCareFive3.png"],
  },
  {
    _id: "14",
    title: "Firming Body Lotion",
    price: { "200ml": 20, "400ml": 36 },
    description:
      "Lotion formulated to hydrate skin and improve firmness over time.",
    category: "Body Care",
    type: "lotion",
    size: ["200ml", "400ml"],
    date: 1716634345461,
    popular: true,
    inStock: true,
    image: ["/bodyCareSix.png", "/bodyCareSix2.png", "/bodyCareSix3.png"],
  },
  {
    _id: "15",
    title: "Deodorant Cream",
    price: { "50ml": 9 },
    description: "Aluminum-free deodorant cream with natural odor protection.",
    category: "Body Care",
    type: "deodorant",
    size: ["50ml"],
    date: 1716634345462,
    popular: false,
    inStock: true,
    image: ["/bodycareeghit.png", "/bodyCareEghit2.png", "/bodyCareEghit3.png"],
  },

  // ---------- FACE CARE (7 items) ----------
  {
    _id: "16",
    title: "Hydrating Face Serum",
    price: { "30ml": 28, "50ml": 42 },
    description: "Lightweight serum with hyaluronic acid for deep hydration.",
    category: "Face Care",
    type: "serum",
    size: ["30ml", "50ml"],
    date: 1716634345463,
    popular: true,
    inStock: true,
    image: ["/faceCareOne.png", "/faceCare2.png", "/faceCare3.png"],
  },
  {
    _id: "17",
    title: "Vitamin C Brightening Cream",
    price: { "30ml": 26, "60ml": 46 },
    description: "Brightening cream to even skin tone and boost radiance.",
    category: "Face Care",
    type: "cream",
    size: ["30ml", "60ml"],
    date: 1716634345464,
    popular: true,
    inStock: true,
    image: ["/faceCareTow.png", "/faceCareTow2.png"],
  },
  {
    _id: "18",
    title: "Gentle Foaming Cleanser",
    price: { "150ml": 12, "300ml": 20 },
    description:
      "Mild cleanser that removes dirt and makeup without drying skin.",
    category: "Face Care",
    type: "cleanser",
    size: ["150ml", "300ml"],
    date: 1716634345465,
    popular: false,
    inStock: true,
    image: [
      "/faceCareThree.png",
      "/faceCareThree2.png",
      "/faceCareThree3.png",
      "/faceCareThree4.png",
    ],
  },
  {
    _id: "19",
    title: "Niacinamide Pore Serum",
    price: { "30ml": 30 },
    description:
      "Helps minimize pores and control excess oil for a smoother complexion.",
    category: "Face Care",
    type: "serum",
    size: ["30ml"],
    date: 1716634345466,
    popular: true,
    inStock: true,
    image: [
      "/faceCareFure.png",
      "/faceCareFure3.png",
      "/faceCareFure4.png",
      "/faceCareFure2.png",
    ],
  },
  {
    _id: "20",
    title: "SPF 50 Face Sunscreen",
    price: { "50ml": 18 },
    description: "Light, non-greasy sunscreen to protect skin from UV damage.",
    category: "Face Care",
    type: "sunscreen",
    size: ["50ml"],
    date: 1716634345467,
    popular: true,
    inStock: true,
    image: ["/faceCareFive.png", "/faceCareFive2.png"],
  },
  {
    _id: "21",
    title: "Overnight Repair Mask",
    price: { "50ml": 34, "100ml": 60 },
    description:
      "Overnight mask that repairs and rejuvenates skin while you sleep.",
    category: "Face Care",
    type: "mask",
    size: ["50ml", "100ml"],
    date: 1716634345468,
    popular: false,
    inStock: true,
    image: ["/faceCareSven.png", "/faceCareSven2.png", "/faceCareSven3.png"],
  },
  {
    _id: "22",
    title: "Soothing Eye Gel",
    price: { "15ml": 16 },
    description:
      "Cooling gel to reduce puffiness and hydrate the delicate eye area.",
    category: "Face Care",
    type: "eye-gel",
    size: ["15ml"],
    date: 1716634345469,
    popular: false,
    inStock: true,
    image: ["/faceCareEghit.png", "/facecareEghit2.png"],
  },
];

{
  /*Blogs Dummy Data*/
}
export const blogs = [
  {
    id: 1,
    category: "Skincare Tips",
    title: "Top 10 Skincare Must-Haves for 2026",
    description:
      "Discover the essential skincare products you need in your routine for glowing, healthy skin in 2026.",
    image: "/BolgOne.jpg",
  },
  {
    id: 2,
    category: "Hair Care",
    title: "5 Proven Ways to Get Stronger, Shinier Hair",
    description:
      "Learn simple yet powerful hair care habits that will transform your hair health naturally.",
    image: "/BolgTow.jpg",
  },
  {
    id: 3,
    category: "Makeup",
    title: "2026 Makeup Trends You’ll Absolutely Love",
    description:
      "From glossy lips to bold liners, explore the hottest makeup looks dominating 2026.",
    image: "/BolgThree.jpg",
  },
  {
    id: 4,
    category: "Beauty Basics",
    title: "The Ultimate Guide to Building Your Beauty Routine",
    description:
      "Master the art of layering products and find out which beauty essentials truly matter.",
    image: "/BolgFore.jpg",
  },
  {
    id: 5,
    category: "Lifestyle",
    title: "Morning Habits That Boost Your Confidence and Glow",
    description:
      "Simple morning rituals that help you feel energized, positive, and radiant all day long.",
    image: "/BolgFive.jpg",
  },
  {
    id: 6,
    category: "Hair Care",
    title: "Natural Hair Masks for Deep Nourishment",
    description:
      "DIY hair mask recipes to restore shine, strength, and moisture using ingredients from your kitchen.",
    image: "/BolgSix.jpg",
  },
  {
    id: 7,
    category: "Makeup",
    title: "Everyday Makeup Look for a Fresh, Natural Finish",
    description:
      "A step-by-step guide to creating a glowing, effortless makeup look suitable for any occasion.",
    image: "/BolgSven.jpg",
  },
  {
    id: 8,
    category: "Lifestyle",
    title: "Self-Care Sundays: How to Recharge and Reset",
    description:
      "Unplug, unwind, and rejuvenate your mind and body with these self-care rituals.",
    image: "/BolgEghit.jpg",
  },
  {
    id: 9,
    category: "Beauty Basics",
    title: "Skincare Routine for Beginners: What You Really Need",
    description:
      "Confused about where to start? Here’s a simple skincare guide for every skin type.",
    image: "/BolgNine.jpg",
  },
  {
    id: 10,
    category: "Hair Care",
    title: "The Best Haircuts for 2026 According to Stylists",
    description:
      "Explore the trendiest hairstyles of 2026 that flatter every face shape and hair type.",
    image: "/BolgTen.jpg",
  },
  {
    id: 11,
    category: "Makeup",
    title: "How to Make Your Makeup Last All Day",
    description:
      "Pro tips and product recommendations to keep your makeup flawless from morning till night.",
    image: "/Bolg11.jpg",
  },
  {
    id: 12,
    category: "Lifestyle",
    title: "Simple Wellness Habits for a Happier Life",
    description:
      "Incorporate these easy lifestyle changes to improve your mood, health, and overall well-being.",
    image: "/Bolg12.jpg",
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "Ali",
    lastName: "Mohammad",
    email: "Alimohammad@gmail.com",
    street: "salhia Street",
    city: "aleppo",
    zipcode: 90210,
    country: "Syria",
    phone: "+1-555-123-4567",
  },
  {
    _id: "67b5b9e54ea97fdfgdbcsd5",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "Ahmed",
    lastName: "Teerki",
    email: "ahmmadteerki@gmail.com",
    street: "456 asad aldeen",
    city: "Damascuse",
    zipcode: "985577",
    country: "Syria",
    phone: "995830589",
  },
];
// orders data:
export const dummyOrdersData = [
  {
    _id: "685a5bbfaff57babcdfcc171",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: DummyProducts[0], // Argan Hair Oil
        quantity: 1,
        size: "50ml",
        _id: "685a5bbfaff57babcdfcc172",
      },
      {
        product: DummyProducts[3], // Tea Tree Hair Oil
        quantity: 2,
        size: "100ml",
        _id: "685a5bbfaff57babcdfcc173",
      },
    ],
    amount: 40.6,
    address: dummyAddress[0],
    status: "Out for delivery",
    paymentMethod: "COD",
    isPaid: false,
    createdAt: "2025-06-24T08:03:11.197+00:00",
    updatedAt: "2025-06-24T11:02:04.631+00:00",
    __v: 0,
  },
  {
    _id: "685a5bbfaff57babcdfcc174",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: DummyProducts[0], // Vitamin C Face Oil
        quantity: 2,
        size: "100ml",
        _id: "685a5bbfaff57babcdfcc175",
      },
      {
        product: DummyProducts[20], // Volumizing Shampoo
        quantity: 3,
        size: "50ml",
        _id: "685a5bbfaff57babcdfcc176",
      },
    ],
    amount: 85.0,
    address: dummyAddress[0],
    status: "Delivered",
    paymentMethod: "Online",
    isPaid: true,
    createdAt: "2025-07-01T09:15:45.197+00:00",
    updatedAt: "2025-07-01T11:30:04.631+00:00",
    __v: 0,
  },
];

// Dashboard Dummy Data
export const dummyDashboardData = {
  totalOrders: 2,
  totalRevenue: 897,
  orders: dummyOrdersData,
};

import logoImg from "./logo.svg";
import search from "./search.svg";
import user from "./user.svg";
import menu from "./menu.svg";
import menuClose from "./menu-close.svg";
import cartAdd from "./cart-add.svg";
import cartRemove from "./cart-remove.svg";
import cartAdded from "./cart-added.svg";
import forward from "./forward.svg";
import badge from "./badge.svg";
import heartAdd from "./heart-add.svg";
import returnRequest from "./return-request.svg";
import delivery from "./delivery.svg";
import secure from "./secure.svg";
import right from "./right.svg";
import pin from "./pin.svg";
import star from "./star.svg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import twitter from "./twitter.svg";
import linkedin from "./linkedin.svg";
import rocket from "./rocket.svg";
import mail from "./mail.svg";
import phone from "./phone.svg";
import house from "./house.svg";
import graph from "./graph.svg";
import dollar from "./dollar.svg";
import map from "./map.svg";
import list from "./list.svg";
import dashboard from "./dashboard.svg";
import plus from "./plus.svg";
import squarePlus from "./square-plus.svg";
import minus from "./minus.svg";
import trash from "./trash.svg";
import hero from "./hero.png";
import features1 from "../assets/features1.png";
import features2 from "../assets/features2.png";
import userImg from "./user.png";
import user1 from "./user1.png";
import user2 from "./user2.png";
import user3 from "./user3.png";
import user4 from "./user4.png";
import uploadIcon from "../assets/upload_icon.png";

export const assets = {
  logoImg,
  search,
  user,
  menu,
  menuClose,
  cartAdd,
  cartRemove,
  cartAdded,
  forward,
  badge,
  heartAdd,
  returnRequest,
  delivery,
  secure,
  right,
  pin,
  star,
  facebook,
  instagram,
  twitter,
  linkedin,
  rocket,
  mail,
  phone,
  dollar,
  house,
  graph,
  map,
  dashboard,
  plus,
  minus,
  squarePlus,
  trash,
  list,
  userImg,
  user1,
  user2,
  user3,
  user4,
  hero,
  features1,
  features2,
  uploadIcon,
};
