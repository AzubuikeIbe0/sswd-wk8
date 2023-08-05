// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the store etc.
import { updateProduct } from '../../../stores/productStore.js';



/** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
  export const load = async ({params}) => {
    const { id } = params
    const data = await fetch(`http://127.0.0.1:5001/product/${id}`,
    ).then(
      res => res.json()
    );
    return data
}




export const actions = {

    // action function for adding a product - called when form is submitted
    // This is where the form sends its data
    updateproduct: async ({request}) => {
      let success = false;

      // get data from the POST request
      const form_data = await request.formData();

      // read each value from the submitted form
      const product = {
        id: Number(form_data.get('id')),
        category_id: Number(form_data.get('category_id')),
        product_name: form_data.get('product_name'),
        product_description: form_data.get('product_description'),
        product_stock: Number(form_data.get('product_stock')),
        product_price: Number(form_data.get('product_price'))
      }

      console.log('update product: ', product);

      if (
        product.id > 0 &&
        product.category_id > 0 &&
        product.product_name != '' &&
        product.product_description != '' &&
        product.product_stock > 0 &&
        product.product_price > 0)
        {
          // Add the new product via the API (using the product store function)
          const result = await updateProduct(JSON.stringify(product));
          console.log('update product result: ', result)

        // return the result
        // This will display the success section of the page to show the newly added product
        return { 
          success: true,
          message: `Product with id updated: ${result?.product.id}`,
          product: result?.product
        };

        // This will cause the form to redisplay for corrections, along with an error message
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          product: product
        })
      }
    }

  };
