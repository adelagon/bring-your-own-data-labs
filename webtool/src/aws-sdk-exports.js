const awssdk = {
  "region": "ap-southeast-1",
  "stager_function": "stager-dev",
  "sqs_profile_url": "https://sqs.ap-southeast-1.amazonaws.com/933367311561/ugym-profiling",
  //"source_s3_bucket": "ugym-byod-data-test-bucket",
  //"target_s3_bucket": "ugym-byod-staging-test-bucket",
  //"target_s3_bucket": "ugym-byod-profiling-report",
  "source_s3_bucket": "byod-dvt-byodvalidationsourcebucket7d93d27c-1r8gq8degtw73",
  "target_s3_bucket": "byod-dvt-byodvalidationtargetbuckete3bb3b83-1sofnue3k5snk",
  "profiling_folder": "profiling",
  "validation_folder": "validation",
  "presigned_url_expires": 60 * 5
}

export default awssdk;
