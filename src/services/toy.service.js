import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const KEY = 'toyDB'
// const API = 'api/toy/'
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}
_createToys()
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:5173/api/'


function query(filterBy = { txt: '', status: '', pageIdx: 0 }) {
  // server  
  // return httpService.get(BASE_URL).then(res => res.data)


  // loacl
  return storageService.query(KEY).then(toys => {
    // filter here
    return toys
  })
}

function getById(id) {
  // server  
    // return httpService.get(BASE_URL, id).then(res => res.data)


  // loacl
  return storageService.get(KEY, id)
}

function remove(id) {
  // server  
    // return httpService.delete(BASE_URL, id).then(res => res.data)

  // loacl
  return storageService.remove(KEY, id)
}

function save(toy) {
  // server  
  // if (toy._id) return httpService.put(BASE_URL, toy).then(res => res.data)
  // else return httpService.post(BASE_URL, toy).then(res => res.data)

  // loacl
  const savedTodo = toy._id
    ? storageService.put(KEY, toy)
    : storageService.post(KEY, toy)

  return savedTodo
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function _createToys() {
  let toys = localStorage.getItem(KEY)
  
  if (!toys || !toys.length) {
    toys = [
      _createToy('toy 1', 100),
      _createToy('toy 2', 50),
      _createToy('toy 3', 200),
      _createToy('toy 4', 20),
      _createToy('toy 5', 300),
      _createToy('toy 6', 75),
      _createToy('toy 7', 110),
      _createToy('toy 8', 50),
      _createToy('toy 9', 200),
    ]
    localStorage.setItem(KEY, JSON.stringify(toys))
  }
  return toys
}

function _createToy(name, price) {
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels: labels.filter(() => Math.random() > 0.7),
    createdAt: Date.now(),
    inStock: (Math.random() < 0.8),
  }
}
