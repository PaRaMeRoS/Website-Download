#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y

mkdir ~/website/
cd ~/website/

sudo apt-get install -y python3
sudo apt-get install -y npm
sudo apt-get install -y git
sudo apt-get install -y curl
sudo snap install node --channel=18/stable --classic

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
#reboot
nvm ls
nvm install --lts
nvm ls

npm cache clean --force

git clone https://github.com/PaRaMeRoS/Website-Download.git ~/website/

mkdir ~/website/db/

wget https://repo.mongodb.org/apt/ubuntu/dists/jammy/mongodb-org/7.0/multiverse/binary-amd64/mongodb-org-server_7.0.3_amd64.deb
sudo apt install -y ~/website/mongodb-org-server_7.0.3_amd64.deb

sudo apt-get update
sudo apt-get upgrade -y

chmod u+x ~/website/scripts/install.sh
chmod u+x ~/website/scripts/update.sh
~/website/scripts/update.sh


#npm run start (mongod --port 27017 --dbpath ~/website/db --bind_ip 127.0.0.1 --auth