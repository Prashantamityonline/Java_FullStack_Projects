import {
  CREATE_BRAND,
  DELETE_BRAND,
  GET_BRAND,
  UPDATE_BRAND,
} from "../Constants";

export function createMutipartRecord(formData) {
  return {
    type: CREATE_BRAND,
    payload: formData,
  };
}

export function getBrand() {
  return {
    type: GET_BRAND,
  };
}

export function updateMultipartRecord(formData) {
  return {
    type: UPDATE_BRAND,
    payload: formData,
  };
}

export function deleteBrand(data) {
  return {
    type: DELETE_BRAND,
    payload: data,
  };
}
