const base = (state) => {
  return state.main
}

const getErrorSelector = () => state => {
  return base(state).main.error
}

const getDealersSelector = () => state => {
  return base(state).dealers.data
}

const getCarsSelector = () => state => {
  return base(state).cars
}

const getTableData = () => state => {
  const
    dealersLoading = base(state).dealers.loading,
    dealersData = base(state).dealers.data,
    carsData = base(state).cars.data

  if (!carsData) {
    return null
  }

  return carsData.map(car => {
    let dealer = null

    const dealerData = dealersData.find(dealer => dealer.id === car.dealerId)

    if (dealerData) {
      const address = car
        .dealerOfficesIds
        .map(officeId => dealerData.addresses.find(office => office.id === officeId))
        .filter(office => office)
        .map(office => office.address)
        .join('; ')

      dealer = {
        name: dealerData.name,
        address: address
      }

    } else if (dealersLoading) {
      dealer = {
        name: 'Загрузка...',
        address: 'Загрузка...'
      }
    }

    return {
      ...car, dealer
    }
  })
}

export {
  getErrorSelector,
  getDealersSelector,
  getCarsSelector,
  getTableData
}