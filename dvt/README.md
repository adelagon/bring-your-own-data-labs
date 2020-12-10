
# BYOD Immersion Day - Validation Tool

This tool is used to validate CSV files.

To use this tool, you need to follow the steps below to install. This project was built using Python with AWS Cloud Development Kit (CDK).

**Step 1:** You can use either your local PC or AWS Cloud9 to set up the stack. We recommend to use Cloud9 instead as most of the dependencies like CDK and AWS CLI is already preinstalled. This guide assumes that you'll be using Cloud9

**Step 2:** Create an IAM user with admin credentials and take note of the Access Key ID and Secret

**Step 3:** Open a terminal session in Cloud9 and enter the Access Key & Secret from Step 1.
```
$ aws configure --profile=dvt
```

**Step 4:** Clone the Data Validation tool
```
$ git clone <url here>
$ cd bring-your-own-data-labs
```
**Step 3:** Manually create a python virtual environment with virtualenv:
```
$ python3 -m venv .env
```

**Step 4:**After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.
```
$ source .env/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .env\Scripts\activate.bat
```

**Step 5:** Once the virtualenv is activated, you can install the required dependencies.

```
$ cd dvt
$ ./install_deps.sh
```

**Step 6:** At this point you can now deploy the Data Validation Tool stack with

```
$ ./deploy.sh dvt
```

