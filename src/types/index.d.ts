import { AuthUser } from "aws-amplify/auth"
import { Tenant, Manager } from "./prismaTypes"

declare global {
	interface User {
		cognitoInfo: AuthUser,
		userInfo: Tenant | Manager,
		userRole: JsonObject | JsonPrimitive | JsonArray
	}
}