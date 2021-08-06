export default {
  font_sizes: {
    profile: 26,
  },
  re: {
    phone: /\+\d*/g,
    profiles:
      /(\S*linkedin\.com\S*)|(\S*t\.me\/\S*)|(\S*github\.com\S*)|(\S*vk\.com\S*)|(\S*facebook\.com\S*)/g,
    languages: /^(.*?)\ *(?:\((.*?)\))*$/,
  },
};
