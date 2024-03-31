module.exports = {
    helpMessage: 'Usage: The command below will share files to the network\nholesail-share --live port [--host host] [--connector connector]\n Command to connect to a holesail-share-server:\n holesail-share --connect <seed> --port <portno> [--host host]\n Additional options:\n --help: displays this help message\n --live: starts the server to share files to the network\n --connect: connects to a holesail-share-server with the provided seed\n --port: specifies the port number for the server or client connection\n --host: specifies the host address for the server or client connection (default is 127.0.0.1)\n --connector: provides the connector for the server or client connection (default is null or automatically generated)\n',
    printHelp: function(helpMessage) {
        console.log(helpMessage);
    }
}
