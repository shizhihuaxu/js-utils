// 破解递归爆栈，改用循环
function cloneLoop(srcObj) {
	const root = {}

	// 遍历的对象列表
	const list = [
		{
			parent: root,  // 父对象
			key: undefined,  // 父对象的某个key
			data: srcObj,  // 父对象某个key 对应的值
		}
	]

	while(list.length) {
		const node = list.pop()  // 取出一个节点
		const parent = node.parent  // 取出父对象
		const key = node.key  // 取出父对象的某个key
		const data = node.data // 取出父对象对应的 key 的值

		let temp = parent

		if(typeof key !== undefined){
			// 不能直接使用parent[key],所以创建一个临时变量保持引用关系
			// 改变了 res 就会改变 parant[key]
			temp = parent[key] = {}  
		} 

		for(let i in data) {
			if(data.hasOwnProperty(i)) {
				if(typeof data[i] === 'object') {
					list.push({
						parent: temp,
						key: i,
						data: data[i]
					})
				}else {
					temp[i] = data[i]
				}
			}
		}
	}

	return root
}


// 破解循环引用
// 什么是循环引用的问题呢？ 当一个key 的value 是另一个已经存在的对象，在拷贝时不希望丢失掉这种引用关系
function cloneForce(srcObj) {
	let root = {}
	const uniqueList = []
	const list = [
		{
			parent: root,
			key: undefined,
			data: srcObj,
		}
	]

	while(list.length) {
		let node = list.pop()
		let parent = node.parent
		let key = node.key
		let data = node.data

		let res = parent

		let uniqueData = find(uniqueList, data)
		if(uniqueData) {
			res = parant[key] = unqueData.target
			continue
		}

		uniqueList.push({
			target: res,
			source: data
		})

		for(let k in data) {
			if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    list.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
		}
	}

	return root
}

function find(arr, item) {
	for(let i = 0; i < arr.length; i++){
		if(arr[i].source === item) {
			return arr[i]
		}
	}

	return null
}