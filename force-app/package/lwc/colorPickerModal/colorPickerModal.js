import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class OrgActionsModal extends LightningModal {
    
    // Data table details
    @api color;

    handleChange(event){
        this.color = event.currentTarget.value;
    }

    // Close button
    handleClickClose() {
        this.close(this.color);
    }
}