
# BYOD Immersion Day - Data Validation Tool

The Data Validation Tool currently supports only CSV files. It validates files against some basic data validation rules expected for BYOD.

This project was built using Python with AWS Cloud Development Kit (CDK).

The following instructions are for an AWS Cloud9 environment to simplify the installation of the Data Validation Tool.

**Step 1:** Create an AWS Cloud9 environment with the following options

    * Amazon Linux 2
    * t2.micro
    * Use default values for the rest
  
> &#9888; Update the underlying EC2 instance type to increase memory to 4 GiB

    1. Go to the EC2 dashboard
    2. Stop the EC2 instance of the Cloud9 environment
    3. Change the Instance Type to t3.medium
    4. Start the EC2 instance

**Step 2:** Create an IAM user with admin credentials and take note of the Access Key ID and Secret Key.

**Step 3:** Open a terminal session in Cloud9 and enter the Access Key & Secret from Step 2.

```bash
$ aws configure --profile=dvt
```
> &#9888; When prompted by the AWS managed temporary credentials, choose 'Cancel' & 'Update after refresh'

**Step 4:** Clone the repository & run the script to resize the EBS volume

```
$ git clone https://github.com/adelagon/bring-your-own-data-labs
$ cd bring-your-own-data-labs
$ sh resize.sh 20
```
**Step 5:** Manually create a python virtual environment with virtualenv:
```
$ python3 -m venv .env
```

**Step 6:** Activate your virtual environment.
```
$ source .env/bin/activate
```

**Step 7:** Run the script to install the required dependencies.

```
$ cd dvt
$ ./install_deps.sh
```

**Step 8:** Deploy the Data Validation Tool stack

```
$ ./deploy.sh dvt
```
> &#9888; Replace *dvt* if you used a different profile name in Step 3.
