import { LightningElement, track ,wire} from 'lwc';
import postMessage from '@salesforce/apex/ValentineMessageController.postMessage';
import { publish, MessageContext } from 'lightning/messageService';
import REFRESH_MESSAGE_CHANNEL from '@salesforce/messageChannel/RefreshMessageList__c';

export default class ValentineMessageForm extends LightningElement {
    @track messageText = '';
    @wire(MessageContext) messageContext;

    handleInput(event) {
        this.messageText = event.target.value;
    }

    submitMessage() {
        if (this.messageText.trim() === '') {
            alert('Please enter a message!');
            return;
        }
    
        postMessage({ messageText: this.messageText })
            .then(() => {
                this.messageText = '';
                // Publish a message to notify the list to refresh
                publish(this.messageContext, REFRESH_MESSAGE_CHANNEL, { refresh: true });
                console.log('Message published to refresh the list.');
                this.dispatchEvent(new CustomEvent('messageposted'));
            })
            .catch(error => {
                console.error('Error posting message:', error);
            });
    }
}