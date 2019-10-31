# Sport streaming website
## Thông tin các server
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
## Các chương trình cần cài đặt trên web server
1. [Node.Js v10.15.2](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
2. [NPM v6.12.0](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
3. [Git v2.20.1](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04)

## Đăng nhập vào Web server
1. ssh {user}@IP

2. Nhập mật khẩu
## Cài đặt và chạy mã nguồn lần đầu tiên
`git clone https://github.com/nmtoan251998/streaming.git`

#### Sử dụng tài khoản git dưới đây để đăng nhập
``` Tài khoản git
- ID:
- Password: 
```
#### Sau khi đã có mã nguồn, chạy các tuần tự các dòng lệnh bên dưới 
`cd streaming`

`npm install`

`npm run build`

`npm start`

## Chỉnh sửa mã nguồn
#### Chạy lệnh bên dưới để tắt server

`pm2 stop all`

#### Chạy các lệnh bên dưới để bật lại server

`npm run build`

`npm start`

## Chỉnh sửa các thành phần trong mã nguồn
1. Thêm mới một highlight video
2. Chỉnh sửa quảng cáo
3. Chỉnh sửa giao diện của thanh top bar
4. Thay đổi thứ tự của thành phần football-tennis