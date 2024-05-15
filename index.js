#!/usr/bin/env node

const DHT = require('holesail-server') //require module to start server on local port
const goodbye = require('graceful-goodbye')
const HyperDHT = require('hyperdht')
const argv = require('minimist')(process.argv.slice(2)) //required to parse cli arguments
const {
    createHash
} = require('crypto'); //for connectors
//setting up the command hierarchy
if (argv.help) {
    const help = require('./includes/help.js');
    help.printHelp(help.helpMessage);
    process.exit(-1)
}


const localServer = new DHT();
if (argv.live) {
    const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT =parseInt(argv.live, 10) || 3341;

// Array to store uploaded files
let uploadedFiles = [];

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve index.html
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Holesail File Sharing</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          max-width: 600px;
          padding: 40px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
          margin-top: 0;
          color: #007bff;
          text-align: center;
        }
        input[type="file"] {
          display: block;
          margin: 20px auto;
          padding: 10px;
          width: calc(100% - 20px);
          border: 2px dashed #007bff;
          border-radius: 8px;
          background-color: #f8f9fa;
          color: #007bff;
          font-size: 16px;
          cursor: pointer;
          transition: border-color 0.3s ease-in-out;
        }
        input[type="file"]:hover {
          border-color: #0056b3;
        }
        button {
          display: block;
          margin: 0 auto;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }
        button:hover {
          background-color: #0056b3;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin-top: 20px;
        }
        li {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
        }
        li:hover {
          transform: translateY(-2px);
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>

      <div class="container">

        <h1>File Sharing App</h1>
        <input type="file" id="fileInput" />
        <button onclick="handleUpload()">Upload</button>
        <hr>
        <h2>Shared Files</h2>
        <ul id="fileList"></ul>
      </div>

      <script>
        // Function to handle file upload
        function handleUpload() {
          const fileInput = document.getElementById('fileInput');
          const file = fileInput.files[0];

          if (!file) {
            alert('Please select a file.');
            return;
          }

          const formData = new FormData();
          formData.append('file', file);

          fetch('/upload', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            const fileName = data.fileName;
            const downloadLink = document.createElement('a');
            downloadLink.href = 'data:application/octet-stream;base64,' + data.fileData;
            downloadLink.setAttribute('download', fileName);
            downloadLink.textContent = fileName;

            const listItem = document.createElement('li');
            listItem.appendChild(downloadLink);

            document.getElementById('fileList').appendChild(listItem);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }

        // Function to display previously uploaded files
        function displayFiles(files) {
          const fileList = document.getElementById('fileList');
          fileList.innerHTML = '';
          files.forEach(file => {
            const downloadLink = document.createElement('a');
            downloadLink.href = 'data:application/octet-stream;base64,' + file.fileData;
            downloadLink.setAttribute('download', file.fileName);
            downloadLink.textContent = file.fileName;

            const listItem = document.createElement('li');
            listItem.appendChild(downloadLink);

            fileList.appendChild(listItem);
          });
        }

        // Fetch previously uploaded files on page load
        fetch('/files')
          .then(response => response.json())
          .then(data => {
            displayFiles(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      </script>
    </body>
    </html>
  `);
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const fileData = req.file.buffer.toString('base64');
  const fileName = req.file.originalname;
  uploadedFiles.push({ fileName, fileData });
  res.send({ fileName, fileData });
});

// Serve uploaded files
app.get('/files', (req, res) => {
  res.json(uploadedFiles);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

    // --host
    if (argv.host) {
        host = argv.host
    } else {
        host = '127.0.0.1'
    }
    //to preserve seed
    if (argv.connector) {
        if (argv.connector.length === 64) {
            connector = argv.connector
        } else {
            connector = createHash('sha256').update(argv.connector.toString()).digest('hex');
        }

    } else {
        connector = null
    }



    localServer.serve({port:PORT, host:host}, () => {
        console.log(`Server started, Now listening on ${host}:` + `${PORT}`);
        console.log(`Your connector is: ${argv.connector}`);
        console.log('Server public key:', localServer.getPublicKey());
    }, connector);

} else if (argv.connect) {

    //give priority to connector instead of connection seed
    if (argv.connector) {
        if (argv.connector.length === 64) {
            connector = argv.connector
        } else {
            connector = createHash('sha256').update(argv.connector.toString()).digest('hex');
            const seed = Buffer.from(connector, 'hex');
            //the keypair here is not a reference to the function above
            connector = HyperDHT.keyPair(seed).publicKey.toString('hex');
        }

    } else {
        connector = argv.connect
    }

    if (!PORT) {
        port = 8989
    } else {
        port = PORT
    }
    //--host
    if (argv.host) {
        host = argv.host
    } else {
        host = '127.0.0.1'
    }

    const holesailClient = require('holesail-client')
    const pubClient = new holesailClient(connector)
    pubClient.connect({port:port, host:host}, () => {
        console.log(`Client setup, access on ${host}:${port}`);
        console.log(`Your connector is: ${argv.connector}`);
        console.log('Connected to public key:', connector);
        }
    )
} else {
    console.log(helpMessage);
    process.exit(-1)
}

goodbye(async () => {
    await localServer.destroy()
})