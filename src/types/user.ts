// This file contains the TypeScript interfaces for the user data structure.
// It is used to define the structure of the user data returned by the API.
// The interfaces are used to ensure that the data returned by the API matches the expected structure.
export interface GroupInfo {
  id?: string
  name?: string
}

export interface User {
  email?: string
  firstName?: string
  groups?: GroupInfo[]
  id?: string
  lastName?: string
  organizationId?: string
  roles?: string[]
  state?: string
  type?: string
  userAttributes?: Record<string, string>
}

export interface UserListApiResponse {
  data: User[]
  meta: {
    pagination: {
      count: number
      nextPage: null | string
      pageNumber: number
      pageSize: number
      totalPages: number
    }
  }
}

export interface UserApiResponse {
  data: User
}
