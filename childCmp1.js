import { LightningElement,wire,api } from 'lwc';
import fetchContacts from '@salesforce/apex/AccountController.fetchContacts';
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
export default class ChildCmp1 extends LightningElement {
    availableContacts;
    columns=columns;
    @wire( fetchContacts )  
    wiredContact( { error, data } ) {
        if ( data ) {
            this.availableContacts = data;
            console.log(this.availableContacts);
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.availableContacts = undefined;
        }

    }
    @api
    handleContacts() {
        if (this.searchValue !== '') {
            fetchContacts({
                    key2: this.searchValue
                })
                .then(result => {
                    console.log(result);
                    this.availableContacts = result;
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.availableContacts = null;
                });
        }
    }
    
}