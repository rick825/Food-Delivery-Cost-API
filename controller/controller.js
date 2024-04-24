const { Organization, Item, Pricing } = require('../model/model');

async function generateNextNumber(model) {
    try {
        let lastNumberDoc = await model.findOne().sort({ _id: -1 });

        let lastNumber = 0;
        if (lastNumberDoc) {
            lastNumber = lastNumberDoc.id;
        }

        const nextNumber = parseInt(lastNumber) + 1;

        const paddedNumber = String(nextNumber).padStart(3, '0');

        return paddedNumber;
    } catch (error) {
        throw new Error("Error generating next number: " + error.message);
    }
}

// add organization
exports.addOrganizationData = async (req, res) => {
    try {
        console.log("Organization Data Running");
        if (!req.body.name) {
            console.log('Error while retrieving name');
            return res.status(400).json({ error: 'Error while retrieving name' });
        }

        const organizationName = req.body.name;
        console.log("organizationName:", organizationName);
        const organizationId = await generateNextNumber(Organization); 


        const organization = new Organization({
            id: organizationId,
            name: organizationName
        });

        const savedOrganization = await organization.save();

        console.log("New organization has been added", savedOrganization);
        res.status(200).json(savedOrganization);
    } catch (error) {
        console.log("Error While Organization Data:", error);
        res.status(500).json({ error: "Error While Organization Data", message: error.message });
    }
}

//update organization
exports.updateOrganizationData=async(req,res)=>{
  try {
    
    const { id, name } = req.body;

    if(!id){
      console.log("No Id Provided for update")
      return res.status(400).json({error: "Error While Retreiving ID"})
    }

    const updatedOrganization = await Organization.findOneAndUpdate(
      { id: id },
      { name: name },
      { new: true } 
  );

  if (!updatedOrganization) {
      console.log("Organization not found with the provided ID");
      return res.status(404).json({ error: "Organization not found with the provided ID" });
  }

    console.log("Updated Successfully");
    return res.status(200).json({ message: "Updated Successfully", organization: updatedOrganization });
    
  } catch (error) {
    console.log('Error while updating organization  data',error);
    res.status(500).json({error: "Error While Updating Organization Data"})
  }
}

// detete organization
exports.deleteOrganizationData = async (req,res)=>{
   try {
    
    const {id} = req.body;

    console.log("Id-->",id);
    
    if(!id){
      console.log("No Id Provided for update")
      return res.status(400).json({error: "Error While Retreiving ID"})
    }

    const deleteOrganization = await  Organization.findOneAndDelete({id:id});
    if (!deleteOrganization) {
        return res.status(400).json({ error: 'Delete Failed! This organization not Found' })
    }

    console.log("Deleted Successfully");
    return res.status(200).json({message:"Deleted Successfully!",deletedOrganization:deleteOrganization});
    
    
   } catch (error) {
     console.log('Error While  Deleting The Record ',error);
     res.status(500).json({error: "Error While Deleting The Record"});
   }
}


//add Item Data
exports.addItemData = async(req,res)=>{
  try {
     
    const {type, description} = req.body;
    
    if(!type && !description){
      console.log('Error while retrieving  type and description');
      return res.status(400).send({error:'Type and Description are required fields!'});
    }

   const typeinlowercase = type.toLowerCase();

    
    if ( typeinlowercase !== "perishable" &&   typeinlowercase !== "non-perishable") {
      console.log("Invalid type provided");
      return res.status(400).json({ message: "Invalid item type. Must be 'perishable' or 'non-perishable'." });
    }

    const ItemId = await  generateNextNumber(Item);

     const item = new  Item ({
       id: ItemId,
       type:typeinlowercase,
       description
     })

     const savedItem = await  item.save();
     console.log("Added a new item to the database", savedItem);
     res.status(200).json(savedItem);

  } catch (error) {
    console.log({'Error while  adding item to the database': error});
    res.status(500).json(error);
  }
}


//update Item Data
exports.updateItemData = async (req, res) => {
  try {
    const { id, type, description } = req.body;
    const typeinlowercase = type.toLowerCase();

    if (!id) {
      console.log("No Id Provided for Update");
      return res.status(400).json({ message: "No Id Provided for update" });
    }

    if (typeinlowercase !== "perishable" && typeinlowercase !== "non-perishable") {
      console.log("Invalid type provided");
      return res.status(400).json({ message: "Invalid item type. Must be 'perishable' or 'non-perishable'." });
    }

    const updatedItem = await Item.findOneAndUpdate(
      { id: id },
      { type: typeinlowercase, description: description },
      { new: true }
    );



    if (!updatedItem) {
      console.log("Item Not Found");
      return res.status(404).json({ message: "Item Not Found" });
    }

    console.log("Item Updated Successfully");
    return res.status(200).json({ message: "Item Updated Successfully", updatedItem: updatedItem });
  } catch (error) {
    console.log("Error in updating item:", error);
    return res.status(500).json({ error: "Error Updating the Item" });
  }
};


//delete Item
exports.deleteItem = async (req, res) => {
  try {

    const {id} = req.body;

    if (!id) {
      console.log("No Id Provided for Delete");
      return res.status(400).json({ message: "No Id Provided for Delete" });
    }

    const  deleteItem = await Item.findOneAndDelete({id:id});

    if (!deleteItem) {
      return res.status(400).json({ error: 'Delete Failed! This Item Not Found.' })
  }

  console.log("Deleted Successfully");
  return res.status(200).json({message:"Deleted Successfully!",deletedItem:deleteItem});
  

  } catch (error) {
    console.log("Error while deleting item",error);
    return res.status(500).json({error:"Error Deleting the Item"});
  }
}



exports.setPrice = async (req,res)=>{
  try {

     console.log("Running Set Price Checked!!");   
     const { organization_id, item_id, zone, base_distance_in_km, fix_price } = req.body;

    if (!organization_id || !item_id || !zone ) {
      return res.status(400).json({ error: "Organization ID, Item ID, Zone are required" });
    }
   
    const organizedIdFound = await Organization.findOne({id:organization_id});
    const  itemIdFound=await Item.findOne({id:item_id});

    if(!organizedIdFound && !itemIdFound){
        return res.status(400).json({ error: `The provided Organization id & Item Id does not exist in our records`})
    }

    if(!organizedIdFound){
        return res.status(400).json({ error: `The provided Organization ID does not exist in our records.`});
    }

    if(!itemIdFound){
      return res.status(400).json({error:'The Provided Item ID Does not exist in our records'});
    }

    const existingPrice = await Pricing.findOne({ organization_id, item_id });

    if (existingPrice) {
      return res.status(400).json({ error: 'Price already set for the provided Organization ID and Item ID' });
    }
   
    console.log("Running");
    const item = await Item.findOne({id:item_id});
    item_type = item.type;

    console.log("Item ID Found-->",item);
    const km_price =  Pricing.getDefaultPrices(item_type);

    console.log("Pricing Set to:-->",km_price);

    const pricing = new Pricing({
      organization_id , 
      item_id,
      zone, 
      base_distance_in_km, 
      km_price: km_price, 
      fix_price
    })

    console.log("pricing fetched-->", pricing);

    await pricing.save();

    console.log(`Pricing set successfully for ${organization_id} & ${item_id}`);
    return res.status(200).json({message:"Pricing set successfully",pricing:pricing});
  } catch (error) {
    console.log();
  }
}


exports.getTotalPrice = async (req, res) => {
  try {
      const { zone, organization_id, total_distance, item_type } = req.body;
      
      console.log( zone, organization_id, total_distance, item_type );
      
      if(!total_distance){
        return res.status(400).json({message:"Please Provide Total Distance for final price"})
      }

      if(!item_type){
          return res.status(400).json({message:"Please Provide Food Type. Must be 'perishable' or 'non-perishable'"})
      }

      const typeinlowercase = item_type.toLowerCase();
      if ( typeinlowercase !== "perishable" &&   typeinlowercase !== "non-perishable") {
        console.log("Invalid type provided");
        return res.status(400).json({ message: "Invalid item type. Must be 'perishable' or 'non-perishable'." });
      }

      const defaultPrice = Pricing.getDefaultPrices(typeinlowercase);
      console.log("Item Type:",typeinlowercase,"km_prices:",defaultPrice);
      

      const query = {};
      if (zone) query.zone = zone;
      if (organization_id) query.organization_id = organization_id;
      query.km_price = defaultPrice;
      
      const pricing = await Pricing.find(query);
      if (pricing.length === 0) {
        return res.status(404).json({ error: 'No pricing data found for the provided criteria' });
    }

      let price = (total_distance - pricing[0].base_distance_in_km) * pricing[0].km_price;
      const totalPrice = price + pricing[0].fix_price;

      return res.status(200).json({total_price:totalPrice});
  } catch (error) {
      console.error('Error while fetching pricing:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};