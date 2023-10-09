export const routeToTitle = (route: string) => {
	if (route.endsWith('dashboard')) {
		return 'Search Assets';
	} else if (route.endsWith('admin')) {
		return 'Admin Panel';
	} else if (route.endsWith('user-settings')) {
		return 'My Account';
	} else if (route.endsWith('manage-employees')) {
		return 'Manage Technicians';
	} else if (route.endsWith('my-account')) {
		return 'My Account';
	}
};
