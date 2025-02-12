import { LightningElement, track, wire } from 'lwc';
import getMessages from '@salesforce/apex/ValentineMessageController.getMessages';
import addReaction from '@salesforce/apex/ValentineMessageController.addReaction';
import { subscribe, MessageContext } from 'lightning/messageService';
import REFRESH_MESSAGE_CHANNEL from '@salesforce/messageChannel/RefreshMessageList__c';
import RefreshedMessages from '@salesforce/apex/ValentineMessageController.RefreshedMessages';
export default class ValentineMessageList extends LightningElement {
    @track messages = [];
    subscription;

    @wire(MessageContext) messageContext;

    @wire(getMessages)
    wiredMessages({ error, data }) {
        if (data) {
            this.messages = data.map(msg => ({
                ...msg,
                formattedDate: new Date(msg.CreatedDate).toLocaleString()
            }));
        } else if (error) {
            console.error(error);
        }
    }

        /* connectedCallback() {
            getMessages()
                .then(data => {
                    this.messages = data.map(msg => ({
                        ...msg,
                        formattedDate: new Date(msg.CreatedDate).toLocaleString()
                    }));
                })
                .catch(error => {
                    console.error(error);
                });
        } */
        

    renderedCallback() {
        // Subscribe to the message channel
        if(!this.subscription){

            this.subscription = subscribe(
                this.messageContext,
                REFRESH_MESSAGE_CHANNEL,
                (message) =>{  console.log('Refresh message received:', message); 
                    this.handleRefresh()}
                );
            }
    }

    handleRefresh() {
        console.log('Refreshing messages...');
        RefreshedMessages()
            .then(data => {
                console.log('Raw data from Apex:', JSON.stringify(data));
                // Force reactivity by creating a new array
                this.messages = JSON.parse(JSON.stringify(data.map(msg => ({
                    ...msg,
                    formattedDate: new Date(msg.CreatedDate).toLocaleString()
                }))));
                console.log('Messages refreshed:', this.messages);
            })
            .catch(error => {
                console.error('Error refreshing messages:', error);
            });
    }

    handleReaction(event) {
        const messageId = event.target.dataset.id;
        addReaction({ messageId })
            .then(() => {
                this.messages = this.messages.map(msg => 
                    msg.Id === messageId ? { ...msg, Like_Count__c: msg.Like_Count__c + 1 } : msg
                );
            })
            .catch(error => {
                console.error('Error adding reaction:', error);
            });
    }
}