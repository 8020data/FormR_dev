#!/bin/sh

if [ ! -d /home/_0     ]; then  sudo mkdir       /home/_0;     fi
if [ ! -d /home/_0/bin ]; then  sudo mkdir       /home/_0/bin; fi

if [ ! -f /home/_0/bin/setup-nodejs-server-on-linux.sh ]; then sudo cp -p setup-nodejs-server-on-linux.sh /home/_0/bin/; fi
if [ ! -f /home/_0/bin/setup-script-path-on-linux.sh   ]; then sudo cp -p setup-script-path-on-linux.sh   /home/_0/bin/; fi

sudo echo "#\!/bin/sh"                          >/home/_0/bin/hello.sh
sudo echo  echo \"\"                           >>/home/_0/bin/hello.sh
sudo echo  echo \" \ Hello from /home/_0/bin\" >>/home/_0/bin/hello.sh
sudo echo  echo \"\"                           >>/home/_0/bin/hello.sh
sudo chmod 777                                   /home/_0/bin/hello.sh

sudo echo "" >>/root/.profile
sudo echo PATH=/home/_0/bin:\$PATH >>/root/.profile
sudo echo "" >>/root/.profile

     echo ""
     echo "  The next time you login, you can run scripts in"
     echo "  /home/_0/bin from anywhere, e.g. hello.sh."
     echo ""

# sudo source /root/.profile

# hello.sh
