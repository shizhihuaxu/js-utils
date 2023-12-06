/**
 * 获取数据类型
 * @author shizhihuaxu 2019-04-10
 * @param  {[type]} elem 任意类型的元素
 * @return {String}      描述元素类型的字符串,小写
 */
export const getType = (elem) => {
    return Object.prototype.toString.call(elem).slice(8, -1).toLowerCase()
}

/**
 * 判断一个变量是否为空 null、undefined、''、[]、{}
 * @author shizhihuaxu 2019-08-26
 * @param  any          elem 变量
 * @return Boolean      true/false
 */
export const isEmpty = (elem) => {
    // 是否为空的标志位
    let flag = false
    // 变量的数据类型
    let type = Object.prototype.toString.call(elem).slice(8, -1).toLowerCase()

    switch (type) {
        case 'undefined' || 'null':
            flag = true
            break;
        case 'string':
            flag = elem.length === 0
            break
        case 'array':
            flag = (elem.length === 0)
            break
        case 'object':
            flag = Object.keys(elem).length === 0
            break
    }

    return flag
}

/**
 * 浅拷贝 引用类型 一层复制
 * @author shizhihuaxu 2019-08-09
 * @param  {Object} obj 源对象
 * @return {Object}     新对象
 */
export const shallowClone = (obj) => {
    let res = {}

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) { // 只复制自身属性，不包含原型链上的属性
            res[key] = obj[key]
        }
    }

    return res
}

/**
 * 深拷贝 引用类型 深层次复制
 * @author shizhihuaxu 2019-04-08
 * @param  {Object} obj 原对象
 * @return {Object}     新对象
 */
/** 局限性：
    1、层次过深导致堆栈溢出
    优点：
    1、JSON.stringify内部做了循环引用的检测
*/
export const deepClone1 = (obj) => {
    let temp = JSON.stringfy(obj)

    return JSON.parse(temp)
}

export const deepClone = (obj, res) => {
    if(!(typeof obj === 'object' && obj !== null)) return obj // 排除掉 null 和 非对象的情况
    
    var res = res || {}

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) { // 只复制自身属性，不包含原型链上的属性
            if (typeof obj[key] === 'object') {
                res[key] = (obj[key].constructor === "Array") ? [] : {}
                deepClone(obj[key], res[key]) // 尾递归优化 防止层级过深爆栈的问题
            } else {
                res[key] = obj[key]
            }
        }
    }

    return res
}

/**
 * 去除字符串前后空格
 * @author shizhihuaxu 2019-04-08
 * @param  {String} str 原字符串
 * @return {string}     去除前后空格的字符串
 */
export const trim = (str) => {
    return (str || '').replace(/^(\s|00A0)+|(\s|00A0)+$/g, '')
}

/**
 * 判断字符串是否是回文
 * @author shizhihuaxu 2019-04-10
 * @param  {String} str [description]
 * @return {Boolean}    [description]
 */
export const isPalindrome = (str) => {
    let left = 0
    let right = str.length - 1

    while (left < right) {
        if (str[left] !== str[right]) {
            return false
        }
        left++
        right--
    }

    return true
}
// method 2
export const isPalindrome1 = (str) => {
    let arr = str.split('')
    if (arr.reverse().join('') === str) return true

    return false
}

/**
 * 对象深层取值优雅的解决办法，避免属性不存在报错
 * @author shizhihuaxu 2019-06-24
 * @param  {Array}      path 目标对象的属性路径形成的数组
 * @param  {Object}     obj  目标对象
 * @return {[type]}     如果属性存在则返回属性值，否则返回null
 *
 * @example
 * const props = {
    user: {
        posts: [
            { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
            { title: 'Bar', comments: [ 'Ok' ] },
            { title: 'Baz', comments: []}
        ],
    }
    console.log(get(['user', 'posts', 0, 'comments'], props)) // [ 'Good one!', 'Interesting...' ]
}
 */
export const getDeepValue = (path, obj) => path.reduce((curObj, curVal) => (curObj && curObj[curVal]) ? curObj[curVal] : null, obj)

/**
 * 不四舍五入的保留 n 位小数
 * @author shizhihuaxu 2019-07-26
 * @param  {Number} num 操作的数值
 * @param  {Number} len 保留小数的长度
 * @return {Number}     保留小数后的数值
 */
export const toNonroundingFixed = (num, len = 1) => {
    if (typeof num !== 'number' || typeof len !== 'number')
        throw new Error('Invalid arguments')
    if (len >= 10)
        throw new Error('The decimal length is too long')

    return num.toFixed(len + 1).slice(0, -1) * 1
}

/**
 * 基础数据类型的数组去重
 * @author shizhihuaxu   2020-09-27
 * @param  Array         需要去重的数组
 * @return Array         已去重的数组
 */
export const uniqueArr = (arr) => {
    if (!arr.length) return []

    let newArr = []

    arr.forEach((cur, index, curArr) => {
        // 处理 NaN 的情况
        if (cur !== cur) {
            for (let i = 0, len = index; i < len; i++) {
                if (Number.isNaN(newArr[i])) { // 如果新数组中已经存在 NaN，不再寻找
                    break
                } else {
                    newArr.push(cur)
                }
            }
        } else {
            // indexOf 会返回第一个存在的索引，当 arr.indexOf(self) 与 index 不相同的时候，说明之前存在过，即为重复
            // indexOf 使用严格相等的模式判断
            arr.indexOf(cur) === index ? newArr.push(cur) : null
        }
    })

    return newArr
}

let arr1 = [NaN, NaN, undefined, undefined, null, null, 1, '1', +0, -0, 2, 2]
let arr2 = uniqueArr(arr1)

arr2 // [NaN, undefined, null,  1, '1', 0, 2]


// 基础数据类型数组去重，未处理 NaN 的情况
export const uniqueArr1 = (arr) => {
    let newArr = arr.reduce((acc, cur) => {
        if (acc.indexOf(cur) === -1) { // indexOf 使用严格相等的模式判断
            acc.push(cur)
        }

        return acc
    }, [])

    return newArr
}

// 转换字节单位
export const formatBytes = (bytes = 0, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${ parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) } ${ sizes[i] }`
}
