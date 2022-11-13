"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/generated/graphql/graphql.ts":
/*!******************************************!*\
  !*** ./src/generated/graphql/graphql.ts ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LoginDocument\": function() { return /* binding */ LoginDocument; },\n/* harmony export */   \"LogoutDocument\": function() { return /* binding */ LogoutDocument; },\n/* harmony export */   \"MeDocument\": function() { return /* binding */ MeDocument; },\n/* harmony export */   \"RegisterDocument\": function() { return /* binding */ RegisterDocument; },\n/* harmony export */   \"RegularAdminFragmentDoc\": function() { return /* binding */ RegularAdminFragmentDoc; },\n/* harmony export */   \"useLoginMutation\": function() { return /* binding */ useLoginMutation; },\n/* harmony export */   \"useLogoutMutation\": function() { return /* binding */ useLogoutMutation; },\n/* harmony export */   \"useMeQuery\": function() { return /* binding */ useMeQuery; },\n/* harmony export */   \"useRegisterMutation\": function() { return /* binding */ useRegisterMutation; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/src/_tagged_template_literal.mjs */ \"./node_modules/@swc/helpers/src/_tagged_template_literal.mjs\");\n/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ \"./node_modules/graphql-tag/lib/index.js\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! urql */ \"./node_modules/urql/dist/urql.es.js\");\n/* eslint-disable */ \nfunction _templateObject() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n    fragment RegularAdmin on Admin {\\n  _id\\n  email\\n  createdAt\\n  updatedAt\\n}\\n    \"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject1() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n    mutation Login($email: String!, $password: String!) {\\n  login(options: {email: $email, password: $password}) {\\n    admin {\\n      ...RegularAdmin\\n    }\\n    errors {\\n      field\\n      message\\n    }\\n  }\\n}\\n    \",\n        \"\"\n    ]);\n    _templateObject1 = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject2() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n    mutation Logout {\\n  logout\\n}\\n    \"\n    ]);\n    _templateObject2 = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject3() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n    mutation Register($email: String!, $password: String!) {\\n  register(options: {email: $email, password: $password}) {\\n    errors {\\n      field\\n      message\\n    }\\n    admin {\\n      ...RegularAdmin\\n    }\\n  }\\n}\\n    \",\n        \"\"\n    ]);\n    _templateObject3 = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject4() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n    query Me {\\n  me {\\n    ...RegularAdmin\\n  }\\n}\\n    \",\n        \"\"\n    ]);\n    _templateObject4 = function() {\n        return data;\n    };\n    return data;\n}\n\n\nconst RegularAdminFragmentDoc = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_templateObject());\nconst LoginDocument = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_templateObject1(), RegularAdminFragmentDoc);\nfunction useLoginMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_2__.useMutation(LoginDocument);\n}\nconst LogoutDocument = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_templateObject2());\nfunction useLogoutMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_2__.useMutation(LogoutDocument);\n}\nconst RegisterDocument = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_templateObject3(), RegularAdminFragmentDoc);\nfunction useRegisterMutation() {\n    return urql__WEBPACK_IMPORTED_MODULE_2__.useMutation(RegisterDocument);\n}\nconst MeDocument = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_templateObject4(), RegularAdminFragmentDoc);\nfunction useMeQuery(options) {\n    return urql__WEBPACK_IMPORTED_MODULE_2__.useQuery({\n        query: MeDocument,\n        ...options\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2VuZXJhdGVkL2dyYXBocWwvZ3JhcGhxbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBa0IsR0FDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDOEI7QUFDRDtBQXVJdEIsTUFBTUUsMEJBQTBCRix1REFBR0Esb0JBT3BDO0FBQ0MsTUFBTUcsZ0JBQWdCSCx1REFBR0EscUJBWTFCRSx5QkFBMEI7QUFFekIsU0FBU0UsbUJBQW1CO0lBQ2pDLE9BQU9ILDZDQUFnQixDQUF3Q0U7QUFDakUsQ0FBQztBQUNNLE1BQU1HLGlCQUFpQk4sdURBQUdBLHFCQUkzQjtBQUVDLFNBQVNPLG9CQUFvQjtJQUNsQyxPQUFPTiw2Q0FBZ0IsQ0FBMENLO0FBQ25FLENBQUM7QUFDTSxNQUFNRSxtQkFBbUJSLHVEQUFHQSxxQkFZN0JFLHlCQUEwQjtBQUV6QixTQUFTTyxzQkFBc0I7SUFDcEMsT0FBT1IsNkNBQWdCLENBQThDTztBQUN2RSxDQUFDO0FBQ00sTUFBTUUsYUFBYVYsdURBQUdBLHFCQU12QkUseUJBQTBCO0FBRXpCLFNBQVNTLFdBQVdDLE9BQTRELEVBQUU7SUFDdkYsT0FBT1gsMENBQWEsQ0FBNEI7UUFBRWEsT0FBT0o7UUFBWSxHQUFHRSxPQUFPO0lBQUM7QUFDbEYsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvZ2VuZXJhdGVkL2dyYXBocWwvZ3JhcGhxbC50cz84Yjg0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBUeXBlZERvY3VtZW50Tm9kZSBhcyBEb2N1bWVudE5vZGUgfSBmcm9tICdAZ3JhcGhxbC10eXBlZC1kb2N1bWVudC1ub2RlL2NvcmUnO1xuaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XG5pbXBvcnQgKiBhcyBVcnFsIGZyb20gJ3VycWwnO1xuZXhwb3J0IHR5cGUgTWF5YmU8VD4gPSBUIHwgbnVsbDtcbmV4cG9ydCB0eXBlIElucHV0TWF5YmU8VD4gPSBNYXliZTxUPjtcbmV4cG9ydCB0eXBlIEV4YWN0PFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfT4gPSB7IFtLIGluIGtleW9mIFRdOiBUW0tdIH07XG5leHBvcnQgdHlwZSBNYWtlT3B0aW9uYWw8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPiAmIHsgW1N1YktleSBpbiBLXT86IE1heWJlPFRbU3ViS2V5XT4gfTtcbmV4cG9ydCB0eXBlIE1ha2VNYXliZTxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSBPbWl0PFQsIEs+ICYgeyBbU3ViS2V5IGluIEtdOiBNYXliZTxUW1N1YktleV0+IH07XG5leHBvcnQgdHlwZSBPbWl0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IFBpY2s8VCwgRXhjbHVkZTxrZXlvZiBULCBLPj47XG4vKiogQWxsIGJ1aWx0LWluIGFuZCBjdXN0b20gc2NhbGFycywgbWFwcGVkIHRvIHRoZWlyIGFjdHVhbCB2YWx1ZXMgKi9cbmV4cG9ydCB0eXBlIFNjYWxhcnMgPSB7XG4gIElEOiBzdHJpbmc7XG4gIFN0cmluZzogc3RyaW5nO1xuICBCb29sZWFuOiBib29sZWFuO1xuICBJbnQ6IG51bWJlcjtcbiAgRmxvYXQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIEFkbWluID0ge1xuICBfX3R5cGVuYW1lPzogJ0FkbWluJztcbiAgX2lkOiBTY2FsYXJzWydGbG9hdCddO1xuICBjcmVhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddO1xuICBlbWFpbDogU2NhbGFyc1snU3RyaW5nJ107XG4gIHVwZGF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ107XG59O1xuXG5leHBvcnQgdHlwZSBBZG1pblJlc3BvbnNlID0ge1xuICBfX3R5cGVuYW1lPzogJ0FkbWluUmVzcG9uc2UnO1xuICBhZG1pbj86IE1heWJlPEFkbWluPjtcbiAgZXJyb3JzPzogTWF5YmU8QXJyYXk8RmllbGRFcnJvcj4+O1xufTtcblxuZXhwb3J0IHR5cGUgRW1haWxBbmRQYXNzd29yZCA9IHtcbiAgZW1haWw6IFNjYWxhcnNbJ1N0cmluZyddO1xuICBwYXNzd29yZDogU2NhbGFyc1snU3RyaW5nJ107XG59O1xuXG5leHBvcnQgdHlwZSBGaWVsZEVycm9yID0ge1xuICBfX3R5cGVuYW1lPzogJ0ZpZWxkRXJyb3InO1xuICBmaWVsZDogU2NhbGFyc1snU3RyaW5nJ107XG4gIG1lc3NhZ2U6IFNjYWxhcnNbJ1N0cmluZyddO1xufTtcblxuZXhwb3J0IHR5cGUgTXV0YXRpb24gPSB7XG4gIF9fdHlwZW5hbWU/OiAnTXV0YXRpb24nO1xuICBjcmVhdGVQb3N0OiBQb3N0O1xuICBkZWxldGVQb3N0OiBTY2FsYXJzWydCb29sZWFuJ107XG4gIGxvZ2luOiBBZG1pblJlc3BvbnNlO1xuICBsb2dvdXQ6IFNjYWxhcnNbJ0Jvb2xlYW4nXTtcbiAgcmVnaXN0ZXI6IEFkbWluUmVzcG9uc2U7XG4gIHVwZGF0ZVBvc3Q/OiBNYXliZTxQb3N0Pjtcbn07XG5cblxuZXhwb3J0IHR5cGUgTXV0YXRpb25DcmVhdGVQb3N0QXJncyA9IHtcbiAgdGl0bGU6IFNjYWxhcnNbJ1N0cmluZyddO1xufTtcblxuXG5leHBvcnQgdHlwZSBNdXRhdGlvbkRlbGV0ZVBvc3RBcmdzID0ge1xuICBpZDogU2NhbGFyc1snSW50J107XG59O1xuXG5cbmV4cG9ydCB0eXBlIE11dGF0aW9uTG9naW5BcmdzID0ge1xuICBvcHRpb25zOiBFbWFpbEFuZFBhc3N3b3JkO1xufTtcblxuXG5leHBvcnQgdHlwZSBNdXRhdGlvblJlZ2lzdGVyQXJncyA9IHtcbiAgb3B0aW9uczogRW1haWxBbmRQYXNzd29yZDtcbn07XG5cblxuZXhwb3J0IHR5cGUgTXV0YXRpb25VcGRhdGVQb3N0QXJncyA9IHtcbiAgaWQ6IFNjYWxhcnNbJ0Zsb2F0J107XG4gIHRpdGxlPzogSW5wdXRNYXliZTxTY2FsYXJzWydTdHJpbmcnXT47XG59O1xuXG5leHBvcnQgdHlwZSBQb3N0ID0ge1xuICBfX3R5cGVuYW1lPzogJ1Bvc3QnO1xuICBfaWQ6IFNjYWxhcnNbJ0Zsb2F0J107XG4gIGNyZWF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ107XG4gIHRpdGxlOiBTY2FsYXJzWydTdHJpbmcnXTtcbiAgdXBkYXRlZEF0OiBTY2FsYXJzWydTdHJpbmcnXTtcbn07XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5ID0ge1xuICBfX3R5cGVuYW1lPzogJ1F1ZXJ5JztcbiAgaGVsbG86IFNjYWxhcnNbJ1N0cmluZyddO1xuICBtZT86IE1heWJlPEFkbWluPjtcbiAgcG9zdD86IE1heWJlPFBvc3Q+O1xuICBwb3N0czogQXJyYXk8UG9zdD47XG59O1xuXG5cbmV4cG9ydCB0eXBlIFF1ZXJ5UG9zdEFyZ3MgPSB7XG4gIGlkOiBTY2FsYXJzWydJbnQnXTtcbn07XG5cbmV4cG9ydCB0eXBlIFJlZ3VsYXJBZG1pbkZyYWdtZW50ID0geyBfX3R5cGVuYW1lPzogJ0FkbWluJywgX2lkOiBudW1iZXIsIGVtYWlsOiBzdHJpbmcsIGNyZWF0ZWRBdDogc3RyaW5nLCB1cGRhdGVkQXQ6IHN0cmluZyB9ICYgeyAnICRmcmFnbWVudE5hbWUnPzogJ1JlZ3VsYXJBZG1pbkZyYWdtZW50JyB9O1xuXG5leHBvcnQgdHlwZSBMb2dpbk11dGF0aW9uVmFyaWFibGVzID0gRXhhY3Q8e1xuICBlbWFpbDogU2NhbGFyc1snU3RyaW5nJ107XG4gIHBhc3N3b3JkOiBTY2FsYXJzWydTdHJpbmcnXTtcbn0+O1xuXG5cbmV4cG9ydCB0eXBlIExvZ2luTXV0YXRpb24gPSB7IF9fdHlwZW5hbWU/OiAnTXV0YXRpb24nLCBsb2dpbjogeyBfX3R5cGVuYW1lPzogJ0FkbWluUmVzcG9uc2UnLCBhZG1pbj86IChcbiAgICAgIHsgX190eXBlbmFtZT86ICdBZG1pbicgfVxuICAgICAgJiB7ICcgJGZyYWdtZW50UmVmcyc/OiB7ICdSZWd1bGFyQWRtaW5GcmFnbWVudCc6IFJlZ3VsYXJBZG1pbkZyYWdtZW50IH0gfVxuICAgICkgfCBudWxsLCBlcnJvcnM/OiBBcnJheTx7IF9fdHlwZW5hbWU/OiAnRmllbGRFcnJvcicsIGZpZWxkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyB9PiB8IG51bGwgfSB9O1xuXG5leHBvcnQgdHlwZSBMb2dvdXRNdXRhdGlvblZhcmlhYmxlcyA9IEV4YWN0PHsgW2tleTogc3RyaW5nXTogbmV2ZXI7IH0+O1xuXG5cbmV4cG9ydCB0eXBlIExvZ291dE11dGF0aW9uID0geyBfX3R5cGVuYW1lPzogJ011dGF0aW9uJywgbG9nb3V0OiBib29sZWFuIH07XG5cbmV4cG9ydCB0eXBlIFJlZ2lzdGVyTXV0YXRpb25WYXJpYWJsZXMgPSBFeGFjdDx7XG4gIGVtYWlsOiBTY2FsYXJzWydTdHJpbmcnXTtcbiAgcGFzc3dvcmQ6IFNjYWxhcnNbJ1N0cmluZyddO1xufT47XG5cblxuZXhwb3J0IHR5cGUgUmVnaXN0ZXJNdXRhdGlvbiA9IHsgX190eXBlbmFtZT86ICdNdXRhdGlvbicsIHJlZ2lzdGVyOiB7IF9fdHlwZW5hbWU/OiAnQWRtaW5SZXNwb25zZScsIGVycm9ycz86IEFycmF5PHsgX190eXBlbmFtZT86ICdGaWVsZEVycm9yJywgZmllbGQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nIH0+IHwgbnVsbCwgYWRtaW4/OiAoXG4gICAgICB7IF9fdHlwZW5hbWU/OiAnQWRtaW4nIH1cbiAgICAgICYgeyAnICRmcmFnbWVudFJlZnMnPzogeyAnUmVndWxhckFkbWluRnJhZ21lbnQnOiBSZWd1bGFyQWRtaW5GcmFnbWVudCB9IH1cbiAgICApIHwgbnVsbCB9IH07XG5cbmV4cG9ydCB0eXBlIE1lUXVlcnlWYXJpYWJsZXMgPSBFeGFjdDx7IFtrZXk6IHN0cmluZ106IG5ldmVyOyB9PjtcblxuXG5leHBvcnQgdHlwZSBNZVF1ZXJ5ID0geyBfX3R5cGVuYW1lPzogJ1F1ZXJ5JywgbWU/OiAoXG4gICAgeyBfX3R5cGVuYW1lPzogJ0FkbWluJyB9XG4gICAgJiB7ICcgJGZyYWdtZW50UmVmcyc/OiB7ICdSZWd1bGFyQWRtaW5GcmFnbWVudCc6IFJlZ3VsYXJBZG1pbkZyYWdtZW50IH0gfVxuICApIHwgbnVsbCB9O1xuXG5leHBvcnQgY29uc3QgUmVndWxhckFkbWluRnJhZ21lbnREb2MgPSBncWxgXG4gICAgZnJhZ21lbnQgUmVndWxhckFkbWluIG9uIEFkbWluIHtcbiAgX2lkXG4gIGVtYWlsXG4gIGNyZWF0ZWRBdFxuICB1cGRhdGVkQXRcbn1cbiAgICBgO1xuZXhwb3J0IGNvbnN0IExvZ2luRG9jdW1lbnQgPSBncWxgXG4gICAgbXV0YXRpb24gTG9naW4oJGVtYWlsOiBTdHJpbmchLCAkcGFzc3dvcmQ6IFN0cmluZyEpIHtcbiAgbG9naW4ob3B0aW9uczoge2VtYWlsOiAkZW1haWwsIHBhc3N3b3JkOiAkcGFzc3dvcmR9KSB7XG4gICAgYWRtaW4ge1xuICAgICAgLi4uUmVndWxhckFkbWluXG4gICAgfVxuICAgIGVycm9ycyB7XG4gICAgICBmaWVsZFxuICAgICAgbWVzc2FnZVxuICAgIH1cbiAgfVxufVxuICAgICR7UmVndWxhckFkbWluRnJhZ21lbnREb2N9YDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvZ2luTXV0YXRpb24oKSB7XG4gIHJldHVybiBVcnFsLnVzZU11dGF0aW9uPExvZ2luTXV0YXRpb24sIExvZ2luTXV0YXRpb25WYXJpYWJsZXM+KExvZ2luRG9jdW1lbnQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2dvdXREb2N1bWVudCA9IGdxbGBcbiAgICBtdXRhdGlvbiBMb2dvdXQge1xuICBsb2dvdXRcbn1cbiAgICBgO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9nb3V0TXV0YXRpb24oKSB7XG4gIHJldHVybiBVcnFsLnVzZU11dGF0aW9uPExvZ291dE11dGF0aW9uLCBMb2dvdXRNdXRhdGlvblZhcmlhYmxlcz4oTG9nb3V0RG9jdW1lbnQpO1xufTtcbmV4cG9ydCBjb25zdCBSZWdpc3RlckRvY3VtZW50ID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlZ2lzdGVyKCRlbWFpbDogU3RyaW5nISwgJHBhc3N3b3JkOiBTdHJpbmchKSB7XG4gIHJlZ2lzdGVyKG9wdGlvbnM6IHtlbWFpbDogJGVtYWlsLCBwYXNzd29yZDogJHBhc3N3b3JkfSkge1xuICAgIGVycm9ycyB7XG4gICAgICBmaWVsZFxuICAgICAgbWVzc2FnZVxuICAgIH1cbiAgICBhZG1pbiB7XG4gICAgICAuLi5SZWd1bGFyQWRtaW5cbiAgICB9XG4gIH1cbn1cbiAgICAke1JlZ3VsYXJBZG1pbkZyYWdtZW50RG9jfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSZWdpc3Rlck11dGF0aW9uKCkge1xuICByZXR1cm4gVXJxbC51c2VNdXRhdGlvbjxSZWdpc3Rlck11dGF0aW9uLCBSZWdpc3Rlck11dGF0aW9uVmFyaWFibGVzPihSZWdpc3RlckRvY3VtZW50KTtcbn07XG5leHBvcnQgY29uc3QgTWVEb2N1bWVudCA9IGdxbGBcbiAgICBxdWVyeSBNZSB7XG4gIG1lIHtcbiAgICAuLi5SZWd1bGFyQWRtaW5cbiAgfVxufVxuICAgICR7UmVndWxhckFkbWluRnJhZ21lbnREb2N9YDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lUXVlcnkob3B0aW9ucz86IE9taXQ8VXJxbC5Vc2VRdWVyeUFyZ3M8TWVRdWVyeVZhcmlhYmxlcz4sICdxdWVyeSc+KSB7XG4gIHJldHVybiBVcnFsLnVzZVF1ZXJ5PE1lUXVlcnksIE1lUXVlcnlWYXJpYWJsZXM+KHsgcXVlcnk6IE1lRG9jdW1lbnQsIC4uLm9wdGlvbnMgfSk7XG59OyJdLCJuYW1lcyI6WyJncWwiLCJVcnFsIiwiUmVndWxhckFkbWluRnJhZ21lbnREb2MiLCJMb2dpbkRvY3VtZW50IiwidXNlTG9naW5NdXRhdGlvbiIsInVzZU11dGF0aW9uIiwiTG9nb3V0RG9jdW1lbnQiLCJ1c2VMb2dvdXRNdXRhdGlvbiIsIlJlZ2lzdGVyRG9jdW1lbnQiLCJ1c2VSZWdpc3Rlck11dGF0aW9uIiwiTWVEb2N1bWVudCIsInVzZU1lUXVlcnkiLCJvcHRpb25zIiwidXNlUXVlcnkiLCJxdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/generated/graphql/graphql.ts\n"));

/***/ })

});