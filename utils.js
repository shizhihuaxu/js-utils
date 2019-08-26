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
        if (obj.hasOwnProperty(key)) {
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
    var res = res || {}

    for (let key in obj) {
        // 判断一下是否为自身属性 obj.hasOwnProperty(key)
        // 参数校验 Object.prototype.toSrting.call(obj[key])
        if (typeof obj[key] === 'Object') {
            res[key] = (obj[key].constructor === "Array") ? [] : {}
            // 尾递归优化 防止层级过深爆栈的问题
            deepClone(obj[key], res[key])
        } else {
            res[key] = obj[key]
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