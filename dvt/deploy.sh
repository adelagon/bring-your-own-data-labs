#!/bin/bash
echo 'Bootstrapping CDK...'
cdk bootstrap --profile=$1

echo 'Deploying Base Infra...'
cdk deploy  --profile=$1

echo 'Generating config file for frontend...'
### Dirty hack for now as CDK doesn't support returning outputs from app context
#   We need these outputs to wire the frontend with
printf "ClientId=" > outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='ClientId'].OutputValue" --output=text >> outputs.txt
printf "GraphQLEndpoint=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='GraphQLEndpoint'].OutputValue" --output=text >> outputs.txt
printf "UserPoolId=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output=text >> outputs.txt
printf "IdentityPoolId=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='IdentityPoolId'].OutputValue" --output=text >> outputs.txt
printf "SourceS3Bucket=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='SourceS3Bucket'].OutputValue" --output=text >> outputs.txt
printf "TargetS3Bucket=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='TargetS3Bucket'].OutputValue" --output=text >> outputs.txt
printf "SQSProfileQueue=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='SQSProfileQueue'].OutputValue" --output=text >> outputs.txt
printf "StagerLambdaFunction=" >> outputs.txt
aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='StagerLambdaFunction'].OutputValue" --output=text >> outputs.txt
mv outputs.txt webtool/src/
cd webtool/src/
./generate_config.py

echo 'Building frontend...'
npm run-script build

echo 'Deploying frontend...'
webtool_bucket=$(aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='WebToolS3Bucket'].OutputValue" --output=text)
echo $webtool_bucket
aws s3 sync ../build/ s3://$webtool_bucket --profile=$1


webtool_url=$(aws cloudformation --profile=$1 describe-stacks --stack-name byod-dvt --query="Stacks[0].Outputs[?OutputKey=='WebToolUrl'].OutputValue" --output=text)
echo 'You may now open the webtool at:'
echo $webtool_url
