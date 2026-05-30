const urlService = {};

urlService.prepareWebsiteURL = (url) => {
  let websiteURL = url.trim();

  if (!websiteURL.includes('www.')) {
    websiteURL = 'www.' + websiteURL;
  }

  if (!websiteURL.includes('http://') && !websiteURL.includes('https://')) {
    websiteURL = 'http://' + websiteURL;
  }

  return websiteURL;
};

export { urlService };
