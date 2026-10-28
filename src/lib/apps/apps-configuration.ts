import * as whatToDoData from './what-to-do/configuration'
import * as expensesData from './expenses/configuration'
import { type AppData } from '$lib/components/app-sidebar-common'

export const appsData: AppData[] = [whatToDoData.data, expensesData.data]