const sesClient = require('./sesclient.service')
const { SendEmailCommand, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses')

export const sesService = {
    sendEmail: async (to, from, subject, body) => {
        const params = {
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Text: {
                        Data: body
                    }
                },
                Subject: {
                    Data: subject
                }
            },
            Source: from
        }
        try {
            const data = await sesClient.send(new SendEmailCommand(params))
            console.log(`Email sent successfully`, data)
        } catch (err) {
            console.log(`Error sending email`, err)
            throw err
        }
    },
    sendTemplatedEmail: async (to, from, templateName, templateData) => {
        const params = {
            Destination: {
                ToAddresses: [to]
            },
            Source: from,
            Template: templateName,
            TemplateData: JSON.stringify(templateData)
        }
        try {
            const data = await sesClient.send(new SendTemplatedEmailCommand(params))
            console.log(`Email sent successfully`, data)
        } catch (err) {
            console.log(`Error sending email`, err)
            throw err
        }
    }
}
