aws cloudformation package --template-file cloudformation.yaml --s3-bucket watchist-deployment --output-template-file cloudformation-packaged.yaml
aws cloudformation deploy --template-file cloudformation-packaged.yaml --stack-name Watchist --capabilities CAPABILITY_IAM
