import axios from "axios"
import {CARS_URL, DEALERS_URL, DEFAULT_PAGE_SIZE} from "./constants"

const fetchCars = async (page) => {
  const result = await axios.get(CARS_URL, {
    params: {
      state: 'active',
      hidden: 'false',
      group: 'new',
      page: page,
      per_page: DEFAULT_PAGE_SIZE
    },
    headers: {'X-CS-Dealer-Id-Only': 1}
  })

  return {
    carsData: result.data,
    totalCount: Number(result.headers['x-total-count']),
  }
}

const fetchDealers = async (ids) => {
  // todo cancel previous request
  const params = {}

  if (ids.length) {
    params['id__in'] = ids.join(',')
  }

  const result = await axios.get(DEALERS_URL, {params})

  return {
    dealersData: result.data
  }
}

export {
  fetchCars,
  fetchDealers
}