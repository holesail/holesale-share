THIS REPOSITORY IS NOT READY FOR PRODUCTION USE YET, IT IS EXPERIMENTAL.

 # Holesail-share

[Join our Discord Support Server](https://discord.gg/TQVacE7Vnj)

## Overview

Holesail-share is a simple and flexible solution for creating a distributed hash table (DHT) server. It allows you to share your local files  to the network, making it accessible to other nodes.

## Installation

Before using holesail-share, make sure you have Node.js installed on your system. You can download Node.js from the official website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Once Node.js is installed, you can install Holesail-share Server using npm (Node Package Manager):

```
npm i holesail-share -g
```

## Usage

To start a local Holesail-share Server, use the following command:

```
holesail-share --live port
```
Replace `port` with the desired port number you want to expose to the network on which your file system will work.

This will give you a seed to connect to, use that to acess this server from anywhere:

```js
holesail-share --connect SEED --port
```
Available options:

`--live PORT`: Create a tunnel on this port

`--connect SEED`: Connect to a tunnel using the seed generated from --live command

`--host ADDRESS`: Default address is 127.0.0.1, use it to change address to localhost or other

`--port PORT`: Use this option with --connect to set a custom port instead of the default port `8989`


### Example

To start a local holesail-share Server on port 8080, use the following command:

```
holesail-share --live 8080
```

## Help

If you need help or want to see the usage instructions, use the following command:

```
holesail-share  --help
```

## Graceful Goodbye

Holesail-share Server includes graceful goodbye functionality, which ensures that the server is properly shut down when you close the terminal or interrupt the process.

## License

Holesail-share  Server is released under the GPL-3.0 License. See the [LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html) file for more information.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgments

Holesail-share is built using the following open-source projects:

- hypertele: https://github.com/bitfinexcom/hypertele
- holepunch: https://holepunch.to
- holesail-server: https://github.com/holesail/holesail-server)

and other node packges.
