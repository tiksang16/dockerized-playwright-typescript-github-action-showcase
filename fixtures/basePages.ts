import {test as base, expect} from '@playwright/test'

import HomePage from '../pages/homePage'


type CustomFixtures = {
    homePage: HomePage;
}

export const test = base.extend<CustomFixtures>({
    homePage: async({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
})

export {expect}

