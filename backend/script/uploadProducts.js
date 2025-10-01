const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Define the product schema
const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    description: String,
    price: Number,
    sellingPrice: Number
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

// Function to clean product data
function cleanProductData(product) {
    // Remove unwanted keys
    const { _id, __v, createdAt, updatedAt, ...cleanedProduct } = product;
    
    // Filter out null values from productImage array
    if (cleanedProduct.productImage) {
        cleanedProduct.productImage = cleanedProduct.productImage.filter(img => img !== null);
    }
    
    // Clean description (remove trailing numbers like "1", "2", etc.)
    if (cleanedProduct.description) {
        cleanedProduct.description = cleanedProduct.description.replace(/\s+\d+$/, '');
    }
    
    return cleanedProduct;
}

// Function to upload products in bulk
async function uploadProductsInBulk(products) {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://db1:dbpassword@cluster0.noej3dm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clean the products
        const cleanedProducts = products.map(cleanProductData);
        
        // Use bulkWrite for efficient insertion
        const bulkOps = cleanedProducts.map(product => ({
            updateOne: {
                filter: { productName: product.productName, brandName: product.brandName },
                update: { $set: product },
                upsert: true
            }
        }));

        // Execute bulk operation
        const result = await Product.bulkWrite(bulkOps);
        console.log(`Bulk operation completed. Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
        
        return result;
    } catch (error) {
        console.error('Error uploading products:', error);
        throw error;
    } finally {
        // Close the connection
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Example usage with the provided data
async function main() {
    try {
        // Read the JSON data (assuming it's saved in a file)
        const dataPath = path.join(__dirname, 'products.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        // Extract the products array
        const products = jsonData.data;
        
        // Upload the products
        await uploadProductsInBulk(products);
        console.log('All products uploaded successfully');
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Export the functions for use in other modules
module.exports = {
    Product,
    cleanProductData,
    uploadProductsInBulk
};

// Run the main function if this script is executed directly
if (require.main === module) {
    main();
}