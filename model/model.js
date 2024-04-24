const mongoose = require('mongoose');

// Schema for Organization
const organizationSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

// Schema for Item
const itemSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
        requires: true
    }
});

// Schema for Pricing
const pricingSchema = mongoose.Schema({
    organization_id: {
        type: String,
        ref: 'Organization',
        required: true
    },
    item_id: {
        type: String,
        ref: 'Item',
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    base_distance_in_km: {
        type: Number,
        required: true,
        default: 5
    },
    km_price: {
        type: Number,
        required: true,
        default: 1.5 
    },
    fix_price: {
        type: Number,
        required: true,
        default: 10
    }
});

pricingSchema.statics.getDefaultPrices = function(itemType) {
    if (itemType === 'perishable') {
        let  perishablePrice = 1.5
        return perishablePrice;
    } else if (itemType === 'non-perishable') {
        let  NonperishablePrice = 1
        return NonperishablePrice;
    }
};

const lastGeneratedOrganisationIdSchema = new mongoose.Schema({
    lastNumber: { type: Number, default: 0 }
});

const lastGeneratedItemIdSchema = new mongoose.Schema({
    lastNumber: { type: Number, default: 0, description: {
        type: String,
        required: true
    } }
});

// Export the schemas
const Organization = mongoose.model('Organization', organizationSchema);
const Item = mongoose.model('Item', itemSchema);
const Pricing = mongoose.model('Pricing', pricingSchema);
const lastGeneratedOrId = mongoose.model('lastGeneratedOrId', lastGeneratedOrganisationIdSchema );
const lastGeneratedItemId = mongoose.model('lastGeneratedItemId',lastGeneratedItemIdSchema)

module.exports = { Organization, Item, Pricing, lastGeneratedOrId, lastGeneratedItemId };
