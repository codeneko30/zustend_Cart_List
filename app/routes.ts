import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    
    index("routes/products.tsx"),
    route('cart','routes/cart.tsx'),
    route('checkout','routes/checkout.tsx'),
    route('order','routes/order-confirmation.tsx')
    






] satisfies RouteConfig;
