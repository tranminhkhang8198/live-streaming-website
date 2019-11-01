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
1. Chỉnh sửa nội dung quảng cáo
```javascript
Đầu tiên chúng ta sẽ thấy nội dung quảng cáo sẽ có 1 format chung, để thay đổi nội dung cũng như hình ảnh thumbnail, chúng ta cần thay đổi nguồn của nó bằng cách sau:

- thêm 1 biến 'src'
Chúng ta thêm 1 biến src vào mã nguồn dưới format như sau
- var src = '<trong đây chứa nguồn của quảng cáo'


- thêm 1 biến 'thumbnail'
Cũng giống như src, chúng ta cần thêm 1 biến thumbnail để đổi hình ảnh đại diện của quảng cáo
- var thumbnail = '<trong đây chứa nguồn tới hình ảnh>'


- build (cập nhật) mã nguồn
sau khi đã thay đổi mã nguồn và hình ảnh thumbnail, chúng ta cần cập nhật lại mã nguồn bằng câu lệnh
npm run build

kiểm tra kết quả

Chú ý ở đây là thi thay đổi nguồn của 1 quảng cáo thì những quảng cáo ở dưới (cùng file mã nguồn) cũng sẽ bị ảnh hưởng.

Như có thể thấy chúng ta chỉ thay đổi nguồn của quảng cáo thứ 2, nhưng quảng cáo thứ 3 vẫn bị ảnh hưởng. Do đó ta cần thay đổi nguồn cụ thể của từng quảng cáo.
```


2. Chỉnh sửa giao diện của thanh top bar
```javascript
Để chỉnh sửa giao diện, bạn cần vào file
src/views/blocks/header.pug

bạn chỉ cần thêm 'comment' vào giao diện nào bạn muốn ẩn bằng dấu //- hoặc bấm tổ hợp phím Ctrl + /

Sau đó chúng ta cần build lại mã nguồn


Chúng ta cùng thử để giao diện topbar 1 hàng
```

3. Thay đổi thứ tự của thành phần football-tennis
```
Đầu tiên bạn cần vào file src/views/components/_schedule.pug

Bạn chỉ cần copy-paste thứ tự của 2 thành phần

Sau đó build lại mã nguồn như đã làm 
```

4. Thêm mới một highlight video
