"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/utils/createUrqlClient.ts":
/*!***************************************!*\
  !*** ./src/utils/createUrqlClient.ts ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @urql/core */ \"./node_modules/@urql/core/dist/urql-core.mjs\");\n/* harmony import */ var _urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @urql/exchange-graphcache */ \"./node_modules/@urql/exchange-graphcache/dist/urql-exchange-graphcache.mjs\");\n/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-urql */ \"./node_modules/next-urql/dist/next-urql.es.js\");\n/* harmony import */ var _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generated/graphql/graphql */ \"./src/generated/graphql/graphql.ts\");\n/* harmony import */ var _betterUpdateQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./betterUpdateQuery */ \"./src/utils/betterUpdateQuery.tsx\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((0,next_urql__WEBPACK_IMPORTED_MODULE_2__.withUrqlClient)((ssrExchange)=>({\n        url: \"http://localhost:4000/graphql\",\n        fetchOptions: {\n            credentials: \"include\"\n        },\n        exchanges: [\n            _urql_core__WEBPACK_IMPORTED_MODULE_3__.dedupExchange,\n            (0,_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_4__.cacheExchange)({\n                updates: {\n                    Mutation: {\n                        login: (_result, args, cache, info)=>{\n                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_1__.betterUpdateQuery)(cache, {\n                                query: _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_0__.MeDocument\n                            }, _result, (result, query)=>{\n                                if (result.login.errors) {\n                                    return query;\n                                } else {\n                                    return {\n                                        me: result.login.admin\n                                    };\n                                }\n                            });\n                        },\n                        logout: (_result, args, cache, info)=>{\n                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_1__.betterUpdateQuery)(cache, {\n                                query: _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_0__.MeDocument\n                            }, _result, ()=>{\n                                return {\n                                    me: null\n                                };\n                            });\n                        },\n                        register: (_result, args, cache, info)=>{\n                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_1__.betterUpdateQuery)(cache, {\n                                query: _generated_graphql_graphql__WEBPACK_IMPORTED_MODULE_0__.MeDocument\n                            }, _result, (result, query)=>{\n                                if (result.register.errors) {\n                                    return query;\n                                } else {\n                                    return {\n                                        me: result.register.admin\n                                    };\n                                }\n                            });\n                        }\n                    }\n                }\n            }),\n            ssrExchange,\n            _urql_core__WEBPACK_IMPORTED_MODULE_3__.fetchExchange\n        ]\n    })));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvY3JlYXRlVXJxbENsaWVudC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEQ7QUFDQTtBQUVmO0FBQ3lFO0FBRTVEO0FBRXhELCtEQUFlRyx5REFBY0EsQ0FBQ0csQ0FBQUEsY0FBZ0I7UUFDMUNDLEtBQUs7UUFDTEMsY0FBYztZQUFFQyxhQUFhO1FBQW1CO1FBQ2hEQyxXQUFXO1lBQ1RWLHFEQUFhQTtZQUNiRSx3RUFBYUEsQ0FBQztnQkFDWlMsU0FBUztvQkFDUEMsVUFBVTt3QkFDUkMsT0FBTyxDQUFDQyxTQUFTQyxNQUFNQyxPQUFPQyxPQUFTOzRCQUNyQ1oscUVBQWlCQSxDQUNmVyxPQUNBO2dDQUFFRSxPQUFPZCxrRUFBVUE7NEJBQUMsR0FDcEJVLFNBQ0EsQ0FBQ0ssUUFBUUQsUUFBVTtnQ0FDakIsSUFBSUMsT0FBT04sS0FBSyxDQUFDTyxNQUFNLEVBQUU7b0NBQ3ZCLE9BQU9GO2dDQUNULE9BQU87b0NBQ0wsT0FBTzt3Q0FBRUcsSUFBSUYsT0FBT04sS0FBSyxDQUFDUyxLQUFLO29DQUFDO2dDQUNsQyxDQUFDOzRCQUNIO3dCQUVKO3dCQUNBQyxRQUFRLENBQUNULFNBQVNDLE1BQU1DLE9BQU9DLE9BQVM7NEJBQ3RDWixxRUFBaUJBLENBQ2ZXLE9BQ0E7Z0NBQUVFLE9BQU9kLGtFQUFVQTs0QkFBQyxHQUNwQlUsU0FDQSxJQUFNO2dDQUNKLE9BQU87b0NBQUVPLElBQUksSUFBSTtnQ0FBQzs0QkFDcEI7d0JBRUo7d0JBQ0FHLFVBQVUsQ0FBQ1YsU0FBU0MsTUFBTUMsT0FBT0MsT0FBUzs0QkFDeENaLHFFQUFpQkEsQ0FDZlcsT0FDQTtnQ0FBRUUsT0FBT2Qsa0VBQVVBOzRCQUFDLEdBQ3BCVSxTQUNBLENBQUNLLFFBQVFELFFBQVU7Z0NBQ2pCLElBQUlDLE9BQU9LLFFBQVEsQ0FBQ0osTUFBTSxFQUFFO29DQUMxQixPQUFPRjtnQ0FDVCxPQUFPO29DQUNMLE9BQU87d0NBQUVHLElBQUlGLE9BQU9LLFFBQVEsQ0FBQ0YsS0FBSztvQ0FBQztnQ0FDckMsQ0FBQzs0QkFDSDt3QkFFSjtvQkFDRjtnQkFDRjtZQUNGO1lBQ0FoQjtZQUNBTCxxREFBYUE7U0FDZDtJQUNMLEtBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3V0aWxzL2NyZWF0ZVVycWxDbGllbnQudHM/OTI2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWR1cEV4Y2hhbmdlLCBmZXRjaEV4Y2hhbmdlIH0gZnJvbSAnQHVycWwvY29yZSc7XG5pbXBvcnQgeyBjYWNoZUV4Y2hhbmdlIH0gZnJvbSAnQHVycWwvZXhjaGFuZ2UtZ3JhcGhjYWNoZSc7XG5cbmltcG9ydCB7IHdpdGhVcnFsQ2xpZW50IH0gZnJvbSAnbmV4dC11cnFsJztcbmltcG9ydCB7IExvZ2luTXV0YXRpb24sIE1lUXVlcnksIE1lRG9jdW1lbnQsIExvZ291dE11dGF0aW9uLCBSZWdpc3Rlck11dGF0aW9uIH0gZnJvbSAnLi4vZ2VuZXJhdGVkL2dyYXBocWwvZ3JhcGhxbCc7XG5pbXBvcnQgSW5kZXggZnJvbSAnLi4vcGFnZXMnO1xuaW1wb3J0IHsgYmV0dGVyVXBkYXRlUXVlcnkgfSBmcm9tICcuL2JldHRlclVwZGF0ZVF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFVycWxDbGllbnQoc3NyRXhjaGFuZ2UgPT4gKHtcbiAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2dyYXBocWxcIixcbiAgICBmZXRjaE9wdGlvbnM6IHsgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiIGFzIGNvbnN0IH0sXG4gICAgZXhjaGFuZ2VzOiBbXG4gICAgICBkZWR1cEV4Y2hhbmdlLFxuICAgICAgY2FjaGVFeGNoYW5nZSh7XG4gICAgICAgIHVwZGF0ZXM6IHtcbiAgICAgICAgICBNdXRhdGlvbjoge1xuICAgICAgICAgICAgbG9naW46IChfcmVzdWx0LCBhcmdzLCBjYWNoZSwgaW5mbykgPT4ge1xuICAgICAgICAgICAgICBiZXR0ZXJVcGRhdGVRdWVyeTxMb2dpbk11dGF0aW9uLCBNZVF1ZXJ5PihcbiAgICAgICAgICAgICAgICBjYWNoZSxcbiAgICAgICAgICAgICAgICB7IHF1ZXJ5OiBNZURvY3VtZW50IH0sXG4gICAgICAgICAgICAgICAgX3Jlc3VsdCxcbiAgICAgICAgICAgICAgICAocmVzdWx0LCBxdWVyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sb2dpbi5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbWU6IHJlc3VsdC5sb2dpbi5hZG1pbiB9O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2dvdXQ6IChfcmVzdWx0LCBhcmdzLCBjYWNoZSwgaW5mbykgPT4ge1xuICAgICAgICAgICAgICBiZXR0ZXJVcGRhdGVRdWVyeTxMb2dvdXRNdXRhdGlvbiwgTWVRdWVyeT4oXG4gICAgICAgICAgICAgICAgY2FjaGUsXG4gICAgICAgICAgICAgICAgeyBxdWVyeTogTWVEb2N1bWVudCB9LFxuICAgICAgICAgICAgICAgIF9yZXN1bHQsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbWU6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnaXN0ZXI6IChfcmVzdWx0LCBhcmdzLCBjYWNoZSwgaW5mbykgPT4ge1xuICAgICAgICAgICAgICBiZXR0ZXJVcGRhdGVRdWVyeTxSZWdpc3Rlck11dGF0aW9uLCBNZVF1ZXJ5PihcbiAgICAgICAgICAgICAgICBjYWNoZSxcbiAgICAgICAgICAgICAgICB7IHF1ZXJ5OiBNZURvY3VtZW50IH0sXG4gICAgICAgICAgICAgICAgX3Jlc3VsdCxcbiAgICAgICAgICAgICAgICAocmVzdWx0LCBxdWVyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZWdpc3Rlci5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbWU6IHJlc3VsdC5yZWdpc3Rlci5hZG1pbiB9O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgc3NyRXhjaGFuZ2UsXG4gICAgICBmZXRjaEV4Y2hhbmdlLFxuICAgIF0sXG59KSk7Il0sIm5hbWVzIjpbImRlZHVwRXhjaGFuZ2UiLCJmZXRjaEV4Y2hhbmdlIiwiY2FjaGVFeGNoYW5nZSIsIndpdGhVcnFsQ2xpZW50IiwiTWVEb2N1bWVudCIsImJldHRlclVwZGF0ZVF1ZXJ5Iiwic3NyRXhjaGFuZ2UiLCJ1cmwiLCJmZXRjaE9wdGlvbnMiLCJjcmVkZW50aWFscyIsImV4Y2hhbmdlcyIsInVwZGF0ZXMiLCJNdXRhdGlvbiIsImxvZ2luIiwiX3Jlc3VsdCIsImFyZ3MiLCJjYWNoZSIsImluZm8iLCJxdWVyeSIsInJlc3VsdCIsImVycm9ycyIsIm1lIiwiYWRtaW4iLCJsb2dvdXQiLCJyZWdpc3RlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils/createUrqlClient.ts\n"));

/***/ })

});