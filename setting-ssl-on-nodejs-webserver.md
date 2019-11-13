## Log in to VPS with root and password
## Install Nginx
```
apt update
apt install nginx
```
## Setting SSL
```
apt-get install bc

git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt

dig +short app.example.com

cd /opt/letsencrypt

nginx -s stop

./certbot-auto certonly --standalone

openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

mkdir /etc/nginx/snippets

nano /etc/nginx/snippets/ssl-params.conf
```
Copy these line into file
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
Hit ctr+X , then Y, then Enter to save
## Config Nginx
```
nano /etc/nginx/sites-enabled/default
```
Copy these config to file
```
server {
    listen 80;
    listen [::]:80 default_server ipv6only=on;
    return 301 https://$host$request_uri;
}

# HTTPS — proxy all requests to the Node app
server {
    # Enable HTTP/2
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name mygoaltv.top;

    # Use the Let’s Encrypt certificates
    ssl_certificate /etc/letsencrypt/live/mygoaltv.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mygoaltv.top/privkey.pem;

    # Include the SSL configuration from cipherli.st
    include snippets/ssl-params.conf;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:5000/;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
}
```
Hit ctr+X , then Y, then Enter to save

## Test nginx

```
nginx -t
```

## Start nginx

```
systemctl start nginx
```
