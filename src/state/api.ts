import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth"
import { createNewUserInDatabase } from "@/lib/utils"
import { Manager, Tenant } from "@/types/prismaTypes"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession()
      const { idToken } = session.tokens ?? {}
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`)
      }
      return headers
    },
  }),
  reducerPath: "api",
  tagTypes: [
    "Managers",
    "Tenants",
    "Properties",
    "PropertyDetails",
    "Leases",
    "Payments",
    "Applications",
  ],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser()
          const userRole = idToken?.payload["customer:role"] as string

          const endpoint =
            userRole === "manager"
              ? `/managers/${user.userId}`
              : `/tenants/${user.userId}`

          let userDetailsResponse = await fetchWithBQ(endpoint)

          // if user doesn't exist, create new user
          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole,
            },
          }
        } catch (error: any) {
          return { error: error.massage || "Could not fetch user data" }
        }
      },
    }),
  }),
})
