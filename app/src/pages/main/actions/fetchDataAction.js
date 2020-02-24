import uniq from 'lodash/uniq'
import {fetchCars, fetchDealers} from "../../../api"

import {
  CARS_FETCH_BEGIN,
  CARS_FETCH_END,
  CARS_FETCH_FAIL,
  DEALERS_FETCH_BEGIN,
  DEALERS_FETCH_END,
  DEALERS_FETCH_FAIL,
} from "../constants"

const fetchCarsPart = async (dispatch, page) => {
  dispatch({type: CARS_FETCH_BEGIN})

  let {carsData, totalCount} = await fetchCars(page)

  const cars = carsData.map(item => ({
    vin: item.vin,
    brand: item.brand,
    model: item.model,
    grade: item.grade,
    dealerId: item.dealer,
    dealerOfficesIds: item.office_ids,
  }))

  const payload = {
    data: cars,
    totalItems: totalCount,
    currentPage: page,
  }

  dispatch({type: CARS_FETCH_END, payload})

  return carsData
}

const fetchDealersPart = async (dispatch, needFetchDealersIds) => {
  dispatch({type: DEALERS_FETCH_BEGIN})

  let {dealersData} = await fetchDealers(needFetchDealersIds)

  const dealers = dealersData.map(item => ({
    id: item.id,
    name: item.name,
    addresses: item.offices.map(item => ({
      id: item.id,
      address: item.address,
    })),
  }))

  // TODO Если в ответе нет данных по какому-нибудь id из переденного списка, можно запоминать, чтобы не делать повторный запрос

  dispatch({type: DEALERS_FETCH_END, payload: dealers})
}

export default (page, loadedDealersIds) => async dispatch => {
  let carsData

  try {
    carsData = await fetchCarsPart(dispatch, page)
  } catch (e) {
    dispatch({type: CARS_FETCH_FAIL, payload: String(e)})
    return
  }

  const needFetchDealersIds = uniq(carsData.map(item => item.dealer))
    .filter(dealerId => dealerId)
    .filter(dealerId => !loadedDealersIds.includes(dealerId))

  if (!needFetchDealersIds.length) {
    return
  }

  try {
    await fetchDealersPart(dispatch, needFetchDealersIds)
  } catch (e) {
    dispatch({type: DEALERS_FETCH_FAIL, payload: String(e)})
  }
}
