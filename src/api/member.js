import request from '@/utils/request'

const api = {
  memberList: 'Member/index'
}

export default {
  memberList (parameter) {
    return request({
      url: api.memberList,
      method: 'get',
      params: parameter
    })
  }
}
