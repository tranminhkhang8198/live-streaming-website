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
```javascript
Để thêm mới một highlight videos, chúng ta cần thay đổi 2 thành phần sau

1. thêm/chỉnh sửa các nội dung trong file (src/views/component/_highlightVideos.pug)

Trong file này sẽ có 3 thành phần bị tác động

1.1.Các dòng code nằm trong (.highlight-box-containers.slider-for)
- thay đổi các nội dung sau dấu *|* ở các line phía dưới

- nhớ tăng thứ tự của nội dung trong a(href=/highlight-videos/x) (x=0,1,2,3,4,5,...)

- x tăng dần với mỗi thẻ được thêm vào

1.2.Các dòng code nằm trong (.highlight-box-containers.slider-nav)
- Lập lại các thao tác giống như ở thành phần thứ 1

1.3.Các dòng code nằm trong (.highlight-box-containers-responsive)
- Lặp lại các thao tác giống như ở thành phần thứ 1 và 2

Sau khi đã thay đổi 3 thành phần ở mục 1, chusg ta tiếp tục với mục 2

2.Thêm mới một file highlight-videos-x.pug
- Với x là số vừa được thêm vào trong nội dung ở 3 thành phần ở file 1

```