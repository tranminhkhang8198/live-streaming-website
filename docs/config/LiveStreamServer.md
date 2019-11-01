Welcome to the HTTP-Live-Streaming-FFMPEG wiki!
## log-in to VPS (live-stream-tutorial-1.mp4)
```
ssh root@(VPS-IP-here)
#example: ssh root@(192.168.1.113)
adduser server
#Enter password
usermod -aG sudo server

login server

# Enable OpenSSH connections
sudo ufw allow OpenSSH

# Enable HTTP traffic
sudo ufw allow http

# Enable HTTPS traffic
sudo ufw allow https

# Turn the firewall on
sudo ufw enable
```
## Create necessary folder (live-stream-tutorial-1.mp4)
```
mkdir -p /home/$(whoami)/{Tutorials/stream/storage/live,HTML}
```
## Install Nginx
```
sudo apt update
sudo apt install linuxbrew-wrapper
brew tap denji/nginx
brew install nginx-full --with-rtmp-module --with-debug --with-http2
```
## Config nginx on /home/linuxbrew/.linuxbrew/etc/nginx/nginx.conf file(live-stream-tutorial-2.mkv):
```
nano /home/linuxbrew/.linuxbrew/etc/nginx/nginx.conf
```
```
worker_processes  auto;
events {
    worker_connections  1024;
}

# RTMP Config

rtmp {
    server {
        listen 1935; # Listen on standard RTMP port
        chunk_size 4000;
        application live{
            live on;
            deny play all;
            push rtmp://localhost/play;
            #on_publish http://localhost:3001/api/on-live-auth;
            #on_publish_done http://localhost:3001/api/on-live-done;
        }
        application play {
            live on;
            # Turn on HLS
            hls on;
            hls_nested on;
            hls_fragment_naming system;
            #hls_path /home/server/Sites/mnt/hls/;
            hls_path /home/server/Tutorials/stream/storage/live/;
            hls_fragment 3;
            hls_playlist_length 60;

            # disable consuming the stream from nginx as rtmp
            deny play all;
            #only allow from local
            allow publish 127.0.0.1;
            deny publish all;
        }
    }
}
# End RTMP Config

http {

    default_type  application/octet-stream;
    sendfile off;
    tcp_nopush on;
    keepalive_timeout 65;
    include servers/*;
}

```
##add server to nginx (live-stream-tutorial-2.mkv)
```
mkdir /home/linuxbrew/.linuxbrew/etc/nginx/servers
touch /home/linuxbrew/.linuxbrew/etc/nginx/servers/servers.conf
sudo nano /home/linuxbrew/.linuxbrew/etc/nginx/servers/servers.conf
```
add these lines to file /home/linuxbrew/.linuxbrew/etc/nginx/servers/servers.conf
```
server{
        listen 443 ssl;
        listen [::]:443 ssl;
        server_name server.mygoaltv.top;

    # Use the Let’s Encrypt certificates
    ssl_certificate /etc/letsencrypt/live/server.mygoaltv.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/server.mygoaltv.top/privkey.pem;

    # Include the SSL configuration from cipherli.st
    include snippets/ssl-params.conf;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:3002/;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }

    }

server {
        listen 3002;

        location /live {

            # Disable cache
        add_header Cache-Control no-cache;

        # CORS setup
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length';

        # allow CORS preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        types {
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }


            root /home/server/Tutorials/stream/storage/;

        }
    }

server {
    listen 80;
    listen [::]:80 default_server ipv6only=on;
    return 301 https://$host$request_uri;
}

```
## Setting SSL(live-stream-tutorial-2.mkv)
```
sudo apt-get install bc

sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt

dig +short server.mygoaltv.top
# output should be your droplet’s IP address, e.g. 138.68.11.65

# Move into the Let’s Encrypt directory
cd /opt/letsencrypt

# Create the SSL certificate
./certbot-auto certonly --standalone

sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
sudo mkdir /home/linuxbrew/.linuxbrew/etc/nginx/snippets
sudo nano /home/linuxbrew/.linuxbrew/etc/nginx/snippets/ssl-params.conf
```
Inside, we can copy-paste the following settings.

```
# See https://cipherli.st/ for details on this configuration
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off; # Requires nginx >= 1.5.9
ssl_stapling on; # Requires nginx >= 1.3.7
ssl_stapling_verify on; # Requires nginx => 1.3.7
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

# Add our strong Diffie-Hellman group
ssl_dhparam /etc/ssl/certs/dhparam.pem;
```
## Check nginx(live-stream-tutorial-2.mkv)
```
sudo /home/linuxbrew/.linuxbrew/bin/nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
## Start nginx
```
sudo /home/linuxbrew/.linuxbrew/bin/nginx
```
## Reload nginx
```
sudo /home/linuxbrew/.linuxbrew/bin/nginx -s reload
```
## Stop nginx
```
sudo /home/linuxbrew/.linuxbrew/bin/nginx -s stop
```
## Test server
Go to browser and access to https://server.mygoaltv.top
You will see "WELCOME TO NGINX"
## Live Streaming
you can use any kind of live streaming which supports rtmp protocol and stream to your ip 
for example: rtmp://67.205.152.45/live/{your channel}
In my case, I used ffmpeg on ubuntu 18.04:
You can install ffmpeg on ubuntu by cmd:
```
sudo apt install ffmpeg
```
For desktop live streaming, use cmd:
```
ffmpeg -f alsa -i pulse -f x11grab -s 1366x768 -r 30 -i :0.0+0,0 -vf "movie=/dev/video0:f=video4linux2, scale=240:-1, fps, setpts=PTS-STARTPTS [movie]; [in][movie] overlay=main_w-overlay_w-2:main_h-overlay_h-2 [out]" -vcodec libx264 -crf 20 -preset veryfast -minrate 150k -maxrate 500k -s 960x540 -c:a aac -ar 44100 -ab 96000 -threads 0 -f flv - | tee name.flv | ffmpeg -i - -codec copy -f flv -metadata streamName=livestream rtmp://67.205.152.45/live/loi

```
You may to change the parameter 1366x768 to your desktop resolution and (rtmp://67.205.152.45/live/loi) to your channel which I mentioned before.

You can also use ubuntu pulseaudio to change the input audio from default (microphone) to monitor of buildin audio