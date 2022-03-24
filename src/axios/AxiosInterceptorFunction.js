import axios from 'axios';
import {Alert} from 'react-native';
import toast from '../components/utils/Toast';

/**
 * @description Sends a Get request to api
 * @param {String} route
 * @example "/api/route"
 * @returns Promise<any>
 */

let Get = async (route, token, showAlert = true) => {
  const options = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.get(route, options);
    return response;
  } catch (error) {
    console.log('error', error.response);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        Alert.alert(
          error.message,
          'Please Check Your Network Connection',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Submission Errors',
          error.response.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */

let Post = async (route, data, headers, showAlert = true) => {
  try {
    console.log("DATA",route,data)
    return await axios.post(route, data, headers);
  } catch (error) {
    console.log('error', error.response.data);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        toast.show({
          title: 'Please Check Your Network Connection',
          message: error?.message,
          type: 'danger',
        });
      } else {
        toast.show({
          title: 'Oops!',
          message: error?.response?.data?.message,
          type: 'danger',
        });
      }
    }
    return undefined;
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */
let Patch = async (route, data, headers, showAlert = true) => {
  try {
    return await axios.patch(route, data, headers);
  } catch (error) {
    console.log('error', error?.response?.data);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        toast.show({
          title: 'Please Check Your Network Connection',
          message: error?.message,
          type: 'danger',
        });
      } else {
        toast.show({
          title: 'Oops!',
          message: error?.response?.data?.message,
          type: 'danger',
        });
      }
    }
  }
};

export {Post, Get, Patch};
