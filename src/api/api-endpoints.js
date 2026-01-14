const API_ENDPOINTS = {
    AUTH: {
        login: '/auth/login'
    },
    GENERAL: {
        getAllAnimals: '/general/getAnimals',
        getAllMagic: '/general/getAllMagic',
        generateFirstReport: (userId, applicationId, applicationType) => `/general/generateReportOne?userId=${userId}&applicationId=${applicationId}&applicationType=${applicationType}`,
        generateSecondReport: (userId, applicationId, applicationType) => `/general/generateReportTwo?userId=${userId}&applicationId=${applicationId}&applicationType=${applicationType}`
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
        getAllExtractionApp: '/extractor/applications',
        getAllExtractionAppByExtractor: '/extractor/my-applications',
        createHunterApp: (appId) => `/extractor/hunter-application?extrAppId=${appId}`,
        takeExtractionApp: (appId) => `/extractor/applications/${appId}/take`,
        checkMagicAnimalAvailability: () => '',
        processExtractionApplication: (appId) => `extractor/applications/${appId}/complete`
    },
    HUNTER: {
        getAllHunterApp: '/hunter/applications',
        getAllHunterAppByHunter: '/hunter/my-applications',
        takeHunterApp: (appId) => `/hunter/applications/${appId}/take`,
        processHunterApplication: () => ''
    },
}

export default API_ENDPOINTS;