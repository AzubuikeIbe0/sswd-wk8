<script>
    import { page } from '$app/stores';

    // Sveltekit form enhancements
    import { enhance, applyAction } from '$app/forms';

    // Import the store etc.
    import { categories, getAllCategories } from '../../../stores/productStore';


    /**
	 * @type {{ id?: any; category_id?: any; product_name?: any; product_description?: any; product_stock?: any; product_price?: any; product?: any; }}
	 */
     export let data;
    // Access data returned from +page.server.js
    // @ts-ignore
    export let form;

    // Update list of categories (used in form)
    getAllCategories();

const { product } = data;



</script>


  <!-- Main Content - Products etc. -->
  <div class="container">
	<!-- If the insert was sucessfull display the new product details-->
	<!-- the form data is returned by the server script for this page-->
	{#if form?.success}

		<div class="row">
			<!-- Page Header -->
			<!-- show form message if it exists-->
			<h2 class="mt-5">{form?.message || ''}</h2>
		</div>

		<div class="row">
			<div class="row mb-3">
				<h6>Product ID: {form?.product.id || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Category ID: {form?.product.category_id || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Name: {form.product.product_name || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Description: {form?.product.product_stock || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Price: {form?.product.product_price || ''}</h6>
			</div>
		</div>
	<!-- else show the form again (very simple error handling - should also show validation errors)-->
	{:else}
		<div class="row">
			<!-- Page Header -->
			<h2 class="mt-5">Update Product</h2>
		</div>

		<div class="row">
			<!-- Product Form -->
			<form action="?/updateproduct" method="PATCH"
			use:enhance={({ form }) => {
				// Before form submission to server
				return async ({ result, update }) => {
					// After form submission to server
					if (result.type === 'success') {
						await applyAction(result);
					}
					if (result.type === 'invalid') {
						await applyAction(result);
					}
					update();
				};
			}}
			>
			 <div class="row mb-3">
				<label for="product_id" class="form-label">Product Id:</label>
				<div class="col-sm-8">
					<input
					id="product_id"
					type="text"
					class="form-control"
					name="product_id"
					value="{data?.id}"
					disabled
				>
				</div> 
			</div>
				<div class="row mb-3">
					<label for="category_id" class="form-label">Category:</label>
					<div class="col-sm-8">
<<<<<<< HEAD
						<select id="category_id" class="form-select" name="category_id"  value={data?.category_id}>
=======
						<select id="category_id" class="form-select" name="category_id" value="{data.category_id}">
>>>>>>> 4c91aa02fefd88c2bb7019653fd26e5d15c9e408
							<option value="0">Choose a category</option>
                            <!-- Add each category as an option in the seclect -->
							{#each $categories as cat}
								<option value={cat.id}>{cat.category_name}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row mb-3">
					<label for="product_name" class="form-label">Name:</label>
					<div class="col-sm-8">
						<input 
							id="product_name" 
							type="text" 
							class="form-control" 
							name="product_name" 
							value={data.product_name}
						>
					</div>
				</div>
				<div class="row mb-3">
					<label for="product_description" class="form-label">Description:</label>
					<div class="col-sm-8">
						<input
						id="product_description"
						type="text"
						class="form-control"
						name="product_description"
						value={data.product_description}
					/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="product_stock" class="form-label">Stock:</label>
					<div class="col-sm-8">
						<input 
							id="product_stock" 
							type="number" 
							class="form-control" 
							name="product_stock" 
							value={data.product_stock} 
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="product_price" class="form-label">Price:</label>
					<div class="col-sm-8">
						<input
							id="product_price"
							type="number"
							min="0.00"
							max="10000.00"
							step="0.01"
							class="form-control"
							name="product_price"
							value={data.product_price}
						/>
					</div>
				</div>
				<!-- productId is a hidden field value is not required but set = 0-->
<<<<<<< HEAD
				<input name="id" type="hidden" value={data.id} />
=======
				<input name="id" type="hidden" value="{data.id}" />
>>>>>>> 4c91aa02fefd88c2bb7019653fd26e5d15c9e408
				<div class="mb-3">
					<button type="submit" class="btn btn-primary">Update Product </button>
					<a href="/" class="btn btn-secondary"> Cancel </a>
				</div>

				{#if form?.error}
					<div class="alert alert-danger col-sm-8" role="alert">validation failed: {form?.message}</div>
				{/if}
			</form>
			<!-- End form-->
		</div>
	{/if} <!-- End the if block-->
</div>
