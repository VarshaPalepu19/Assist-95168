import { LightningElement ,track} from 'lwc';
export default class ParentCmp extends LightningElement {
    searchValue='';
    handleSearchKeyword(event) {
        const objChild = this.template.querySelector('c-child-cmp');
        objChild.handleAccounts(this.searchValue);
        const objChild1 = this.template.querySelector('c-child-cmp1');
        objChild1.handleContacts(this.searchValue);
    }
    searchkey(event) {
        this.searchValue = event.target.value;
    }
}