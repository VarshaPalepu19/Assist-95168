import { LightningElement, track, api,wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
import { NavigationMixin } from 'lightning/navigation';
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
export default class ChildCmp extends NavigationMixin(LightningElement ){
    // Default list of Contacts.
    availableAccounts;
    columns=columns;
    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {
        if ( data ) {
            this.availableAccounts = data;
            console.log(this.availableAccounts);
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.availableAccounts = undefined;
        }

    }
    @api
    handleAccounts() {
        console.log('reached to child method');
        if (this.searchValue !== '') {
            fetchAccounts({
                    key: this.searchValue
                })
                .then(result => {
                    console.log('results from child for accs',result);
                    this.availableAccounts = result;
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.availableAccounts = null;
                });
        }
    }
    handleRowAction1( event ) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }
    
    
}