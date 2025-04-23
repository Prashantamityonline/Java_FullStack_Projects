import {
  CREATE_MAINCATEGORY,
  DELETE_MAINCATEGORY,
  GET_MAINCATEGORY,
  UPDATE_MAINCATEGORY,
} from "../Constants";

export function createMultipartRecord(formData) {
  return {
    type: CREATE_MAINCATEGORY,
    payload: formData,
  };
}

export function getMaincategory() {
  return {
    type: GET_MAINCATEGORY,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_MAINCATEGORY,
    payload: formData,
  };
}

export function deleteMaincategory(data) {
  return {
    type: DELETE_MAINCATEGORY,
    payload: data,
  };
}
