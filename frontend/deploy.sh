echo "Started: `date`"

aws cloudformation deploy --template-file cloudformation.yaml --stack-name Watchist-frontend

set -e

npm run build

aws s3 sync --delete ./build s3://watchist.mambans.com

# | wc -l

echo "Done: `date`"
