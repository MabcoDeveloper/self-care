import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Products.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dummyProducts = [
  // ---------- HAIR CARE ----------
  {
    title: "Argan Hair Oil",
    title_ar: "زيت الأركان للشعر",
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description: "Rich argan oil for nourishing and moisturizing dry hair.",
    description_ar: "زيت أركان غني لتغذية وترطيب الشعر الجاف.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "oil",
    type_ar: "زيت",
    size: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
    image: ["/HereCare3.png", "/herecareone.png", "/HereCareOne2.png"],
  },
  {
    title: "Herbal Shampoo",
    title_ar: "شامبو عشبي",
    price: { "250ml": 18, "500ml": 30 },
    description: "Natural herbal shampoo that strengthens and revitalizes hair.",
    description_ar: "شامبو عشبي طبيعي يقوي الشعر ويعيد له الحيوية.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "shampoo",
    type_ar: "شامبو",
    size: ["250ml", "500ml"],
    date: 1716634345449,
    popular: false,
    inStock: true,
    image: ["/hereCareTow2.png", "/hereCareTow.png", "/hereCareTow3.png"],
  },
  {
    title: "Keratin Hair Mask",
    title_ar: "قناع الكيراتين للشعر",
    price: { "200ml": 22, "400ml": 38 },
    description: "Deep conditioning mask infused with keratin for smooth hair.",
    description_ar: "قناع ترطيب عميق غني بالكيراتين للحصول على شعر ناعم.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "mask",
    type_ar: "قناع",
    size: ["200ml", "400ml"],
    date: 1716634345450,
    popular: true,
    inStock: true,
    image: ["/HereCareThree.png", "/hereCareThree2.png"],
  },
  {
    title: "Coconut Hair Oil",
    title_ar: "زيت جوز الهند للشعر",
    price: { "50ml": 12, "100ml": 20, "200ml": 32 },
    description: "Pure coconut oil for repairing damaged hair and scalp care.",
    description_ar: "زيت جوز الهند النقي لإصلاح الشعر التالف والعناية بفروة الرأس.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "oil",
    type_ar: "زيت",
    size: ["50ml", "100ml", "200ml"],
    date: 1716634345451,
    popular: true,
    inStock: true,
    image: ["/hereCareFour.png", "/hereCareFour3.png"],
  },
  {
    title: "Vitamin E Hair Serum",
    title_ar: "سيروم فيتامين إي للشعر",
    price: { "30ml": 28, "60ml": 45 },
    description: "Lightweight serum with Vitamin E for shiny, frizz-free hair.",
    description_ar: "سيروم خفيف الوزن بفيتامين إي للحصول على شعر لامع وخالٍ من التشابك.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "serum",
    type_ar: "سيروم",
    size: ["30ml", "60ml"],
    date: 1716634345452,
    popular: false,
    inStock: true,
    image: ["/hereCareFive.png", "/hereCarefive2.png", "/hereCareFive3.png"],
  },
  {
    title: "Aloe Vera Conditioner",
    title_ar: "بلسم الصبار",
    price: { "250ml": 16, "500ml": 27 },
    description: "Hydrating conditioner enriched with aloe vera for soft hair.",
    description_ar: "بلسم مرطب غني بالصبار للحصول على شعر ناعم.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "conditioner",
    type_ar: "بلسم",
    size: ["250ml", "500ml"],
    date: 1716634345453,
    popular: false,
    inStock: true,
    image: ["/hereCareSix.png", "/hereCarefive2.png", "/hereCareFive3.png"],
  },
  {
    title: "Protein Repair Cream",
    title_ar: "كريم إصلاح البروتين",
    price: { "150ml": 24, "300ml": 42 },
    description: "Cream treatment with proteins to repair split ends.",
    description_ar: "كريم علاجي بالبروتينات لإصلاح الأطراف المتقصفة.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "cream",
    type_ar: "كريم",
    size: ["150ml", "300ml"],
    date: 1716634345454,
    popular: false,
    inStock: true,
    image: ["/h5.png"],
  },
  {
    title: "Leave-In Heat Protect Spray",
    title_ar: "سبراي حماية من الحرارة",
    price: { "150ml": 20, "300ml": 35 },
    description: "Protects hair from heat styling while adding shine and softness.",
    description_ar: "يحمي الشعر من أدوات التصفيف الحرارية مع إضافة اللمعان والنعومة.",
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    type: "spray",
    type_ar: "سبراي",
    size: ["150ml", "300ml"],
    date: 1716634345455,
    popular: false,
    inStock: true,
    image: ["/h2.png"],
  },

  // ---------- BODY CARE ----------
  {
    title: "Citrus Body Wash",
    title_ar: "غسول الجسم بالحمضيات",
    price: { "200ml": 10, "500ml": 18 },
    description: "Refreshing citrus body wash that cleanses and energizes the skin.",
    description_ar: "غسول جسم منعش بالحمضيات ينظف البشرة وينشطها.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "wash",
    type_ar: "غسول",
    size: ["200ml", "500ml"],
    date: 1716634345456,
    popular: false,
    inStock: false,
    image: ["/bodyCareOne.png", "/bodyCarOne2.png", "/bodyCareOne3.png"],
  },
  {
    title: "Shea Body Butter",
    title_ar: "زبدة الشيا للجسم",
    price: { "200ml": 22, "400ml": 38 },
    description: "Ultra moisturizing shea butter cream for dry skin.",
    description_ar: "كريم زبدة الشيا فائق الترطيب للبشرة الجافة.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "cream",
    type_ar: "كريم",
    size: ["200ml", "400ml"],
    date: 1716634345457,
    popular: false,
    inStock: true,
    image: ["/bodyCareTow2.png", "/bodyCareTow.png"],
  },
  {
    title: "Exfoliating Salt Scrub",
    title_ar: "مقشر الملح للجسم",
    price: { "150g": 14, "350g": 26 },
    description: "Natural sea salt scrub to remove dead skin and boost circulation.",
    description_ar: "مقشر طبيعي بملح البحر لإزالة الجلد الميت وتحسين الدورة الدموية.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "scrub",
    type_ar: "مقشر",
    size: ["150g", "350g"],
    date: 1716634345458,
    popular: true,
    inStock: true,
    image: ["/bodyCareThree2.png", "/bodyCareThree.png", "/bodyCareThree3.png"],
  },
  {
    title: "Lavender Body Oil",
    title_ar: "زيت اللافندر للجسم",
    price: { "100ml": 18, "200ml": 30 },
    description: "Calming lavender oil for massage and skin nourishment.",
    description_ar: "زيت اللافندر المهدئ للمساج وتغذية البشرة.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "oil",
    type_ar: "زيت",
    size: ["100ml", "200ml"],
    date: 1716634345459,
    popular: false,
    inStock: true,
    image: ["/bodyCareFour.png", "/bodyCareFour2.png", "/bodyCareFour3.png"],
  },
  {
    title: "Energizing Body Mist",
    title_ar: "رذاذ الجسم المنعش",
    price: { "120ml": 12 },
    description: "Light mist to refresh skin and provide a subtle scent during the day.",
    description_ar: "رذاذ خفيف لتنشيط البشرة وتوفير رائحة خفيفة طوال اليوم.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "mist",
    type_ar: "رذاذ",
    size: ["120ml"],
    date: 1716634345460,
    popular: false,
    inStock: true,
    image: ["/bodyCareFive.png", "/bodyCareFive2.png", "/bodyCareFive3.png"],
  },
  {
    title: "Firming Body Lotion",
    title_ar: "مرطب الجسم المثبت",
    price: { "200ml": 20, "400ml": 36 },
    description: "Lotion formulated to hydrate skin and improve firmness over time.",
    description_ar: "مرطب مصمم لترطيب البشرة وتحسين تماسكها مع مرور الوقت.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "lotion",
    type_ar: "مرطب",
    size: ["200ml", "400ml"],
    date: 1716634345461,
    popular: true,
    inStock: true,
    image: ["/bodyCareSix.png", "/bodyCareSix2.png", "/bodyCareSix3.png"],
  },
  {
    title: "Deodorant Cream",
    title_ar: "كريم مزيل العرق",
    price: { "50ml": 9 },
    description: "Aluminum-free deodorant cream with natural odor protection.",
    description_ar: "كريم مزيل عرق خالي من الألمنيوم مع حماية طبيعية من الرائحة.",
    category: "Body Care",
    category_ar: "العناية بالجسم",
    type: "deodorant",
    type_ar: "مزيل عرق",
    size: ["50ml"],
    date: 1716634345462,
    popular: false,
    inStock: true,
    image: ["/bodycareeghit.png", "/bodyCareEghit2.png", "/bodyCareEghit3.png"],
  },

  // ---------- FACE CARE ----------
  {
    title: "Hydrating Face Serum",
    title_ar: "سيروم ترطيب الوجه",
    price: { "30ml": 28, "50ml": 42 },
    description: "Lightweight serum with hyaluronic acid for deep hydration.",
    description_ar: "سيروم خفيف الوزن بحمض الهيالورونيك للترطيب العميق.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "serum",
    type_ar: "سيروم",
    size: ["30ml", "50ml"],
    date: 1716634345463,
    popular: true,
    inStock: true,
    image: ["/faceCareOne.png", "/faceCare2.png", "/faceCare3.png"],
  },
  {
    title: "Vitamin C Brightening Cream",
    title_ar: "كريم فيتامين سي المضيء",
    price: { "30ml": 26, "60ml": 46 },
    description: "Brightening cream to even skin tone and boost radiance.",
    description_ar: "كريم إضاءة لتوحيد لون البشرة وتعزيز التوهج.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "cream",
    type_ar: "كريم",
    size: ["30ml", "60ml"],
    date: 1716634345464,
    popular: true,
    inStock: true,
    image: ["/faceCareTow.png", "/faceCareTow2.png"],
  },
  {
    title: "Gentle Foaming Cleanser",
    title_ar: "منظف رغوي لطيف",
    price: { "150ml": 12, "300ml": 20 },
    description: "Mild cleanser that removes dirt and makeup without drying skin.",
    description_ar: "منظف لطيف يزيل الأوساخ والمكياج دون تجفيف البشرة.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "cleanser",
    type_ar: "منظف",
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
    title: "Niacinamide Pore Serum",
    title_ar: "سيروم النياسيناميد للمسام",
    price: { "30ml": 30 },
    description: "Helps minimize pores and control excess oil for a smoother complexion.",
    description_ar: "يساعد في تصغير المسام والتحكم في الزيوت الزائدة للحصول على بشرة أكثر نعومة.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "serum",
    type_ar: "سيروم",
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
    
    title: "SPF 50 Face Sunscreen",
    title_ar: "واقي شمس للوجه SPF 50",
    price: { "50ml": 18 },
    description: "Light, non-greasy sunscreen to protect skin from UV damage.",
    description_ar: "واقي شمس خفيف وغير دهني لحماية البشرة من أضرار الأشعة فوق البنفسجية.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "sunscreen",
    type_ar: "واقي شمس",
    size: ["50ml"],
    date: 1716634345467,
    popular: true,
    inStock: true,
    image: ["/faceCareFive.png", "/faceCareFive2.png"],
  },
  {
    title: "Overnight Repair Mask",
    title_ar: "قناع الإصلاح الليلي",
    price: { "50ml": 34, "100ml": 60 },
    description: "Overnight mask that repairs and rejuvenates skin while you sleep.",
    description_ar: "قناع ليلي يصلح وينعش البشرة أثناء النوم.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "mask",
    type_ar: "قناع",
    size: ["50ml", "100ml"],
    date: 1716634345468,
    popular: false,
    inStock: true,
    image: ["/faceCareSven.png", "/faceCareSven2.png", "/faceCareSven3.png"],
  },
  {
    title: "Soothing Eye Gel",
    title_ar: "جل مهدئ للعين",
    price: { "15ml": 16 },
    description: "Cooling gel to reduce puffiness and hydrate the delicate eye area.",
    description_ar: "جل مبرد لتقليل الانتفاخ وترطيب منطقة العين الحساسة.",
    category: "Face Care",
    category_ar: "العناية بالوجه",
    type: "eye-gel",
    type_ar: "جل عيون",
    size: ["15ml"],
    date: 1716634345469,
    popular: false,
    inStock: true,
    image: ["/faceCareEghit.png", "/facecareEghit2.png"],
  },
]

{
  /*Blogs Dummy Data*/
}
export const blogs = [
  {
    id: 1,
    category: "Skincare Tips",
    category_ar: "نصائح العناية بالبشرة",
    title: "Top 10 Skincare Must-Haves for 2026",
    title_ar: "أهم 10 منتجات للعناية بالبشرة في 2026",
    description: "Discover the essential skincare products you need in your routine for glowing, healthy skin in 2026.",
    description_ar: "اكتشف المنتجات الأساسية للعناية بالبشرة التي تحتاجها في روتينك للحصول على بشرة متوهجة وصحية في 2026.",
    image: "/BolgOne.jpg",
  },
  {
    id: 2,
    category: "Hair Care",
    category_ar: "العناية بالشعر",
    title: "5 Proven Ways to Get Stronger, Shinier Hair",
    title_ar: "5 طرق مثبتة للحصول على شعر أقوى وأكثر لمعانًا",
    description: "Learn simple yet powerful hair care habits that will transform your hair health naturally.",
    description_ar: "تعلم عادات العناية بالشعر البسيطة والقوية التي ستغير صحة شعرك بشكل طبيعي.",
    image: "/BolgTow.jpg",
  },
]

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET
});

async function blukUpload() {
    try {
        // connect to mongodb
        await mongoose.connect(`${process.env.MONGO_URI}`); // 

        for (const prod of dummyProducts) {
            // upload images to cloudinary
            const imagesUrl = await Promise.all(
                prod.image.map(async (filename) => {
                    const cleanName = filename.replace("/", "");
                    const filePath = path.join(__dirname, "images", filename)
                    const result = await cloudinary.uploader.upload(filePath, {
                        resource_type: "image",
                    });
                    
                    return result.secure_url;
                })
            );
            await Product.create({
                title: prod.title,
                description: prod.description,
                price: prod.price,
                sizes: prod.size,
                images: imagesUrl,
                category: prod.category,
                type: prod.type,
                popular: prod.popular,
                inStock: prod.inStock,
            });
            console.log(`uploaded: ${prod.title}`)
        }

        console.log("all products uploaded successfully!")

    } catch (err) {
        console.error("Error", err.message)
    } finally {
        mongoose.disconnect();
    }
}

blukUpload();

/*import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Products.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLDN_NAME,
  api_key: process.env.CLDN_API_KEY,
  api_secret: process.env.CLDN_API_SECRET,
});

async function bulkUpload() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const prod of dummyProducts) {
      const imagesUrl = await Promise.all(
        prod.image.map(async (filename) => {
          const cleanName = filename.replace("/", "");
          const filePath = path.join(__dirname, "images", cleanName);

          const result = await cloudinary.uploader.upload(filePath);
          return result.secure_url;
        })
      );

      await Product.create({
        title: prod.title,
        description: prod.description,
        price: prod.price,
        sizes: prod.size,
        images: imagesUrl,
        category: prod.category,
        type: prod.type,
        popular: prod.popular,
        inStock: prod.inStock,
      });

      console.log(`✅ Uploaded: ${prod.title}`);
    }

    console.log("🎉 All products uploaded successfully");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

bulkUpload();
 */