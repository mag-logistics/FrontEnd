import API_ENDPOINTS from "./api-endpoints.js";
import ApiClient from "./api-client.js";
import {rhino} from "globals";

class ApiService {
    constructor() {
        this.client = new ApiClient();
        this.endpoints = API_ENDPOINTS;
    }

    auth = {
        login: async (credentials) => {
            return this.client.post(
                this.endpoints.AUTH,
                credentials
            )
        }
    }
    magician = {
        getAllOrders: async (magicianId) => {
            // return this.client.get(
            //     this.endpoints.MAGICIAN.getAllOrders(magicianId)
            // )
            console.log("magicianId", magicianId);
            return []
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
        processMagicApplication: async (storekeeperId, magicApplicationId) => {
            return this.client.post(
                this.endpoints.STOREKEEPER.processMagicApplication(storekeeperId),
                magicApplicationId
            )
        },
        checkMagicAvailability: async (storekeeperId) => {
            return this.client.get(
                this.endpoints.STOREKEEPER.checkMagicAvailability(storekeeperId)
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
        createHunterApplication: async (extractorId, request) => {
            return this.client.post(
                this.endpoints.EXTRACTOR.createHunterApplicationRequest(extractorId),
                request
            )
        },
        getAllApplications: async (extractorId) => {
            return this.client.get(
                this.endpoints.EXTRACTOR.getAllApplications(extractorId)
            )
        }
    }
}

const apiService = new ApiService();
// await apiService.extractor.getAllApplications('1').then(res => console.log('Then: ' + res.message)).catch(err => console.log('Error: ' + err.message));
export default apiService;