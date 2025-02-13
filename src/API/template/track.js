import { temp } from '../../lib/mergeRules/index.js'
import { fillField, checkPrivate, resetCode } from '../../lib/fillField/index.js'
import baseConfig from '../../lib/baseConfig/index.js'
import { upLog } from '../../lib/upload/index.js'
import Util from '../../lib/common/index.js'
import Storage from '../../lib/storage/index.js'
function track (eventName, obj, callback) {
  baseConfig.status.FnName = eventName || '$track'
  resetCode()
  checkPrivate(eventName, '$track', true)
  baseConfig.status.FnName = eventName
  var userProp = {}
  if (Util.paramType(obj) === 'Function') {
    callback = obj
    obj = {}
  }
  if (Util.paramType(obj) === 'Object') {
    for (var itemKey in obj) {
      if (Util.paramType(obj[itemKey]) === 'Function') {
        obj[itemKey] = obj[itemKey].call(obj[itemKey])
      }
    }
    checkPrivate(obj)
    userProp = {
      xcontext: obj
    }
  }
  var arkSuper = Storage.getLocal('ARKSUPER') || {}

  /**
     * 用户自定义属性优先于超级属性
     */
  var xcontext = Util.objMerge({
    xcontext: arkSuper
  }, userProp)

  var trackTemp = temp('$track')
  var trackObj = fillField(trackTemp)
  /**
     * 去空逻辑，不对xwhat进行去空
     */
  trackObj.xcontext = Util.delEmpty(trackObj.xcontext)
  /**
     * 自定义属性优先于自动采集属性
     */
  var trackLog = Util.objMerge(trackObj, xcontext)
  // 去除空数据后上传数据
  upLog(trackLog, callback)
}
export { track }
