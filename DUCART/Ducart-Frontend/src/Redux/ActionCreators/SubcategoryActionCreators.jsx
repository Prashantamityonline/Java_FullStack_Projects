import {
  CREATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  GET_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
} from "../Constants";

export function createMultipartRecord(formData) {
  return {
    type: CREATE_SUBCATEGORY,
    payload: formData,
  };
}

export function getSubcategory() {
  return {
    type: GET_SUBCATEGORY,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_SUBCATEGORY,
    payload: formData,
  };
}

export function deleteSubcategory(data) {
  return {
    type: DELETE_SUBCATEGORY,
    payload: data,
  };
}
