import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MultiLdtModal extends LightningModal {
    
    // Modal header
    @api header;
    
    // Data table details
    @api tableList;

    // Close button
    handleClickClose() {
        this.close();
    }
}