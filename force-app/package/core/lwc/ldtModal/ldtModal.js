import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class LdtModal extends LightningModal {
    
    // Modal header
    @api header;
    
    // Data table details
    @api ldt;

    // Close button
    handleClickClose() {
        this.close();
    }
}