# Deployment Guide - SquareCircleTriangle

## Prerequisites

- Hetzner Cloud Server (CX11 or larger recommended)
- SSH access with root or sudo privileges
- Domain name pointing to your server IP
- GitHub account with the repository
- Git installed on local machine (for reference)

## Getting Your Repository Ready on GitHub

Before deploying, make sure your code is pushed to GitHub:

### First Time Setup on Local Machine
```bash
# Navigate to your project directory
cd /Users/josephhill/Documents/GitHub/squarecircletriangle-presence

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: SquareCircleTriangle website"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/josephdanielhill/squarecircletriangle-presence.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Verify on GitHub
1. Go to https://github.com/your-username/squarecircletriangle-presence
2. Verify you see all files:
   - `Dockerfile`
   - `docker-compose.yml`
   - `nginx.conf`
   - `index.html`
   - `css/`, `js/`, `assets/` folders
   - `.gitignore`

### Your Repository URL
You'll need this when cloning on Hetzner. It will be one of:
- **HTTPS**: `https://github.com/josephdanielhill/squarecircletriangle-presence.git`
- **SSH**: `git@github.com/josephdanielhill/squarecircletriangle-presence.git`

## Step 1: Initial Server Setup

### Connect to Your Server
```bash
ssh root@your-hetzner-ip
```

### Update System Packages
```bash
apt update
apt upgrade -y
```

### Install Required Tools
```bash
# Install Git
apt install -y git

# Install curl (usually pre-installed)
apt install -y curl
```

## Step 2: Install Docker and Docker Compose

### Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Verify Docker Installation
```bash
docker --version
docker run hello-world
```

### Install Docker Compose
```bash
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### Add Root User to Docker Group (Optional but Recommended)
```bash
usermod -aG docker root
newgrp docker
```

### Enable Docker to Start on Boot
```bash
systemctl enable docker
systemctl start docker
```

## Step 3: Deploy SquareCircleTriangle

### Option A: Clone from GitHub (HTTPS - Recommended for Beginners)

#### Step 1: Create Application Directory
```bash
mkdir -p /opt/squarecircletriangle
cd /opt/squarecircletriangle
```

#### Step 2a: Create a GitHub Personal Access Token (First Time Only)

**Important**: GitHub no longer accepts passwords for Git operations. You must use a personal access token.

1. On your **local machine**, go to: https://github.com/settings/tokens/new
2. Fill in the form:
   - **Token name**: `squarecircletriangle-deployment`
   - **Expiration**: Select `90 days` (or your preference)
   - **Scopes**: Check only `repo` (this gives full control of private repositories)
3. Click **Generate token**
4. **Copy the token immediately** - you won't see it again!
5. Save it somewhere safe (you'll use it on Hetzner)

**Example token format**: `ghp_1234567890ABCDEFGHIJKLMNOPQRSTUVWxyz`

#### Step 2b: Clone Repository via HTTPS with Token

On your Hetzner server, run:
```bash
git clone https://github.com/josephdanielhill/squarecircletriangle-presence.git /opt/squarecircletriangle
cd /opt/squarecircletriangle
```

When prompted:
- **Username**: `josephdanielhill` (your GitHub username)
- **Password**: Paste your personal access token (from Step 2a)

**Expected output** (if successful):
```
Cloning into '/opt/squarecircletriangle'...
remote: Enumerating objects: 25, done.
remote: Counting objects: 100% (25/25), done.
remote: Compressing objects: 100% (20/20), done.
Receiving objects: 100% (25/25), done.
```

#### Alternative: Store Token to Avoid Repeated Prompts

You can store your credentials locally on the server (optional but convenient):

```bash
# This will prompt for username and token once, then cache them
git config --global credential.helper store

# Try cloning again
git clone https://github.com/josephdanielhill/squarecircletriangle-presence.git /opt/squarecircletriangle

# It will ask for credentials, enter them, and they'll be saved
```

**Security Note**: This stores credentials in `~/.git-credentials`. Only do this on your personal Hetzner server.

#### Step 3: Verify Repository Contents
```bash
ls -la
```

You should see:
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `DEPLOYMENT.md`
- `index.html`
- `css/`, `js/`, `assets/` directories

### Option B: Clone from GitHub (SSH - More Secure)

**Only do this if you have SSH keys configured on GitHub.**

#### Step 1: Generate SSH Key (If You Don't Have One)
```bash
# Check if you already have an SSH key
ls -la ~/.ssh/

# If not, generate one
ssh-keygen -t ed25519 -C "your-email@example.com"

# Press Enter for all prompts to use defaults
```

#### Step 2: Add SSH Key to GitHub
```bash
# Display your public key
cat ~/.ssh/id_ed25519.pub
```

Copy the output and:
1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your public key
4. Click "Add SSH key"

#### Step 3: Clone Repository via SSH
```bash
mkdir -p /opt/squarecircletriangle
cd /opt/squarecircletriangle
git clone git@github.com:your-username/squarecircletriangle-presence.git .
cd /opt/squarecircletriangle
```

### Step 4: Create Required Directories for Nginx Proxy Manager
```bash
mkdir -p npm/data npm/letsencrypt
chmod 755 npm/data npm/letsencrypt
```

### Step 4: Verify Repository Contents and Structure

#### View Complete Directory Structure
```bash
# From /opt/squarecircletriangle directory
# List everything including hidden files
ls -la

# Check subdirectories exist
ls -la css/
ls -la js/
ls -la assets/

# Verify Docker configuration files
ls -la Dockerfile docker-compose.yml nginx.conf DEPLOYMENT.md
```

#### Expected Output Structure
```
/opt/squarecircletriangle/
├── Dockerfile                    # Docker configuration for website
├── docker-compose.yml            # Docker Compose configuration
├── nginx.conf                    # Nginx configuration
├── DEPLOYMENT.md                 # This file
├── index.html                    # Main HTML file
├── .gitignore                    # Git ignore rules
├── .git/                         # Git repository metadata
├── css/
│   └── styles.css               # Website styles
├── js/
│   └── script.js                # Website JavaScript
├── assets/
│   ├── logo/
│   │   ├── full-logo.svg
│   │   ├── square.svg
│   │   ├── circle.svg
│   │   └── triangle.svg
│   ├── apps/
│   │   ├── deckcrm-logo.svg
│   │   └── kostly-logo.svg
│   └── team/
│       ├── member-1.svg
│       └── member-2.svg
└── npm/                          # Nginx Proxy Manager data (created manually)
    ├── data/                     # NPM configuration
    └── letsencrypt/              # SSL certificates
```

### Step 5: Create and Verify Directory Permissions

#### Create NPM Directories
```bash
# Create npm directories for Nginx Proxy Manager
mkdir -p npm/data npm/letsencrypt

# Verify they were created
ls -la npm/
```

#### Set Correct Permissions
```bash
# Set directories to readable/writable for Docker
chmod 755 npm/data npm/letsencrypt

# Optional: More restrictive permissions
# chmod 700 npm/data npm/letsencrypt

# Verify permissions
ls -la npm/
```

#### Expected Output
```
drwxr-xr-x  2 root root 4096 Jan 15 10:30 data
drwxr-xr-x  2 root root 4096 Jan 15 10:30 letsencrypt
```

### Step 6: Check File Permissions and Ownership

#### Verify All Files Have Correct Permissions
```bash
# Check application directory
ls -la /opt/squarecircletriangle/

# Check CSS files
ls -la /opt/squarecircletriangle/css/

# Check JavaScript files
ls -la /opt/squarecircletriangle/js/

# Check assets
ls -la /opt/squarecircletriangle/assets/
```

#### Fix Ownership if Needed
```bash
# Ensure root owns the files
sudo chown -R root:root /opt/squarecircletriangle

# Make HTML/CSS/JS readable by web server
chmod -R 644 /opt/squarecircletriangle/index.html
chmod -R 644 /opt/squarecircletriangle/css/
chmod -R 644 /opt/squarecircletriangle/js/
chmod -R 644 /opt/squarecircletriangle/assets/

# Verify
ls -la /opt/squarecircletriangle/
```

### Step 7: Verify Git Configuration

#### Check Git Status
```bash
cd /opt/squarecircletriangle

# View current branch
git status

# View recent commits
git log --oneline -5

# View remote origin
git remote -v
```

#### Expected Output
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

### Step 8: Verify Docker Files Exist

#### Check Dockerfile
```bash
# View Dockerfile
cat Dockerfile

# Check it contains nginx:alpine reference
grep "FROM nginx" Dockerfile
```

#### Check docker-compose.yml
```bash
# View docker-compose configuration
cat docker-compose.yml

# Verify services are defined
grep "services:" docker-compose.yml
```

#### Check nginx.conf
```bash
# View nginx configuration
cat nginx.conf

# Check server block exists
grep "server {" nginx.conf
```

### Step 9: Full Verification Script (Run All Checks)

```bash
#!/bin/bash
echo "=== SquareCircleTriangle Deployment Verification ==="
echo ""

echo "1. Checking directory structure..."
if [ -d "/opt/squarecircletriangle" ]; then
    echo "   ✓ Application directory exists"
else
    echo "   ✗ Application directory NOT found"
    exit 1
fi

echo ""
echo "2. Checking essential files..."
cd /opt/squarecircletriangle

files=("Dockerfile" "docker-compose.yml" "nginx.conf" "index.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file exists"
    else
        echo "   ✗ $file NOT found"
    fi
done

echo ""
echo "3. Checking directories..."
dirs=("css" "js" "assets" "npm")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "   ✓ $dir/ directory exists"
    else
        echo "   ✗ $dir/ directory NOT found"
    fi
done

echo ""
echo "4. Checking npm subdirectories..."
if [ -d "npm/data" ] && [ -d "npm/letsencrypt" ]; then
    echo "   ✓ npm/data and npm/letsencrypt exist"
else
    echo "   ✗ npm subdirectories missing - creating them..."
    mkdir -p npm/data npm/letsencrypt
    chmod 755 npm/data npm/letsencrypt
    echo "   ✓ npm subdirectories created"
fi

echo ""
echo "5. Checking Git status..."
if [ -d ".git" ]; then
    echo "   ✓ Git repository exists"
    echo "   Current branch: $(git rev-parse --abbrev-ref HEAD)"
else
    echo "   ✗ Git repository NOT found"
fi

echo ""
echo "6. Checking file permissions..."
echo "   Application directory: $(ls -ld . | awk '{print $1}')"
echo "   CSS permissions: $(ls -ld css | awk '{print $1}')"
echo "   JS permissions: $(ls -ld js | awk '{print $1}')"
echo "   Assets permissions: $(ls -ld assets | awk '{print $1}')"

echo ""
echo "=== Verification Complete ==="
```

Save this as `verify.sh` and run it:
```bash
nano /opt/squarecircletriangle/verify.sh
chmod +x /opt/squarecircletriangle/verify.sh
./verify.sh
```

## Step 4: Build and Start Services

### Build Docker Images
```bash
cd /opt/squarecircletriangle
docker-compose build
```

This may take a few minutes as it downloads and builds images.

### Start Services in Background
```bash
docker-compose up -d
```

### Verify Services Are Running
```bash
docker-compose ps
```

Expected output:
```
NAME                     COMMAND                  SERVICE   STATUS      PORTS
nginx-proxy-manager      "/init"                  npm       Up ...      0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp, 0.0.0.0:81->81/tcp
squarecircletriangle     "nginx -g daemon off;"   ...       Up ...      80/tcp
```

### Check Service Logs (If Issues)
```bash
# View last 50 lines of logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs npm
docker-compose logs squarecircletriangle
```

## Step 5: Configure DNS

Before accessing Nginx Proxy Manager, ensure your domain points to your server:

### Check DNS Resolution
```bash
nslookup yourdomain.com
```

You should see your Hetzner server IP in the output.

### Update DNS at Your Registrar
1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add or update A record:
   - **Host**: `@` (for root domain)
   - **Type**: `A`
   - **Value**: Your Hetzner server IP
4. Also add for `www`:
   - **Host**: `www`
   - **Type**: `A`
   - **Value**: Your Hetzner server IP

DNS changes can take 15 minutes to 48 hours to propagate.

## Step 6: Access and Configure Nginx Proxy Manager

### Open Admin Panel
1. Open your browser
2. Visit: `http://your-hetzner-ip:81`
3. Default credentials:
   - **Email**: `admin@example.com`
   - **Password**: `changeme`

### Log In and Change Admin Password (IMPORTANT!)
1. Click the person icon (top right)
2. Go to **Users**
3. Edit the admin user
4. Change email to your email
5. Change password to a strong password
6. Save

### Add Proxy Host for Your Domain

#### Step A: Basic Settings
1. Click **Proxy Hosts** (left sidebar)
2. Click **Add Proxy Host** (blue button)
3. Fill in these fields:
   - **Domain Names**: `yourdomain.com www.yourdomain.com`
   - **Scheme**: `http` (internal docker communication)
   - **Forward Hostname/IP**: `squarecircletriangle`
   - **Forward Port**: `80`

#### Step B: SSL Configuration
1. Still in the same form, click the **SSL** tab
2. Check **SSL Certificate** checkbox
3. Select **Request a new SSL Certificate**
4. Fill in:
   - **Email Address**: Your email (for Let's Encrypt)
5. Check **Force SSL** (redirects HTTP to HTTPS)
6. Check **HTTP/2 Support**
7. Click **Agree to Let's Encrypt Terms of Service**
8. Click **Save**

The system will now request an SSL certificate. This may take a few seconds to a minute.

#### Step C: Verify It Works
1. Go back to **Proxy Hosts**
2. Your site should show a green lock icon (SSL enabled)
3. Visit `https://yourdomain.com` in your browser

If you get a certificate error, wait 5 minutes and try again.

## Step 7: Test Your Site

### Access Via Domain
```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com
```

### Expected Output
```
HTTP/1.1 301 Moved Permanently
Location: https://yourdomain.com
```

Then:
```
HTTP/2 200
Content-Type: text/html
```

## Step 8: Setup Git Deployment Script (Optional)

Create a script to make updates easier:

```bash
nano /opt/squarecircletriangle/deploy.sh
```

Paste this:
```bash
#!/bin/bash
echo "Pulling latest changes..."
cd /opt/squarecircletriangle
git pull origin main

echo "Rebuilding containers..."
docker-compose down
docker-compose build
docker-compose up -d

echo "Verifying services..."
docker-compose ps

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x /opt/squarecircletriangle/deploy.sh
```

Now you can deploy with:
```bash
/opt/squarecircletriangle/deploy.sh
```

## Regular Maintenance Commands

### Check Disk Space
```bash
df -h
```

### View All Docker Containers
```bash
docker ps -a
```

### View All Docker Images
```bash
docker images
```

### Update Containers
```bash
cd /opt/squarecircletriangle
docker-compose pull
docker-compose down
docker-compose up -d
```

### Clean Up Unused Docker Images
```bash
docker image prune -a
```

### Monitor Container Resource Usage
```bash
docker stats
```

## Updating Your Site

Whenever you make changes to your code:

### Option 1: From Local Machine (Recommended)
```bash
# On your local machine, push to Git
git add .
git commit -m "Update content"
git push

# Then on Hetzner server
cd /opt/squarecircletriangle
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

### Option 2: Direct Edit on Server
```bash
# SSH into server
ssh root@your-hetzner-ip

# Edit file
nano /opt/squarecircletriangle/index.html

# Restart container to apply changes
cd /opt/squarecircletriangle
docker-compose restart squarecircletriangle
```

## Useful Commands Reference

### Container Management
```bash
# View running containers
docker-compose ps

# View all containers (including stopped)
docker-compose ps -a

# Stop containers
docker-compose stop

# Start containers
docker-compose start

# Restart services
docker-compose restart

# Remove containers (keeps images)
docker-compose down

# Remove everything including volumes
docker-compose down -v
```

### Logs and Debugging
```bash
# View last 100 lines
docker-compose logs --tail=100

# Follow logs in real-time (Ctrl+C to exit)
docker-compose logs -f

# View specific service logs
docker-compose logs npm
docker-compose logs squarecircletriangle

# View logs since last 10 minutes
docker-compose logs --since 10m
```

### File Management
```bash
# Check directory structure
tree /opt/squarecircletriangle

# Check file permissions
ls -la /opt/squarecircletriangle

# Check disk usage
du -sh /opt/squarecircletriangle

# Backup configuration
tar -czf /backup/squarecircletriangle-$(date +%Y%m%d).tar.gz /opt/squarecircletriangle
```

## SSL Certificate Management

### View Certificate Details
In Nginx Proxy Manager admin panel:
1. Go to **Proxy Hosts**
2. Click on your domain
3. Check the **SSL** tab for expiration date

### Manual Certificate Renewal
```bash
# Certificates auto-renew, but you can force renewal:
docker-compose exec npm certbot renew --force-renewal
```

### Certificate Storage Location
```bash
# View certificates on server
ls -la /opt/squarecircletriangle/npm/letsencrypt/live/

# Backup certificates
cp -r /opt/squarecircletriangle/npm/letsencrypt /backup/
```

## Troubleshooting

### GitHub Clone Issues

#### Authentication Failed - "Invalid username or token"
```bash
# Full Error:
# remote: Invalid username or token. Password authentication is not supported for Git operations.
# fatal: Authentication failed for 'https://github.com/...'

# Solution: GitHub requires a personal access token, NOT your password

# Step 1: Create a personal access token (on your local machine, NOT on Hetzner)
#   - Go to: https://github.com/settings/tokens/new
#   - Token name: squarecircletriangle-deployment
#   - Expiration: 90 days
#   - Scopes: Check "repo" only
#   - Click "Generate token"
#   - COPY the token immediately (you won't see it again!)

# Step 2: Try cloning again on Hetzner with the token
git clone https://github.com/josephdanielhill/squarecircletriangle-presence.git /opt/squarecircletriangle

# When prompted:
# Username: josephdanielhill
# Password: [Paste your personal access token here]
```

#### Authentication Failed - "fatal: could not read Username"
```bash
# Error: "fatal: could not read Username for 'https://github.com'"
# Solution: This usually means credentials weren't cached

# Option 1: Store credentials for future use
git config --global credential.helper store

# Option 2: Clone again
git clone https://github.com/josephdanielhill/squarecircletriangle-presence.git /opt/squarecircletriangle
# Enter credentials when prompted
```

#### Permission Denied (SSH)
```bash
# Error: "Permission denied (publickey)"
# Solution: Generate and add SSH key

# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Display public key
cat ~/.ssh/id_ed25519.pub

# Then add to GitHub:
# 1. Go to https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Click "Add SSH key"

# Test connection
ssh -T git@github.com
```

#### Repository Not Found
```bash
# Error: "fatal: repository 'https://github.com/your-username/repo.git/' not found"
# Solution:
# 1. Verify the repository URL is correct
# 2. Make sure your username and repo name are spelled correctly
# 3. Check if the repo is private - you need to be authenticated

# List your repos
# Go to https://github.com/your-username?tab=repositories
```

#### After Cloning, Files Are Missing
```bash
# Check if files were downloaded
ls -la /opt/squarecircletriangle

# If directory is empty, clone again
rm -rf /opt/squarecircletriangle
git clone https://github.com/your-username/squarecircletriangle-presence.git /opt/squarecircletriangle
cd /opt/squarecircletriangle
ls -la
```

#### .gitignore Excluded Important Files
```bash
# If npm/ directory wasn't downloaded:
# This is expected - .gitignore excludes it for security

# Just create the directories manually:
mkdir -p npm/data npm/letsencrypt
chmod 755 npm/data npm/letsencrypt
```

### Site Returns 502 Bad Gateway
```bash
# Check if squarecircletriangle container is running
docker-compose ps

# If not, check logs
docker-compose logs squarecircletriangle

# Restart container
docker-compose restart squarecircletriangle
```

### Domain Not Resolving
```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# Wait and try again - DNS can take up to 48 hours
```

### SSL Certificate Won't Generate
```bash
# Verify domain resolves to your server IP
nslookup yourdomain.com

# Check Nginx Proxy Manager logs
docker-compose logs npm | grep letsencrypt

# In admin panel, delete the proxy host and recreate it
```

### Out of Disk Space
```bash
# Check what's taking space
du -sh /opt/squarecircletriangle/*

# Clean up Docker
docker system prune -a

# Remove old npm backups
rm -rf /opt/squarecircletriangle/npm/backups/*
```

### Need to Restart Server
```bash
# Graceful shutdown
docker-compose down

# Power off or reboot
reboot

# On restart, services auto-start due to 'restart: unless-stopped'
```

## Monitoring and Alerts

### Check Service Health
```bash
# Test website is responding
curl -s https://yourdomain.com | head -20

# Check specific URLs
curl -I https://yourdomain.com/css/styles.css
curl -I https://yourdomain.com/js/script.js
```

### Setup Basic Monitoring Script
```bash
cat > /opt/check-site.sh << 'EOF'
#!/bin/bash
if curl -sf https://yourdomain.com > /dev/null 2>&1; then
    echo "Site is UP"
else
    echo "Site is DOWN - restarting..."
    cd /opt/squarecircletriangle
    docker-compose restart
fi
EOF

chmod +x /opt/check-site.sh

# Run every 5 minutes (add to crontab)
# */5 * * * * /opt/check-site.sh
```

## Backing Up Your Data

### Create Backup
```bash
# Backup entire application
tar -czf /backup/sct-backup-$(date +%Y%m%d-%H%M%S).tar.gz /opt/squarecircletriangle/

# Backup only config
tar -czf /backup/sct-npm-backup-$(date +%Y%m%d).tar.gz /opt/squarecircletriangle/npm/
```

### Restore from Backup
```bash
# Extract backup
tar -xzf /backup/sct-backup-YYYYMMDD-HHMMSS.tar.gz -C /

# Restart services
cd /opt/squarecircletriangle
docker-compose down
docker-compose up -d
```

## Additional Resources

- Docker Docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Nginx Proxy Manager: https://nginxproxymanager.com/
- Let's Encrypt: https://letsencrypt.org/
- Hetzner Cloud: https://www.hetzner.cloud/

## Support

If you encounter issues:
1. Check logs: `docker-compose logs -f`
2. Verify all containers are running: `docker-compose ps`
3. Check firewall allows ports 80/443
4. Verify DNS resolves to correct IP
5. Wait for DNS propagation (up to 48 hours)
