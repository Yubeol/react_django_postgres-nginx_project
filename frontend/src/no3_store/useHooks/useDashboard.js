import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { useAllGetSales } from "./useSales";
import { useMemo } from "react";


export const useDashoard = () => {
    const { data: salesList = [] } = useAllGetSales();
    const { data: productList = [] } = useAllGetProduct();
    const { data: userList = [] } = useAllGetUser();

    const productObj = useMemo(() => {
        const obj = {}
        productList.forEach(item => { obj[item.id] = item })
        return obj
    }, [productList])

    // 핵심 지표 결과
    const kpi = useMemo(() => {
        const totalSalesAmount = salesList.reduce((sum, item) => (
            // sum + Number(item.total_price)
            sum + Number(item.totalPrice)
        ), 0)
        const totalOrderCount = salesList.length;
        const totalQuantity = salesList.reduce((sum, item) => (
            sum + Number(item.quantity)
        ), 0)
        const customerCount = userList.length;
        const productCount = productList.length;
        return {
            totalOrderCount, totalQuantity, totalSalesAmount,
            customerCount, productCount
        }
    }, [salesList, productObj, userList, productList])

    // 고객 랭킹
    const userRanking = useMemo(() => {
        const obj = {}
        salesList.forEach(item => {
            // obj[item.user_id] = (obj[item.user_id] || 0) + 1
            obj[item.userId] = (obj[item.userId] || 0) + 1
        });
        return Object.entries(obj)
            .map(([userId, count]) => {
                const user = userList.find(user => String(user.id) === String(userId))
                console.log(user)
                return {
                    name: user?.username || "unknown",
                    count
                }
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
    }, [salesList, userList])

    // 상품 랭킹
    const productRanking = useMemo(() => {
        const obj = {}
        salesList.forEach(item => {
            // obj[item.product_id] = (obj[item.product_id] || 0) + Number(item.quantity)
            obj[item.productId] = (obj[item.productId] || 0) + Number(item.quantity)
        });
        return Object.entries(obj)
            .map(([productId, quantity]) => {
                const product = productObj[productId]
                return {
                    // name: product?.product_name || "unknown",
                    name: product?.productName || "unknown",
                    quantity
                }
            })
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10)
    }, [salesList, productObj])

    return {
        kpi,
        userRanking,
        productRanking
    }
}