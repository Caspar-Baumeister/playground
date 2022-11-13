"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/generated/graphql/graphql.ts":
/*!******************************************!*\
  !*** ./src/generated/graphql/graphql.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LoginDocument\": () => (/* binding */ LoginDocument),\n/* harmony export */   \"LogoutDocument\": () => (/* binding */ LogoutDocument),\n/* harmony export */   \"MeDocument\": () => (/* binding */ MeDocument),\n/* harmony export */   \"RegisterDocument\": () => (/* binding */ RegisterDocument),\n/* harmony export */   \"RegularAdminFragmentDoc\": () => (/* binding */ RegularAdminFragmentDoc),\n/* harmony export */   \"useLoginMutation\": () => (/* binding */ useLoginMutation),\n/* harmony export */   \"useLogoutMutation\": () => (/* binding */ useLogoutMutation),\n/* harmony export */   \"useMeQuery\": () => (/* binding */ useMeQuery),\n/* harmony export */   \"useRegisterMutation\": () => (/* binding */ useRegisterMutation)\n/* harmony export */ });\n/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ \"graphql-tag\");\n/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! urql */ \"urql\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_1__);\n/* eslint-disable */ \n\nconst RegularAdminFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`\n    fragment RegularAdmin on Admin {\n  _id\n  email\n  createdAt\n  updatedAt\n}\n    `;\nconst LoginDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`\n    mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    admin {\n      ...RegularAdmin\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n    ${RegularAdminFragmentDoc}`;\nfunction useLoginMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LoginDocument);\n}\nconst LogoutDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`\n    mutation Logout {\n  logout\n}\n    `;\nfunction useLogoutMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LogoutDocument);\n}\nconst RegisterDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`\n    mutation Register($email: String!, $password: String!) {\n  register(options: {email: $email, password: $password}) {\n    errors {\n      field\n      message\n    }\n    admin {\n      ...RegularAdmin\n    }\n  }\n}\n    ${RegularAdminFragmentDoc}`;\nfunction useRegisterMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(RegisterDocument);\n}\nconst MeDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`\n    query Me {\n  me {\n    ...RegularAdmin\n  }\n}\n    ${RegularAdminFragmentDoc}`;\nfunction useMeQuery(options) {\n    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({\n        query: MeDocument,\n        ...options\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2VuZXJhdGVkL2dyYXBocWwvZ3JhcGhxbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWtCLEdBRVk7QUFDRDtBQXVJdEIsTUFBTUUsMEJBQTBCRixvREFBRyxDQUFDOzs7Ozs7O0lBT3ZDLENBQUMsQ0FBQztBQUNDLE1BQU1HLGdCQUFnQkgsb0RBQUcsQ0FBQzs7Ozs7Ozs7Ozs7O0lBWTdCLEVBQUVFLHdCQUF3QixDQUFDLENBQUM7QUFFekIsU0FBU0UsbUJBQW1CO0lBQ2pDLE9BQU9ILDZDQUFnQixDQUF3Q0U7QUFDakUsQ0FBQztBQUNNLE1BQU1HLGlCQUFpQk4sb0RBQUcsQ0FBQzs7OztJQUk5QixDQUFDLENBQUM7QUFFQyxTQUFTTyxvQkFBb0I7SUFDbEMsT0FBT04sNkNBQWdCLENBQTBDSztBQUNuRSxDQUFDO0FBQ00sTUFBTUUsbUJBQW1CUixvREFBRyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZaEMsRUFBRUUsd0JBQXdCLENBQUMsQ0FBQztBQUV6QixTQUFTTyxzQkFBc0I7SUFDcEMsT0FBT1IsNkNBQWdCLENBQThDTztBQUN2RSxDQUFDO0FBQ00sTUFBTUUsYUFBYVYsb0RBQUcsQ0FBQzs7Ozs7O0lBTTFCLEVBQUVFLHdCQUF3QixDQUFDLENBQUM7QUFFekIsU0FBU1MsV0FBV0MsT0FBNEQsRUFBRTtJQUN2RixPQUFPWCwwQ0FBYSxDQUE0QjtRQUFFYSxPQUFPSjtRQUFZLEdBQUdFLE9BQU87SUFBQztBQUNsRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2dlbmVyYXRlZC9ncmFwaHFsL2dyYXBocWwudHM/OGI4NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVHlwZWREb2N1bWVudE5vZGUgYXMgRG9jdW1lbnROb2RlIH0gZnJvbSAnQGdyYXBocWwtdHlwZWQtZG9jdW1lbnQtbm9kZS9jb3JlJztcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0ICogYXMgVXJxbCBmcm9tICd1cnFsJztcbmV4cG9ydCB0eXBlIE1heWJlPFQ+ID0gVCB8IG51bGw7XG5leHBvcnQgdHlwZSBJbnB1dE1heWJlPFQ+ID0gTWF5YmU8VD47XG5leHBvcnQgdHlwZSBFeGFjdDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiB1bmtub3duIH0+ID0geyBbSyBpbiBrZXlvZiBUXTogVFtLXSB9O1xuZXhwb3J0IHR5cGUgTWFrZU9wdGlvbmFsPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz4gJiB7IFtTdWJLZXkgaW4gS10/OiBNYXliZTxUW1N1YktleV0+IH07XG5leHBvcnQgdHlwZSBNYWtlTWF5YmU8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPiAmIHsgW1N1YktleSBpbiBLXTogTWF5YmU8VFtTdWJLZXldPiB9O1xuZXhwb3J0IHR5cGUgT21pdDxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSBQaWNrPFQsIEV4Y2x1ZGU8a2V5b2YgVCwgSz4+O1xuLyoqIEFsbCBidWlsdC1pbiBhbmQgY3VzdG9tIHNjYWxhcnMsIG1hcHBlZCB0byB0aGVpciBhY3R1YWwgdmFsdWVzICovXG5leHBvcnQgdHlwZSBTY2FsYXJzID0ge1xuICBJRDogc3RyaW5nO1xuICBTdHJpbmc6IHN0cmluZztcbiAgQm9vbGVhbjogYm9vbGVhbjtcbiAgSW50OiBudW1iZXI7XG4gIEZsb2F0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBBZG1pbiA9IHtcbiAgX190eXBlbmFtZT86ICdBZG1pbic7XG4gIF9pZDogU2NhbGFyc1snRmxvYXQnXTtcbiAgY3JlYXRlZEF0OiBTY2FsYXJzWydTdHJpbmcnXTtcbiAgZW1haWw6IFNjYWxhcnNbJ1N0cmluZyddO1xuICB1cGRhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddO1xufTtcblxuZXhwb3J0IHR5cGUgQWRtaW5SZXNwb25zZSA9IHtcbiAgX190eXBlbmFtZT86ICdBZG1pblJlc3BvbnNlJztcbiAgYWRtaW4/OiBNYXliZTxBZG1pbj47XG4gIGVycm9ycz86IE1heWJlPEFycmF5PEZpZWxkRXJyb3I+Pjtcbn07XG5cbmV4cG9ydCB0eXBlIEVtYWlsQW5kUGFzc3dvcmQgPSB7XG4gIGVtYWlsOiBTY2FsYXJzWydTdHJpbmcnXTtcbiAgcGFzc3dvcmQ6IFNjYWxhcnNbJ1N0cmluZyddO1xufTtcblxuZXhwb3J0IHR5cGUgRmllbGRFcnJvciA9IHtcbiAgX190eXBlbmFtZT86ICdGaWVsZEVycm9yJztcbiAgZmllbGQ6IFNjYWxhcnNbJ1N0cmluZyddO1xuICBtZXNzYWdlOiBTY2FsYXJzWydTdHJpbmcnXTtcbn07XG5cbmV4cG9ydCB0eXBlIE11dGF0aW9uID0ge1xuICBfX3R5cGVuYW1lPzogJ011dGF0aW9uJztcbiAgY3JlYXRlUG9zdDogUG9zdDtcbiAgZGVsZXRlUG9zdDogU2NhbGFyc1snQm9vbGVhbiddO1xuICBsb2dpbjogQWRtaW5SZXNwb25zZTtcbiAgbG9nb3V0OiBTY2FsYXJzWydCb29sZWFuJ107XG4gIHJlZ2lzdGVyOiBBZG1pblJlc3BvbnNlO1xuICB1cGRhdGVQb3N0PzogTWF5YmU8UG9zdD47XG59O1xuXG5cbmV4cG9ydCB0eXBlIE11dGF0aW9uQ3JlYXRlUG9zdEFyZ3MgPSB7XG4gIHRpdGxlOiBTY2FsYXJzWydTdHJpbmcnXTtcbn07XG5cblxuZXhwb3J0IHR5cGUgTXV0YXRpb25EZWxldGVQb3N0QXJncyA9IHtcbiAgaWQ6IFNjYWxhcnNbJ0ludCddO1xufTtcblxuXG5leHBvcnQgdHlwZSBNdXRhdGlvbkxvZ2luQXJncyA9IHtcbiAgb3B0aW9uczogRW1haWxBbmRQYXNzd29yZDtcbn07XG5cblxuZXhwb3J0IHR5cGUgTXV0YXRpb25SZWdpc3RlckFyZ3MgPSB7XG4gIG9wdGlvbnM6IEVtYWlsQW5kUGFzc3dvcmQ7XG59O1xuXG5cbmV4cG9ydCB0eXBlIE11dGF0aW9uVXBkYXRlUG9zdEFyZ3MgPSB7XG4gIGlkOiBTY2FsYXJzWydGbG9hdCddO1xuICB0aXRsZT86IElucHV0TWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+O1xufTtcblxuZXhwb3J0IHR5cGUgUG9zdCA9IHtcbiAgX190eXBlbmFtZT86ICdQb3N0JztcbiAgX2lkOiBTY2FsYXJzWydGbG9hdCddO1xuICBjcmVhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddO1xuICB0aXRsZTogU2NhbGFyc1snU3RyaW5nJ107XG4gIHVwZGF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ107XG59O1xuXG5leHBvcnQgdHlwZSBRdWVyeSA9IHtcbiAgX190eXBlbmFtZT86ICdRdWVyeSc7XG4gIGhlbGxvOiBTY2FsYXJzWydTdHJpbmcnXTtcbiAgbWU/OiBNYXliZTxBZG1pbj47XG4gIHBvc3Q/OiBNYXliZTxQb3N0PjtcbiAgcG9zdHM6IEFycmF5PFBvc3Q+O1xufTtcblxuXG5leHBvcnQgdHlwZSBRdWVyeVBvc3RBcmdzID0ge1xuICBpZDogU2NhbGFyc1snSW50J107XG59O1xuXG5leHBvcnQgdHlwZSBSZWd1bGFyQWRtaW5GcmFnbWVudCA9IHsgX190eXBlbmFtZT86ICdBZG1pbicsIF9pZDogbnVtYmVyLCBlbWFpbDogc3RyaW5nLCBjcmVhdGVkQXQ6IHN0cmluZywgdXBkYXRlZEF0OiBzdHJpbmcgfSAmIHsgJyAkZnJhZ21lbnROYW1lJz86ICdSZWd1bGFyQWRtaW5GcmFnbWVudCcgfTtcblxuZXhwb3J0IHR5cGUgTG9naW5NdXRhdGlvblZhcmlhYmxlcyA9IEV4YWN0PHtcbiAgZW1haWw6IFNjYWxhcnNbJ1N0cmluZyddO1xuICBwYXNzd29yZDogU2NhbGFyc1snU3RyaW5nJ107XG59PjtcblxuXG5leHBvcnQgdHlwZSBMb2dpbk11dGF0aW9uID0geyBfX3R5cGVuYW1lPzogJ011dGF0aW9uJywgbG9naW46IHsgX190eXBlbmFtZT86ICdBZG1pblJlc3BvbnNlJywgYWRtaW4/OiAoXG4gICAgICB7IF9fdHlwZW5hbWU/OiAnQWRtaW4nIH1cbiAgICAgICYgeyAnICRmcmFnbWVudFJlZnMnPzogeyAnUmVndWxhckFkbWluRnJhZ21lbnQnOiBSZWd1bGFyQWRtaW5GcmFnbWVudCB9IH1cbiAgICApIHwgbnVsbCwgZXJyb3JzPzogQXJyYXk8eyBfX3R5cGVuYW1lPzogJ0ZpZWxkRXJyb3InLCBmaWVsZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfT4gfCBudWxsIH0gfTtcblxuZXhwb3J0IHR5cGUgTG9nb3V0TXV0YXRpb25WYXJpYWJsZXMgPSBFeGFjdDx7IFtrZXk6IHN0cmluZ106IG5ldmVyOyB9PjtcblxuXG5leHBvcnQgdHlwZSBMb2dvdXRNdXRhdGlvbiA9IHsgX190eXBlbmFtZT86ICdNdXRhdGlvbicsIGxvZ291dDogYm9vbGVhbiB9O1xuXG5leHBvcnQgdHlwZSBSZWdpc3Rlck11dGF0aW9uVmFyaWFibGVzID0gRXhhY3Q8e1xuICBlbWFpbDogU2NhbGFyc1snU3RyaW5nJ107XG4gIHBhc3N3b3JkOiBTY2FsYXJzWydTdHJpbmcnXTtcbn0+O1xuXG5cbmV4cG9ydCB0eXBlIFJlZ2lzdGVyTXV0YXRpb24gPSB7IF9fdHlwZW5hbWU/OiAnTXV0YXRpb24nLCByZWdpc3RlcjogeyBfX3R5cGVuYW1lPzogJ0FkbWluUmVzcG9uc2UnLCBlcnJvcnM/OiBBcnJheTx7IF9fdHlwZW5hbWU/OiAnRmllbGRFcnJvcicsIGZpZWxkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyB9PiB8IG51bGwsIGFkbWluPzogKFxuICAgICAgeyBfX3R5cGVuYW1lPzogJ0FkbWluJyB9XG4gICAgICAmIHsgJyAkZnJhZ21lbnRSZWZzJz86IHsgJ1JlZ3VsYXJBZG1pbkZyYWdtZW50JzogUmVndWxhckFkbWluRnJhZ21lbnQgfSB9XG4gICAgKSB8IG51bGwgfSB9O1xuXG5leHBvcnQgdHlwZSBNZVF1ZXJ5VmFyaWFibGVzID0gRXhhY3Q8eyBba2V5OiBzdHJpbmddOiBuZXZlcjsgfT47XG5cblxuZXhwb3J0IHR5cGUgTWVRdWVyeSA9IHsgX190eXBlbmFtZT86ICdRdWVyeScsIG1lPzogKFxuICAgIHsgX190eXBlbmFtZT86ICdBZG1pbicgfVxuICAgICYgeyAnICRmcmFnbWVudFJlZnMnPzogeyAnUmVndWxhckFkbWluRnJhZ21lbnQnOiBSZWd1bGFyQWRtaW5GcmFnbWVudCB9IH1cbiAgKSB8IG51bGwgfTtcblxuZXhwb3J0IGNvbnN0IFJlZ3VsYXJBZG1pbkZyYWdtZW50RG9jID0gZ3FsYFxuICAgIGZyYWdtZW50IFJlZ3VsYXJBZG1pbiBvbiBBZG1pbiB7XG4gIF9pZFxuICBlbWFpbFxuICBjcmVhdGVkQXRcbiAgdXBkYXRlZEF0XG59XG4gICAgYDtcbmV4cG9ydCBjb25zdCBMb2dpbkRvY3VtZW50ID0gZ3FsYFxuICAgIG11dGF0aW9uIExvZ2luKCRlbWFpbDogU3RyaW5nISwgJHBhc3N3b3JkOiBTdHJpbmchKSB7XG4gIGxvZ2luKG9wdGlvbnM6IHtlbWFpbDogJGVtYWlsLCBwYXNzd29yZDogJHBhc3N3b3JkfSkge1xuICAgIGFkbWluIHtcbiAgICAgIC4uLlJlZ3VsYXJBZG1pblxuICAgIH1cbiAgICBlcnJvcnMge1xuICAgICAgZmllbGRcbiAgICAgIG1lc3NhZ2VcbiAgICB9XG4gIH1cbn1cbiAgICAke1JlZ3VsYXJBZG1pbkZyYWdtZW50RG9jfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VMb2dpbk11dGF0aW9uKCkge1xuICByZXR1cm4gVXJxbC51c2VNdXRhdGlvbjxMb2dpbk11dGF0aW9uLCBMb2dpbk11dGF0aW9uVmFyaWFibGVzPihMb2dpbkRvY3VtZW50KTtcbn07XG5leHBvcnQgY29uc3QgTG9nb3V0RG9jdW1lbnQgPSBncWxgXG4gICAgbXV0YXRpb24gTG9nb3V0IHtcbiAgbG9nb3V0XG59XG4gICAgYDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvZ291dE11dGF0aW9uKCkge1xuICByZXR1cm4gVXJxbC51c2VNdXRhdGlvbjxMb2dvdXRNdXRhdGlvbiwgTG9nb3V0TXV0YXRpb25WYXJpYWJsZXM+KExvZ291dERvY3VtZW50KTtcbn07XG5leHBvcnQgY29uc3QgUmVnaXN0ZXJEb2N1bWVudCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZWdpc3RlcigkZW1haWw6IFN0cmluZyEsICRwYXNzd29yZDogU3RyaW5nISkge1xuICByZWdpc3RlcihvcHRpb25zOiB7ZW1haWw6ICRlbWFpbCwgcGFzc3dvcmQ6ICRwYXNzd29yZH0pIHtcbiAgICBlcnJvcnMge1xuICAgICAgZmllbGRcbiAgICAgIG1lc3NhZ2VcbiAgICB9XG4gICAgYWRtaW4ge1xuICAgICAgLi4uUmVndWxhckFkbWluXG4gICAgfVxuICB9XG59XG4gICAgJHtSZWd1bGFyQWRtaW5GcmFnbWVudERvY31gO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUmVnaXN0ZXJNdXRhdGlvbigpIHtcbiAgcmV0dXJuIFVycWwudXNlTXV0YXRpb248UmVnaXN0ZXJNdXRhdGlvbiwgUmVnaXN0ZXJNdXRhdGlvblZhcmlhYmxlcz4oUmVnaXN0ZXJEb2N1bWVudCk7XG59O1xuZXhwb3J0IGNvbnN0IE1lRG9jdW1lbnQgPSBncWxgXG4gICAgcXVlcnkgTWUge1xuICBtZSB7XG4gICAgLi4uUmVndWxhckFkbWluXG4gIH1cbn1cbiAgICAke1JlZ3VsYXJBZG1pbkZyYWdtZW50RG9jfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNZVF1ZXJ5KG9wdGlvbnM/OiBPbWl0PFVycWwuVXNlUXVlcnlBcmdzPE1lUXVlcnlWYXJpYWJsZXM+LCAncXVlcnknPikge1xuICByZXR1cm4gVXJxbC51c2VRdWVyeTxNZVF1ZXJ5LCBNZVF1ZXJ5VmFyaWFibGVzPih7IHF1ZXJ5OiBNZURvY3VtZW50LCAuLi5vcHRpb25zIH0pO1xufTsiXSwibmFtZXMiOlsiZ3FsIiwiVXJxbCIsIlJlZ3VsYXJBZG1pbkZyYWdtZW50RG9jIiwiTG9naW5Eb2N1bWVudCIsInVzZUxvZ2luTXV0YXRpb24iLCJ1c2VNdXRhdGlvbiIsIkxvZ291dERvY3VtZW50IiwidXNlTG9nb3V0TXV0YXRpb24iLCJSZWdpc3RlckRvY3VtZW50IiwidXNlUmVnaXN0ZXJNdXRhdGlvbiIsIk1lRG9jdW1lbnQiLCJ1c2VNZVF1ZXJ5Iiwib3B0aW9ucyIsInVzZVF1ZXJ5IiwicXVlcnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/generated/graphql/graphql.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../theme */ \"./src/theme.tsx\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! urql */ \"urql\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @urql/exchange-graphcache */ \"@urql/exchange-graphcache\");\n/* harmony import */ var _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../generated/graphql/graphql */ \"./src/generated/graphql/graphql.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__]);\n_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nfunction betterUpdateQuery(cache, qi, result, fn) {\n    return cache.updateQuery(qi, (data)=>fn(result, data));\n}\nconst client = (0,urql__WEBPACK_IMPORTED_MODULE_3__.createClient)({\n    url: \"http://localhost:4000/graphql\",\n    fetchOptions: {\n        credentials: \"include\"\n    },\n    exchanges: [\n        urql__WEBPACK_IMPORTED_MODULE_3__.dedupExchange,\n        (0,_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__.cacheExchange)({\n            updates: {\n                Mutation: {\n                    login: (_result, args, cache, info)=>{\n                        betterUpdateQuery(cache, {\n                            query: _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_5__.MeDocument\n                        }, _result, (result, query)=>{\n                            if (result.login.errors) {\n                                return query;\n                            } else {\n                                return {\n                                    me: result.login.admin\n                                };\n                            }\n                        });\n                    //cache.updateQuery({ query: MeDocument });\n                    },\n                    register: (_result, args, cache, info)=>{\n                        betterUpdateQuery(cache, {\n                            query: _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_5__.MeDocument\n                        }, _result, (result, query)=>{\n                            if (result.register.errors) {\n                                return query;\n                            } else {\n                                return {\n                                    me: result.register.admin\n                                };\n                            }\n                        });\n                    }\n                }\n            }\n        }),\n        urql__WEBPACK_IMPORTED_MODULE_3__.fetchExchange\n    ]\n});\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(urql__WEBPACK_IMPORTED_MODULE_3__.Provider, {\n        value: client,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            theme: _theme__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/casparbaumeister/code/playground/web/src/pages/_app.tsx\",\n                lineNumber: 71,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/casparbaumeister/code/playground/web/src/pages/_app.tsx\",\n            lineNumber: 70,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/casparbaumeister/code/playground/web/src/pages/_app.tsx\",\n        lineNumber: 69,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQWtEO0FBRXJCO0FBRStDO0FBQ0M7QUFNdkM7QUFFdEMsU0FBU1Esa0JBQ1BDLEtBQVksRUFDWkMsRUFBYyxFQUNkQyxNQUFXLEVBQ1hDLEVBQWtDLEVBQ2xDO0lBQ0EsT0FBT0gsTUFBTUksV0FBVyxDQUFDSCxJQUFJLENBQUNJLE9BQVNGLEdBQUdELFFBQVFHO0FBQ3BEO0FBRUEsTUFBTUMsU0FBU1osa0RBQVlBLENBQUM7SUFDMUJhLEtBQUs7SUFDTEMsY0FBYztRQUFFQyxhQUFhO0lBQVU7SUFDdkNDLFdBQVc7UUFDVGYsK0NBQWFBO1FBQ2JFLHdFQUFhQSxDQUFDO1lBQ1pjLFNBQVM7Z0JBQ1BDLFVBQVU7b0JBQ1JDLE9BQU8sQ0FBQ0MsU0FBU0MsTUFBTWYsT0FBT2dCLE9BQVM7d0JBQ3JDakIsa0JBQ0VDLE9BQ0E7NEJBQUVpQixPQUFPbkIsa0VBQVVBO3dCQUFDLEdBQ3BCZ0IsU0FDQSxDQUFDWixRQUFRZSxRQUFVOzRCQUNqQixJQUFJZixPQUFPVyxLQUFLLENBQUNLLE1BQU0sRUFBRTtnQ0FDdkIsT0FBT0Q7NEJBQ1QsT0FBTztnQ0FDTCxPQUFPO29DQUFFRSxJQUFJakIsT0FBT1csS0FBSyxDQUFDTyxLQUFLO2dDQUFDOzRCQUNsQyxDQUFDO3dCQUNIO29CQUVGLDJDQUEyQztvQkFDN0M7b0JBQ0FDLFVBQVUsQ0FBQ1AsU0FBU0MsTUFBTWYsT0FBT2dCLE9BQVM7d0JBQ3hDakIsa0JBQ0VDLE9BQ0E7NEJBQUVpQixPQUFPbkIsa0VBQVVBO3dCQUFDLEdBQ3BCZ0IsU0FDQSxDQUFDWixRQUFRZSxRQUFVOzRCQUNqQixJQUFJZixPQUFPbUIsUUFBUSxDQUFDSCxNQUFNLEVBQUU7Z0NBQzFCLE9BQU9EOzRCQUNULE9BQU87Z0NBQ0wsT0FBTztvQ0FBRUUsSUFBSWpCLE9BQU9tQixRQUFRLENBQUNELEtBQUs7Z0NBQUM7NEJBQ3JDLENBQUM7d0JBQ0g7b0JBRUo7Z0JBQ0Y7WUFDRjtRQUNGO1FBQ0F4QiwrQ0FBYUE7S0FDZDtBQUNIO0FBRUEsU0FBUzBCLE1BQU0sRUFBRUMsVUFBUyxFQUFFQyxVQUFTLEVBQVksRUFBRTtJQUNqRCxxQkFDRSw4REFBQy9CLDBDQUFRQTtRQUFDZ0MsT0FBT25CO2tCQUNmLDRFQUFDZiw0REFBY0E7WUFBQ0MsT0FBT0EsOENBQUtBO3NCQUMxQiw0RUFBQytCO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEM7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYWtyYVByb3ZpZGVyIH0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcblxuaW1wb3J0IHRoZW1lIGZyb20gXCIuLi90aGVtZVwiO1xuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCB7IFByb3ZpZGVyLCBjcmVhdGVDbGllbnQsIGRlZHVwRXhjaGFuZ2UsIGZldGNoRXhjaGFuZ2UgfSBmcm9tIFwidXJxbFwiO1xuaW1wb3J0IHsgQ2FjaGUsIGNhY2hlRXhjaGFuZ2UsIFF1ZXJ5SW5wdXQgfSBmcm9tIFwiQHVycWwvZXhjaGFuZ2UtZ3JhcGhjYWNoZVwiO1xuaW1wb3J0IHtcbiAgTG9naW5NdXRhdGlvbixcbiAgTWVEb2N1bWVudCxcbiAgTWVRdWVyeSxcbiAgUmVnaXN0ZXJNdXRhdGlvbixcbn0gZnJvbSBcIi4uL2dlbmVyYXRlZC9ncmFwaHFsL2dyYXBocWxcIjtcblxuZnVuY3Rpb24gYmV0dGVyVXBkYXRlUXVlcnk8UmVzdWx0LCBRdWVyeT4oXG4gIGNhY2hlOiBDYWNoZSxcbiAgcWk6IFF1ZXJ5SW5wdXQsXG4gIHJlc3VsdDogYW55LFxuICBmbjogKHI6IFJlc3VsdCwgcTogUXVlcnkpID0+IFF1ZXJ5XG4pIHtcbiAgcmV0dXJuIGNhY2hlLnVwZGF0ZVF1ZXJ5KHFpLCAoZGF0YSkgPT4gZm4ocmVzdWx0LCBkYXRhIGFzIGFueSkgYXMgYW55KTtcbn1cblxuY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHtcbiAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9ncmFwaHFsXCIsXG4gIGZldGNoT3B0aW9uczogeyBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIgfSxcbiAgZXhjaGFuZ2VzOiBbXG4gICAgZGVkdXBFeGNoYW5nZSxcbiAgICBjYWNoZUV4Y2hhbmdlKHtcbiAgICAgIHVwZGF0ZXM6IHtcbiAgICAgICAgTXV0YXRpb246IHtcbiAgICAgICAgICBsb2dpbjogKF9yZXN1bHQsIGFyZ3MsIGNhY2hlLCBpbmZvKSA9PiB7XG4gICAgICAgICAgICBiZXR0ZXJVcGRhdGVRdWVyeTxMb2dpbk11dGF0aW9uLCBNZVF1ZXJ5PihcbiAgICAgICAgICAgICAgY2FjaGUsXG4gICAgICAgICAgICAgIHsgcXVlcnk6IE1lRG9jdW1lbnQgfSxcbiAgICAgICAgICAgICAgX3Jlc3VsdCxcbiAgICAgICAgICAgICAgKHJlc3VsdCwgcXVlcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmxvZ2luLmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBtZTogcmVzdWx0LmxvZ2luLmFkbWluIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy9jYWNoZS51cGRhdGVRdWVyeSh7IHF1ZXJ5OiBNZURvY3VtZW50IH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXI6IChfcmVzdWx0LCBhcmdzLCBjYWNoZSwgaW5mbykgPT4ge1xuICAgICAgICAgICAgYmV0dGVyVXBkYXRlUXVlcnk8UmVnaXN0ZXJNdXRhdGlvbiwgTWVRdWVyeT4oXG4gICAgICAgICAgICAgIGNhY2hlLFxuICAgICAgICAgICAgICB7IHF1ZXJ5OiBNZURvY3VtZW50IH0sXG4gICAgICAgICAgICAgIF9yZXN1bHQsXG4gICAgICAgICAgICAgIChyZXN1bHQsIHF1ZXJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZWdpc3Rlci5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbWU6IHJlc3VsdC5yZWdpc3Rlci5hZG1pbiB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBmZXRjaEV4Y2hhbmdlLFxuICBdLFxufSk7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8UHJvdmlkZXIgdmFsdWU9e2NsaWVudH0+XG4gICAgICA8Q2hha3JhUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9DaGFrcmFQcm92aWRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJDaGFrcmFQcm92aWRlciIsInRoZW1lIiwiUHJvdmlkZXIiLCJjcmVhdGVDbGllbnQiLCJkZWR1cEV4Y2hhbmdlIiwiZmV0Y2hFeGNoYW5nZSIsImNhY2hlRXhjaGFuZ2UiLCJNZURvY3VtZW50IiwiYmV0dGVyVXBkYXRlUXVlcnkiLCJjYWNoZSIsInFpIiwicmVzdWx0IiwiZm4iLCJ1cGRhdGVRdWVyeSIsImRhdGEiLCJjbGllbnQiLCJ1cmwiLCJmZXRjaE9wdGlvbnMiLCJjcmVkZW50aWFscyIsImV4Y2hhbmdlcyIsInVwZGF0ZXMiLCJNdXRhdGlvbiIsImxvZ2luIiwiX3Jlc3VsdCIsImFyZ3MiLCJpbmZvIiwicXVlcnkiLCJlcnJvcnMiLCJtZSIsImFkbWluIiwicmVnaXN0ZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/theme.tsx":
/*!***********************!*\
  !*** ./src/theme.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/theme-tools */ \"@chakra-ui/theme-tools\");\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst fonts = {\n    mono: `'Menlo', monospace`\n};\nconst breakpoints = (0,_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__.createBreakpoints)({\n    sm: \"40em\",\n    md: \"52em\",\n    lg: \"64em\",\n    xl: \"80em\"\n});\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    semanticTokens: {\n        colors: {\n            text: {\n                default: \"#16161D\",\n                _dark: \"#ade3b8\"\n            },\n            heroGradientStart: {\n                default: \"#7928CA\",\n                _dark: \"#e3a7f9\"\n            },\n            heroGradientEnd: {\n                default: \"#FF0080\",\n                _dark: \"#fbec8f\"\n            }\n        },\n        radii: {\n            button: \"12px\"\n        }\n    },\n    colors: {\n        black: \"#16161D\"\n    },\n    fonts,\n    breakpoints\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQThDO0FBQ1k7QUFFMUQsTUFBTUUsUUFBUTtJQUFFQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7QUFBQztBQUUzQyxNQUFNQyxjQUFjSCx5RUFBaUJBLENBQUM7SUFDcENJLElBQUk7SUFDSkMsSUFBSTtJQUNKQyxJQUFJO0lBQ0pDLElBQUk7QUFDTjtBQUVBLE1BQU1DLFFBQVFULDZEQUFXQSxDQUFDO0lBQ3hCVSxnQkFBZ0I7UUFDZEMsUUFBUTtZQUNOQyxNQUFNO2dCQUNKQyxTQUFTO2dCQUNUQyxPQUFPO1lBQ1Q7WUFDQUMsbUJBQW1CO2dCQUNqQkYsU0FBUztnQkFDVEMsT0FBTztZQUNUO1lBQ0FFLGlCQUFpQjtnQkFDZkgsU0FBUztnQkFDVEMsT0FBTztZQUNUO1FBQ0Y7UUFDQUcsT0FBTztZQUNMQyxRQUFRO1FBQ1Y7SUFDRjtJQUNBUCxRQUFRO1FBQ05RLE9BQU87SUFDVDtJQUNBakI7SUFDQUU7QUFDRjtBQUVBLGlFQUFlSyxLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3RoZW1lLnRzeD83YzlmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dGVuZFRoZW1lIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IGNyZWF0ZUJyZWFrcG9pbnRzIH0gZnJvbSAnQGNoYWtyYS11aS90aGVtZS10b29scydcblxuY29uc3QgZm9udHMgPSB7IG1vbm86IGAnTWVubG8nLCBtb25vc3BhY2VgIH1cblxuY29uc3QgYnJlYWtwb2ludHMgPSBjcmVhdGVCcmVha3BvaW50cyh7XG4gIHNtOiAnNDBlbScsXG4gIG1kOiAnNTJlbScsXG4gIGxnOiAnNjRlbScsXG4gIHhsOiAnODBlbScsXG59KVxuXG5jb25zdCB0aGVtZSA9IGV4dGVuZFRoZW1lKHtcbiAgc2VtYW50aWNUb2tlbnM6IHtcbiAgICBjb2xvcnM6IHtcbiAgICAgIHRleHQ6IHtcbiAgICAgICAgZGVmYXVsdDogJyMxNjE2MUQnLFxuICAgICAgICBfZGFyazogJyNhZGUzYjgnLFxuICAgICAgfSxcbiAgICAgIGhlcm9HcmFkaWVudFN0YXJ0OiB7XG4gICAgICAgIGRlZmF1bHQ6ICcjNzkyOENBJyxcbiAgICAgICAgX2Rhcms6ICcjZTNhN2Y5JyxcbiAgICAgIH0sXG4gICAgICBoZXJvR3JhZGllbnRFbmQ6IHtcbiAgICAgICAgZGVmYXVsdDogJyNGRjAwODAnLFxuICAgICAgICBfZGFyazogJyNmYmVjOGYnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJhZGlpOiB7XG4gICAgICBidXR0b246ICcxMnB4JyxcbiAgICB9LFxuICB9LFxuICBjb2xvcnM6IHtcbiAgICBibGFjazogJyMxNjE2MUQnLFxuICB9LFxuICBmb250cyxcbiAgYnJlYWtwb2ludHMsXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0aGVtZVxuIl0sIm5hbWVzIjpbImV4dGVuZFRoZW1lIiwiY3JlYXRlQnJlYWtwb2ludHMiLCJmb250cyIsIm1vbm8iLCJicmVha3BvaW50cyIsInNtIiwibWQiLCJsZyIsInhsIiwidGhlbWUiLCJzZW1hbnRpY1Rva2VucyIsImNvbG9ycyIsInRleHQiLCJkZWZhdWx0IiwiX2RhcmsiLCJoZXJvR3JhZGllbnRTdGFydCIsImhlcm9HcmFkaWVudEVuZCIsInJhZGlpIiwiYnV0dG9uIiwiYmxhY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/theme.tsx\n");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "@chakra-ui/theme-tools":
/*!*****************************************!*\
  !*** external "@chakra-ui/theme-tools" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@chakra-ui/theme-tools");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("graphql-tag");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "urql":
/*!***********************!*\
  !*** external "urql" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("urql");

/***/ }),

/***/ "@urql/exchange-graphcache":
/*!********************************************!*\
  !*** external "@urql/exchange-graphcache" ***!
  \********************************************/
/***/ ((module) => {

module.exports = import("@urql/exchange-graphcache");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();