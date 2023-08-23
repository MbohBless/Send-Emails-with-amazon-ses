const path = require('path');
const fs = require('fs');
const { sesClient } = require('./sesclient.service');
const { CreateTemplateCommand, GetTemplateCommand, DeleteTemplateCommand, ListTemplatesCommand } = require('@aws-sdk/client-ses');

const templateService = {
    uploadTemplates: async () => {
        let templates = fs.readdirSync(path.join(__dirname, '..', 'public', 'templates'));
        // use the map function to map through each template and check to see that the templates do not exist
        await Promise.all(templates.map(async (template) => {
            const templateName = template.split('.')[0];
            try {
                const tmp = await templateService.getTemplate(templateName);
                console.log(`Template ${template} already exists`);
                if (tmp !== undefined) {
                    templates = templates.filter((templateData) => templateData !== template);
                }
            } catch (err) {
                if (err.name === 'TemplateDoesNotExist') {
                    console.log(`Template ${templateName} does not exist`);
                } else {
                    console.log(`Error getting template ${templateName}`, err);
                }
            }
        }));

        const templatePromises = templates.map(async (template) => {
            const templateName = template.split('.')[0];
            const templateContent = fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', `${template}`), 'utf8');
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
        return await Promise.all(templatePromises);
    },
    getTemplate: async (templateName) => {
        const params = {
            TemplateName: templateName
        };
        try {
            const data = await sesClient.send(new GetTemplateCommand(params));
            return data.Template;
        } catch (err) {
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
    getAllTemplates: async (itemCount) => {
        const params = {
            MaxItems: itemCount
        };
        try {
            const data = await sesClient.send(new ListTemplatesCommand(params));
            return data.TemplatesMetadata;
        }
        catch (err) {
            console.log(`Error getting templates`, err);
            throw err;
        }
    },
    deleteAllTemplates: async () => {
        const templates = fs.readdirSync(path.join(__dirname, 'public', 'templates'));
        await Promise.all(templates.map(async (template) => {
            const templateName = template.split('.')[0];
            try {
                await templateService.deleteTemplate(templateName);
            } catch (err) {
                console.log(`Error deleting template ${templateName}`, err);
                throw err;
            }
        }));
    }
}

module.exports = {
    templateService
}