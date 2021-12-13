

import {HOUSE_LIST_REQUEST,
    HOUSE_LIST_SUCCESS,
    HOUSE_LIST_FAIL} from '../constants/houseConstants'

export const houseListReducer = (state = { houses: [] }, action) => {
    switch (action.type) {
      case HOUSE_LIST_REQUEST:
        return { loading: true, houses: [] }
      case HOUSE_LIST_SUCCESS:
        return {
          loading: false,
          houses: action.payload
                 }
      case HOUSE_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  