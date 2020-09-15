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
      meta
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
        meta
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
