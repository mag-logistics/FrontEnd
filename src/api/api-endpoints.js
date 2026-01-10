const API_ENDPOINTS = {
    AUTH: {},
    GENERAL: {
        getAllAnimals: '/general/getAllAnimals',
        getAllMagic: '/general/getAllMagic',
    },
    MAGICIAN: {
        getAllOrders: (magicianId) => `/magician/getAllMagicApp?magicianId=${magicianId}`,
        createApp: (magicianId) => `/magician/createApp?magicianId=${magicianId}`,
        createAppPattern: (magicianId) => `/magician/createAppPattern?magicianId=${magicianId}`,
        getAllAppPatterns: (magicianId) => `/magician/getAllAppPatterns?magicianId=${magicianId}`,
        addNewUser: () => ``,
        getAllEmployees: '/magician/getAllEmployees',
        getEmployee: (employeeId) => `/magician/getEmployee?employeeId=${employeeId}`,
        assignMagicalReward: (employeeId, rewardCount) => `/magician/assignMagicalReward?employeeId=${employeeId}&rewardCount=${rewardCount}`,
        assignMagicalPenalty: (employeeId, penaltyCount) => `/magician/assignMagicalPenalty?employeeId=${employeeId}&penaltyCount=${penaltyCount}`,
    },
    STOREKEEPER: {
        getAllMagicApp: '/storekeeper/getAllMagicApp',
        takeMagicApp: (storekeeperId, magicAppId) => `/storekeeper/takeMagicApp?storekeeperId=${storekeeperId}&magicApplicationId=${magicAppId}`,
        getAllMagicAppByStorekeeper: (storekeeperId) => `/storekeeper/getAllMagicAppByStorekeeper?storekeeperId=${storekeeperId}`,
        getAllMagicResponses: (storekeeperId) => `/storekeeper/getAllMagicResponses?storekeeperId=${storekeeperId}`,
        getMagicApplication: (magicAppId) => `/storekeeper/getMagicApplication?magicAppId=${magicAppId}`,
        processMagicApplication: (storekeeperId, magicApplicationId) => `/storekeeper/processMagicApplication?storekeeperId=${storekeeperId}&magicApplicationId=${magicApplicationId}`,
        checkMagicAvailability: (magicAppId) => `/storekeeper/checkMagicAvailability?magicApplicationId=${magicAppId}`,
        createExtractionApp: (storekeeperId) => `/storekeeper/createExtractionApp?storekeeperId=${storekeeperId}`,
    },
    EXTRACTOR: {
        getAllApplications: (extractorId) => `/extractor/getAllApplications?extractorId=${extractorId}`,
        createHunterApplicationRequest: (extractorId) => `/extractor/createHunterApplication/${extractorId}`,
    },
    HUNTER: {},
}

export default API_ENDPOINTS;