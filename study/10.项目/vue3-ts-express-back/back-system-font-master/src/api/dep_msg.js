import instance from '@/http/index.js'

// 获取部门消息 id list 
export const getDepartmentMsg = (id, department) => {
	return instance({
		url: '/dm/getDepartmentMsg',
		method: 'POST',
		data: {
			id,
			department
		}
	})
}

// 获取部门消息
export const getDepartmentMsgList = (department) => {
	return instance({
		url: '/dm/getDepartmentMsgList',
		method: 'POST',
		data: {
			department
		}
	})
}


// 返回用户的阅读列表及状态
export const getReadListAndStatus = (id) => {
	return instance({
		url: '/dm/getReadListAndStatus',
		method: 'POST',
		data: {
			id
		}
	})
}

// 用户点击消息后,对read_list内的数据进行删减
export const clickDelete = (readId, id) => {
	return instance({
		url: '/dm/clickDelete',
		method: 'POST',
		data: {
			readId,
			id
		}
	})
}

// 把新发布文章的id插入到当前所属部门的用户的read_list中
export const changeUserReadList = (newId, department) => {
	return instance({
		url: '/dm/changeUserReadList',
		method: 'POST',
		data: {
			newId,
			department
		}
	})
}

// 把删除的文章的id从当前所属部门的用户的read_list中删除
export const changeUserReadListButDelete = (deleteId, department) => {
	return instance({
		url: '/dm/changeUserReadListButDelete',
		method: 'POST',
		data: {
			deleteId,
			department
		}
	})
}