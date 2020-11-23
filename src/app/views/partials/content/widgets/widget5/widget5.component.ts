// Angular
import { Component, Input, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';

export interface Widget5Data {
	pic?: string;
	title: string;
	desc: string;
	url?: string;
	info?: string;
	largeInfo?: string;
}

@Component({
	selector: 'kt-widget5',
	templateUrl: './widget5.component.html',
	styleUrls: ['./widget5.component.scss']
})
export class Widget5Component implements OnInit {
	// Public properties
	@Input() data: Widget5Data[];

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		if (!this.data) {
			this.data = shuffle([]);
		}
	}
}
