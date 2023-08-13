//Please use this file for all top-level types

//Add as needed

export enum Roles {
	ADMIN,
	ENDUSER,
	TECHNICIAN
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
