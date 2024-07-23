module.exports = {
  friendlyName: "Capitalize",

  description: "Capitalize the first letter of a string.",

  inputs: {},

  fn: function (inputs) {
    // Capitalize the first letter of a string
    const capitalizeinput = inputs.charAt(0).toUpperCase() + inputs.slice(1);
    return capitalizeinput;
  },

  exits: {
    success: {
      description: "All done.",
    },
    err: {
      description: "An unexpected error occurred.",
    },
  },
};
