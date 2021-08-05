export default {
  re: {
    contacts: /.*?\(.*?\)/g,
    phone: /\+\d*/g,
    profiles:
      /(\S*linkedin\.com\S*)|(\S*t\.me\/\S*)|(\S*github\.com\S*)|(\S*vk\.com\S*)|(\S*facebook\.com\S*)/g,
    // email: /([a-zA-Z_\d\-\.]*@[a-zA-Z_\d\-\.]*\.[a-zA-Z_\d]*)/g, // TODO
  },
};
