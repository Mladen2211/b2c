export function orderList () {
    return [
        {
            orderId: 10065,
            orderDate: '03.03.2023', //Date the user created the order
            orderTime: '09:55', //Assume this will be included in the orderDate field
            orderType: 'future-visit', //orderType: int - Whatever is easiest/best backend
            salon: {
                siteId: 101,
                name: 'Ramsvik Bergen Sentrum',
                urlSafeName: 'ramsvik-bergen-sentrum',
            },
            treatmentsOrder: { //null == no treatments in the order
                totalPrice: 560.00,
                receiptId: '', //for printing receipt. not sure what else is needed here yet
                treatments: [
                    {
                        treatmentName: "Vask og klipp",
                        treatmentDate: 'Fredag 4. mars', //Date the treatment was/will be performed
                        treatmentTime: '14:15 - 15:00',
                        durationMinutes: 30,
                        employee: 'Janne',
                        price: 560.00,
                        treatmentIdBase64: 'NQA4ACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA',
                        urlSafeName: 'vask-og-klipp',
                    },
                ]
            },
            productsOrder: { // null == no products in the order
                status: 'Ordre mottatt', //status: int - Whatever is easiest/best backend
                shippingFee: 0,
                shippingType: 'Hent ved behandling', //shippingType: int - Whatever is easiest/best backend
                totalPrice: 300,
                totalPriceIncVat: 375,
                receiptId: '',
                products: [
                    {
                        productName: 'TT Attitude Angel Dust volume powder 30 g',
                        productNameUrlSafe: 'tt-attitude-angel-dust-volume-powder-30-g',
                        productIdBase64: 'QgBSADAAMQBFAEIAUwBAAFIAXQBaAFIAVAAzADcAKQA',
                        productId: 'BR01EBS@R]ZRT37)',
                        brand: 'Wella Professional',
                        price: 300,
                        amount: 1,
                        chainId: 36,
                    }
                ]
            }
        },
    ]
}
