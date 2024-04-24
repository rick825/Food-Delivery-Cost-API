const express = require('express');
const route  = express.Router();
const controller = require('../controller/controller');
const { Organization, Item, Pricing } = require('../model/model');

//get Organised Data
route.get('/api/getOrganizationData', async (req, res) => {
  try {

    let organizations = await Organization.find();

    if(!organizations || organizations.length === 0){
      console.log("No data found");
      return res.status(404).json({message: "No data found"});
    }

    console.log("data Found");
    return res.status(200).json({message:"Organizations Found", organizations:organizations});
    
  } catch (error) {
    console.log("Error While Getting Organization Data",error);
    return res.status(500).json({error:"Error while Getting Organization Data"})
  }
});

// Get Item Data
route.get('/api/getItemData', async (req, res) => {
    try {
        const items = await Item.find();

        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }
        return res.status(200).json({message:"Items Found",Items:items});
    } catch (error) {
        console.error('Error while retrieving item data:', error);
        return res.status(500).json({ error: 'Error while retrieving item data' });
    }
});

//get All Prices
route.get("/api/getAllPrice",async (req,res)=>{
    try {
        console.log("get All Prices Running");
        const  prices = await Pricing.find();  
    
        return res.status(200).json({prices:prices});
     
      } catch (error) {
        console.log("Error while Getting Prices",error);
        return res.status(500).json({error: "Error while Getting Price"});
      }
})


//organization routes
route.post('/api/addOrganizationData',controller.addOrganizationData);
route.put('/api/updateOrganizationData',controller.updateOrganizationData);
route.delete('/api/deleteOrganizationData', controller.deleteOrganizationData);

// Item Routes
route.post('/api/addItemData',controller.addItemData);
route.put('/api/updateItemData',controller.updateItemData);
route.delete('/api/deleteItemData',controller.deleteItem);

//Pricing Routes
route.post('/api/setPrice', controller.setPrice);
route.get('/api/getTotalPrice',controller.getTotalPrice);
module.exports =  route;