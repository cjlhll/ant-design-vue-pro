const tableMixin = {
  data () {
    return {
      // 查询参数
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      tableData: [],
      pagination: {
        showSizeChanger: true
      },
      method: null,
      tableLoading: false
    }
  },
  methods: {
    init (method) {
      this.method = method
      this.tableLoading = true
      method(this.queryParam).then(res => {
        this.tableData = res.user
        const pagi = { ...this.pagination }
        pagi.total = parseInt(res.count)
        this.pagination = pagi
        this.tableLoading = false
      })
    },
    handleTableChange (pagination, filters, sorter) {
      // console.log(pagination)
      this.queryParam.pageNo = pagination.current
      this.queryParam.pageSize = pagination.pageSize
      this.init(this.method)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}

export default tableMixin
