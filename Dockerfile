FROM caddy

COPY build /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile