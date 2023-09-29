# AWS SES Email Sending Application
This application is designed to provide a seamless and comprehensive solution for sending and managing emails using Amazon Web Services (AWS) Simple Email Service (SES). It follows a structured pattern with handlers, services, and routes, allowing for flexibility and customization in email communications.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Send Custom Email](#send-custom-email)
  - [Send Template Email](#send-template-email)
  - [Generate Email Templates](#generate-email-templates)
  - [Retrieve Email Template](#retrieve-email-template)
  - [Delete Email Template](#delete-email-template)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before using this application, make sure you have the following prerequisites:

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).

- **AWS SES Credentials**: Obtain AWS SES credentials (Access Key ID and Secret Access Key) by setting up an AWS account and SES service. Ensure that your AWS credentials are correctly configured on your local machine. in the env file for security


1. Clone this repository to your local machine:

   ```shell
   https://github.com/MbohBless/Send-Emails-with-amazon-ses.git
   next
   npm install
   next
   npm start 
   ```
# Usage
Now that you have successfully installed and set up the application, you can use it for sending emails, managing templates, and more. Here are some common usage scenarios:

### Send Custom Email
- **Endpoint**: `/send`
- **HTTP Method**: POST
- **Description**: Sends a custom email using AWS SES.
- **Request Body**: JSON object containing email details (e.g., recipient, subject, message).
- **Example Request**:
``` json
{
    "recipient": "recipient@example.com",
    "subject": "Hello from AWS SES",
    "body": "This is a test email from AWS SES."
}
```

### Send Template Email
- **Endpoint**: `/sendtemplate`
- **HTTP Method**: POST
- **Description**: Sends an email using an email template stored in your application.
- **Request Body**: JSON object containing template name and email details.
- **Example Request**:
  ```json
  {
    "templateName": "welcome",
    "to": "recipient@example.com",
  }
  ```

### Generate Email Templates
- **Endpoint**: `/generateTemplates`
- **HTTP Method**: POST
- **Description**: Generates email templates for use in the `/sendtemplate` endpoint.
- **Request Body**: The Body in this case is usually empty and always need unless the services folder or the handler is is modified. in this case there are about 5 templates that i did create which can be modified to match the required context.


### Retrieve Email Template
- **Endpoint**: `/template/:tempName`
- **HTTP Method**: GET
- **Description**: Retrieves an email template by name.
- **Parameters**:
  - `tempName`: The name of the template to retrieve.
- **Example Request**: `/template/welcome`
- **Example Response**: JSON object containing the template details.

  ### Delete Email Template
- **Endpoint**: `/template/:tempName`
- **HTTP Method**: DELETE
- **Description**: Deletes an email template by name.
- **Parameters**:
  - `tempName`: The name of the template to delete.
- **Example Request**: `/template/welcome`
- **Example Response**: HTTP status code indicating success or failure.

## Contributing
Contributions to this project are welcome! If you have ideas for improvements or new features, please open an issue or submit a pull request and if you wish get to me on just do I am lazy working when no one shows their interest in my ideas Email: `mbohblesspearl@gmail.com` 😁😁😁.




  



