const mongoose = require("mongoose");

const MetricsSchema = new mongoose.Schema(
  {
    Metrics: {
      "@Devicename": { type: String, required: true },
      "@DeviceId": { type: String, required: true },
      "@Sitename": { type: String, required: true },
      "@SiteId": { type: String, required: true },
      organization_id: { type: String },
      region_id: { type: String },
      store_code: { type: String },
      device_id: { type: String },
      Properties: {
        MacAddress: { type: String },
        IpAddress: { type: String },
        HttpPort: { type: String },
        HttpsPort: { type: String },
        HostName: { type: String },
        TimeZone: { type: String },
        DST: { type: String },
        DeviceType: { type: String },
        SerialNumber: { type: String },
        HwPlatform: { type: String },
      },
      ReportData: {
        "@Interval": { type: String },
        Report: {
          "@Date": { type: String },
          Object: [
            {
              "@DeviceName": { type: String },
              "@DeviceId": { type: String },
              "@ObjectType": { type: String },
              "@Name": { type: String },
              "@Id": { type: String },
              Count: [
                {
                  "@StartTime": { type: String },
                  "@EndTime": { type: String },
                  "@Enters": { type: String },
                  "@Exits": { type: String },
                  "@EntersFemaleCustomer": { type: String },
                  "@ExitsFemaleCustomer": { type: String },
                  "@EntersMaleCustomer": { type: String },
                  "@ExitsMaleCustomer": { type: String },
                  "@EntersUnknown": { type: String },
                  "@ExitsUnknown": { type: String },
                  "@Status": { type: String },
                },
              ],
            },
          ],
        },
      },
    },
    hash: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metrics", MetricsSchema);
