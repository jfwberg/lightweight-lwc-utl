import { LightningElement, api } from 'lwc';

export default class CmModePicklist extends LightningElement {
	
	@api
	name = 'mode';

	@api
	label = 'Mode';

	@api
	value = 'text/x-java';

	@api
	placeholder = 'Select mode...';

	@api
	variant = 'label-hidden';
	
	// Options for mode
	get options() {
		return [
			{ label: 'Markdown',	value: 'text/x-markdown' },
			{ label: 'Java (Apex)',	value: 'text/x-java' },
			{ label: 'JavaScript',	value: 'text/javascript' },
			{ label: 'CSS',			value: 'text/css' },
			{ label: 'HTML',		value: 'htmlmixed' },
			{ label: 'XML',			value: 'text/xml' },
			{ label: 'SQL',			value: 'text/x-sql' },
            { label: 'CSV',			value: 'csv' }
		];
	}

	// On change dispatch event
	handleChange(event) {
		this.value = event.detail.value;
		this.dispatchEvent(new CustomEvent('valuechange',{detail : event.detail.value}));
	}
}