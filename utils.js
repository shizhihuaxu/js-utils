/**
 * 深拷贝对象、数组
 * @author shizhihuaxu 2019-04-08
 * @param  {Object} obj 原对象
 * @return {Object}     新对象
 */
export const deepClone = (obj) => {
    let temp = JSON.stringfy(obj)

    return JSON.parse(temp)
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