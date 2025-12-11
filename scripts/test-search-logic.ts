
const products = [
    { title: "Blue Hoodie", description: "Warm winter wear" },
    { title: "Red Sweater", description: "Cozy knit" },
    { title: "Summer T-Shirt", description: "Cool cotton" }
];

const query = "hoodie sweater"; // Represents "hoodie+sweater"
const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

console.log("Query Tokens:", tokens);

const results = products.filter(p => {
    const text = (p.title + ' ' + p.description).toLowerCase();
    // Logic from store.ts
    return tokens.some(token => text.includes(token));
});

console.log("Matches found:", results.length);
results.forEach(p => console.log(`- ${p.title}`));

if (results.length === 2) {
    console.log("✅ SUCCESS: Found both Hoodie and Sweater.");
} else {
    console.log("❌ FAILURE: Expected 2 matches.");
}
