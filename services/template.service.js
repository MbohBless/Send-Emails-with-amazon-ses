const path = require('path');
const fs = require('fs');
const { sesClient } = require('./sesclient.service');
const { CreateTemplateCommand, GetTemplateCommand, DeleteTemplateCommand } = require('@aws-sdk/client-ses');

export const templateService = {
    uploadTemplates: async () => {
        const templates = fs.readdirSync(path.join(__dirname, 'public', 'templates'));
        const templatePromises = templates.map(async (template) => {
            const templateName = template.split('.')[0];
            const templateContent = fs.readFileSync(path.join(__dirname, 'public', 'templates', `${templateName}`), 'utf8');
            const params = {
                Template: {
                    TemplateName: templateName,
                    HtmlPart: templateContent,
                    SubjectPart: `{{subject}}`
                }
            };
            try {
                const data = await sesClient.send(new CreateTemplateCommand(params));
                console.log(`Template ${templateName} uploaded successfully`, data);
            } catch (err) {
                console.log(`Error uploading template ${templateName}`, err);
                throw err;
            }
        });
        await Promise.all(templatePromises);
    },
    getTemplate: async (templateName) => {
        const params = {
            TemplateName: templateName
        };
        try {
            const data = await sesClient.send(new GetTemplateCommand(params));
            return data.Template;
        } catch (err) {
            console.log(`Error getting template ${templateName}`, err);
            // throw an error
            throw err;
        }
    },

    deleteTemplate: async (templateName) => {
        const params = {
            TemplateName: templateName
        };
        try {
            const data = await sesClient.send(new DeleteTemplateCommand(params));
            console.log(`Template ${templateName} deleted successfully`, data);
        } catch (err) {
            console.log(`Error deleting template ${templateName}`, err);
            throw err;

        }
    },
}