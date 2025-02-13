import { checkPrivate, resetCode } from '../../lib/fillField/index.js'
import { successLog } from '../../lib/printLog/index.js'
import baseConfig from '../../lib/baseConfig/index.js'
import Storage from '../../lib/storage/index.js'
import Util from '../../lib/common/index.js'
function getSuperProperty (superPropertyName, callback) {
  baseConfig.status.FnName = '$getSuperProperty'
  resetCode()
  checkPrivate(superPropertyName, '$getSuperProperty', true)
  // if (!status) {
  //     return
  // }
  var arkSuper = Storage.getLocal('ARKSUPER') || {}
  var superProperty = arkSuper[superPropertyName]

  if (!{}.hasOwnProperty.call(arkSuper, superPropertyName)) {
    baseConfig.status.successCode = '20009'
    superProperty = ''
  } else {
    baseConfig.status.successCode = '20010'
    baseConfig.status.value = superProperty
  }
  baseConfig.status.key = superPropertyName
  successLog()
  if (Util.paramType(callback) === 'Function') {
    callback.call(callback, superProperty)
  }
  return superProperty
}
export { getSuperProperty }
