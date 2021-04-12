import localizeFilter from "../filters/localize.filter";
export default {
  'logout': localizeFilter('message_logout'),
  'login' : localizeFilter('message_Login'),
  'auth/user-not-found': localizeFilter('message_UserAddress'),
  'auth/wrong-password': localizeFilter('message_InvalidPassword'),
  'auth/email-already-in-use': localizeFilter('message_EmailTaken')
}
