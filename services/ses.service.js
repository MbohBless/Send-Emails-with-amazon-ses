const { sesClient } = require('./sesclient.service')
const { SendEmailCommand, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses')
const HandleBars = require('handlebars')
const { templateService } = require('./template.service')
const sesService = {
    sendEmail: async (to, from, subject, body) => {
        const params = {
            Destination: {
                ToAddresses: to
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
        try {
            // const params = {
            //     Destination: {
            //         ToAddresses: to
            //     },
            //     Source: from,
            //     Template: templateName,
            //     TemplateData: JSON.stringify(templateData)
            // }

            // await sesClient.send(new SendTemplatedEmailCommand(params))
            const template = await templateService.getTemplate(templateName)
            const compiledTemplate = HandleBars.compile(template.HtmlPart)
            const htmlData = compiledTemplate(templateData)
            sesService.sendEmail(to, from, template.SubjectPart, htmlData)

        } catch (err) {
            console.log(`Error sending email`, err)
            throw err
        }
    }
}

module.exports = {
    sesService
}