
  /** Attaches frontmatter and data from each file alongside nested menu of static paths. */
  const withMetaData = async (paths) => {
      const routes = [...paths]
      const hash = Object.create(null)
      const root = { name: 'root' }
      for (const path of routes) {
          const {slug,directory,data} = path.props
          const metaData = Object.entries(data)
              .filter(result=>!result.includes('astro'))
              .reduce((prev,current)=>({...prev,[current[0]]:current[1]}),{})
          let item = root
          for (const [index, name] of Object.entries(directory)) {
            if(!item.items){
                item.items = []
            }
            let isItem = index === String(directory.length - 1)
            if (isItem) {
                item.items.push({ 
                    file: slug,
                    directory: name,
                    href: `/docs/${directory.reduce((acc,curr)=>
                                 acc+=`${curr}/`,'') 
                        }${slug}`, 
                    meta:{...metaData}
                    })
            } else {
                item.items = item.items || []
                item = (
                hash[name] = (
                    hash[name] ||
                    item.items[item.items.push({ directory:name,isDir:true, items: [] }) - 1]
                )
                )
            }
          }
          path.props.menu = root.items
      }
    return routes
  }
  
  export default withMetaData