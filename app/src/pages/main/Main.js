import React, {useEffect} from 'react'
import {Layout, Alert} from "antd"
import {useDispatch, useSelector} from 'react-redux'
import Table from "./components/table"
import {fetchDataAction} from "./actions"
import {getCarsSelector, getDealersSelector, getErrorSelector, getTableData} from "./selectors"
import {DEFAULT_PAGE_SIZE} from "../../constants";

const {Header, Content, Footer} = Layout

const Main = () => {
  const
    dispatch = useDispatch(),
    error = useSelector(getErrorSelector()),
    loadedDealersIds = useSelector(getDealersSelector()).map(item => item.id),
    cars = useSelector(getCarsSelector()),
    tableData = useSelector(getTableData())

  const pagination = {
    total: cars.total,
    current: cars.currentPage,
    pageSize: DEFAULT_PAGE_SIZE
  }

  useEffect(() => {
    dispatch(fetchDataAction(1, loadedDealersIds))
    // eslint-disable-next-line
  }, [])

  const onChangeHandler = ({current}) => {
    dispatch(fetchDataAction(current, loadedDealersIds))
  }

  return (
    <Layout>
      <Header>Тестовое задание</Header>
      <Layout>
        <Content>

          {error && (
            <Alert
              message="Error" description={error} type="error"
            />
          )}

          {!error && (
            <Table
              dataSource={tableData}
              pagination={pagination}
              loading={cars.loading}
              onChange={onChangeHandler}
            />
          )}
        </Content>
      </Layout>
      <Footer/>
    </Layout>
  )
}

export default Main