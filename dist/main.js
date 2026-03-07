/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\n    function groupByCategory(meals) {\n        const grouped = {};\n        meals.forEach(meal => {\n            const category = meal.meal_category;\n            // Skip if category is undefined, null, or empty\n            if (!category || category === 'undefined' || category.trim() === '') {\n                return;\n            }\n            if (!grouped[category]) {\n                grouped[category] = [];\n            }\n            grouped[category].push(meal);\n        });\n        return grouped;\n    }\n\n    function createMealHTML(meal) {\n        let prices = '';\n\n        // Only display prices if at least one price exists\n        if (meal.price_small || meal.price_large) {\n            if (meal.price_small && meal.price_large && meal.price_small !== meal.price_large) {\n                // Show both prices if they're different\n                prices = `<div class=\"prices\">\n                    <small class=\"price\"><span class=\"currency\">XCG</span> <span class=\"amount\">${meal.price_small}</span></small>\n                    <small class=\"price\"><span class=\"currency\">XCG</span> <span class=\"amount\">${meal.price_large}</span></small>\n                </div>`;\n            } else {\n                // Show single price (preferring price_large, then price_small)\n                const price = meal.price_large || meal.price_small;\n                prices = `<small class=\"price\"><span class=\"currency\">XCG</span> <span class=\"amount\">${price}</span></small>`;\n            }\n        }\n\n        // Add 'not-available' class if meal is not available\n        const availabilityClass = meal.meal_availability === 'not available' ? 'not-available' : '';\n\n        return `\n        <div class=\"meal ${availabilityClass}\">\n            <div class=\"content\">\n                <h3 class=\"meal-title\">${meal.meal}</h3>\n                <p class=\"meal-description\">${meal.meal_description || ''}</p>\n            </div>\n            ${prices}\n        </div>\n    `;\n    }\n\n    function displayData(groupedMeals) {\n        const menuColumns = document.querySelector('.menu-columns');\n        const orderSection = document.querySelector('#order').parentElement;\n\n        // Clear existing dynamic content but keep the header and order section\n        const existingColumns = menuColumns.querySelectorAll('.column:not(:has(#order))');\n        existingColumns.forEach(col => col.remove());\n\n        let columnIndex = 0;\n        const categories = Object.keys(groupedMeals);\n\n        categories.forEach(category => {\n            const meals = groupedMeals[category];\n            const altValue = columnIndex % 2;\n\n            const mealsHTML = meals.map(meal => createMealHTML(meal)).join('');\n\n            const columnHTML = `\n            <div style=\"--alt: ${altValue}\" class=\"column\">\n                <h2 class=\"meal-category\" id=\"${category.toLowerCase().replace(/\\s+/g, '-')}\">${category}</h2>\n                <article class=\"meals-wrapper\">\n                    <div class=\"meals\">\n                        ${mealsHTML}\n                    </div>\n                </article>\n            </div>\n        `;\n\n            // Insert before the order section\n            orderSection.insertAdjacentHTML('beforebegin', columnHTML);\n            columnIndex++;\n        });\n    }\n\n    function fetchData() {\n        fetch(\"https://opensheet.elk.sh/1LROx4x5OGAZ10ra4Uu6owWIoulpDmN7ah7V4moiWdIc/menu\")\n            .then((res) => res.json())\n            .then((meals) => {\n                const groupedMeals = groupByCategory(meals);\n                displayData(groupedMeals);\n                const elem = document.querySelector('.menu-columns');\n                let msnry = new Masonry( elem, {\n                    // options\n                    itemSelector: '.column',\n                    columnWidth: '.column', // Match this to your CSS width\n                    gutter: 16,\n                    percentPosition: true,\n                    // horizontalOrder: true\n                });\n\n            })\n            .catch((error) => {\n                console.error('Error fetching menu data:', error);\n            });\n    }\n\n\n\n    fetchData();\n\n    window.addEventListener('resize', function() {\n        msnry.layout();\n    });\n\n})\n\n//# sourceURL=webpack://dushi_bunita_menu/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;