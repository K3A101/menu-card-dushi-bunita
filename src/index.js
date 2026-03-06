document.addEventListener("DOMContentLoaded", function () {

    function groupByCategory(meals) {
        const grouped = {};
        meals.forEach(meal => {
            const category = meal.meal_category;
            // Skip if category is undefined, null, or empty
            if (!category || category === 'undefined' || category.trim() === '') {
                return;
            }
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(meal);
        });
        return grouped;
    }

    function createMealHTML(meal) {
        let prices = '';

        // Only display prices if at least one price exists
        if (meal.price_small || meal.price_large) {
            if (meal.price_small && meal.price_large && meal.price_small !== meal.price_large) {
                // Show both prices if they're different
                prices = `<div class="prices">
                    <small class="price"><span class="currency">XCG</span> <span class="amount">${meal.price_small}</span></small>
                    <small class="price"><span class="currency">XCG</span> <span class="amount">${meal.price_large}</span></small>
                </div>`;
            } else {
                // Show single price (preferring price_large, then price_small)
                const price = meal.price_large || meal.price_small;
                prices = `<small class="price"><span class="currency">XCG</span> <span class="amount">${price}</span></small>`;
            }
        }

        // Add 'not-available' class if meal is not available
        const availabilityClass = meal.meal_availability === 'not available' ? 'not-available' : '';

        return `
        <div class="meal ${availabilityClass}">
            <div class="content">
                <h3 class="meal-title">${meal.meal}</h3>
                <p class="meal-description">${meal.meal_description || ''}</p>
            </div>
            ${prices}
        </div>
    `;
    }

    function displayData(groupedMeals) {
        const menuColumns = document.querySelector('.menu-columns');
        const orderSection = document.querySelector('#order').parentElement;

        // Clear existing dynamic content but keep the header and order section
        const existingColumns = menuColumns.querySelectorAll('.column:not(:has(#order))');
        existingColumns.forEach(col => col.remove());

        let columnIndex = 0;
        const categories = Object.keys(groupedMeals);

        categories.forEach(category => {
            const meals = groupedMeals[category];
            const altValue = columnIndex % 2;

            const mealsHTML = meals.map(meal => createMealHTML(meal)).join('');

            const columnHTML = `
            <div style="--alt: ${altValue}" class="column">
                <h2 class="meal-category" id="${category.toLowerCase().replace(/\s+/g, '-')}">${category}</h2>
                <article class="meals-wrapper">
                    <div class="meals">
                        ${mealsHTML}
                    </div>
                </article>
            </div>
        `;

            // Insert before the order section
            orderSection.insertAdjacentHTML('beforebegin', columnHTML);
            columnIndex++;
        });
    }

    function fetchData() {
        fetch("https://opensheet.elk.sh/1LROx4x5OGAZ10ra4Uu6owWIoulpDmN7ah7V4moiWdIc/menu")
            .then((res) => res.json())
            .then((meals) => {
                const groupedMeals = groupByCategory(meals);
                displayData(groupedMeals);
            })
            .catch((error) => {
                console.error('Error fetching menu data:', error);
            });
    }

    fetchData();

    let gridContainer = document.querySelector('.menu-columns');
    let msnry = new Masonry( gridContainer, {
        // options
        itemSelector: '.column',
        columnWidth: 'column',
        percentPosition: true,
        gutter: 16,
        horizontalOrder: true,
        transitionDuration: '0.8s'
    });

})