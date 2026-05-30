const validationService = {};

// required field validation
validationService.required = (value) => {
  let isValid = 1;
  let message = '';

  if (
    typeof value === 'object' &&
    value !== null &&
    value !== undefined &&
    !Object.values(value).length
  ) {
    message = 'This field is required';
    isValid = 0;
  }

  if ([null, undefined, ''].includes(value)) {
    isValid = 0;
    message = 'This field is required';
  }

  return { isValid, message };
};

// email field validation
validationService.email = (value) => {
  let isValid = 1;
  let message = '';

  // const emailRegex = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(value)) {
    message = 'Invalid email format';
    isValid = 0;
  }

  return { isValid, message };
};

// username field validation
validationService.username = (value) => {
  return {
    ...validationService.required(value),
    ...validationService.email(value),
  };
};

// file type validation
validationService.fileType = (file, fileType = 'ANY') => {
  let allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  let maxFileSizeMB = 10;
  if (fileType === 'IMAGE') {
    allowedFileTypes = ['image/jpeg', 'image/png'];
  }
  if (fileType === 'DOCUMENT') {
    allowedFileTypes = ['application/pdf'];
  }
  if (fileType === 'ZIP') {
    allowedFileTypes = ['application/zip', 'application/x-rar-compressed', 'application/gzip', 'application/zip-compressed', 'application/x-zip-compressed'];
    maxFileSizeMB = 20;
  }

  let isValid = true,
    message = '';

  if (isValid && [null, undefined, ''].includes(file)) {
    message = 'This field is required';
    isValid = false;
  }

  if (isValid) {
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      message = `Invalid file type. Supported types are ${allowedFileTypes
        .map((a) => a.split('/')[1])
        .join(', ')}.`;
      isValid = false;
    }
  }

  if (isValid) {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to megabytes
    if (fileSizeMB > maxFileSizeMB) {
      message = `File size must be less than ${maxFileSizeMB} MB`;
      isValid = false;
    }
  }

  return {
    isValid,
    message,
  };
};

// digit validation
validationService.digit = (value, maxLength) => {
  let { isValid, message } = validationService.required(value);

  if (isValid && maxLength && value.length > maxLength) {
    message = `Please provide a valid max ${maxLength} digits.`;
    isValid = 0;
  }

  return {
    isValid,
    message,
  };
};

validationService.maxLength = (value, maxLength) => {
  let { isValid, message } = validationService.required(value);

  if (isValid && maxLength && value.length > maxLength) {
    message = `Maximum ${maxLength} characters allowed`;
    isValid = 0;
  }

  return {
    isValid,
    message,
  };
};

validationService.minLength = (value, minLength) => {
  let { isValid, message } = validationService.required(value);

  if (isValid && minLength && value.length <= minLength) {
    message = `Minimum ${minLength} characters allowed`;
    isValid = 0;
  }

  return {
    isValid,
    message,
  };
};

// array validation
validationService.array = (value = []) => {
  let isValid = 1;
  let message = '';

  if (isValid && !value.length) {
    message = 'You have to select at least one item.';
    isValid = 0;
  }

  return { isValid, message };
};

export { validationService };
