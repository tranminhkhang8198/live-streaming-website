# Sport streaming website
## Thông tin các server
### Web server
- DOMAIN: stream.noat.me
- IP: 45.77.203.83
### Streaming server
- DOMAIN: server.mygoaltv.top
- IP: 144.202.13.69

## Các chương trình cần cài đặt trên web server
- 1. [Node.Js v10.15.2](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
- 2. [NPM v6.12.0](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
- 3. [Git v2.20.1](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04)

## Đăng nhập vào Web server
1. ssh {user}@IP

`ssh toan@45.77.203.83`

2. Nhập mật khẩu

`miNhtoaN135`

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

## Thêm mới 1 highlight video
**Lưu ý**: Đối với highlight video, khi thêm/xóa 1 thành phần thì phải thực tác động 4 lần, cụ thể ở bên dưới. Vào thư mục /src/views/components/_highlightVideos.pug
### Thành phần bị tác động thứ nhất:
``` js
.highlight-box-containers.slider-for // Dòng này là dấu hiện để nhận biết
    a(href="/highlight-videos/1").highlight-box
        .highlight-thumbnail(style="background-image: url('https://picsum.photos/200')")
            .highlight-play-button.pulse
            .highlight-play-button
                svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100")
                    polygon(points="40,30 65,50 40,70")
        .highlight-title
            p.highlight-title-match 
                | German - Italy
            p.highlight-title-tour 
                | Laliga 2020 cup 
```
Các thông số cần thay đổi:

#### 1.1. a(href="highlight-videos/x")

**x** là một số nguyên dương (0, 1, 2, 3...). Với mỗi highlight videos được thêm vào thì x sẽ tăng lên 1 đơn vị

#### 1.2. nội dung text sau dấu |

Các nội dung sau dấu *|* đại diện cho text 2 trường *title* và *tournament* theo thứ tự

#### 1.3. ảnh thumbnail

(style="background-image: url('https://picsum.photos/200')")

Link ảnh thumbnail nằm trong url('**link**'). Nếu không có thì sẽ để ảnh mặc định

### Thành phần bị tác động thứ 2
``` js
.highlight-box-containers.slider-nav // Dòng này là dấu hiện để nhận biết
    a(href="/highlight-videos/1").highlight-box
        .highlight-thumbnail(style="background-image: url('https://picsum.photos/200')")
            .highlight-play-button.pulse
            .highlight-play-button
                svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100")
                    polygon(points="40,30 65,50 40,70")
        .highlight-title
            p.highlight-title-match 
                | German - Italy
            p.highlight-title-tour 
                | Laliga 2020 cup 
```
Các thông số cần thay đổi phải tương tự vói mục trên

### Thành phần bị tác động thứ 3
``` js
.row.highlight-box-containers // Dòng này là dấu hiệu để nhận biết
    .col-6.highlight-box
        a(href="/highlight-videos/1")
            .highlight-thumbnail(style="background-image: url('https://picsum.photos/200')")
                .highlight-play-button.pulse
                .highlight-play-button
                    svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100")
                        polygon(points="40,30 65,50 40,70")
            .highlight-title
                p.highlight-title-match 
                    | German - Italy
                p.highlight-title-tour 
                    | Laliga 2020 cup    
```
Các thông số cần thay đổi cũng giống như 2 thành phần trên

### Thành phần bị tác động thứ 4
Vào thư mục /src/views, copy file highlight-videos-x.pug với **x** ứng với số thứ tự của highlight videos.

Sau khi tạo xong thì vào file highlight-videos-x.pug và thay đổi nội dung của video *title* ở dòng  18 và thay đổi nguồn của video ở dòng 21 trong **src=**. Lưu ý nguồn video phải được phát dưới dạng .mp4

