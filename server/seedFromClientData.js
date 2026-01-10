import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/Products.js";
import Address from "./models/Address.js";
import Order from "./models/Order.js";
import fs from "fs";
import vm from "vm";

// Helper to extract exported array/object from the client data.js without importing assets
function extractExport(name, fileText, context = {}) {
  const exportToken = `export const ${name}`;
  const idx = fileText.indexOf(exportToken);
  if (idx === -1) return null;
  const after = fileText.slice(idx + exportToken.length);
  const startBracket = after.indexOf("=") ;
  if (startBracket === -1) return null;
  const rest = after.slice(startBracket + 1);

  // find first '[' or '{'
  const firstCharIdx = rest.search(/\S/);
  const openChar = rest[firstCharIdx];
  const closeChar = openChar === "{" ? "}" : "]";

  let depth = 0;
  let endPos = -1;
  for (let i = firstCharIdx; i < rest.length; i++) {
    const ch = rest[i];
    if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        endPos = i;
        break;
      }
    }
  }
  if (endPos === -1) return null;
  const literal = rest.slice(firstCharIdx, endPos + 1);
  // evaluate the literal in a safe vm context
  const script = `(${literal})`;
  return vm.runInNewContext(script, context);
}

const dataFile = fs.readFileSync(new URL('../client/src/assets/data.js', import.meta.url), 'utf8');
const DummyProducts = extractExport('DummyProducts', dataFile, {}) || [];
const dummyAddress = extractExport('dummyAddress', dataFile, {}) || [];
const dummyOrdersData = extractExport('dummyOrdersData', dataFile, { DummyProducts, dummyAddress }) || [];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/vogues");
    console.log("Connected to MongoDB for seeding");

    // Clear existing collections
    await Product.deleteMany({});
    await Address.deleteMany({});
    await Order.deleteMany({});

    // Insert products
    const isObjectId = (val) => typeof val === 'string' && /^[a-fA-F0-9]{24}$/.test(val);

    const productsToInsert = DummyProducts.map((p) => {
      const doc = {
        // only set _id when it's a valid 24-char hex ObjectId string
        ...(isObjectId(p._id) ? { _id: p._id } : {}),
        title: p.title,
        title_ar: p.title_ar,
        price: p.price,
        description: p.description,
        description_ar: p.description_ar,
        category: p.category,
        category_ar: p.category_ar,
        type: p.type,
        type_ar: p.type_ar,
        size: p.size,
        date: p.date || Date.now(),
        popular: !!p.popular,
        inStock: !!p.inStock,
        image: p.image || p.images || [],
      };
      return doc;
    });
    console.log(`Prepared ${productsToInsert.length} products to insert`);

    // Try creating a single product to surface validation errors (if any)
    try {
      const single = await Product.create(productsToInsert[0]);
      console.log('Single product created (debug):', single._id || single.title || 'ok');
      // remove the created one from list so we don't duplicate
      productsToInsert.shift();
    } catch (e) {
      console.error('Single product create failed (debug):', e.message);
    }

    let insertedProducts = [];
    try {
      insertedProducts = await Product.insertMany(productsToInsert, { ordered: false });
      console.log(`Inserted ${insertedProducts.length} products`);
    } catch (err) {
      console.error('Products insertMany error:', err.message);
      if (err.writeErrors && err.writeErrors.length) {
        console.error('Write errors count:', err.writeErrors.length);
        err.writeErrors.forEach((we, i) => {
          console.error(i, we.err ? we.err.message : we);
        });
      }

      // Try inserting documents one by one to show validation errors
      let successCount = 0;
      for (const prod of productsToInsert) {
        try {
          await Product.create(prod);
          successCount++;
        } catch (e) {
          console.error('Failed to insert product:', prod.title, e.message);
        }
      }
      console.log(`Inserted ${successCount} products after retrying individually`);
    }

    // Insert addresses
    const insertedAddresses = await Address.insertMany(dummyAddress || [], { ordered: false });
    console.log(`Inserted ${insertedAddresses.length} addresses`);

    // Insert orders (use the dummyOrdersData as-is)
    const ordersToInsert = (dummyOrdersData || []).map((o) => ({
      ...o,
      createdAt: o.createdAt || new Date(),
      updatedAt: o.updatedAt || new Date(),
    }));

    const insertedOrders = await Order.insertMany(ordersToInsert, { ordered: false });
    console.log(`Inserted ${insertedOrders.length} orders`);

    console.log("Seeding complete");
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

seed();
