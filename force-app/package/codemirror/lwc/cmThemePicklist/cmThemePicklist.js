import { LightningElement, api } from 'lwc';

export default class CmThemePicklist extends LightningElement {
	
	@api
	name = 'theme';

	@api
	label = 'Theme';

	@api
	value = 'ambiance';

	@api
	placeholder = 'Select theme...';

	@api
	variant = 'label-hidden';
	
    // Options for mode
	get options() {
		return [
			{ label: 'Default',		value: 'default' },
			{ label: 'Ambiance',	value: 'ambiance' },
			{ label: 'Eclipse', 	value: 'eclipse' },
			{ label: 'Lesser Dark',	value: 'lesser-dark' },
			{ label: 'Material', 	value: 'material' },
			{ label: 'Monokai', 	value: 'monokai' }
			
		];
	}

	// On change dispatch event
	handleChange(event) {
        this.value = event.detail.value;
		this.dispatchEvent(new CustomEvent('valuechange',{detail : event.detail.value}));
    }
}