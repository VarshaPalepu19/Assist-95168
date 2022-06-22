import { LightningElement,wire,api } from 'lwc';
import fetchLeads from '@salesforce/apex/AccountController.fetchLeads';
const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class ChildCmp2 extends LightningElement {
    availableLeads;
    columns=columns;
    @wire( fetchLeads )  
    wiredLead( { error, data } ) {
        if ( data ) {
            this.availableLeads = data;
            console.log(this.availableLeads);
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.availableLeads = undefined;
        }

    }
    @api
    handleLeads() {
        if (this.searchValue !== '') {
            fetchLeads({
                    key3: this.searchValue
                })
                .then(result => {
                    console.log(result);
                    this.availableLeads = result;
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.availableLeads = null;
                });
        }
    }
    
}