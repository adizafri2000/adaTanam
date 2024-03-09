#!/bin/sh

echo "Running setup procedures. Process is complete and successful when you see 'Setup completed!'"

# Initial update & upgrade
echo 'Beginning initial tasks...'
sudo apt update -y && sudo apt upgrade -y

# Install terminal tools & setup
sudo apt install nano jq

touch ~/.bash_aliases
echo "alias updatepls='sudo apt update -y && sudo apt upgrade -y'" >> ~/.bash_aliases
source ~/.bashrc
echo 'Initial tasks completed!'

# Install Python 3.12.1
echo 'Beginning Python 3.12.1 installation...'
sudo apt install wget libncurses5-dev build-essential zlib1g-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev pkg-config –y
wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz
tar -xf Python-3.12.*.tgz
cd Python-3.12.*/
./configure --enable-optimizations
make -j $(nproc)
sudo make altinstall
echo "alias python='python3.12'" >> ~/.bash_aliases
source ~/.bashrc
echo 'Python 3.12.1 installation completed!'

# Install pip
echo 'Beginning pip installation...'
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12
echo "alias pip='pip3.12'" >> ~/.bash_aliases
source ~/.bashrc
echo 'pip installation completed!'

# Install venv library for python
echo 'Beginning venv installation...'
sudo apt install python3-venv -y
echo 'venv installation completed!'

echo 'Setup completed!'
