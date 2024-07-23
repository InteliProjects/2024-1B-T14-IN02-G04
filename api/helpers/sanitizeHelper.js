module.exports = {

    friendlyName: 'Sanitize input',

    description: 'Sanitize input to prevent injections.',

    inputs: {
        input: {
            type: 'string',
            required: true,
            description: 'The input string to sanitize.'
        }
    },

    fn: async function (inputs) {
        // Sanitize the input to prevent injections
        const sanitizedInput = inputs.input.replace(/<\/?[^>]+(>|$)/g, "");
        return sanitizedInput;
    }
};
