# Using Isengard CLI with CodeCommit

## Install Isengard CLI

1. Isengard CLI [Mac installation](https://drive-render.corp.amazon.com/view/rizra@/Isengard-cli/docs/installation_mac.html "AEA Site")

2. Run the following commands

```bash
isengard assume jorara+ugym
isengard credentials
```
This exports the AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY to your shell environment

## Install git-remote-codecommit

From the docs 

*"...this utility provides a simple method for pushing and pulling code from CodeCommit repositories by extending Git. It is the recommended method for supporting connections made with federated access, identity providers, and temporary credentials."*

1. Install pre-requisites 
   
   * Python 3
   * git

Link to [Setup Instructions](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-git-remote-codecommit.html#setting-up-git-remote-codecommit-prereq "AWS Docs")

2. Install git-remote-codecommit

```python
pip install git-remote-codecommit
```

## Clone the Unicorn Gym repo

1. Open the [CodeCommit console](https://console.aws.amazon.com/codesuite/codecommit/home)
2. In the region selector, choose 'Singapore'
3. For the repository **'bring-your-own-data-labs'**, get the Clone URL --> HTTPS (GRC)
4. Clone the repo 

```bash
git clone codecommit::ap-southeast-1://bring-your-own-data-labs
```







