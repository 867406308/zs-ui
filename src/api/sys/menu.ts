import request from '@/utils/request';

// 获取菜单
export function getList() {
  return request({
    url: '/sys/menu/list',
    method: 'get',
  });
}

export function getById(id) {
  return request({
    url: `/sys/menu/${id}`,
    method: 'get',
  });
}

export function save(data) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data,
  });
}

export function edit(data) {
  return request({
    url: '/sys/menu/update',
    method: 'put',
    data,
  });
}
