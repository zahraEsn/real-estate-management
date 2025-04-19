import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { fetchAuthSession } from "@aws-amplify/auth"

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		prepareHeaders: async (headers) => {
			const session = await fetchAuthSession()
			const { idToken } = session.tokens ?? {}
			if(idToken){
				headers.set("Authorization", `Bearer ${idToken}`)
			}
			return headers
		}
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
	endpoints: () => ({})
})