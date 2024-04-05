import LightningDatatable from 'lightning/datatable';
import salesforceLogoIcon from './salesforceLogoIcon';
import userIcon from './userIcon';

export default class ExtendedDatatable extends LightningDatatable {
    static customTypes = {
        salesforceLogoIcon: {
            template: salesforceLogoIcon,
            typeAttributes: ['color']
        },
        userIcon: {
            template: userIcon,
            typeAttributes: ['color']
        }
    }
}