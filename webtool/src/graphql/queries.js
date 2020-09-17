/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getJobs = /* GraphQL */ `
  query GetJobs($id: ID!) {
    getJobs(id: $id) {
      id
      start_ts
      end_ts
      filename
      filename_version
      status
      warnings
      errors
      staged
      profile_start_ts
      profile_end_ts
      profile_uri
      result_uri
      createdAt
      updatedAt
    }
  }
`;
export const listJobss = /* GraphQL */ `
  query ListJobss(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        start_ts
        end_ts
        filename
        filename_version
        status
        warnings
        errors
        staged
        profile_start_ts
        profile_end_ts
        profile_uri
        result_uri
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
