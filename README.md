# Anontine

Anontine is an anonymous messaging platform built using Salesforce LWC (Lightning Web Components) and deployed as an Experience Site. It allows users to send anonymous messages to friends, colleagues, loved ones, or anyone without revealing their identity.

## Features

- **Anonymous Messaging**: Users can send and receive messages without revealing their identity.
- **LWC & Experience Site**: Built using Salesforce Lightning Web Components and deployed via Experience Cloud.
- **User-Friendly Interface**: Clean and modern UI using LWC principles.
- **Secure & Private**: Data is stored securely with proper access controls.

## Tech Stack

- **Salesforce** (LWC, Apex, Experience Cloud)
- **JavaScript**
- **HTML & CSS**
- **Git/GitHub** for version control

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anuragnarok/anontine.git
   cd anontine
   ```

2. **Authorize Salesforce Org**:
   ```bash
   sfdx auth:web:login
   ```

3. **Push the project to your Salesforce Org**:
   ```bash
   sfdx force:source:push
   ```

4. **Assign permissions** (if required):
   ```bash
   sfdx force:user:permset:assign -n YourPermissionSet
   ```

5. **Open the Experience Site**:
   ```bash
   sfdx force:org:open
   ```

## Usage

- Users can visit the Anontine Experience Site and send anonymous messages.
- Messages are delivered securely while keeping the sender anonymous.

## Contribution

If you’d like to contribute:
- Fork the repo
- Create a new branch (`git checkout -b feature-branch`)
- Make your changes and commit (`git commit -m "Added new feature"`)
- Push the branch (`git push origin feature-branch`)
- Open a pull request

## License

This project is licensed under the MIT License. Feel free to modify and use it as needed.

---

🚀 Built with 💙 using Salesforce LWC & Experience Cloud!

