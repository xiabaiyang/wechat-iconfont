import superagent from 'superagent';
import LRU from 'lru-cache'

let api;

if (process.__API__) {
  api = process.__API__;
} else {
  api = process.__API__ = superagent;

  api.cachedItems = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  api.cachedIds = {};
  // ['mobile', 'life', 'math'].forEach(type => {
  //   api.child(`${type}stories`).on('value', snapshot => {
  //     api.cachedIds[type] = snapshot.val()
  //   })
  // })
}

export default api
