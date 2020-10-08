const awssdk = {
  "region": "ap-southeast-1",
  "stager_function": "<StagerLambdaFunction>",
  "sqs_profile_url": "<SQSProfileQueue>",
  "source_s3_bucket": "<SourceS3Bucket>",
  "target_s3_bucket": "<TargetS3Bucket>",
  "profiling_folder": "profiling",
  "validation_folder": "validation",
  "presigned_url_expires": 60 * 5
}

export default awssdk;
