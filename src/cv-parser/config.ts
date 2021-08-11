export default {
  font_sizes: {
    profile: 26,
    education_name: 12,
  },
  re: {
    email: /([a-zA-Z_\d\-\.]*@[a-zA-Z_\d\-\.]*\.[a-zA-Z_\d]*)/g,
    phone: /(\+\d{7,})/g,
    profiles:
      /(\S*linkedin\.com\S*)|(\S*t\.me\/\S*)|(\S*github\.com\S*)|(\S*vk\.com\S*)|(\S*facebook\.com\S*)/g,
    languages: /^(.*?)\ *(?:\((.*?)\))*$/,
    page_identificator: /(Page\ *\d\ *of\ *\d)/g,
    skype_live: /Skype.*(live:\S*)/g,
    education_date_range: /·*\p{Z}*\((\S*)\p{Z}*-\p{Z}*(\S*)\)/gu,
  },
};
