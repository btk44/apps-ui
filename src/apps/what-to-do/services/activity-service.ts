import type { ActivitySearchFilters } from "../models/activity-search-filters"
import type { ActivitySearchItem } from "../models/activity-search-item"
import { activitySearchItems } from '../services/mock-data'

export const ActivityService = {
    apiUrl: 'http://localhost:5000/api', // windows
    activityUrl: 'Transaction',

    SearchActivities: async function(filters?: ActivitySearchFilters) {    
        return activitySearchItems

        // try{
        //     const response = await this.Post(`${this.apiUrl}/${this.activityUrl}/search`, { ...(filters || {}) })
        //     return response.map((t: ActivitySearchItem) => { return { ...t, startDate: new Date(t.startDate), endDate: new Date(t.endDate)} })
        // } catch(e) {
        //     console.log('Activity search failed')
        //     throw e
        // }
    },

    // SaveActivity: async function(transactions: Array<Transaction>) {    
    //     try{
    //         const processInput = { transactions: transactions }
    //         const response = await fetch(`${this.apiUrl}/${this.transactionUrl}/process`, 
    //                                     { method: 'POST', body: JSON.stringify(processInput), headers: this.GetHeaders() })
    //         return await response.json()
    //     } catch(e) {
    //         console.log('Transaction save failed')
    //         throw e
    //     }
    // },

    GetCategories: async function() {    
        try{
            return [
                {id: 1, name: "na świeżym powietrzu"},
                {id: 2, name: "w pomieszczeniach"},
                {id: 3, name: "sport"},
                {id: 4, name: "sztuka"},
                {id: 5, name: "muzyka"},
                {id: 6, name: "jedzenie"},
                {id: 7, name: "podróże"},
                {id: 8, name: "edukacja"},
                {id: 9, name: "zdrowie"},
                {id: 10, name: "technologia"},
                {id: 11, name: "rozrywka"},
                {id: 12, name: "zakupy"},
                {id: 13, name: "spotkania towarzyskie"},
                {id: 14, name: "społeczność"},
                {id: 15, name: "wolontariat"},
                {id: 16, name: "natura"},
                {id: 17, name: "fitness"},
                {id: 18, name: "przygoda"},
                {id: 19, name: "relaks"}
            ]
            return await this.Get(`${this.apiUrl}/${this.activityUrl}/categories`)
        } catch(e) {
            console.log('Category GET failed')
            throw e
        }
    },

    GetTargets: async function() {    
        try{
            return [{id: 1, name: "dorośli"}, {id: 2, name: "dzieci"}, {id: 5, name: "seniorzy"}, {id: 3, name: "rodziny"}, {id: 4, name: "zwierzęta"}]
            return await this.Get(`${this.apiUrl}/${this.activityUrl}/targets`)
        } catch(e) {
            console.log('Target GET failed')
            throw e
        }
    },

    Post: async function(url: string, filters: any) {
        const response = await fetch(`${url}`, { method: 'POST', body: JSON.stringify(filters), headers: this.GetHeaders() })
        return await response.json()
    },

    Get: async function(url: string) {
        const response = await fetch(`${url}`, { method: 'GET', headers: this.GetHeaders() })
        return await response.json()
    },

    GetHeaders: function(): Headers {
        const headers = new Headers()
        headers.append('Authorization', 'Bearer to.ke.n')
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Content-Type', 'application/json')
        headers.append('accept', 'text/plain')
        
        return headers;
    }
}