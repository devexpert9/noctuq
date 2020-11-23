export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},			
				{
					title: 'Users',
					root: true,
					bullet: 'dot',
					page: 'users',
					icon: 'fa fa-users'
				},
				{
					title: 'Hosts',
					root: true,
					bullet: 'dot',
					page: 'hosts',
					icon: 'flaticon2-user-outline-symbol'
				},
					{
					title: 'Events',
					root: true,
					bullet: 'dot',
					icon: 'fa fa-calendar',
						submenu: [
						{
							title: 'Manage Events',
							page: 'events'
						},
						{
							title: 'Genre Type',
							page: 'genre_types'
						}
					]
				},
				{
					title: 'Venues',
					root: true,
					bullet: 'dot',
					icon: 'fa fa-building',
						submenu: [
						{
							title: 'Manage Venues',
							page: 'venues'
						},
						{
							title: 'Venue Type',
							page: 'venue_types'
						}
					]
				},
				{
					title: 'Pages',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-file-2',
					page: 'pages'
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
