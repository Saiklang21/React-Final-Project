module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MovieCard.tsx [app-rsc] (ecmascript)");
;
;
;
async function HomePage() {
    const movies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMovies"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: movies.map((movie)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                movie: movie
            }, movie.id, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/MovieCard.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "MovieCard-module__IsXVua__card",
  "info": "MovieCard-module__IsXVua__info",
  "meta": "MovieCard-module__IsXVua__meta",
  "poster": "MovieCard-module__IsXVua__poster",
  "posterTitle": "MovieCard-module__IsXVua__posterTitle",
  "rating": "MovieCard-module__IsXVua__rating",
  "title": "MovieCard-module__IsXVua__title",
});
}),
"[project]/components/MovieCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MovieCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// components/MovieCard.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/MovieCard.module.css [app-rsc] (css module)");
;
;
;
const genreGradients = {
    "Sci-Fi": "linear-gradient(160deg, #1b1f3b, #3a2d6b)",
    Drama: "linear-gradient(160deg, #3b1f1f, #6b2d2d)",
    Action: "linear-gradient(160deg, #1f2b3b, #2d4a6b)"
};
function MovieCard({ movie }) {
    const gradient = genreGradients[movie.genre] ?? "linear-gradient(160deg, #2a2a2e, #444)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: `/movies/${movie.id}`,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].card,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].poster,
                style: {
                    background: gradient
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].posterTitle,
                    children: movie.title
                }, void 0, false, {
                    fileName: "[project]/components/MovieCard.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MovieCard.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].info,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                        children: movie.title
                    }, void 0, false, {
                        fileName: "[project]/components/MovieCard.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].meta,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: movie.genre
                            }, void 0, false, {
                                fileName: "[project]/components/MovieCard.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MovieCard$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].rating,
                                children: [
                                    "★ ",
                                    movie.rating
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MovieCard.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MovieCard.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MovieCard.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MovieCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/data/movies.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "m1",
        "title": "Galactic Drift",
        "genre": "Sci-Fi",
        "posterUrl": "/posters/galactic-drift.jpg",
        "rating": 8.1,
        "description": "ลูกเรือยานอวกาศต้องเอาชีวิตรอดหลังหลงเข้าไปในมิติที่ไม่รู้จัก"
    },
    {
        "id": "m2",
        "title": "The Last Recipe",
        "genre": "Drama",
        "posterUrl": "/posters/the-last-recipe.jpg",
        "rating": 7.4,
        "description": "เชฟหนุ่มตามหาสูตรอาหารลับของครอบครัวก่อนร้านจะถูกปิดตัวลง"
    },
    {
        "id": "m3",
        "title": "Midnight Pursuit",
        "genre": "Action",
        "posterUrl": "/posters/midnight-pursuit.jpg",
        "rating": 6.9,
        "description": "นักสืบต้องไล่ล่าคนร้ายข้ามเมืองภายในคืนเดียวก่อนหลักฐานจะหายไป"
    }
];
}),
"[project]/data/showtimes.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "s1",
        "movieId": "m1",
        "date": "2026-10-15",
        "time": "13:00",
        "hallName": "Hall 1"
    },
    {
        "id": "s2",
        "movieId": "m1",
        "date": "2026-10-15",
        "time": "18:30",
        "hallName": "Hall 1"
    },
    {
        "id": "s3",
        "movieId": "m2",
        "date": "2026-10-15",
        "time": "16:00",
        "hallName": "Hall 2"
    },
    {
        "id": "s4",
        "movieId": "m3",
        "date": "2026-10-16",
        "time": "20:00",
        "hallName": "Hall 3"
    }
];
}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMovieById",
    ()=>getMovieById,
    "getMovies",
    ()=>getMovies,
    "getShowtimeById",
    ()=>getShowtimeById,
    "getShowtimesByMovieId",
    ()=>getShowtimesByMovieId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$movies$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/movies.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$showtimes$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/showtimes.json.[json].cjs [app-rsc] (ecmascript)");
;
;
async function getMovies() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$movies$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
}
async function getMovieById(id) {
    const movies = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$movies$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
    return movies.find((movie)=>movie.id === id);
}
async function getShowtimesByMovieId(movieId) {
    const showtimes = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$showtimes$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
    return showtimes.filter((showtime)=>showtime.movieId === movieId);
}
async function getShowtimeById(id) {
    const showtimes = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$showtimes$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
    return showtimes.find((showtime)=>showtime.id === id);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a1y58c._.js.map