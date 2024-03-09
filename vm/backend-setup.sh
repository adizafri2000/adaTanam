#!/bin/sh

echo "Beginning venv setup and installing pip requirements for backend."
echo "Please ensure setup.sh is executed before running this script."
echo "Process is complete and successful when you see 'Setup completed!'"
cd backend

echo "Creating virtual environment"
python -m venv venv
echo "Virtual environment created!"

echo "Activating virtual environment & installing pip requirements"
source venv/bin/activate
python -m pip install -r requirements.txt

echo "Pip requirements installed! Exiting virtual environment."
deactivate

echo "Setup completed!"