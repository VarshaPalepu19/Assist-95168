public with sharing class AccountController {
    public AccountController() {

    }
    @AuraEnabled( cacheable = true )
    public static List<Account> fetchAccounts(string key) {
        string searchKey = '%'+key+'%';
        system.debug('reached to apex '+searchKey);
        return[
            SELECT Id,Name
                            FROM Account where name LIKE : searchKey
                            LIMIT 10];
         
    }
    @AuraEnabled( cacheable = true )
    public static List<Lead> fetchLeads() {
        return [
            SELECT Id, Name
            FROM Lead
            LIMIT 10
        ];
         
    }
    @AuraEnabled( cacheable = true )
    public static List<Contact> fetchContacts() {
        
        return [
            SELECT Id, Name
            FROM Contact
            LIMIT 10
        ];
         
    }
  
}