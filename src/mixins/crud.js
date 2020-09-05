/*
 * @Author: zhipeng
 * @Date: 2020-09-04 22:06:49
 * @LastEditTime: 2020-09-05 15:31:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-platform/src/mixins/crud.js
 */
import {
  initData
} from '@/api/data'
import { parseTime, downloadFile } from '@/utils/index'

export default {
  data () {
    return {
      // 表格数据
      data: [],
      // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
      sort: ['id,desc'],
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
      // 请求数据的url
      url: '',
      // 查询数据的参数
      params: {},
      // 待查询的对象
      query: {},
      // 等待时间
      time: 50,
      // 是否为新增类型的表单
      isAdd: false,
      // 导出的 Loading
      downloadLoading: false,
      // 表格 Loading 属性
      loading: true,
      // 删除 Loading 属性
      delLoading: false,
      delAllLoading: false,
      // 弹窗属性
      dialog: false,
      // Form 表单
      form: {},
      // 重置表单
      resetForm: {},
      // 标题
      title: ''
    }
  },
  methods: {
    parseTime,
    downloadFile,
    async init () {
      if (!(await this.beforeInit())) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true

        initData(this.url, this.getQueryParame())
          .then(data => {
            this.total = data.totalElements
            this.data = data.content

            setTimeout(() => {
              this.loading = false
              resolve(data)
            }, this.time)
          })
          .catch(error => {
            this.loading = false
            console.log('Crud Get Data Error')
            reject(error)
          })
      })
    },
    beforeInit () {
      return true
    },
    getQueryParame: function () {
      return {
        page: this.page,
        size: this.size,
        sort: this.sort,
        ...this.query,
        ...this.params
      }
    },
    // 改变页码
    pageChange (page) {
      this.page = page - 1
      this.init()
    },
    // 改变每页显示数
    sizeChange (size) {
      this.page = 0
      this.size = size
      this.init()
    },
    // 查询方法
    toQuery () {
      this.page = 0
      this.init()
    },
    /**
     * 通用的提示封装
     */
    submitSuccessNotify () {
      this.$notify({
        title: '提交成功',
        type: 'success',
        duration: 2500
      })
    },
    addSuccessNotify () {
      this.$notify({
        title: '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    editSuccessNotify () {
      this.$notify({
        title: '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    delSuccessNotify () {
      this.$notify({
        title: '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    notify (title, type) {
      this.$notify({
        title: title,
        type: type,
        duration: 2500
      })
    }
  }
}
