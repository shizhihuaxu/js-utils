// dom 相关工具
/**
 * 获取当前元素距离浏览器的绝对位置
 * @author shizhihuaxu 2019-04-08
 * @param  {HTMLElement} obj Dom 对象
 * @return {Object}     一个包含上侧与左侧距离的对象
 */
export const getObjPosition = (obj) => {
    let left = 0
    let top = 0

    while (obj.offsetParent) {
        left += obj.offsetLeft
        top += obj.offsetTop
        obj = obj.offsetParent
    }
    return { left: left, top: top }
}

/**
 * 判断是否为 IE 浏览器
 * @author shizhihuaxu 2019-04-08
 * @return {Boolean} true or false
 */
export const isIE = () => {
    return !!document.all
}
/**
 * 兼容添加事件监听
 * @author shizhihuaxu 2019-04-08
 * @return {Function} 用于添加监听事件的兼容方法
 */
export const addEvent = (function() {
    if (window.addEventListener) {
        return function(el, type, fn, capture) {
            el.addEventListener(type, function(e) {
                fn.call(el, e)
            }, (capture))
        }
    } else {
        return function(el, type, fn, capture) {
            el.attachEvent('on' + type, function(e) {
                fn.call(el, e)
            })
        }
    }
})()