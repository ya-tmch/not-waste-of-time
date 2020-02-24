import React from "react"
import {Table as AntTable} from "antd"

const columns = [
  {
    title: 'VIN',
    dataIndex: 'vin',
    key: 'vin',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: 'Dealer name',
    dataIndex: 'dealer.name',
    key: 'dealer.name',
  },
  {
    title: 'Dealer address',
    dataIndex: 'dealer.address',
    key: 'dealer.address',
  },
]

const Table = (props) => {
  return (
    <div>
      <AntTable
        rowKey={'vin'}
        columns={columns}
        dataSource={props.dataSource}
        pagination={props.pagination}
        loading={props.loading}
        onChange={props.onChange}/>
    </div>
  )
}

export default React.memo(Table)