# Documentation Deployment Guide

This guide explains how to deploy the Cost Katana documentation site.

## Overview

The documentation is built using [Docsify](https://docsify.js.org/), a lightweight documentation site generator that doesn't require a build process. The site is structured for easy deployment to various platforms.

## Quick Deployment Options

### 1. GitHub Pages (Recommended)

#### Prerequisites
- GitHub repository containing the docs
- GitHub Pages enabled

#### Steps
1. **Push documentation to GitHub**:
   ```bash
   git add docs/
   git commit -m "Add comprehensive documentation"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `docs` folder
   - Click Save

3. **Access your docs**:
   ```
   https://your-username.github.io/your-repo/docs/
   ```

### 2. Netlify

#### Steps
1. **Connect repository** to Netlify
2. **Build settings**:
   - Build command: (leave empty)
   - Publish directory: `docs`
3. **Deploy site** - automatic on every push

### 3. Vercel

#### Steps
1. **Import project** from GitHub
2. **Configure settings**:
   - Framework Preset: Other
   - Root Directory: `docs`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
3. **Deploy** - automatic deployment

### 4. Self-Hosted with Nginx

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name docs.costkatana.com;
    root /var/www/cost-katana-docs;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Deployment Script
```bash
#!/bin/bash
# deploy-docs.sh

# Pull latest changes
git pull origin main

# Copy docs to web root
sudo cp -r docs/* /var/www/cost-katana-docs/

# Restart nginx
sudo systemctl reload nginx

echo "Documentation deployed successfully!"
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM nginx:alpine

# Copy documentation files
COPY docs/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  docs:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.docs.rule=Host(`docs.costkatana.com`)"
      - "traefik.http.services.docs.loadbalancer.server.port=80"
```

### Deploy with Docker
```bash
# Build image
docker build -t cost-katana-docs .

# Run container
docker run -d -p 8080:80 --name docs cost-katana-docs

# Or use docker-compose
docker-compose up -d
```

## Custom Domain Setup

### DNS Configuration
```
# A Record
docs.costkatana.com → 192.168.1.100

# CNAME Record (alternative)
docs.costkatana.com → your-hosting-provider.com
```

### SSL Certificate (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d docs.costkatana.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## CDN Setup (Optional)

### CloudFlare
1. **Add site** to CloudFlare
2. **Update nameservers** at your domain registrar
3. **Configure settings**:
   - SSL/TLS: Full (strict)
   - Caching: Standard
   - Minification: HTML, CSS, JS
   - Brotli: Enabled

### AWS CloudFront
```json
{
  "Origins": [{
    "Id": "docs-origin",
    "DomainName": "your-server.com",
    "CustomOriginConfig": {
      "HTTPPort": 80,
      "HTTPSPort": 443,
      "OriginProtocolPolicy": "https-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "docs-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "managed-caching-optimized"
  }
}
```

## Monitoring & Analytics

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
```bash
# Simple uptime check
curl -f https://docs.costkatana.com/health || echo "Site is down"

# Advanced monitoring with status codes
curl -s -o /dev/null -w "%{http_code}" https://docs.costkatana.com/
```

## Performance Optimization

### Enable Compression
```nginx
# Nginx gzip configuration
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
  text/plain
  text/css
  text/xml
  text/javascript
  application/javascript
  application/xml+rss
  application/json;
```

### Cache Headers
```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}

# Cache HTML with shorter expiry
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### Image Optimization
```bash
# Optimize images before deployment
find docs/assets -name "*.png" -exec optipng {} \;
find docs/assets -name "*.jpg" -exec jpegoptim --max=85 {} \;
```

## Automated Deployment

### GitHub Actions
```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths: ['docs/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
          cname: docs.costkatana.com
```

### Webhook Deployment
```bash
#!/bin/bash
# webhook-deploy.sh

# Webhook endpoint for auto-deployment
if [[ "$1" == "deploy" ]]; then
    cd /var/www/cost-katana-docs
    git pull origin main
    cp -r docs/* ./
    systemctl reload nginx
    echo "Deployment completed at $(date)"
fi
```

## Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  img-src 'self' data: https:;
  font-src 'self' cdn.jsdelivr.net;
  connect-src 'self' api.costkatana.com;
">
```

### HTTPS Redirect
```nginx
server {
    listen 80;
    server_name docs.costkatana.com;
    return 301 https://$server_name$request_uri;
}
```

### Rate Limiting
```nginx
# Rate limiting configuration
http {
    limit_req_zone $binary_remote_addr zone=docs:10m rate=10r/s;
    
    server {
        location / {
            limit_req zone=docs burst=20 nodelay;
            # ... other config
        }
    }
}
```

## Backup Strategy

### Automated Backups
```bash
#!/bin/bash
# backup-docs.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/docs"

# Create backup
tar -czf "$BACKUP_DIR/docs_backup_$DATE.tar.gz" /var/www/cost-katana-docs

# Keep only last 30 backups
find "$BACKUP_DIR" -name "docs_backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: docs_backup_$DATE.tar.gz"
```

### Git-based Backup
```bash
# Automatic git backup
git add docs/
git commit -m "Auto-backup: $(date)"
git push origin backup-branch
```

## Troubleshooting

### Common Issues

#### 404 Errors on Refresh
**Problem**: Single-page app routing issues  
**Solution**: Configure server to serve `index.html` for all routes
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Slow Loading
**Problem**: Large images or unoptimized assets  
**Solution**: 
```bash
# Optimize images
npm install -g imagemin-cli
imagemin docs/assets/*.png --out-dir=docs/assets --plugin=pngquant
```

#### Search Not Working
**Problem**: Docsify search plugin issues  
**Solution**: Verify search plugin is loaded correctly
```html
<script src="//cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.min.js"></script>
```

### Health Checks
```bash
# Basic health check
curl -f https://docs.costkatana.com/ || echo "Site down"

# Check specific functionality
curl -s https://docs.costkatana.com/ | grep -q "Cost Katana" || echo "Content issue"

# Check response time
curl -w "@curl-format.txt" -o /dev/null -s https://docs.costkatana.com/
```

## Maintenance

### Regular Tasks
```bash
# Weekly maintenance script
#!/bin/bash

# Update dependencies (if using npm)
npm update

# Check for broken links
npm install -g broken-link-checker
blc https://docs.costkatana.com -r

# Update SSL certificates
certbot renew --quiet

# Clean up old logs
find /var/log/nginx -name "*.log" -mtime +30 -delete
```

### Content Updates
```bash
# Content update workflow
git pull origin main
cp -r docs/* /var/www/cost-katana-docs/
systemctl reload nginx

# Verify deployment
curl -f https://docs.costkatana.com/
```

## Support

### Documentation Issues
- 📧 **Email**: docs@costkatana.com
- 🐛 **GitHub Issues**: [Report deployment issues](https://github.com/cost-katana/docs/issues)
- 💬 **Discord**: [#documentation](https://discord.gg/costkatana)

### Deployment Help
- 📖 **Docsify Guide**: [Official Documentation](https://docsify.js.org/)
- 🎥 **Video Tutorial**: [Deployment Walkthrough](https://youtube.com/costkatana)
- 📞 **Enterprise Support**: For custom deployment assistance

---

*This documentation site is deployed using the methods described above. For questions or issues, contact our team at docs@costkatana.com.*