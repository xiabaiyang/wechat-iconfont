import ItemList from '../components/ItemList.vue'

// 工厂方法动态创建根级别的列表视图
// 因为这些列表除了展示数据类型不同，其他基本一致
// 它们本质上是包含 ItemList.vue 的更高级别组件
export function createListView (type) {
  console.log('翻页');
  return {
    name: `${type}-svg-view`,
    // 这个将在服务器端渲染时被调用，获取数据
    preFetch (store) {
      return store.dispatch('FETCH_FILE_ADDR', { type })
    },
    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
