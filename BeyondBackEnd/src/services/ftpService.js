const ftp = require("ftp");

const fetchJsonFromFTP = (callback) => {
  const client = new ftp();

  client.on("ready", () => {
    console.log("FTP connection ready...");
    client.list("/public_html/inditechconnects.com/tdi/", (err, list) => {
      // Updated file fetching path
      if (err) {
        console.error("Error listing FTP files:", err);
        client.end(); // Close connection on error
        return;
      }

      if (!list.length) {
        console.error("No files found in the directory.");
        client.end();
        return;
      }

      // Fetch JSON files
      list.forEach((file) => {
        if (file.name.endsWith(".json")) {
          client.get(
            `/public_html/inditechconnects.com/tdi/${file.name}`,
            (err, stream) => {
              // Fetching using the file name only
              if (err) {
                //console.error(`Error fetching file ${file.name}:`, err);
                return client.end(); // Close connection on error
              }
              let data = "";
              stream.on("data", (chunk) => (data += chunk));
              stream.on("end", () => {
                console.log(`File fetched: ${file.name}`);
                try {
                  callback(JSON.parse(data)); // Process JSON
                } catch (parseErr) {
                  console.error(
                    `Error parsing JSON from file ${file.name}:`,
                    parseErr
                  );
                }
                client.end(); // Close the connection
              });
            }
          );
        }
      });
    });
  });

  client.on("error", (err) => {
    console.error("FTP client error:", err);
  });

  client.on("close", () => {
    console.log("FTP connection closed.");
  });

  client.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    connTimeout: 10000, // Increase connection timeout
    pasvTimeout: 10000, // Increase passive mode timeout
    keepalive: 10000, // Keep the connection alive for longer
    pasv: true, // Enable passive mode explicitly
  });
};

module.exports = fetchJsonFromFTP;
