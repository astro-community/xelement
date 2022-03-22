
const paths = Object.keys(import.meta.glob('../../../../docs/**/*.md'))
    
function routes(){
    let routes = [...paths]
    const docdir = '../../../../docs/'
    return routes.map(
        (slug) => {
         return ({
           params: {
            doc: slug.slice(docdir.length,-3),
        },
           props: {
            slug: slug.slice(docdir.length,-3).split('/').at(-1).toLowerCase(),
            directory: slug.slice(docdir.length,-3).split('/').slice(0,slug.slice(docdir.length,-3).split('/').length-1),
            path: new URL(slug, import.meta.url).pathname,
            data:undefined,
        },
       })}
   ).filter(
          x=>!(x.props.directory.includes('readme'))
           )
}
// Getting Frontmatter

const fetchData = async(path)=>{
    return await import(path).then(exports=>exports.frontmatter)
}

//Apply Frontmatter to Props
async function frontmatter(){
    let array = [...routes()]
    for (const {props} of array){
        props.data  = {...await fetchData(props.path).then(res=>res)}  
    }
    return array
}

export default async function fetchDocs(filterby){
    let paths = [... await frontmatter()]
    return (filterby ==='all') ? paths : paths.filter(x=>x.props.directory.includes(filterby))
}