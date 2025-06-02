const products = [
    {
        id: 1,
        name: "精品咖啡豆",
        price: 499,
        description: "來自哥倫比亞的優質阿拉比卡咖啡豆",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 50,
        category: "咖啡豆",
        images: [
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1498804103079-a6351b050096?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1442550528053-c431ecb55509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "100% 阿拉比卡咖啡豆",
            "中度烘焙",
            "酸度適中，口感圓潤",
            "有機認證",
            "真空包裝"
        ]
    },
    {
        id: 2,
        name: "手沖咖啡壺",
        price: 1200,
        description: "專業級不鏽鋼手沖咖啡壺",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 30,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1516224498413-69ac0501d05d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "304不鏽鋼材質",
            "細長壺嘴設計",
            "人體工學手柄",
            "適用於多種濾杯",
            "容量600ml"
        ]
    },
    {
        id: 3,
        name: "磨豆機",
        price: 2500,
        description: "精準控制的電動磨豆機",
        image: "https://images.unsplash.com/photo-1516224498413-69ac0501d05d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 20,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1516224498413-69ac0501d05d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1516224498413-69ac0501d05d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "40段研磨粗細調節",
            "不鏽鋼錐形刀盤",
            "靜音設計",
            "容量250g",
            "防滑底座"
        ]
    },
    {
        id: 4,
        name: "咖啡濾紙",
        price: 150,
        description: "100入環保咖啡濾紙",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 100,
        category: "耗材",
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1494314671902-399b18174975?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "100%原木漿製造",
            "無漂白環保材質",
            "適合1-2人份",
            "快速濾泡",
            "100入/包"
        ]
    },
    {
        id: 5,
        name: "巴西咖啡豆",
        price: 399,
        description: "來自巴西的中焙咖啡豆，具有堅果香氣",
        image: "https://images.unsplash.com/photo-1587734361993-0275d25954f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 45,
        category: "咖啡豆",
        images: [
            "https://images.unsplash.com/photo-1587734361993-0275d25954f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587734361993-0275d25954f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "巴西原產地",
            "中度烘焙",
            "堅果香氣",
            "平衡風味",
            "1公斤裝"
        ]
    },
    {
        id: 6,
        name: "咖啡杯組",
        price: 880,
        description: "北歐風格陶瓷咖啡杯組，含杯盤",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 25,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "北歐簡約風格",
            "高溫燒製陶瓷",
            "含杯盤設計",
            "容量250ml",
            "4杯組"
        ]
    },
    {
        id: 7,
        name: "義式濃縮咖啡機",
        price: 12800,
        description: "專業級半自動義式濃縮咖啡機",
        image: "https://images.unsplash.com/photo-1587516328742-bad162ae6f9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 8,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1587516328742-bad162ae6f9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587516328742-bad162ae6f9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587516328742-bad162ae6f9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "15 bar壓力",
            "專業級蒸氣棒",
            "可程式化溫控",
            "雙鍋爐系統",
            "不鏽鋼外殼"
        ]
    },
    {
        id: 8,
        name: "電子溫度計",
        price: 580,
        description: "數位顯示手沖咖啡專用溫度計",
        image: "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 35,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "LCD數位顯示",
            "防水設計",
            "快速感應",
            "電池供電",
            "不鏽鋼探針"
        ]
    },
    {
        id: 9,
        name: "衣索比亞咖啡豆",
        price: 650,
        description: "衣索比亞耶加雪菲咖啡豆，花香調",
        image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 30,
        category: "咖啡豆",
        images: [
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "耶加雪菲產區",
            "淺度烘焙",
            "茉莉花香",
            "果酸明亮",
            "半磅裝"
        ]
    },
    {
        id: 10,
        name: "清潔刷組",
        price: 320,
        description: "咖啡機清潔刷具組合",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 60,
        category: "耗材",
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "多種尺寸刷具",
            "人體工學握把",
            "耐用尼龍刷毛",
            "附收納袋",
            "5件組"
        ]
    },
    {
        id: 11,
        name: "咖啡豆保鮮罐",
        price: 450,
        description: "不鏽鋼咖啡豆密封保鮮罐",
        image: "https://images.unsplash.com/photo-1572164482213-11d03f564e6c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 40,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1572164482213-11d03f564e6c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1572164482213-11d03f564e6c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1572164482213-11d03f564e6c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "304食品級不鏽鋼",
            "密封橡膠圈",
            "單向排氣閥",
            "容量500g",
            "防曬設計"
        ]
    },
    {
        id: 12,
        name: "專業咖啡秤",
        price: 1680,
        description: "精準度0.1g的專業咖啡秤",
        image: "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 15,
        category: "器具",
        images: [
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1575441823203-60732a6a3707?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "精準度0.1g",
            "計時功能",
            "防水設計",
            "USB充電",
            "自動校正"
        ]
    },
    {
        id: 13,
        name: "日式抹茶粉",
        price: 580,
        description: "日本京都產特級抹茶粉，適合飲用及烘焙",
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 25,
        category: "茶品",
        images: [
            "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1582845512747-e42001c95638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "京都宇治抹茶",
            "特級品質",
            "無添加物",
            "100g/罐",
            "適合飲用及烘焙"
        ]
    },
    {
        id: 14,
        name: "台灣高山茶",
        price: 1200,
        description: "阿里山高山茶，清香回甘",
        image: "https://images.unsplash.com/photo-1582845512747-e42001c95638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 15,
        category: "茶品",
        images: [
            "https://images.unsplash.com/photo-1582845512747-e42001c95638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "阿里山產區",
            "手工採摘",
            "輕焙火製程",
            "150g/罐",
            "真空包裝"
        ]
    },
    {
        id: 15,
        name: "陶瓷茶壺組",
        price: 2280,
        description: "景德鎮手工製陶瓷茶具組，含茶海及6個品茗杯",
        image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 10,
        category: "茶具",
        images: [
            "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1582845512747-e42001c95638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "景德鎮製作",
            "全手工製作",
            "含茶海及6杯",
            "精美包裝",
            "送禮首選"
        ]
    },
    {
        id: 16,
        name: "養生花茶組合",
        price: 499,
        description: "精選花草茶包組合，含玫瑰、洋甘菊、薄荷等",
        image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 50,
        category: "茶品",
        images: [
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1582845512747-e42001c95638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "6種花茶組合",
            "獨立包裝",
            "無添加香料",
            "30包/盒",
            "附沖泡指南"
        ]
    },
    {
        id: 17,
        name: "精品巧克力",
        price: 450,
        description: "比利時手工製作70%黑巧克力，單一產地可可豆",
        image: "https://images.unsplash.com/photo-1548907040-4d2be3f5e912?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 30,
        category: "甜點",
        images: [
            "https://images.unsplash.com/photo-1548907040-4d2be3f5e912?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "70%黑巧克力",
            "單一產地可可豆",
            "無添加物",
            "100g/片",
            "精美禮盒"
        ]
    },
    {
        id: 18,
        name: "手工餅乾禮盒",
        price: 699,
        description: "綜合口味手工餅乾禮盒，使用日本麵粉製作",
        image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 20,
        category: "甜點",
        images: [
            "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1548907040-4d2be3f5e912?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "6種口味",
            "日本麵粉",
            "無人工香料",
            "300g/盒",
            "附品項說明"
        ]
    },
    {
        id: 19,
        name: "玻璃茶壺",
        price: 960,
        description: "耐熱玻璃泡茶壺，附不鏽鋼濾網",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 15,
        category: "茶具",
        images: [
            "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "耐熱玻璃",
            "不鏽鋼濾網",
            "600ml容量",
            "可微波使用",
            "易清洗設計"
        ]
    },
    {
        id: 20,
        name: "抹茶點心組",
        price: 799,
        description: "日式抹茶甜點組合，含抹茶蛋糕、抹茶餅乾等",
        image: "https://images.unsplash.com/photo-1594149433195-36a30501ac8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
        stock: 12,
        category: "甜點",
        images: [
            "https://images.unsplash.com/photo-1594149433195-36a30501ac8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300",
            "https://images.unsplash.com/photo-1548907040-4d2be3f5e912?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=300"
        ],
        features: [
            "4種抹茶甜點",
            "使用京都抹茶",
            "無人工色素",
            "精美包裝",
            "冷藏配送"
        ]
    }
];