###############################################################

#Health Model Readme

**Hello!** This is the the README for running the Model component
of the program!

**NOTE** To run our Decision_Tree_State.py, you will need to place
this file in the same directory as all the other state level samples.
These files can be found in the 4_data_collection/Simulations/(Sample)/
For your convenience, there is already a copy in the 
4_data_collection/Simulations/ folder. You can refer to README file
there for more instructions.

This program assumes that you have Python and PIP installed
on your computer. If you have those Python 2.7.10 installed
and PIP installed, then you can go straight to Step 1. If not,
then continue to Step 0. 

**Step 0**) If you do not have Python or PIP installed, you can 
find documentation to install the two below:

For Python, Version 2.7.10:

https://wiki.python.org/moin/BeginnersGuide/Download

For PIP:

http://pip.readthedocs.org/en/stable/installing/


**Step 1**) Once you have Python 2.7.10 and PIP installed, you 
need to run the following command

```
pip install -r requirements.txt
```

This installs the required packages needed to run the code,
as well as the version of each package.


Below are the individual steps for running the Health Model and to
generate State Data Simulation Files. While the the code to generate
the models


For the Model

**Step 2**) Now that you have installed all the requirements,
you are ready to run the code. Go to the National_Models_File
folder to run the model. You can input the following line if 
you are using Linux and are running from the command line:

```
python Decision_Tree.py
```

Otherwise, you will have to run from your Python IDE of choice

**Note**: The data file used for this script must be in the same
folder as the python script. The name of the data file used is
called:

HealthData_10_16_2015.csv


**Step 3**) That's it! Your code will run, generating the models and
making a prediction based on the characteristics of an individual
hard-coded into the script.


For the Data Simulation

**Step 2**) Now that you have installed all the requirements,
you are ready to run the code. Go to the State_Data_Simulation_
Files folder to generate data. You can input the following line if 
you are using Linux and are running from the command line:

```
python Data_Simulation.py
```

Otherwise, you will have to run from your Python IDE of choice

**Note**: The data file used for this script must be in the same
folder as the python script. The name of the data file used is
called:

HealthData_10_16_2015.csv
census.csv
nchs_heights.csv
nchs_weights.csv
nchs_waist.csv


**Step 3**) That's it! Your code will run, generating the models and
making a prediction based on the characteristics of an individual
hard-coded into the script.


If you have any questions, feel free to contact me at:

mingtha@scarletmail.rutgeres.edu
