//Please use this file for all top-level types

//Add as needed

export class Claims {
	admin: boolean;
	user_type: UserType;
	constructor(is_admin: boolean, user_type: UserType) {
		this.admin = is_admin;
		this.user_type = user_type;
	}
}

export enum UserType {
	Fliot = 1,
	Technician = 2,
	EndUser = 3
}

export enum StatusCodes {
	NotFound = 404,
	Success = 200,
	BadRequest = 400,
	Forbidden = 403
}

export enum RequestMethod {
	POST = 'POST',
	DELETE = 'DELETE',
	GET = 'GET',
	PUT = 'PIT',
	PATCH = 'PATCH'
}
