import API_ENDPOINTS from "./api-endpoints.js";
import ApiClient from "./api-client.js";
import {rhino} from "globals";

class ApiService {
    constructor() {
        this.client = new ApiClient();
        this.endpoints = API_ENDPOINTS;
    }

    auth = {
        login: async (email, password) => {
            return this.client.post(
                this.endpoints.AUTH.login,
                {
                    email: email,
                    password: password
                }
            )
        }
    }
    general = {
        getAllAnimals: async () => {
            return this.client.get(
                this.endpoints.GENERAL.getAllAnimals
            )
        },
        getAllMagic: async () => {
            return this.client.get(
                this.endpoints.GENERAL.getAllMagic
            )
        },
        generateFirstReport: async (userId, applicationId, applicationType) => {
            return this.client.post(
                this.endpoints.GENERAL.generateFirstReport(userId, applicationId, applicationType),
                {},
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                }
            )
        },
        generateSecondReport: async (userId, applicationId, applicationType) => {
            return this.client.post(
                this.endpoints.GENERAL.generateSecondReport(userId, applicationId, applicationType),
                {},
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                }
            )
        },
    }
    magician = {
        getAllOrders: async (magicianId) => {
            return this.client.get(
                this.endpoints.MAGICIAN.getAllOrders(magicianId)
            )
        },
        createApp: async (magicianId, magicianApp) => {
            return this.client.post(
                this.endpoints.MAGICIAN.createApp(magicianId),
                magicianApp
            )
        },
        createAppPattern: async (magicianId, magicianApp) => {
            return this.client.post(
                this.endpoints.MAGICIAN.createAppPattern(magicianId, magicianApp),
                magicianApp
            )
        },
        getAllAppPatterns: async (magicianId) => {
            return this.client.get(
                this.endpoints.MAGICIAN.getAllAppPatterns(magicianId)
            )
        },
        getAllEmployees: async () => {
            return this.client.get(
                this.endpoints.MAGICIAN.getAllEmployees
            )
        },
        createNewUser: async (magicianId) => {
            return this.client.post(
                this.endpoints.MAGICIAN.addNewUser(),
                null
            )
        },
        getEmployee: async (employeeId) => {
            return this.client.get(
                this.endpoints.MAGICIAN.getEmployee(employeeId)
            )
        },
        assignMagicalReward: async (employeeId, rewardCount) => {
            return this.client.post(
                this.endpoints.MAGICIAN.assignMagicalReward(employeeId, rewardCount),
                {}
            )
        },
        assignMagicalPenalty: async (employeeId, penaltyCount) => {
            return this.client.post(
                this.endpoints.MAGICIAN.assignMagicalPenalty(employeeId, penaltyCount),
                {}
            )
        }
    }
    storekeeper = {
        getAllMagicApp: async () => {
          return this.client.get(
              this.endpoints.STOREKEEPER.getAllMagicApp
          )
        },
        takeMagicApp: async (storekeeperId, magicAppId) => {
            return this.client.post(
                this.endpoints.STOREKEEPER.takeMagicApp(storekeeperId, magicAppId),
                {}
            )
        },
        getAllMagicAppByStorekeeper: async (storekeeperId) => {
            return this.client.get(
                this.endpoints.STOREKEEPER.getAllMagicAppByStorekeeper(storekeeperId)
            )
        },
        getAllMagicResponses: async (storekeeperId) => {
            return this.client.get(
                this.endpoints.STOREKEEPER.getAllMagicResponses(storekeeperId)
            )
        },
        getMagicApplication: async (magicAppId) => {
            return this.client.get(
                this.endpoints.STOREKEEPER.getMagicApplication(magicAppId)
            )
        },
        processMagicApplication: async (storekeeperId, magicApplicationId, magicAppResponse) => {
            return this.client.post(
                this.endpoints.STOREKEEPER.processMagicApplication(storekeeperId, magicApplicationId),
                magicAppResponse
            )
        },
        checkMagicAvailability: async (magicAppId) => {
            return this.client.get(
                this.endpoints.STOREKEEPER.checkMagicAvailability(magicAppId)
            )
        },
        createExtractionApp: async (storekeeperId, extractionApplicationDTO) => {
            return this.client.post(
                this.endpoints.STOREKEEPER.createExtractionApp(storekeeperId),
                extractionApplicationDTO
            )
        }
    }
    extractor = {
        createHunterApplication: async (appId, request) => {
            return this.client.post(
                this.endpoints.EXTRACTOR.createHunterApp(appId),
                request,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        getAllApplications: async () => {
            return this.client.get(
                this.endpoints.EXTRACTOR.getAllExtractionApp,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        getAllAppByExtractor: async () => {
            return this.client.get(
                this.endpoints.EXTRACTOR.getAllExtractionAppByExtractor,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        takeExtractionApp: async (extractionAppId) => {
            return this.client.post(
                this.endpoints.EXTRACTOR.takeExtractionApp(extractionAppId),
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        checkMagicAnimalAvailability: async (extractionAppId) => {
            return this.client.get(
                this.endpoints.EXTRACTOR.checkMagicAnimalAvailability(extractionAppId),
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        processExtractionApplication: async (extractionAppId) => {
            return this.client.post(
                this.endpoints.EXTRACTOR.processExtractionApplication(extractionAppId),
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        }
    }
    hunter= {
        getAllApplications: async () => {
            return this.client.get(
                this.endpoints.HUNTER.getAllHunterApp,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        getAllAppByHunter: async () => {
            return this.client.get(
                this.endpoints.HUNTER.getAllHunterAppByHunter,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        takeHuntingApp: async (huntingAppId) => {
            return this.client.post(
                this.endpoints.HUNTER.takeHunterApp(huntingAppId),
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        },
        processHuntingApplication: async (huntingAppId) => {
            return this.client.post(
                this.endpoints.HUNTER.processHunterApplication(),
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            )
        }
    }

}

const apiService = new ApiService();
// await apiService.extractor.getAllApplications('1').then(res => console.log('Then: ' + res.message)).catch(err => console.log('Error: ' + err.message));
export default apiService;