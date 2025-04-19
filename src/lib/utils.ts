export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint =
    userRole?.toLocaleLowerCase() === "manager" ? "/managers" : "/tenants"

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || "",
      phoneNumber: "",
    },
  })

	if(createUserResponse.error) {
		throw new Error("Failed to create user record")
	}

	return createUserResponse
}
