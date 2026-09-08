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