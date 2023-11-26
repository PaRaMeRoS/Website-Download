#!/bin/bash

cd /home/david/

cp /mnt/d/PaRaMeRoS/website-linux /mnt/d/PaRaMeRoS/linux/ -r
sudo mv /mnt/d/PaRaMeRoS/linux/website-linux /mnt/d/PaRaMeRoS/linux/website -f
cp /mnt/d/PaRaMeRoS/linux/website /home/david/ -r -f

rm /mnt/d/PaRaMeRoS/linux/website -r -f -d
