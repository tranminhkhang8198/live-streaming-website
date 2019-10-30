# Sport streaming website
## Server information
### Web server
- DOMAIN: mygoaltv.top
- IP: 45.77.203.83
- PORT: 5000
- ID: admin
- Password: dWkyZjg5M2hmMjMyb2ZuMzAyM2Zw
### Streaming server
- DOMAIN: server.mygoaltv.top
- IP: 144.202.13.69
- PORT: 3002

## Contributors
- [Nguyễn Minh Toàn (Noat)](https://github.com/nmtoan251998)
- [Trần Minh Khang](https://github.com/tranminhkhang8198)
- [Nguyễn Văn Lợi](https://github.com/vanloiidk)

## Prerequites
1. [Node.Js v8.10.0+](https://nodejs.org/en/) - Core source code environment
2. [NPM v6.11.3+](https://www.npmjs.com/) - Node packages management
2. [Parcel Bundler](https://parceljs.org/) - Client side code bundler

## Installation
To prevent unexpected error, install `parcel bundler` with `-g` flag
```
$ npm install -g parcel
```

```

$ git clone https://github.com/nmtoan251998/streaming.git

$ cd streaming

$ npm install
```

### Installation Error
If you see error when installing npm packages as the below message (problems with npm packages)
``` javascript
added 4 packages from 8 contributors and audited 15934 packages in 19.166s
found 2 vulnerabilities (1 low, 1 high)
run `npm audit fix` to fix them, or `npm audit` for details
```

Just run the below command
```
$ npm audit fix
```

## Development
- Start client side development
```
$ npm run dev:client
```

- Start server side development
```
$ npm run dev:server
```

- Start both client side and server side
```
$ npm run dev
```
## Production
```
$ npm run build
```

```
$ npm start
```
