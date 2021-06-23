let BASE_URL = 'http://localhost:5000/api';

function createCupcake(cupcake) {
	return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">X</button>
        </li>
        <img class="Cupcake-img"
            src="${cupcake.img}"
            alt="(no image provided)">
    </div>`;
}

async function showCupcakes() {
	let response = await axios.get(`${BASE_URL}/cupcakes`);

	for (let cupcakeData of response.data.cupcakes) {
		let newCupcake = $(createCupcake(cupcakeData));
		$('#cupcakes-list').append(newCupcake);
	}
}

$('#new-cupcake-form').on('submit', async function(evt) {
	evt.preventDefault();
	let flavor = $('#form-flavor').val();
	let size = $('#form-size').val();
	let rating = $('#form-rating').val();
	let image = $('#form-image').val();

	let newResponse = await axios.post(`${BASE_URL}/cupcakes`, { flavor, size, rating, image });

	let newCupcake = $(createCupcake(newResponse.data.cupcake));
	$('#cupcakes-list').append(newCupcake);
	$('#new-cupcake-form').trigger('reset');
});

$('#cupcakes-list').on('click', '.delete-button', async function(evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest('div');
	let cupcakeId = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

document.addEventListener('DOMContentLoaded', showCupcakes());
