# Food Delivery API Documentation

## Introduction
This API manages organizations, items, and pricing for a food delivery service.

## Base URL
The base URL for accessing the API is `https://food-delivery-cost-api.onrender.com/`.

## Authentication
Authentication is not required to access the endpoints of this API.

## Endpoints

### Get Organization Data
- URL: `/api/getOrganizationData`
- Method: GET
- Description: Retrieve all organizations.
- Request Parameters: None
- Response:
  - Status Code: 200 OK
  - Content: 
    
    {
      "message": "Organizations Found",
      "organizations": [Array of Organization Objects]
    }
    
- Error Response:
  - Status Code: 404 Not Found
  - Content: `{ "message": "No data found" }`

### Get Item Data
- URL: `/api/getItemData`
- Method: GET
- Description: Retrieve all items.
- Request Parameters: None
- Response:
  - Status Code: 200 OK
  - Content: 
    
    {
      "message": "Items Found",
      "Items": [Array of Item Objects]
    }
    
- Error Response:
  - Status Code: 404 Not Found
  - Content: `{ "message": "No items found" }`

### Get All Prices
- URL: `/api/getAllPrice`
- Method: GET
- Description: Retrieve all pricing information.
- Request Parameters: None
- Response:
  - Status Code: 200 OK
  - Content: 
    
    {
      "prices": [Array of Pricing Objects]
    }
    

#### Organization Routes

##### Add Organization Data
- URL: `/api/addOrganizationData`
- Method: POST
- Description: Add a new organization.
- Request Body:
  
  {
    "name": "Organization Name"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "id": "Organization ID", "name": "Organization Name" }`

##### Update Organization Data
- URL: `/api/updateOrganizationData`
- Method: PUT
- Description: Update an organization.
- Request Body:
  
  {
    "id": "Organization ID",
    "name": "Updated Organization Name"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "message": "Updated Successfully", "organization": Updated Organization Object }`

- Error Response:
  - Status Code: 404 Not Found
  - Content: `{ "error": "Organization not found with the provided ID" }`

##### Delete Organization Data
- URL: `/api/deleteOrganizationData`
- Method: DELETE
- Description: Delete an organization.
- Request Body:
  
  {
    "id": "Organization ID"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "message": "Deleted Successfully", "deletedOrganization": Deleted Organization Object }`

- Error Response:
  - Status Code: 400 Bad Request
  - Content: `{ "error": "Delete Failed! This organization not Found" }`

#### Item Routes

##### Add Item Data
- URL: `/api/addItemData`
- Method: POST
- Description: Add a new item.
- Request Body:
  
  {
    "type": "Item Type",
    "description": "Item Description"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "id": "Item ID", "type": "Item Type", "description": "Item Description" }`

##### Update Item Data
- URL: `/api/updateItemData`
- Method: PUT
- Description: Update an item.
- Request Body:
  
  {
    "id": "Item ID",
    "type": "Updated Item Type",
    "description": "Updated Item Description"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "message": "Item Updated Successfully", "updatedItem": Updated Item Object }`
  
- Error Response:
  - Status Code: 404 Not Found
  - Content: `{ "error": "Item Not Found" }`

##### Delete Item Data
- URL: `/api/deleteItemData`
- Method: DELETE
- Description: Delete an item.
- Request Body:
  
  {
    "id": "Item ID"
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "message": "Deleted Successfully", "deletedItem": Deleted Item Object }`
- Error Response:
  - Status Code: 400 Bad Request
  - Content: `{ "error": "Delete Failed! This Item Not Found." }`

#### Pricing Routes

##### Set Price
- URL: `/api/setPrice`
- Method: POST
- Description: Set pricing for an organization and item.
- Request Body:
  
  {
    "organization_id": "Organization ID",
    "item_id": "Item ID",
    "zone": "Delivery Zone",
    "base_distance_in_km": 10,
    "fix_price": 50
  }
  
- Response:
  - Status Code: 200 OK
  - Content: `{ "message": "Pricing set successfully", "pricing": Pricing Object }`
- Error Response:
  - Status Code: 400 Bad Request
  - Content: `{ "error": "Organization ID, Item ID, Zone are required" }`

##### Get Total Price
- URL: `/api/getTotalPrice`
- Method: GET
- Description: Calculate total price for a delivery.
- Request Parameters:
  - `zone`: Delivery zone
  - `organization_id`: Organization ID
  - `total_distance`: Total distance of the delivery
  - `item_type`: Type of item ('perishable' or 'non-perishable')
- Response:
  - Status Code: 200 OK
  - Content: `{ "total_price": Total Price }`
- Error Response:
  - Status Code: 400 Bad Request
  - Content: `{ "message": "Please Provide Total Distance for final price" }`
