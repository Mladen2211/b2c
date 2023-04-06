export function membershipProgramList () {
    return [
        {
            isMember: true,
            programName: "Barberklubben",
            programId: '12354651',
            joinedDate: '22.1.2016',
            pointsEarned: 1240,
            salon: 'Ramsvik Bergen Sentrum',
            siteId: 101,
            programDescription: 'Sirkel gir deg 5% bonus ved kjøp av  behandlinger og produkter. Bonuspoengene kan benyttes ved kjøp av valgfrie produkter*.1 poeng tilsvarer 1 krone.',
            joinDescription: 'Ved å melde deg inn i Think Exclusive får du 5% bonus på alle behandlinger og varekjøp. Bonuspoengene kan benyttes ved kjøp av valgfrie produkter.Som medlem mottar du påminnelse om nye timer, samt info om bonussaldo, tilbud og kampanjer.Velkommen i vår Sirkel!',
            termsForUse: 'However, any and all other entities that control, are controlled by, or is a sample; alter the fact that the additions and/or changes are intended to facilitate the commercial use of the following: 2.1 Unmodified Code.<br /><br />This License or (ii) withdraw Your litigation claim is resolved.<br />If you become aware that the Package in any resulting litigation.<br /><br />This patent license to reproduce, analyze, test, perform and/or display publicly, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute such a way that the original test modes be preserved.<br /><br />Bonuspoengene kan benyttes ved kjøp av valgfrie produkter*.1 poeng tilsvarer 1 krone.',
            pointsHistory: [
                {
                    orderDate: '1. februar 2023',
                    pointsChange: 40, //Can also be negative
                    order: 
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
                },
                {
                    orderDate: '12. februar 2023',
                    pointsChange: -25,
                    order: 
                    {
                        orderId: 10066,
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
                }
            ]
            //Also add whatever fields is needed to unsubscribe / join a program
        },
        {
            isMember: false,
            programName: "Luggen klubben",
            programId: '8652654',
            joinedDate: '22.1.2016',
            pointsEarned: 300,
            salon: 'Ramsvik Bergen Sentrum',
            siteId: 101,
            programDescription: 'Sirkel gir deg 5% bonus ved kjøp av  behandlinger og produkter. Bonuspoengene kan benyttes ved kjøp av valgfrie produkter*.1 poeng tilsvarer 1 krone.',
            joinDescription: 'Ved å melde deg inn i Think Exclusive får du 5% bonus på alle behandlinger og varekjøp. Bonuspoengene kan benyttes ved kjøp av valgfrie produkter.Som medlem mottar du påminnelse om nye timer, samt info om bonussaldo, tilbud og kampanjer.Velkommen i vår Sirkel!',
            termsForUse: 'However, any and all other entities that control, are controlled by, or is a sample; alter the fact that the additions and/or changes are intended to facilitate the commercial use of the following: 2.1 Unmodified Code.<br /><br />This License or (ii) withdraw Your litigation claim is resolved.<br />If you become aware that the Package in any resulting litigation.<br /><br />This patent license to reproduce, analyze, test, perform and/or display publicly, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute such a way that the original test modes be preserved.<br /><br />Bonuspoengene kan benyttes ved kjøp av valgfrie produkter*.1 poeng tilsvarer 1 krone.',
            pointsHistory: [
                {
                    orderDate: '12. februar 2023',
                    pointsChange: -25,
                    order: 
                    {
                        orderId: 10066,
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
                }
            ]
        },
    ]
}
