const Metrics = require('../models/Metrics');
const crypto = require('crypto'); // For hashing
const axios = require('axios');

const saveToMongo = async (jsonData) => {
  try {
    // Generate a unique hash for the JSON content
    const hash = crypto
      .createHash('sha256') // Using SHA-256
      .update(JSON.stringify(jsonData))
      .digest('hex');

    // Read device id from http://127.0.0.1:3002/api/device and add organization_id, region_id, store_code
    const response = await axios.get('http://127.0.0.1:3002/api/device');
    const devices = response.data.data;
    const device = devices.find((device) => device.device_id === jsonData.Metrics['@DeviceId']);
    if (!device) {
      console.log('Device not found in the database. Skipping save.');
      return;
    }

    // Create the metrics document with all fields
    const metricsData = {
      Metrics: {
        ...jsonData.Metrics,
        organization_id: device.organization_id,
        region_id: device.region_id,
        store_code: device.store_code,
      },
      hash
    };

    // Use replaceOne with upsert to ensure complete document replacement
    const result = await Metrics.replaceOne(
      { hash },
      metricsData,
      { 
        upsert: true
      }
    );

    if (result.acknowledged) {
      console.log('Data upserted to MongoDB successfully!');
    } else {
      console.log('Failed to upsert document');
    }
  } catch (err) {
    console.error('Error upserting data to MongoDB:', err);
  }
};

module.exports = saveToMongo;
