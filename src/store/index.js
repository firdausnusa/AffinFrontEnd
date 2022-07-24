import Vue from 'vue'
import Vuex from 'vuex'
import mockInitialUser from '@/mockData/mockInitialUser.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        customers: []
    },
    mutations: {
        setInitialUser (state, cust) {
            state.customers = cust
        },
        deleteUser (state, index) {
            state.customers.splice(index, 1)
        },
        addAUser(state, cust) {
            state.customers.unshift(cust)
        },
    },
    actions: {
        async getListOfCustomer( { commit }) {
            let response = []
            try {
                response = await new Promise ((resolve) => { //mimicking api server calling
                    setTimeout(() => {
                        resolve(mockInitialUser)
                    }, 3000);
                })
                
            } catch (error) {
                alert("error")
            } finally {
                commit('setInitialUser', response)
            }
        },
        async updateListOfCustomer( { commit }, payload) {
            let response;
            try {
                response = await new Promise ((resolve) => { //mimicking api server calling to update and receive a new updated 
                    setTimeout(() => {
                        resolve(payload)
                    }, 500);
                })
                
            } catch (error) {
                alert("error")
            } finally {
                commit('deleteUser', response)
            }
        },
        async registerACustomer ({ commit }, payload) {
            let response;
            try {
                response = await new Promise ((resolve) => { //mimicking api server calling to update and receive a new updated list
                    setTimeout(() => {
                        resolve(payload)
                    }, 200);
                })
                
            } catch (error) {
                alert("error")
            } finally {
                commit('addAUser', response)
            }
        }
    }
})

export default store;