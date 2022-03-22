/**
 * This following script was provided from
 * https://keestalkstech.com/2021/10/having-fun-grouping-arrays-into-maps-with-typescript/
 * 
 */

/**
 * @name groupedBy
 * @param array - Array of Objects
 * @param destructuredKey - Takes a function and returns the key in the object to group by
 * @returns Map of objects groupedBy a specified key
 */
function groupedBy<Key,Value>(array:Value[], destructuredKey:(item:Value)=>Key){
  return array.reduce((store,item)=>{
    let key = destructuredKey(item)
    if(!store.has(key)){
      store.set(key,[item])
    }else{
      store.get(key).push(item)
    }
    return store
  }, new Map<Key,Value[]>())
}

/**
 * @name transformMap
 * @param source - A Map object
 * @param map - Mapping Function
 * @returns Transformed Map Object
 */
function transformMap<Key,Value,Result>(
  source:Map<Key,Value>,
  map:(value:Value, key:Key) => Result
){
  return new Map(
    Array.from(source,v=>[v[0],map(v[1],v[0])])
  )
}

/**
 * @name groupByAndMap
 * @description - Combining both the groupBy() and transformMap() methods together in a single function call
 * @param array 
 * @param grouper 
 * @param mapper 
 * @returns Transformed Map
 */
function groupByAndMap<T, K, R>(
  array: T[],
  grouper: (x: T) => K,
  mapper: (x: T[]) => R
) {
  let groups = groupedBy(array, grouper)
  return transformMap(groups, value => mapper(value))
}

/**
 * @name mapToObj 
 * @description Takes a map and serializes it into an Object
 * @param m Map
 * @returns Serialized Object
 */
function mapToObj<T>(m: Map<string, T>): { [key: string]: T } {
  return Array.from(m).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}

/**
 * 
 * @param list - Array of Objects to be grouped
 * @param key - CB x=>x[key]
 * @returns A Serialized Mapped Object that is GroupedBy a designated Key
 */
const NestedGroupBy = (list, key) => {
  return (mapToObj(groupByAndMap(
    list,
    key,
    values=>values.map(v=>(v))
    )))
}
export default NestedGroupBy