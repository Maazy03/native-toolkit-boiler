export const apiUrl = 'https://lac-app-backend.herokuapp.com';
// export const apiUrl = 'https://f610-103-244-178-85.eu.ngrok.io';
export const imageUrl = `${apiUrl}/api/images`;

export const URL = link => {
  return `${apiUrl}/api/v1/${link}`;
};

export default function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};
